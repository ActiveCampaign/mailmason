module.exports = function(grunt) {

  // Include modules
  require('load-grunt-tasks')(grunt, {pattern: ['grunt-*', 'assemble']});
  require('time-grunt')(grunt);

  var path = {
    cssSrc: 'src/stylesheets/global.scss',
    cssDest: 'src/stylesheets/global.css',
    emailSrc: 'src/emails/*.hbs',
    dist: 'dist/',
    layouts: 'src/layouts',
    partials: 'src/partials/*',
    images: 'src/images',
    cdn: 'http://assets.wildbit.com/postmark/emails/images/',
    ftp: '/web/content/postmark/emails/images'
  };

  /* Configuration
  ================================================= */

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    /* SASS
    ------------------------------------------------- */

    sass: {
      options: {
        sourceMap: false
      },
      styles: {
        src: path.cssSrc,
        dest: path.cssDest
      }
    },


    /* Autoprefixer
    ------------------------------------------------- */

    autoprefixer: {
      options: {
        map: false,
        browsers: ['last 6 versions', 'ie >= 9']
      },
      styles: {
        src: path.cssDest,
        dest: path.cssDest
      }
    },


    /* Assemble
    ------------------------------------------------- */

    assemble: {
      options: {
        layoutdir: path.layouts,
        partials: path.partials,
        flatten: true
      },
      pages: {
        src: [path.emailSrc],
        dest: path.dist
      }
    },


    /* Inline
    ------------------------------------------------- */

    inline: {
      html: {
        expand: true,
        cwd: path.dist,
        ext: '.html',
        src: ['*.html'],
        dest: path.dist
      }
    },


    /* Prettify
    ------------------------------------------------- */

    prettify: {
      options: {
        indent: '2'
      },
      html: {
        expand: true,
        cwd: path.dist,
        ext: '.html',
        src: ['*.html'],
        dest: path.dist
      }
    },


    /* Premailer
    ------------------------------------------------- */

    premailer: {
      html: {
        options: {
          //removeComments: true
        },
        files: [{
          expand: true,
          src: [path.dist + '*.html'],
          dest: ''
        }]
      },
      txt: {
        options: {
          mode: 'txt'
        },
        files: [{
          expand: true,
          src: [path.dist + '*.html'],
          dest: '',
          ext: '.txt'
        }]
      }
    },


    /* Cache bust
    ------------------------------------------------- */

    cacheBust: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 16,
        rename: false,
      },
      emails: {
        files: [{
          src: [path.dist + '*.html']
        },
        {
          src: [path.builds + '*.html']
        }]
      }
    },


    /* Watch
    ------------------------------------------------- */

    watch: {
      options: {
        livereload: true
      },
      files: ['src/**/*'],
      tasks: ['default']
    },


    /* Replace
    ------------------------------------------------- */

    replace: {
      variableSyntax: {
        src: ['dist/*.html'],
        overwrite: true,
        replacements: [
          {
            from: '&#123;&#123;',
            to: '{{'
          },
          {
            from: '&#125;&#125;',
            to: '}}'
          }
        ]
      },
      styleBlock: {
        src: ['dist/*.html'],
        overwrite: true,
        replacements: [
          {
            from: '<style>',
            to: '<style type="text/css" rel="stylesheet" media="all">'
          }
        ]
      }
    },


    /* Spamcheck
    ------------------------------------------------- */

    spamcheck: {
      emails: {
        src: [path.dist + '*.html']
      }
    },


    /* Postmark
    ------------------------------------------------- */

    postmark: {
      options: {
        serverToken: 'SERVER_TOKEN',
        from: 'FROM_ADDRESS',
        to: 'TO_ADDRESS',
        subject: 'PM TEMPLATE TEST'
      },
      emails: {
        src: [path.dist + '*.html']
      },
      litmus: {
        to: '',
        src: [path.dist + '*.html']
      }
    }

  });


  /* Tasks
  ================================================= */

  grunt.registerTask('default', ['css', 'assemble', 'inline', 'replace', 'prettify']);
  grunt.registerTask('premailerbuild', ['css', 'html', 'prettify']);

  // Assets
  grunt.registerTask('html', ['assemble', 'premailer']);
  grunt.registerTask('css', ['sass', 'autoprefixer']);

  // Testing
  grunt.registerTask('send', ['postmark:emails']);
  grunt.registerTask('spam', ['spamcheck']);
  grunt.registerTask('litmus', ['postmark:litmus']);

  // Build
  grunt.registerTask('build', ['css', 'html', 'cacheBust', 'upload']);

};
