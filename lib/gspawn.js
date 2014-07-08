var https = require('https'),
    exec = require('child_process').exec,
    githubUser = process.env.GITHUB_USERNAME,
    githubKey = process.env.GITHUB_KEY,
    create;


// repo creation
create = {};
create.headers = {
  'User-Agent': 'RepoKit/0.0.1',
  'Content-Type': 'application/json'
};

create.options = {
  hostname: 'api.github.com',
  path: '/user/repos',
  method: 'POST',
  auth: githubUser+':'+githubKey,
  headers: create.headers
};

create.handler = function(res){
  var repoData, finalResponse;
  res.setEncoding('utf-8');
  repoData = '';

  res.on('data', function(chunk){
    repoData += chunk;
  });
  res.on('end', function(){
    finalResponse = JSON.parse(repoData);
    exec('git init && git remote add origin '+finalResponse.clone_url);
    console.log('Repo successfully created and connected.');
  });
  res.on('error', function(err){
    console.error(err);
  });
};

create.repoCreation = function(repoName){
  var jsonData, request;

  jsonData = JSON.stringify({ name: repoName });
  create.options.headers['Content-Length'] = jsonData.length;

  request = https.request(create.options, create.handler);
  request.write(jsonData);
  request.end();
};


module.exports.create = create.repoCreation;
