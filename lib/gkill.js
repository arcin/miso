var https = require('https'),
    githubUser = process.env.GITHUB_USERNAME,
    githubKey = process.env.GITHUB_KEY,
    headers, options, logResults, request, requestDestruction;

headers = {
  'Content-Type': 'text/plain',
  'User-Agent': 'RepoKit/0.0.1'
};
options = {
  hostname: 'api.github.com',
  auth: githubUser+':'+githubKey,
  method: 'DELETE',
  headers: headers
};
logResults = function(res){
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

requestDestruction = function (repoName){
  options.path = '/repos/'+githubUser+'/'+repoName;
  request = https.request(options, logResults);
  request.end();
};

module.exports = requestDestruction;