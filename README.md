<img src="http://assets.wildbit.com/wildbit/repos/mailmason/mailmason.png" alt="MailMason" width="148" height="149">

# Mail Mason

**A complete toolset to streamline building and updating a set of consistent transactional emails.**

*Few tasks are more tedious than building a consistent set of well-tested and beautiful transactional email templates for your application.*

Not any longer.

With Build Templates, you can use Grunt, Handlebars, and SCSS to streamline building a consistent set of transactional email templates using layouts and partials to reduce redundancy and create both the HTML and plain text versions of your transactional emails in one fell swoop.

By default, the generated templates use [Mustachio](https://github.com/wildbit/mustachio) for the variable placeholders so that you can easily use them as [Postmark](https://postmarkapp.com) templates. However, the Mustachio pieces are only placeholders, and the generated templates could easily be adapted to work with any email provider.

## What does it do for you?

* [X] Gives you a thoroughly tested and reliable starting point for building consistent email templates
* [X] Uses Handlebars to enable layouts and partials in templates and avoid redundancy
* [X] Enables the use of SCSS for generating the styles
* [X] Automatically inlines the resulting CSS to maximize email client compatibility
* [X] Automatically generates text versions of emails with the same content as the HTML versions
* [X] Enables easy sending of test emails through your Postmark account
* [X] Enables easy batch testing against the [Postmark Spamcheck API](http://spamcheck.postmarkapp.com)
* [X] Enables easy batch testing through [Litmus](http://litmus.com)
* [X] Enables easy uploading of image assets to your CDN so you can include images in your templates (but you don't have to)

## All About MailMason

If you need help getting started or using MailMason, make sure to check out the [MailMason wiki](https://github.com/wildbit/mailmason/wiki).