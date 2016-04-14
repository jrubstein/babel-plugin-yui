var path = require('path'),
  dot = require('dot'),
  _ = require('lodash'),
  EOL = require('os').EOL,
  uglify = require('uglify-js');

module.exports = function(grunt) {
  // Show elapsed time at the end
  require('time-grunt')(grunt);
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    release: {
      options: {
        tagMessage: 'Version <%= version %>'
      }
    }
  });
};
