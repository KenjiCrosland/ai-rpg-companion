import { mount } from '@vue/test-utils';
import ParConfirm from './ParConfirm.vue';

// ParConfirm wraps ParModal, which teleports to <body>. Mount with
// attachTo so the teleported dialog lands somewhere we can query, and
// read it back off document.body.
function mountConfirm(props = {}, slots = {}) {
  const wrapper = mount(ParConfirm, {
    props: { opened: true, title: 'Replace lore?', ...props },
    slots,
    attachTo: document.body,
  });
  return wrapper;
}

function buttonByText(label) {
  return [...document.body.querySelectorAll('.par-card-button')].find((b) =>
    b.textContent.includes(label),
  );
}

describe('ParConfirm', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders the message prop in the body when opened', () => {
    mountConfirm({ message: 'This cannot be undone.' });
    expect(document.body.querySelector('.par-confirm__message').textContent).toContain(
      'This cannot be undone.',
    );
  });

  it('lets the default slot override the message prop', () => {
    mountConfirm({ message: 'ignored' }, { default: 'Custom <em>body</em>' });
    const text = document.body.querySelector('.par-confirm__message').textContent;
    expect(text).toContain('Custom');
    expect(text).not.toContain('ignored');
  });

  it('renders custom confirm/cancel labels', () => {
    mountConfirm({ confirmLabel: 'Keep', cancelLabel: 'Discard' });
    expect(buttonByText('Keep')).toBeTruthy();
    expect(buttonByText('Discard')).toBeTruthy();
  });

  it('emits confirm when the commit button is clicked', async () => {
    const wrapper = mountConfirm({ confirmLabel: 'Keep' });
    buttonByText('Keep').click();
    expect(wrapper.emitted('confirm')).toHaveLength(1);
  });

  it('emits cancel when the cancel button is clicked', async () => {
    const wrapper = mountConfirm({ cancelLabel: 'Discard' });
    buttonByText('Discard').click();
    expect(wrapper.emitted('cancel')).toHaveLength(1);
  });

  it('uses the burgundy primary commit by default and danger when destructive', () => {
    mountConfirm({ confirmLabel: 'Go' });
    expect(buttonByText('Go').classList).toContain('par-card-button--primary');
    document.body.innerHTML = '';

    mountConfirm({ confirmLabel: 'Delete', destructive: true });
    expect(buttonByText('Delete').classList).toContain('par-card-button--danger');
  });

  it('does not render the dialog when closed', () => {
    mountConfirm({ opened: false });
    expect(document.body.querySelector('.par-confirm__message')).toBeNull();
  });
});
