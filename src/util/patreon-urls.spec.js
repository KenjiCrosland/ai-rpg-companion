import { patreonTiersUrl, buildPatreonLoginUrl } from './patreon-urls.mjs';

describe('patreon-urls', () => {
  describe('buildPatreonLoginUrl', () => {
    it('builds the Patreon Connect flow URL with the return redirect', () => {
      const url = buildPatreonLoginUrl('https://cros.land/dnd-5e-magic-item-generator/');
      expect(url).toBe(
        'https://cros.land/patreon-flow/?patreon-login=yes&patreon-final-redirect='
        + 'https%3A%2F%2Fcros.land%2Fdnd-5e-magic-item-generator%2F',
      );
    });

    it('encodes the return URL so query params survive the round trip', () => {
      // A tool page carrying its own query string is the case that breaks
      // if the redirect is interpolated raw: the `&` would terminate the
      // patreon-final-redirect param and the user would come back to the
      // wrong page.
      const url = buildPatreonLoginUrl('https://cros.land/tool/?a=1&b=2');
      expect(url).toContain('patreon-final-redirect=https%3A%2F%2Fcros.land%2Ftool%2F%3Fa%3D1%26b%3D2');
      expect(url.match(/&/g)).toHaveLength(1); // only the separator before patreon-final-redirect
    });

    it('defaults the return URL to the current page', () => {
      // What all eight tool call sites passed before this was shared, and
      // what lets DataManagerModal use it without a prop.
      expect(buildPatreonLoginUrl()).toContain(
        `patreon-final-redirect=${encodeURIComponent(window.location.href)}`,
      );
    });

    it('is a different destination from the tiers URL', () => {
      // The distinction this module exists to keep straight: the tiers page
      // takes a pledge, the login flow creates the session. Only one of them
      // can get an existing patron to premium.
      expect(buildPatreonLoginUrl()).not.toContain(patreonTiersUrl);
      expect(patreonTiersUrl).toBe('https://www.patreon.com/c/ai_rpg_tookit/membership');
    });
  });
});
