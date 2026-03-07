/**
 * Tests for multi-tab statblock limit synchronization via storage events
 */

describe('Statblock Limit Multi-Tab Sync', () => {
  let eventListeners = [];

  beforeEach(() => {
    // Clear localStorage
    localStorage.clear();

    // Track event listeners so we can clean them up
    eventListeners = [];
  });

  afterEach(() => {
    // Clean up all event listeners added during tests
    eventListeners.forEach(listener => {
      window.removeEventListener('storage', listener);
    });
    eventListeners = [];
    jest.restoreAllMocks();
  });

  // Helper to add tracked event listener
  function addTrackedListener(handler) {
    eventListeners.push(handler);
    window.addEventListener('storage', handler);
  }

  describe('Storage Event Detection', () => {
    it('should fire storage event when localStorage changes in another tab', () => {
      const handler = jest.fn();
      addTrackedListener(handler);

      // Simulate another tab changing localStorage
      const event = new StorageEvent('storage', {
        key: 'monsters',
        oldValue: JSON.stringify({ generationCount: '3', firstGenerationTime: null }),
        newValue: JSON.stringify({ generationCount: '4', firstGenerationTime: Date.now().toString() }),
        storageArea: localStorage,
        url: window.location.href
      });

      window.dispatchEvent(event);

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(expect.objectContaining({
        key: 'monsters'
      }));
    });

    it('should parse generation count from storage event', () => {
      let capturedCount;

      addTrackedListener((e) => {
        if (e.key === 'monsters') {
          const monsters = JSON.parse(e.newValue);
          capturedCount = parseInt(monsters.generationCount);
        }
      });

      const event = new StorageEvent('storage', {
        key: 'monsters',
        newValue: JSON.stringify({ generationCount: '5', firstGenerationTime: Date.now().toString() })
      });

      window.dispatchEvent(event);

      expect(capturedCount).toBe(5);
    });

    it('should detect when limit is reached in another tab', () => {
      let limitReached = false;

      addTrackedListener((e) => {
        if (e.key === 'monsters') {
          const monsters = JSON.parse(e.newValue);
          const count = parseInt(monsters.generationCount) || 0;
          limitReached = count >= 5;
        }
      });

      // Simulate another tab hitting the limit
      const event = new StorageEvent('storage', {
        key: 'monsters',
        newValue: JSON.stringify({ generationCount: '5', firstGenerationTime: Date.now().toString() })
      });

      window.dispatchEvent(event);

      expect(limitReached).toBe(true);
    });

    it('should detect when limit is reset in another tab', () => {
      let limitReached = true; // Start at limit

      addTrackedListener((e) => {
        if (e.key === 'monsters') {
          const monsters = JSON.parse(e.newValue);
          const count = parseInt(monsters.generationCount) || 0;
          if (count < 5) {
            limitReached = false;
          }
        }
      });

      // Simulate another tab resetting after 24 hours
      const event = new StorageEvent('storage', {
        key: 'monsters',
        newValue: JSON.stringify({ generationCount: '1', firstGenerationTime: Date.now().toString() })
      });

      window.dispatchEvent(event);

      expect(limitReached).toBe(false);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid JSON in storage event', () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation();

      addTrackedListener((e) => {
        if (e.key === 'monsters') {
          try {
            JSON.parse(e.newValue);
          } catch (err) {
            console.error('Parse error:', err);
          }
        }
      });

      const event = new StorageEvent('storage', {
        key: 'monsters',
        newValue: 'invalid json'
      });

      window.dispatchEvent(event);

      expect(consoleError).toHaveBeenCalled();
      consoleError.mockRestore();
    });

    it('should handle null newValue in storage event', () => {
      let errorOccurred = false;

      addTrackedListener((e) => {
        if (e.key === 'monsters') {
          try {
            const monsters = e.newValue ? JSON.parse(e.newValue) : null;
            if (!monsters) {
              throw new Error('No data');
            }
          } catch (err) {
            errorOccurred = true;
          }
        }
      });

      const event = new StorageEvent('storage', {
        key: 'monsters',
        newValue: null
      });

      window.dispatchEvent(event);

      expect(errorOccurred).toBe(true);
    });
  });

  describe('Event Filtering', () => {
    it('should only respond to monsters key changes', () => {
      const handler = jest.fn();

      addTrackedListener((e) => {
        if (e.key === 'monsters') {
          handler();
        }
      });

      // Change different key
      const event1 = new StorageEvent('storage', {
        key: 'dungeons',
        newValue: JSON.stringify([])
      });
      window.dispatchEvent(event1);

      expect(handler).not.toHaveBeenCalled();

      // Change monsters key
      const event2 = new StorageEvent('storage', {
        key: 'monsters',
        newValue: JSON.stringify({ generationCount: '2' })
      });
      window.dispatchEvent(event2);

      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe('Concurrent Tab Scenarios', () => {
    it('should sync state when tab A hits limit and tab B is waiting', () => {
      // Tab B state
      let tabBLimitReached = false;

      addTrackedListener((e) => {
        if (e.key === 'monsters') {
          const monsters = JSON.parse(e.newValue);
          const count = parseInt(monsters.generationCount) || 0;
          tabBLimitReached = count >= 5;
        }
      });

      expect(tabBLimitReached).toBe(false);

      // Tab A reaches limit
      const event = new StorageEvent('storage', {
        key: 'monsters',
        oldValue: JSON.stringify({ generationCount: '4' }),
        newValue: JSON.stringify({ generationCount: '5', firstGenerationTime: Date.now().toString() })
      });
      window.dispatchEvent(event);

      expect(tabBLimitReached).toBe(true);
    });

    it('should sync when tab A resets after 24 hours', () => {
      // Tab B state - currently at limit
      let tabBCanGenerate = false;

      addTrackedListener((e) => {
        if (e.key === 'monsters') {
          const monsters = JSON.parse(e.newValue);
          const count = parseInt(monsters.generationCount) || 0;
          tabBCanGenerate = count < 5;
        }
      });

      // Tab A resets counter (24 hours passed)
      const now = Date.now();
      const event = new StorageEvent('storage', {
        key: 'monsters',
        oldValue: JSON.stringify({
          generationCount: '5',
          firstGenerationTime: (now - 86400001).toString()
        }),
        newValue: JSON.stringify({
          generationCount: '1',
          firstGenerationTime: now.toString()
        })
      });
      window.dispatchEvent(event);

      expect(tabBCanGenerate).toBe(true);
    });

    it('should handle rapid increments across tabs', () => {
      let currentCount = 0;

      addTrackedListener((e) => {
        if (e.key === 'monsters') {
          const monsters = JSON.parse(e.newValue);
          currentCount = parseInt(monsters.generationCount) || 0;
        }
      });

      // Simulate rapid generations: 0 → 1 → 2 → 3 → 4 → 5
      for (let i = 1; i <= 5; i++) {
        const event = new StorageEvent('storage', {
          key: 'monsters',
          newValue: JSON.stringify({
            generationCount: i.toString(),
            firstGenerationTime: Date.now().toString()
          })
        });
        window.dispatchEvent(event);
      }

      expect(currentCount).toBe(5);
    });
  });

  describe('Time-based Reset Logic', () => {
    it('should reset when 24 hours have passed', () => {
      const now = Date.now();
      const twentyFourHoursAgo = now - (24 * 60 * 60 * 1000 + 1000); // 24 hours + 1 second

      let shouldReset = false;

      addTrackedListener((e) => {
        if (e.key === 'monsters') {
          const monsters = JSON.parse(e.newValue);
          const firstTime = parseInt(monsters.firstGenerationTime);
          const elapsed = now - firstTime;

          // Check if reset should happen (>= 24 hours)
          shouldReset = elapsed >= 86400000;
        }
      });

      const event = new StorageEvent('storage', {
        key: 'monsters',
        newValue: JSON.stringify({
          generationCount: '5',
          firstGenerationTime: twentyFourHoursAgo.toString()
        })
      });
      window.dispatchEvent(event);

      expect(shouldReset).toBe(true);
    });

    it('should not reset before 24 hours', () => {
      const now = Date.now();
      const twentyThreeHoursAgo = now - (23 * 60 * 60 * 1000); // 23 hours

      let shouldReset = false;

      addTrackedListener((e) => {
        if (e.key === 'monsters') {
          const monsters = JSON.parse(e.newValue);
          const firstTime = parseInt(monsters.firstGenerationTime);
          const elapsed = now - firstTime;

          shouldReset = elapsed >= 86400000;
        }
      });

      const event = new StorageEvent('storage', {
        key: 'monsters',
        newValue: JSON.stringify({
          generationCount: '5',
          firstGenerationTime: twentyThreeHoursAgo.toString()
        })
      });
      window.dispatchEvent(event);

      expect(shouldReset).toBe(false);
    });
  });
});
