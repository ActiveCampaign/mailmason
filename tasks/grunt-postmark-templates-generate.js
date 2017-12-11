/*
 * grunt-postmark-templates-generate
 * Generate templates to push to a Postmark server for use with grunt-postmark
 *
 * https://github.com/wildbit/grunt-postmark.git
 */

module.exports = function (grunt) {
  grunt.registerTask('postmark-templates-generate', 'Generate templates to push to a Postmark server for use with grunt-postmark', function () {
    var path = require('path');
    var yaml = require('yaml-front-matter');

    var options = this.options();
    var templatePaths = grunt.file.expand(options.src);
    var templateObjects = grunt.file.readJSON(options.file);

    templatePaths.map(function (templatePath) {
      try {
        var templateFile = yaml.loadFront(grunt.file.read(templatePath));
        var templateName = path.basename(templatePath, '.hbs');
        var templateContents = {
          name: templateObjects[templateName] && templateObjects[templateName].name || templateName,
          htmlSrc: path.join(options.dist, templateName + '.html'),
          textSrc: path.join(options.dist, templateName + '.txt')
        };

        if (templateFile.name) {
          templateContents.name = templateFile.name;
        }

        if (templateFile.subject) {
          templateContents.subject = templateFile.subject;
        }

        if (!templateObjects[templateName]) {
          templateObjects[templateName] = {};
        }

        Object.assign(
          templateObjects[templateName],
          templateContents
        );
      } catch (e) {
        grunt.log.error('templatePath', templatePath, e);
      }
    });

    grunt.config('postmark-templates-upload', templateObjects);
  });
};
