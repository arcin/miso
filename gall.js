#!/usr/bin/env node
var https = require('https'),
    githubUser = process.env.GITHUB_USERNAME,
    githubKey = process.env.GITHUB_KEY;

var headers = {
  'User-Agent': 'RepoKit/0.0.1'
};