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
    var templateObjects = grunt.file.readJSON(grunt.config.get('config.templates.file'));

    templatePaths.map(function (templatePath) {
      try {
        var templateFile = yaml.loadFront(grunt.file.read(templatePath));
        var templateName = path.basename(templatePath, '.hbs');
        var templateContents = {
          Name: templateObjects[templateName] && templateObjects[templateName].name || templateName,
          HtmlBody: grunt.file.read(path.join(options.dist, templateName + '.html')),
          TextBody: grunt.file.read(path.join(options.dist, templateName + '.txt'))
        };

        if (templateFile.name) {
          templateContents.Name = templateFile.name;
        }

        if (templateFile.subject) {
          templateContents.Subject = templateFile.subject;
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

    grunt.file.write(grunt.config.get('config.templates.file'), JSON.stringify(templateObjects, null, 2));
  });
};
