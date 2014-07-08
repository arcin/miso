var https = require('https'),
    exec = require('child_process').exec,
    githubUser = process.env.GITHUB_USERNAME,
    githubKey = process.env.GITHUB_KEY,
    jsonData, headers, options,request,
    creationHandler, requestCreation;

headers = {
  'User-Agent': 'RepoKit/0.0.1',
  'Content-Type': 'application/json'
};

options = {
  hostname: 'api.github.com',
  path: '/user/repos',
  method: 'POST',
  auth: githubUser+':'+githubKey,
  headers: headers
};

creationHandler = function(res){
  res.setEncoding('utf-8');
  var repoData = '';

  res.on('data', function(chunk){
    repoData += chunk;
  });
  res.on('end', function(){
    var finalResponse = JSON.parse(repoData);
    exec('git init && git remote add origin '+finalResponse.clone_url);
    console.log('Repo successfully created and connected.');
  });
  res.on('error', function(err){
    console.error(err);
  });
};

requestCreation = function(repoName){
  jsonData = JSON.stringify({ name: repoName });
  options.headers['Content-Length'] = jsonData.length;

  request = https.request(options, creationHandler);
  request.write(jsonData);
  request.end();
};

module.exports = requestCreation;