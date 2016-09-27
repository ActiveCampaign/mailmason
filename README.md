# MailMason

**A complete toolset to streamline building and updating a set of consistent transactional emails.**

*Few tasks are more tedious than building a consistent set of well-tested and beautiful transactional email templates for your application.*

Not any longer.

With Build Templates, you can use Grunt, Handlebars, and SCSS to streamline building a consistent set of transactional email templates using layouts and partials to reduce redundancy and create both the HTML and palin text versions of your transactional emails in one fell swoop.

By default, the generated templates use [Mustachio](https://github.com/wildbit/mustachio) for the variable placeholders so that you can easily use them as [Postmark](https://postmarkapp.com) templates. However, the Mustachio pieces are only placeholders, and the generated templates could easily be adapted to work with any email provider.

## What does it do for you?

* [X] Uses Handlebars to enable layouts and partials in templates and avoid redundancy
* [X] Enables the use of SCSS for generating the styles
* [X] Automatically inlines the resulting CSS to maximize email client compatibility
* [X] Automatically generates text versions of emails with the same content as the HTML versions
* [X] Enables easy sending of test emails through your Postmark account
* [X] Enables easy batch testing against the [Postmark Spamcheck API](http://spamcheck.postmarkapp.com)
* [X] Enables easy batch testing through [Litmus](http://litmus.com)

## Included Templates

You can find the included templates as Handlebars (.hbs) files in the `/src/emails` folder. Each of these templates is based off of the advice in our thoroughly researched [Postmark Guides](https://postmarkapp.com/guides). 

1. **Example** A base template designed only to showcase the available elements in the emails and to make it easy to test all of the styles from a single email.
1. **Welcome** A traditional welcome email when someone new creates an account on your service.
1. **User Invitation** A modified version of the welcome email that's designed when one of your existing users invites a new user, who may not be familiar with your product, to join the product and collaborate.
1. **Invoice** An email requesting payment for a sale.
1. **Receipt** An email acknowledging payment for a sale.
1. **Reset Password** An email including a link for the recipient to securely change their password.
1. **Reset Password Alt** An email sent to email addresses when they do not exist in the system. YOu can read [Everything you ever wanted to know about building a secure password reset feature](https://www.troyhunt.com/everything-you-ever-wanted-to-know/)For more detailed information on this approach.
1. **Trial Expiring** A notification sent in advance of a trial expiring so that a user can take action to avoid an interuption in service.
1. **Trial Expired** A notification sent after a trial expired providing the recipient with assurances about their data and offering options for next steps.
1. **Comment Notification** A simple notification that a comment has been made or an action taken.

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

## Configuration

There are two primary configuration files for MailMason: `secrets.json` and `config.json`. By default these files are ignored using `.gitignore`. Examples of these files are included at `example_secrets.json` and `example_config.json`. You can copy these files and rename them to create your own. The specific secrets and configurable values are documented within these files.

If you project is shared among team members, you may want to to update your `.gitignore` to recognize `config.json` so that each member of your team isn't forced to recreate it.

### About Assets (i.e. images)

Postmark doesn't currently provide hosting for images in templates. (It's on our roadmap, though.) So for the time being, if you'd like your emails to use images, you'll need to host these assets somewhere publicly available.

## Usage

The repository includes some automation to help with building and testing. 

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
    comment_notification.hbs
    example.hbs
    invoice.hbs
    receipt.hbs
    reset_password.hbs
    reset_password_alt.hbs
    trial_expired.hbs
    trial_expiring.hbs
    user_inivitation.hbs
    welcome.hbs
  /layouts - The base layouts used for the emails.
    layout.hbs
  /partials - The header, footer, buttons, and other reusable elements.
    button.hbs
    footer.hbs
    masthead.hbs
  /stylesheets - SCSS stylesheets that will be inlined in the emails.
```