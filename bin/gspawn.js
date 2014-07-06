#!/usr/bin/env node
var https = require('https'),
    exec = require('child_process').exec,
    repoName = process.argv[2],
    githubUser = process.env.GITHUB_USERNAME,
    githubKey = process.env.GITHUB_KEY,
    jsonData, headers, options, repoCreator, request;

jsonData = JSON.stringify({ name: repoName });

headers = {
  'User-Agent': 'RepoKit/0.0.1',
  'Content-Type': 'application/json',
  'Content-Length': jsonData.length
};

options = {
  hostname: 'api.github.com',
  path: '/user/repos',
  method: 'POST',
  auth: githubUser+':'+githubKey,
  headers: headers
};

repoCreator = function(res){
  res.setEncoding('utf-8');
  var chunkyString = '';

  res.on('data', function(chunk){
    chunkyString += chunk;
  });
  res.on('end', function(){
    var finalResponse = JSON.parse(chunkyString);
    exec('git init && git remote add origin '+finalResponse.clone_url);
    console.log(""+repoName+""+' repo successfully created and connected.');
  });
  res.on('error', function(err){
    console.error(err);
  });
};

request = https.request(options, repoCreator);
request.write(jsonData);
request.end();