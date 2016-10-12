module.exports = function(grunt) {

  // Include modules
  require('load-grunt-tasks')(grunt, {pattern: ['grunt-*', 'assemble']});
  require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-ftp-deploy');

  var path = {
    css_src: 'src/stylesheets/global.scss',
    css_dest: 'src/stylesheets/global.css',
    email_src: 'src/emails/*.hbs',
    dist: 'dist/',
    dist_test: 'dist_test/',
    dist_html_glob: 'dist/*.html',
    dist_text_glob: 'dist/*.txt',
    dist_test_html_glob: 'dist_test/*.html',
    layouts: 'src/layouts',
    partials: 'src/partials/*',
    images_src: 'src/images'
  };

  /* Configuration
  ================================================= */

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /* secrets.json and config.json simplify variable management to keep the
       common changes centralized to key files instead of being littered
       throughout the Gruntfile. This also makes it easy to .gitignore secrets
    ================================================= */
    secret: grunt.file.readJSON('secrets.json'),
    config: grunt.file.readJSON('config.json'),

    /* SASS
    ------------------------------------------------- */

    sass: {
      styles: {
        src: path.css_src,
        dest: path.css_dest
      }
    },


    /* Autoprefixer
    ------------------------------------------------- */

    autoprefixer: {
      options: {
        browsers: ['last 6 versions', 'ie >= 9']
      },
      styles: {
        src: path.css_dest,
        dest: path.css_dest
      }
    },


    /* Assemble
       Assembles our handlebars templates. Documentation might be incompatible since the latest version uses an entirely different build system.
       See: https://github.com/assemble/assemble/
    ------------------------------------------------- */

    assemble: {
      options: {
        layoutdir: path.layouts,
        partials: path.partials,
        flatten: true,
        sender_name: "<%= config.strings.sender_name %>",
        product_name: "<%= config.strings.product_name %>",
        product_url: "<%= config.strings.product_url %>",
        credit_card_statement_name: "<%= config.strings.credit_card_statement_name %>",
        formal_company_name: "<%= config.strings.formal_company_name %>",
        address_line_1: "<%= config.strings.address_line_1 %>",
        address_line_2: "<%= config.strings.address_line_2 %>",
        city: "<%= config.strings.city %>",
        state: "<%= config.strings.state %>",
        country: "<%= config.strings.country %>",
        phone: "<%= config.strings.phone %>",
        images_url: "<%= config.images.images_url %>",
        use_images: "<%= config.images.use_images %>",
        logo_file: "<%= config.images.logo_file %>",
        logo_width: "<%= config.images.logo_width %>",
        use_social_circles: "<%= config.images.use_social_circles %>",
        twitter_url: "<%= config.images.twitter_url %>",
        facebook_url: "<%= config.images.facebook_url %>",
        pinterest_url: "<%= config.images.pinterest_url %>",
        instagram_url: "<%= config.images.instagram_url %>",
        google_plus_url: "<%= config.images.google_plus_url %>",
        youtube_url: "<%= config.images.youtube_url %>",
        linkedin_url: "<%= config.images.linkedin_url %>"
      },
      pages: {
        src: [path.email_src],
        dest: path.dist
      }
    },


    /* Inline
       Brings external resources in the HTML files. Basically just takes our CSS file and inserts it as a style block.
       See: https://github.com/chyingp/grunt-inline
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
       Formats our template HTML files.
       See: https://github.com/jonschlinkert/grunt-prettify
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
       Adds all sorts of email magic. Adds inline styles to each element based off class. Also generates plain text versions and allows us to control commonly used table attributes via CSS.
       See: https://github.com/dwightjack/grunt-premailer
    ------------------------------------------------- */

    premailer: {
      options: {
        warnLevel: 'none'
      },
      html: {
        options: {
          removeComments: true
        },
        files: [{
          expand: true,
          src: [path.dist_test_html_glob],
          dest: ''
        }]
      },
      txt: {
        options: {
          mode: 'txt',
          lineLength: 16384
        },
        files: [{
          expand: true,
          src: [path.dist_html_glob],
          dest: '',
          ext: '.txt'
        }]
      }
    },


    'ftp-deploy': {
      build: {
        auth: {
          host: "<%= config.ftp.host %>",
          port: "<%= config.ftp.port %>",
          username: "<%= secret.ftp.username %>",
          password: "<%= secret.ftp.password %>"
        },
        src: "<%= config.ftp.src %>",
        dest: "<%= config.ftp.dest %>",
        exclusions: ['path/to/source/folder/**/.DS_Store', 'path/to/source/folder/**/Thumbs.db']
      }
    },


    /* Watch
       Watches all files in the src directory for changes.
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
      // Premailer escapes URLs, so our mustachio variables for URLs get fully escaped, and the
      // URL variables need to be converted from %7B%7Bsomething%7D%7D to {{something}}
      variableSyntax: {
        src: [path.dist_text_glob],
        overwrite: true,
        replacements: [
          { from: '%7B%7B', to: '{{ ' },
          { from: '%7D%7D', to: ' }}' },
          { from: '%7D%7D%22', to: ' }}' },
          { from: '%20}}', to: ' }}' },
          { from: '{{%20', to: '{{ ' }
        ]
      },
      // Add some additional attributes that grunt inline removed
      styleBlock: {
        src: [path.dist_html_glob],
        overwrite: true,
        replacements: [
          {
            from: '<style type="text/css">',
            to: '<style type="text/css" rel="stylesheet" media="all">'
          }
        ]
      }
    },


    /* Copy
       This is mainly used to copy compiled templates to a new directory for the CSS to be inlined before being tested.
       See: https://github.com/gruntjs/grunt-contrib-copy
     ------------------------------------------------- */

    copy: {
      testTemplates: {
        files: [{
          expand: true,
          src: [path.dist_html_glob],
          dest: path.dist_test,
          flatten: true
        }]
      }
    },


    /* Spamcheck
       Sends all of our HTML files through Postmark’s spamcheck API.
       See: https://github.com/wildbit/grunt-spamcheck
    ------------------------------------------------- */

    spamcheck: {
      emails: {
        src: [path.dist_html_glob]
      }
    },


    /* Postmark
       Sends test emails through Postmark. Add and remove template targets as needed.
       Ensure that the CSS is always inlined before sending tests. This can be done with the 'testBuild' task below.
       See: https://github.com/wildbit/grunt-postmark
    ------------------------------------------------- */

    postmark: {
      options: {
        serverToken: "<%= secret.postmark.server_token %>",
        from: "<%= config.postmark.from %>",
        to: "<%= config.postmark.to %>",
        subject: "<%= config.postmark.subject %>",
      },
      // run "grunt postmark:welcome" - Sends just the welcome email
      welcome: {
        src: 'dist_test/welcome.html'
      },
      // run "npm run flood" - Sends all of the emails. Be careful not to spam PM if you have a bunch of emails.
      flood: {
        src: [path.dist_test_html_glob]
      },
      // run "npm run litmus" - Add a litmus test address here.
      litmus: {
        to: "<%= config.strings.litmus_email %>",
        src: 'dist_test/example.html'
      }
    }

  });


  /* Tasks
  ================================================= */

  grunt.registerTask('default', ['css', 'html']);

  // Assets
  grunt.registerTask('html', ['assemble', 'inline', 'premailer:txt', 'replace', 'prettify']);
  grunt.registerTask('css', ['sass', 'autoprefixer']);
  grunt.registerTask('images', ['ftp-deploy']);

  // Testing
  grunt.registerTask('spam', ['spamcheck']);
  grunt.registerTask('litmus', ['testBuild', 'postmark:litmus']);
  grunt.registerTask('flood', ['testBuild', 'postmark:flood']);

  // Before sending tests via Postmark, ensure that test builds with inlined CSS are generated
  grunt.registerTask('testBuild', ['default', 'copy:testTemplates', 'premailer:html']);
};
