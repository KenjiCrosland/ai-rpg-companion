/**
 * logger tests
 *
 * Behavior-focused: the contract is "log/info/debug silenced in prod,
 * warn/error always fire." Tests assert that contract directly by
 * mutating NODE_ENV around each call and verifying console spies fire
 * or don't.
 */

import { logger } from './logger.mjs';

describe('logger', () => {
  let originalEnv;
  let logSpy;
  let infoSpy;
  let debugSpy;
  let warnSpy;
  let errorSpy;

  beforeEach(() => {
    originalEnv = process.env.NODE_ENV;
    // Each test sets NODE_ENV explicitly; spies live for the test only.
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    infoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    debugSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    logSpy.mockRestore();
    infoSpy.mockRestore();
    debugSpy.mockRestore();
    warnSpy.mockRestore();
    errorSpy.mockRestore();
  });

  describe('in development', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    it('forwards log/info/debug to the corresponding console method', () => {
      logger.log('a');
      logger.info('b');
      logger.debug('c');

      expect(logSpy).toHaveBeenCalledWith('a');
      expect(infoSpy).toHaveBeenCalledWith('b');
      expect(debugSpy).toHaveBeenCalledWith('c');
    });

    it('forwards warn/error to the corresponding console method', () => {
      logger.warn('warning');
      logger.error('boom');

      expect(warnSpy).toHaveBeenCalledWith('warning');
      expect(errorSpy).toHaveBeenCalledWith('boom');
    });

    it('passes multiple arguments through, including objects', () => {
      const obj = { foo: 1 };
      logger.log('msg', obj, 42);
      expect(logSpy).toHaveBeenCalledWith('msg', obj, 42);
    });
  });

  describe('in production', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'production';
    });

    it('silences log/info/debug — the gating split applies', () => {
      logger.log('a');
      logger.info('b');
      logger.debug('c');

      expect(logSpy).not.toHaveBeenCalled();
      expect(infoSpy).not.toHaveBeenCalled();
      expect(debugSpy).not.toHaveBeenCalled();
    });

    it('STILL fires warn/error — production errors must remain visible', () => {
      // The whole reason for the gating split: silencing errors in prod
      // makes user-side fatal states invisible. Asserting this directly
      // so a future "let's silence all of them" refactor breaks here
      // first and surfaces the tradeoff in code review.
      logger.warn('warning');
      logger.error('boom');

      expect(warnSpy).toHaveBeenCalledWith('warning');
      expect(errorSpy).toHaveBeenCalledWith('boom');
    });
  });

  describe('NODE_ENV check is at call time, not import time', () => {
    it('honors NODE_ENV changes between calls', () => {
      // Critical for tests that flip NODE_ENV mid-run, and for any
      // future hot-reload scenario. If the gating were evaluated at
      // module import, the second logger.log would have stayed silent.
      process.env.NODE_ENV = 'production';
      logger.log('silent');
      expect(logSpy).not.toHaveBeenCalled();

      process.env.NODE_ENV = 'development';
      logger.log('loud');
      expect(logSpy).toHaveBeenCalledWith('loud');
    });
  });
});
