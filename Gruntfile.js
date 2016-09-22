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
    dist_html_glob: 'dist/*.html',
    dist_text_glob: 'dist/*.txt',
    layouts: 'src/layouts',
    partials: 'src/partials/*',
    images_src: 'src/images'
  };

  /* Configuration
  ================================================= */

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    secret: grunt.file.readJSON('secrets.json'),
    var: grunt.file.readJSON('variables.json'),

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
        sender_name: "[Sender Name]",
        product_name: "[Product Name]",
        product_url: "https://example.com",
        credit_card_statement_name: "[Credit Card Statement Name]",
        formal_name: "[Company Name, LLC]",
        address_line_1: "1234 Street Rd." ,
        address_line_2: "Suite 1234",
        city: "Cityville",
        state: "ST",
        country: "United States",
        phone: "123-456-7890",
        use_images: true,
        images_path: "https://assets.wildbit.com/postmark/templates/images/",
        use_social_circles: false,
        twitter_url: "https://twitter.com/example",
        facebook_url: "https://facebook.com",
        pinterest_url: "https://pinterest.com",
        instagram_url: "https://instagram.com",
        google_plus_url: "https://google.com",
        youtube_url: "https://youtube.com",
        linkedin_url: "https://linkedin.com"
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
          removeComments: true,
          preserveStyles: true
        },
        files: [{
          expand: true,
          src: [path.dist_html_glob],
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
          host: "<%= var.ftp.host %>",
          port: "<%= var.ftp.port %>",
          username: "<%= secret.ftp.username %>",
          password: "<%= secret.ftp.password %>"
        },
        src: "<%= var.ftp.src %>",
        dest: "<%= var.ftp.dest %>",
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
          { from: '%7B%7B', to: '{{' },
          { from: '%7D%7D', to: '}}' },
          { from: '%7D%7D%22', to: '}}' },
          { from: '%20}}', to: '}}' }
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


    /* Spamcheck
       Sends all of our HTML files through Postmark’s spamcheck API.
       See: https://github.com/derekrushforth/grunt-spamcheck
    ------------------------------------------------- */

    spamcheck: {
      emails: {
        src: [path.dist_html_glob]
      }
    },


    /* Postmark
       Sends test emails through Postmark. Add and remove template targets as needed.
       See: https://github.com/derekrushforth/grunt-postmark
    ------------------------------------------------- */

    postmark: {
      options: {
        serverToken: "<%= secret.postmark.server_token %>", // Add your server token
        from: "<%= var.postmark.from %>", // Add your from address. Must be a valid sender signature.
        to: "<%= var.postmark.to %>",
        subject: "<%= var.postmark.subject %>",
      },
      // run "grunt postmark:welcome" - Sends just the welcome email
      welcome: {
        src: 'dist/welcome.html'
      },
      // run "grunt postmark:emails" - Sends all of the emails. Be careful not to spam PM if you have a bunch of emails.
      emails: {
        src: [path.dist_html_glob]
      },
      // run "grunt postmark:litmus" - Add a litmus test address here.
      litmus: {
        to: '',
        src: [path.dist_html_glob]
      }
    }

  });


  /* Tasks
  ================================================= */

  grunt.registerTask('default', ['css', 'html']);

  // Assets
  grunt.registerTask('html', ['assemble', 'inline', 'premailer', 'replace', 'prettify']);
  grunt.registerTask('css', ['sass', 'autoprefixer']);
  grunt.registerTask('images', ['ftp-deploy']);

  // Testing
  grunt.registerTask('send', ['postmark:emails']);
  grunt.registerTask('spam', ['spamcheck']);
  grunt.registerTask('litmus', ['postmark:litmus']);
};
