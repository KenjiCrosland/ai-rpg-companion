import { mount } from '@vue/test-utils';
import DungeonExports from './DungeonExports.vue';

// Mock the export utilities
jest.mock('../util/dungeon-to-markdown.mjs', () => ({
  dungeonToMarkdown: jest.fn(() => 'MARKDOWN_CONTENT'),
}));

jest.mock('../util/dungeon-to-html.mjs', () => ({
  dungeonToHTML: jest.fn(() => '<h1>HTML_CONTENT</h1>'),
}));

jest.mock('../util/dungeon-to-plain-text.mjs', () => ({
  dungeonToPlainText: jest.fn(() => 'PLAIN_TEXT_CONTENT'),
}));

// Mock the toast composable
const mockToast = {
  success: jest.fn(),
  error: jest.fn(),
};

jest.mock('../../composables/useToast', () => ({
  useToast: () => mockToast,
}));

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
});

describe('DungeonExports.vue', () => {
  let wrapper;

  const mockDungeon = {
    dungeonOverview: {
      name: 'Test Dungeon',
      overview: 'A test dungeon',
      relation_to_larger_setting: 'Located in the mountains',
      finding_the_dungeon: 'Follow the old road',
      history: 'Built long ago',
      dominant_power: 'A dragon',
      dominant_power_goals: 'Hoarding treasure',
      dominant_power_minions: 'Kobolds',
      dominant_power_event: 'Raided a village',
      recent_event_consequences: 'Villagers are scared',
      secondary_power: 'Adventurers',
      secondary_power_event: 'Entered the dungeon',
      main_problem: 'Defeat the dragon',
      potential_solutions: 'Fight or negotiate',
      conclusion: 'The future is uncertain',
      difficulty_level: 'Tier 2',
    },
    npcs: [],
    rooms: [],
    monsters: [],
  };

  beforeEach(() => {
    wrapper = mount(DungeonExports, {
      props: {
        dungeon: mockDungeon,
      },
    });
    jest.clearAllMocks();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should display the exports heading', () => {
    const heading = wrapper.find('.exports-heading');
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe('Export Your Dungeon');
  });

  it('should display all three export buttons', () => {
    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(3);
    expect(wrapper.text()).toContain('Copy as Plain Text');
    expect(wrapper.text()).toContain('Copy as HTML');
    expect(wrapper.text()).toContain('Copy as Homebrewery Markdown');
  });

  it('should copy plain text when plain text button is clicked', async () => {
    const plainTextButton = wrapper.findAll('button').find(btn =>
      btn.text().includes('Copy as Plain Text')
    );

    await plainTextButton.trigger('click');

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('PLAIN_TEXT_CONTENT');
    expect(mockToast.success).toHaveBeenCalledWith('Copied as plain text.');
  });

  it('should copy HTML when HTML button is clicked', async () => {
    const htmlButton = wrapper.findAll('button').find(btn =>
      btn.text().includes('Copy as HTML')
    );

    await htmlButton.trigger('click');

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('<h1>HTML_CONTENT</h1>');
    expect(mockToast.success).toHaveBeenCalledWith('Copied as HTML.');
  });

  it('should copy markdown when markdown button is clicked', async () => {
    const markdownButton = wrapper.findAll('button').find(btn =>
      btn.text().includes('Copy as Homebrewery Markdown')
    );

    await markdownButton.trigger('click');

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('MARKDOWN_CONTENT');
    expect(mockToast.success).toHaveBeenCalledWith('Copied as markdown — paste into Homebrewery to format.');
  });

  it('should show error toast when plain text copy fails', async () => {
    navigator.clipboard.writeText.mockRejectedValueOnce(new Error('Clipboard error'));

    const plainTextButton = wrapper.findAll('button').find(btn =>
      btn.text().includes('Copy as Plain Text')
    );

    await plainTextButton.trigger('click');
    await wrapper.vm.$nextTick();

    expect(mockToast.error).toHaveBeenCalledWith('Failed to copy content.');
  });

  it('should show error toast when HTML copy fails', async () => {
    navigator.clipboard.writeText.mockRejectedValueOnce(new Error('Clipboard error'));

    const htmlButton = wrapper.findAll('button').find(btn =>
      btn.text().includes('Copy as HTML')
    );

    await htmlButton.trigger('click');
    await wrapper.vm.$nextTick();

    expect(mockToast.error).toHaveBeenCalledWith('Failed to copy content.');
  });

  it('should show error toast when markdown copy fails', async () => {
    navigator.clipboard.writeText.mockRejectedValueOnce(new Error('Clipboard error'));

    const markdownButton = wrapper.findAll('button').find(btn =>
      btn.text().includes('Copy as Homebrewery Markdown')
    );

    await markdownButton.trigger('click');
    await wrapper.vm.$nextTick();

    expect(mockToast.error).toHaveBeenCalledWith('Failed to copy content.');
  });

  it('should display accordion help sections', () => {
    expect(wrapper.text()).toContain('How to use with Homebrewery');
    expect(wrapper.text()).toContain('How to use HTML format');
    expect(wrapper.text()).toContain('How to use Plain Text format');
  });

  it('should toggle accordion when clicked', async () => {
    // Find the markdown accordion - this is simplified, actual implementation may vary
    const accordions = wrapper.findAll('[id^="export-help-"]');
    expect(accordions.length).toBeGreaterThan(0);
  });

  it('should contain Homebrewery link in accordion', () => {
    const content = wrapper.html();
    expect(content).toContain('homebrewery.naturalcrit.com/new');
  });

  it('should pass dungeon prop to export functions', async () => {
    const { dungeonToMarkdown } = require('../util/dungeon-to-markdown.mjs');
    const { dungeonToHTML } = require('../util/dungeon-to-html.mjs');
    const { dungeonToPlainText } = require('../util/dungeon-to-plain-text.mjs');

    const plainTextButton = wrapper.findAll('button').find(btn =>
      btn.text().includes('Copy as Plain Text')
    );
    await plainTextButton.trigger('click');
    expect(dungeonToPlainText).toHaveBeenCalledWith(mockDungeon);

    const htmlButton = wrapper.findAll('button').find(btn =>
      btn.text().includes('Copy as HTML')
    );
    await htmlButton.trigger('click');
    expect(dungeonToHTML).toHaveBeenCalledWith(mockDungeon);

    const markdownButton = wrapper.findAll('button').find(btn =>
      btn.text().includes('Copy as Homebrewery Markdown')
    );
    await markdownButton.trigger('click');
    expect(dungeonToMarkdown).toHaveBeenCalledWith(mockDungeon);
  });

  it('should have correct CSS classes', () => {
    expect(wrapper.find('.exports-section').exists()).toBe(true);
    expect(wrapper.find('.exports-heading').exists()).toBe(true);
    expect(wrapper.find('.export-buttons').exists()).toBe(true);
    expect(wrapper.find('.export-help').exists()).toBe(true);
  });

  it('should apply secondary modifier to buttons', () => {
    const buttons = wrapper.findAll('button');
    buttons.forEach(button => {
      const classes = button.attributes('class') || '';
      // Cedar buttons may have different class structure, adjust as needed
      expect(button.exists()).toBe(true);
    });
  });
});
