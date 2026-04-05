// Jest setup file for global configuration

// Make Vue and related packages available globally for @vue/test-utils
const Vue = require('vue');
const VueCompilerDOM = require('@vue/compiler-dom');
const VueServerRenderer = require('@vue/server-renderer');

global.Vue = Vue;
global.VueCompilerDOM = VueCompilerDOM;
global.VueServerRenderer = VueServerRenderer;

// Mock import.meta for Jest (needed for Vite environment checks)
global.import = global.import || {};
global.import.meta = global.import.meta || {};
global.import.meta.env = global.import.meta.env || { DEV: true };
