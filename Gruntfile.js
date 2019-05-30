module.exports = function(grunt) {
  const sass = require('node-sass')
  require('load-grunt-tasks')(grunt, { pattern: ['grunt-*', 'assemble'] })
  require('time-grunt')(grunt)
  grunt.loadNpmTasks('grunt-ftp-deploy')

  const path = {
    css_src: 'src/stylesheets/',
    dist: 'dist/',
    dist_test: 'dist_test/',
    dist_html_glob: 'dist/templates/**/*.html',
    dist_text_glob: 'dist/templates/**/*.txt',
    dist_test_html_glob: 'dist_test/*.html',
    templates: 'src/templates/',
    layouts: 'src/layouts/',
    partials: 'src/partials/',
    images_src: 'src/images',
  }

  /* Configuration
  ================================================= */

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /* secrets.json and config.json simplify variable management to keep the
       common changes centralized to key files instead of being littered
       throughout the Gruntfile. This also makes it easy to .gitignore secrets
    ================================================= */
    secret: grunt.file.exists('secrets.json')
      ? grunt.file.readJSON('secrets.json')
      : {},
    config: grunt.file.readJSON('config.json'),

    /* SASS
    ------------------------------------------------- */

    sass: {
      options: {
        implementation: sass,
      },
      styles: {
        expand: true,
        cwd: path.css_src,
        ext: '.css',
        src: ['*.scss'],
        dest: `${path.dist}styles/`,
      },
    },

    /* Autoprefixer
    ------------------------------------------------- */

    autoprefixer: {
      options: {
        browsers: ['last 6 versions', 'ie >= 9'],
      },
      styles: {
        expand: true,
        cwd: `${path.dist}styles/`,
        ext: '.css',
        src: ['*.css'],
        dest: `${path.dist}styles/`,
      },
    },

    /* Assemble
       Assembles our handlebars templates. Documentation might be incompatible since the latest version uses an entirely different build system.
       See: https://github.com/assemble/assemble/
    ------------------------------------------------- */

    assemble: {
      options: {
        layoutdir: path.layouts,
        partials: `${path.partials}*.hbs`,
        flatten: true,
        sender_name: '<%= config.strings.sender_name %>',
        product_name: '<%= config.strings.product_name %>',
        product_url: '<%= config.strings.product_url %>',
        credit_card_statement_name:
          '<%= config.strings.credit_card_statement_name %>',
        formal_company_name: '<%= config.strings.formal_company_name %>',
        address_line_1: '<%= config.strings.address_line_1 %>',
        address_line_2: '<%= config.strings.address_line_2 %>',
        city: '<%= config.strings.city %>',
        state: '<%= config.strings.state %>',
        country: '<%= config.strings.country %>',
        phone: '<%= config.strings.phone %>',
        images_url: '<%= config.images.images_url %>',
        use_images: '<%= config.images.use_images %>',
        logo_file: '<%= config.images.logo_file %>',
        logo_width: '<%= config.images.logo_width %>',
        use_social_circles: '<%= config.images.use_social_circles %>',
        twitter_url: '<%= config.images.twitter_url %>',
        facebook_url: '<%= config.images.facebook_url %>',
        pinterest_url: '<%= config.images.pinterest_url %>',
        instagram_url: '<%= config.images.instagram_url %>',
        dribbble_url: '<%= config.images.dribbble_url %>',
        google_plus_url: '<%= config.images.google_plus_url %>',
        youtube_url: '<%= config.images.youtube_url %>',
        linkedin_url: '<%= config.images.linkedin_url %>',
      },
      all: {
        expand: true,
        cwd: 'src/',
        ext: '.hbs',
        src: ['templates/**/*.hbs', 'layouts/**/*.hbs'],
        dest: path.dist,
      },
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
        src: ['**/*.html'],
        dest: path.dist,
      },
    },

    /* Prettify
       Formats our template HTML files.
       See: https://github.com/jonschlinkert/grunt-prettify
    ------------------------------------------------- */

    prettify: {
      html: {
        expand: true,
        cwd: path.dist,
        ext: '.html',
        src: ['**/*.html'],
        dest: path.dist,
      },
    },

    /* Premailer
       Adds all sorts of email magic. Adds inline styles to each element based off class. Also generates plain text versions and allows us to control commonly used table attributes via CSS.
       See: https://github.com/dwightjack/grunt-premailer
    ------------------------------------------------- */

    premailer: {
      options: {
        warnLevel: 'none',
      },
      html: {
        options: {
          removeComments: true,
        },
        files: [
          {
            expand: true,
            src: [path.dist_test_html_glob],
            dest: '',
          },
        ],
      },
      txt: {
        options: {
          mode: 'txt',
          lineLength: 16384,
        },
        files: [
          {
            expand: true,
            src: [path.dist_html_glob],
            dest: '',
            ext: '.txt',
          },
        ],
      },
    },

    'ftp-deploy': {
      build: {
        auth: {
          host: '<%= config.ftp.host %>',
          port: '<%= config.ftp.port %>',
          username: '<%= secret.ftp.username %>',
          password: '<%= secret.ftp.password %>',
        },
        src: '<%= config.ftp.src %>',
        dest: '<%= config.ftp.dest %>',
        exclusions: [
          'path/to/source/folder/**/.DS_Store',
          'path/to/source/folder/**/Thumbs.db',
        ],
      },
    },

    /* S3
       Pushes image assets to an Amazon S3 bucket.
       See: https://github.com/jpillora/grunt-aws
    ------------------------------------------------- */

    s3: {
      options: {
        accessKeyId: '<%= secret.s3.access_key_id %>',
        secretAccessKey: '<%= secret.s3.secret_access_key %>',
        bucket: '<%= config.s3.bucket %>',
        region: '<%= config.s3.region %>',
        overwrite: '<%= config.s3.overwrite %>',
      },
      build: {
        cwd: path.images_src,
        src: '**',
      },
    },

    /* Watch
       Watches all files in the src directory for changes.
    ------------------------------------------------- */

    watch: {
      options: {
        livereload: true,
      },
      files: ['src/**/*'],
      tasks: ['default'],
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
          { from: '{{%20', to: '{{ ' },
        ],
      },
      // Add some additional attributes that grunt inline removed
      styleBlock: {
        src: [path.dist_html_glob],
        overwrite: true,
        replacements: [
          {
            from: '<style>',
            to: '<style type="text/css" rel="stylesheet" media="all">',
          },
        ],
      },
    },

    /* Copy
       This is mainly used to copy compiled templates to a new directory for the CSS to be inlined before being tested.
       See: https://github.com/gruntjs/grunt-contrib-copy
     ------------------------------------------------- */

    copy: {
      metadata: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: ['**/meta.json'],
            dest: path.dist,
          },
        ],
      },
      testTemplates: {
        files: [
          {
            expand: true,
            src: [path.dist_html_glob],
            dest: path.dist_test,
            flatten: true,
          },
        ],
      },
    },

    /* Spamcheck
       Sends all of our HTML files through Postmark’s spamcheck API.
       See: https://github.com/wildbit/grunt-spamcheck
    ------------------------------------------------- */

    spamcheck: {
      emails: {
        src: [path.dist_html_glob],
      },
    },

    /* Postmark
       Sends test emails through Postmark. Add and remove template targets as needed.
       Ensure that the CSS is always inlined before sending tests. This can be done with the 'testBuild' task below.
       See: https://github.com/wildbit/grunt-postmark
    ------------------------------------------------- */

    postmark: {
      options: {
        serverToken: '<%= secret.postmark.server_token %>',
        from: '<%= config.postmark.from %>',
        to: '<%= config.postmark.to %>',
        subject: '<%= config.postmark.subject %>',
      },
      // run "grunt postmark:welcome" - Sends just the welcome email
      welcome: {
        src: 'dist_test/welcome.html',
      },
      // run "npm run flood" - Sends all of the emails. Be careful not to spam PM if you have a bunch of emails.
      flood: {
        src: [path.dist_test_html_glob],
      },
      // run "npm run litmus" - Add a litmus test address here.
      litmus: {
        to: '<%= config.strings.litmus_email %>',
        src: 'dist_test/user_invitation.html',
      },
    },
  })

  /* Tasks
  ================================================= */

  grunt.registerTask('default', ['css', 'html'])

  // Assets
  grunt.registerTask('html', [
    'assemble',
    'inline',
    'premailer:txt',
    'replace',
    'prettify',
    'copy:metadata',
  ])
  grunt.registerTask('css', ['sass', 'autoprefixer'])
  grunt.registerTask('images-ftp', ['ftp-deploy'])
  grunt.registerTask('images-s3', ['s3'])

  // Testing
  grunt.registerTask('spam', ['spamcheck'])
  grunt.registerTask('litmus', ['testBuild', 'postmark:litmus'])
  grunt.registerTask('flood', ['testBuild', 'postmark:flood'])

  // Before sending tests via Postmark, ensure that test builds with inlined CSS are generated
  grunt.registerTask('testBuild', [
    'default',
    'copy:testTemplates',
    'premailer:html',
  ])
}
