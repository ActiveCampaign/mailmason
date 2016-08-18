# Postmark Emails

## Installation

1. Install [node version manager](https://github.com/creationix/nvm)
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.4/install.sh | bash
```


1. Install and use node version specified from `.nvmrc`.
```bash
nvm install && nvm use
```

1. Install the grunt CLI globally
```bash
npm install -g grunt-cli
```

1. Install premailer and nokogiri gems
```bash
gem install premailer
gem install nokogiri
```

1. Get to work.
```bash
npm start
```
Watches the `src` directory for changes and builds to `dist`. 


## Usage

Check out `Gruntfile.js` for more details on how each task works.

#### Run specific tasks
In most cases running `npm start` and letting the watcher do the builds for you will get the job done. But sometimes you may want to run granular scripts to build just the HTML or CSS.

```bash
npm run html
npm run css
```

#### Send test emails via Postmark
See the [Postmark grunt task](https://github.com/wildbit/postmark-build-templates/blob/master/Gruntfile.js#L59) for more details.

#### Spamcheck all the emails
```bash
npm run spamcheck
```
See the [Spamcheck grunt task](https://github.com/wildbit/postmark-build-templates/blob/master/Gruntfile.js#L59) for more details.


## Source files
TODO: Descriptions of each directory in `src`.