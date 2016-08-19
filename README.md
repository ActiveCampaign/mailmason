# Postmark Transactional Email Build Templates

**Few tasks are more tedious than building a consistent set of well-tested and beautiful transactional email templates for your application.**

Not any longer.

This repository uses Grunt, Handlebars, and SCSS to build a set of transactional email templates using layouts and partials to reduce redundancy and streamline the process of creating both the HTML and palin text versions of your transactional emails.

By default, the generated templates use [Mustachio](https://github.com/wildbit/mustachio) for the variable placeholders so that you can easily use them as [Postmark](https://postmarkapp.com) templates. However, the Mustachio pieces are only placeholders, and the generated templates could easily be adapted to work with any email provider.

## What does it do for you?

* [X] Uses Handlebars to enable layouts and partials in templates and avoid redundancy
* [X] Enables the use of SCSS for generating the styles
* [X] Automatically inlines the resulting CSS to maximize email client compatibility
* [X] Automatically generates text versions of emails with the same content as the HTML versions
* [X] Enables easy sending of test emails through your Postmark account
* [X] Enables easy batch testing against the [Postmark Spamcheck API](http://spamcheck.postmarkapp.com)
* [X] Enables easy batch testing through [Litmus](http://litmus.com)

## Installation

1) Install [node version manager](https://github.com/creationix/nvm)
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.4/install.sh | bash
```


2) Install and use node version specified from `.nvmrc`.
```bash
nvm install && nvm use
```

3) Install Grunt CLI globally
```bash
npm install -g grunt-cli
```

4) Install local dependencies
```bash
npm install
```

5) Install premailer and nokogiri gems
```bash
gem install premailer
gem install nokogiri
```

6) Get to work.
```bash
npm start
```
Watches the `src` directory for changes and builds to `dist`. 

## Usage

Check out `Gruntfile.js` for more details on how each task works.

### Run specific tasks
In most cases running `npm start` and letting the watcher do the builds for you will get the job done. But sometimes you may need to run granular scripts to just build the HTML or CSS.

```bash
npm run html
npm run css
```

### Send test emails via Postmark
See the [Postmark grunt task](https://github.com/wildbit/postmark-build-templates/blob/master/Gruntfile.js#L194) for more details.

### Spamcheck all the emails
```bash
npm run spamcheck
```
See the [Spamcheck grunt task](https://github.com/wildbit/postmark-build-templates/blob/master/Gruntfile.js#L182) if you’d like to spamcheck specific emails.

### Test emails through Litmus
```bash
npm run litmus
```
See the [Litmus grunt task](https://github.com/wildbit/postmark-build-templates/blob/master/Gruntfile.js#L209) if you’d like to send the emails to Litmus for visual testing.

## Source files

The distribution (`/dist/` folder) is generated from the source files in the `/src` folder. That folder includes several sub-folders with the following folder structure:

```
/src
  /emails - The individual emails that will be generated.
    receipt.hbs
    resetpassword.hbs
    welcome.hbs
  /layouts - The base layouts used for the emails.
    layout.hbs
  /partials - The header, footer, buttons, and other reusable elements.
    button.hbs
    footer.hbs
    masthead.hbs
  /stylesheets - SCSS stylesheets that will be inlined in the emails.
```