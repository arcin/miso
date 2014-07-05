#!/usr/bin/env node
var https = require('https'),
    repoName = process.argv[2],
    githubUser = process.env.GITHUB_USERNAME,
    githubKey = process.env.GITHUB_KEY;

var headers = {
  'Content-Type': 'text/plain',
  'User-Agent': 'RepoKit/0.0.1'
};
var options = {
  hostname: 'api.github.com',
  path: '/repos/'+githubUser+'/'+repoName,
  auth: githubUser+':'+githubKey,
  method: 'DELETE',
  headers: headers
};