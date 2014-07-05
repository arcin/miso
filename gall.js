#!/usr/bin/env node
var https = require('https'),
    githubUser = process.env.GITHUB_USERNAME,
    githubKey = process.env.GITHUB_KEY;

var headers = {
  'User-Agent': 'RepoKit/0.0.1'
};

var options = {
  hostname: 'api.github.com',
  path: '/user/repos',
  auth: githubUser+':'+githubKey,
  method: 'GET',
  headers: headers
};

var listRepos = function(res){
  res.setEncoding('utf-8');
};

var request = https.request(options, listRepos);