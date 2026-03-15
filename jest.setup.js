// Jest setup file for global configuration

// Make Vue and related packages available globally for @vue/test-utils
const Vue = require('vue');
const VueCompilerDOM = require('@vue/compiler-dom');
const VueServerRenderer = require('@vue/server-renderer');

global.Vue = Vue;
global.VueCompilerDOM = VueCompilerDOM;
global.VueServerRenderer = VueServerRenderer;
