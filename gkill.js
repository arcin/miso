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

var request = https.request(options, function(res){
  res.setEncoding('utf-8');
  res.on('data', function(chunk){
    console.log('Searching for repo...');
  });

  res.on('end', function(){
    if (res.statusCode === 404) {
      console.log('Repo "'+repoName+'" does not exist!');
    }
    if (res.statusCode === 204) {
      console.log('"'+repoName+'" repo destroyed.');
    }
  });

  res.on('error', function(err){
    console.error(err);
  });
});

request.end();