var https = require('https'),
    exec = require('child_process').exec,
    githubUser = process.env.GITHUB_USERNAME,
    githubKey = process.env.GITHUB_TOKEN,
    logger = require('./logger'),
    _util = require('./utils'),
    generalResponseHandler = _util.generalResponseHandler,
    create, destroy, list;


// repo creation
create = {};
create.headers = {
  'User-Agent': 'miso/0.1.2',
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
    logger.success('Repo successfully created and connected.');
  });
  res.on('error', function(err){
    logger.error(err);
  });
};

create.requestCreation = function(repoName){
  var jsonData, request;

  jsonData = JSON.stringify({ name: repoName });
  create.options.headers['Content-Length'] = jsonData.length;

  request = https.request(create.options, function (res) {
    generalResponseHandler(res, create.handler);
  });
  request.write(jsonData);
  request.end();
};

// repo destruction
destroy = {};
destroy.headers = {
  'Content-Type': 'text/plain',
  'User-Agent': 'miso/0.1.2',
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
  });

  res.on('end', function(){
    if (res.statusCode === 404) logger.error('Repository does not exist!');
    if (res.statusCode === 204) logger.success('Repo destroyed.');
  });

  res.on('error', function(err){
    logger.error(err);
  });
};

destroy.requestDestruction = function (repoName){
  var request;
  destroy.options.path = '/repos/'+githubUser+'/'+repoName;
  request = https.request(destroy.options, function (res) {
    generalResponseHandler(res, destroy.handler);
  });
  request.end();
};

// repo list
list = {};
list.headers = {
  'User-Agent': 'miso/0.1.2',
};

list.options = {
  hostname: 'api.github.com',
  path: '/user/repos',
  auth: githubUser+':'+githubKey,
  method: 'GET',
  headers: list.headers
};

list.handler = function(res){
  var repoListData, repoList;
  res.setEncoding('utf-8');
  repoListData = '';

  res.on('data', function(chunk){
    repoListData += chunk;
  });
  res.on('end', function(){
    repoList = JSON.parse(repoListData);
    for (var i = 0; i < repoList.length; i++){
      logger.result(repoList[i].name);
    }
  });
  res.on('error', function(err){
    logger.error(err);
  });
};

list.requestList = function(){
  var request;
  request = https.request(list.options, function(res) {
    generalResponseHandler(res, list.handler);
    list.handler
  });
  request.end();
};

module.exports.create = create.requestCreation;
module.exports.destroy = destroy.requestDestruction;
module.exports.list = list.requestList;
