# Welcome!

Thanks for thinking about contributing to MailMason. The more the merrier, and we'd love to have your help improving it.

These guidelines are here so we can all be on the same page. They also help ensure that your contribution can be safely and reliably added. In return for following the guidelines, we'll reciprocate in addressing your issue, assessing changes, and helping you finalize your pull requests.

## What types of contributions help?

MailMason is an open source project, and we love to receive contributions from our community — you! There are many ways to contribute, from writing tutorials or blog posts, improving [the documentation](https://github.com/wildbit/mailmason/wiki), submitting [bug reports and feature requests](https://github.com/wildbit/mailmason/issues), or writing code which can be incorporated into MailMason itself.

## Sources for Support

Please, don't use the issue tracker for support questions. Check whether the #MailMason IRC channel on Freenode can help with your issue. If your problem is not strictly MailMason, like debugging custom email templates, you might try Stack Overflow. Campaign Monitor also has some great posts about HTML and CSS support across email clients.

* [Support for CSS](https://www.campaignmonitor.com/css/)
* [Support for HTML](https://www.campaignmonitor.com/blog/email-marketing/2013/08/support-for-html-5-elements-in-email/)

## Code of Conduct

Before getting started, make sure to take a look at our [Code of Conduct](http://contributor-covenant.org/version/1/4/). If you are being harassed, notice that someone else is being harassed, or have any other concerns, please contact a member of the team or email conduct@wildbit.com immediately.

## Quick Overview

Building and testing highly compatible HTML emails is difficult no matter how you slice it. We've done our best to lay out a reliable process for modifying and improving email templates here. Please make sure to consider all of these when creating a pull request.

### Technical and procedural considerations

* Ensure compatibility across email clients for every change that's accepted. We recommend [Litmus](https://litmus.com)
* Ensure that code that goes into core meets all requirements in this checklist: 
* Create [issues](https://github.com/wildbit/mailmason/issues) for any major changes and enhancements that you wish to make. Discuss things transparently and get community feedback.
* Before adding new templates, start out with a feature request issue. We may already have some underway.
* Keep pull requests as atomic as possible, preferably one new feature per pull request.
* Be welcoming to newcomers and encourage diverse new contributors from all backgrounds. See the [Code of Conduct](http://wildbit.com/open-source-code-of-conduct).

### Your First Contribution

Unsure where to begin contributing to MailMason? You can start by looking through these beginner and help-wanted issues:

* [Beginner issues](https://github.com/wildbit/mailmason/labels/beginner) - issues which should only require a few lines of code, and a little testing.
* [Help wanted issues](https://github.com/wildbit/mailmason/labels/help%20wanted) - issues which should be a bit more involved than beginner issues.

Both issue lists are sorted by total number of comments. While not perfect, number of comments is a reasonable proxy for impact a given change will have.

If you've never contributed to open source before, here are a couple of friendly tutorials to start with: [http://makeapullrequest.com/](http://makeapullrequest.com/) and [http://www.firsttimersonly.com/](http://www.firsttimersonly.com/) Or learn how from this *free* series, [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github).

At this point, you're ready to make your changes! Feel free to ask for help; everyone is a beginner at first :smile:

## Getting started

1. Create your own fork of the code
2. Setup your local environment by following [the instructions in the Wiki](https://github.com/wildbit/mailmason/wiki/Getting-Started).
3. Make some great changes in your fork
4. Submit a pull request with a detailed explanation of the change and reasoning.

## How to report a bug

### Reporting security issues

*If you find a security vulnerability, do NOT open an issue. Submit it through our [security form](https://wildbit.wufoo.com/forms/wildbit-security-response/) instead.*

In order to determine whether you are dealing with a security issue, ask yourself these two questions:

* Can I access something that's not mine, or something I shouldn't have access to?
* Can I disable something for other people?

If the answer to either of those two questions are "yes", then you're probably dealing with a security issue. Note that even if you answer "no" to both questions, you may still be dealing with a security issue, so if you're unsure, go ahead and submit it.

### Reporting a bug or rendering issue

When filing an issue, make sure to answer these five questions:

* If it's a rendering issue in an email client, make sure to say which client. (And include a Litmus link if you can.)
  [] Email Client & Version
  [] Include a screenshot or link to the results of a Litmus test
* If it's a bug in the MailMason Grunt process
  [] Include the error message if you saw one
  [] Try to include the relevant code that seems to be causing the error
  [] What did you see instead?

### Suggesting a feature or enhancement

While we don't have an active roadmap, we do have plans to add new templates. When we do, they're researched heavily, and we write guides that cover best practices for that type of email. Here's our current templates roadmap:

* Simple Alert Notification
* Charge Failure
* Dunning & Expired Credit Card 
* Account Updated
* Cart Abandonment
* Order Confirmation
* Shipping Confirmation
* Refund Notification

The philosophy behind MailMason is primarily to make it easier to develop consistent and well-tested batches of emails for Postmark. We use it internally to manage [Postmark's templates](https://postmarkapp.com/why/templates), but it's also great for folks that want to create their own batches of templates. If you'd like to make a feature request, please consider how it fits into the larger vision for MailMason.

### Explain your desired process for suggesting a feature.

If you find yourself wishing for a feature that doesn't exist currently, you are probably not alone. There are bound to be others out there with similar needs. Open an issue on our issues list on GitHub which describes the feature you would like to see, why you need it, and how it should work. That way, we can discuss it int he open and determine whether it's a good fit for MailMason.

### Code review process

The team looks at Pull Requests on a regular basis, and we'll add notes to the pull requests if they require any changes. After feedback has been given we expect responses within two weeks. After two weeks we may close the pull request if it isn't showing any activity.