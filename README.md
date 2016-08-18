# Postmark Emails

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


## Source files
TODO: Descriptions of each directory in `src`.
