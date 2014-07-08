var https = require('https'),
    exec = require('child_process').exec,
    githubUser = process.env.GITHUB_USERNAME,
    githubKey = process.env.GITHUB_KEY,
    create, destroy;


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

// repo destruction
destroy = {};
destroy.headers = {
  'Content-Type': 'text/plain',
  'User-Agent': 'RepoKit/0.0.1'
};
destroy.options = {
  hostname: 'api.github.com',
  auth: githubUser+':'+githubKey,
  method: 'DELETE',
  headers: destroy.headers
};
destroy.handler = function(res){
  res.setEncoding('utf-8');
  res.on('data', function(chunk){
    console.log('Searching for repo...');
  });

  res.on('end', function(){
    if (res.statusCode === 404) {
      console.log('Repo does not exist!');
    }
    if (res.statusCode === 204) {
      console.log('Repo destroyed.');
    }
  });

  res.on('error', function(err){
    console.error(err);
  });
};

destroy.repoDestruction = function (repoName){
  destroy.options.path = '/repos/'+githubUser+'/'+repoName;
  request = https.request(destroy.options, destroy.handler);
  request.end();
};

module.exports.create = create.repoCreation;
module.exports.destroy = destroy.repoDestruction;
