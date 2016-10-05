<img src="http://assets.wildbit.com/wildbit/repos/mailmason/mailmason.png" alt="MailMason" width="148" height="149">

# MailMason

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

If you need help getting started, this table of contents shoudl help.

* [About](https://github.com/wildbit/mailmason/wiki/About)
  * [What can it do?](https://github.com/wildbit/mailmason/wiki/About#what-can-it-do)
  * [What templates are included?](https://github.com/wildbit/mailmason/wiki/About#what-templates-are-included)
* [Getting Started](https://github.com/wildbit/mailmason/wiki/Getting-Started)
  * [Setup](https://github.com/wildbit/mailmason/wiki/Getting-Started#setup)
  * [Configuration](https://github.com/wildbit/mailmason/wiki/Getting-Started#configuration)
    * [Secrets.json](https://github.com/wildbit/mailmason/wiki/Getting-Started#secretsjson)
    * [Config.json](https://github.com/wildbit/mailmason/wiki/Getting-Started#secretsjson)
    * [Images & Assets](https://github.com/wildbit/mailmason/wiki/Getting-Started#images--assets)
    * [Social Images](https://github.com/wildbit/mailmason/wiki/Getting-Started#social-images)
* [Project Structure](https://github.com/wildbit/mailmason/wiki/Project-Structure)
  * [Emails](https://github.com/wildbit/mailmason/wiki/Project-Structure#emails)
  * [Images](https://github.com/wildbit/mailmason/wiki/Project-Structure#images)
  * [Layouts](https://github.com/wildbit/mailmason/wiki/Project-Structure#layouts)
  * [Partials](https://github.com/wildbit/mailmason/wiki/Project-Structure#partials)
  * [Stylesheets](https://github.com/wildbit/mailmason/wiki/Project-Structure#stylesheets)
* [Usage](https://github.com/wildbit/mailmason/wiki/Usage)
  * [Building](https://github.com/wildbit/mailmason/wiki/Usage#building)
  * [Testing](https://github.com/wildbit/mailmason/wiki/Usage#testing)