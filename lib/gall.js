var https = require('https'),
    githubUser = process.env.GITHUB_USERNAME,
    githubKey = process.env.GITHUB_KEY,
    headers, options, listRepos, request, requestRepos;

headers = {
  'User-Agent': 'RepoKit/0.0.1'
};

options = {
  hostname: 'api.github.com',
  path: '/user/repos',
  auth: githubUser+':'+githubKey,
  method: 'GET',
  headers: headers
};

listRepos = function(res){
  res.setEncoding('utf-8');
  var chunkyString = '';
  res.on('data', function(chunk){
    chunkyString += chunk;
  });
  res.on('end', function(){
    var repos = JSON.parse(chunkyString);
    for (var i = 0; i < repos.length; i++){
      console.log(repos[i].name);
    }
  });
  res.on('error', function(err){
    console.error(err);
  });
};

requestRepos = function(){
  request = https.request(options, listRepos);
  request.end();
};

module.exports = requestRepos;