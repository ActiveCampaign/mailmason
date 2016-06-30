# Postmark Emails

## Set up

1) Install node package manager - [https://www.npmjs.org/doc/README.html](https://www.npmjs.org/doc/README.html)

2) Allow account level privileges

```
sudo chown -R `whoami` ~/.npm
```

3) Navigate to project root and install node packages

```
cd ~/your-path/postmark-emails
npm install
```

4) Install the grunt cli package globally

```
npm install -g grunt-cli
```

5) Update caniuse DB

```
npm update caniuse-db
```

6) Create a FTP authentication file
* In the root directory create a file called .ftppass
* Add the code snippet below and fill in the username and password

```
{
  "wildbit": {
    "username": "yourusername",
    "password": "yourpassword"
  }
}
```

## Basic grunt commands

Build all HTML files

```
grunt html
```

_For a full list of tasks check out Gruntfile.js_