/* eslint-disable */
var scriptProperties = PropertiesService.getScriptProperties()
var CLIENT_ID = scriptProperties.getProperty('ghId');
var CLIENT_SECRET = scriptProperties.getProperty('ghSecret');
var API_URL = scriptProperties.getProperty('ghApiUrl');

// configure the service
function getGithubService_() {
  return OAuth2.createService('GitHub')
    .setAuthorizationBaseUrl('https://github.com/login/oauth/authorize')
    .setTokenUrl('https://github.com/login/oauth/access_token')
    .setClientId(CLIENT_ID)
    .setClientSecret(CLIENT_SECRET)
    .setCallbackFunction('authCallback')
    .setPropertyStore(PropertiesService.getUserProperties())
    .setScope('user');
}

// Logs the redict URI to register
// can also get this from File > Project Properties
function logRedirectUri() {
  var service = getGithubService_();
  Logger.log(service.getRedirectUri());
}

// handle the callback
function authCallback(request) {
  var githubService = getGithubService_();
  var isAuthorized = githubService.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this tab');
  }
}

/**
 * getRepository
 * @method getRepository
 * @param  {String} owner
 * @param  {String} repo
 * @return {Object} repository info from github.
 */
function getRepository (owner, repo) {
  var service = getGithubService_();

  if (service.hasAccess()) {
    Logger.log('Access granted');
    var endpoint = API_URL + 'repos/' + owner + '/' + repo;
    var options = {
      headers: {
        Authorization: 'Bearer ' + getGithubService_().getAccessToken(),
        Accept: 'application/vnd.github.v3+json'
      },
      method: 'GET',
      muteHttpExceptions: true
    };

    var response = UrlFetchApp.fetch(endpoint, options);
    return JSON.parse(response.getContentText());
  } else {
    Logger.log("App has no access yet.");

    // open this url to gain authorization from github
    var authorizationUrl = service.getAuthorizationUrl();
    Logger.log("Open the following URL and re-run the script: %s",
        authorizationUrl);
  }
}

/**
 * getPullRequests
 * @method getPullRequests
 * @param  {String} owner
 * @param  {String} repo
 * @return {Object} repository info from github.
 */
function getPullRequests (owner, repo) {
  var service = getGithubService_();

  if (service.hasAccess()) {
    Logger.log('Access granted');
    var endpoint = API_URL + 'repos/' + owner + '/' + repo + '/pulls';
    var options = {
      headers: {
        Authorization: 'Bearer ' + getGithubService_().getAccessToken(),
        Accept: 'application/vnd.github.v3+json'
      },
      method: 'GET',
      muteHttpExceptions: true
    };

    var response = UrlFetchApp.fetch(endpoint, options);
    return JSON.parse(response.getContentText());
  } else {
    Logger.log("App has no access yet.");

    // open this url to gain authorization from github
    var authorizationUrl = service.getAuthorizationUrl();
    Logger.log("Open the following URL and re-run the script: %s",
        authorizationUrl);
  }
}

/**
 * Check Github API limit status
 * @method getGitHubRateLimit
 * @return {[type]}           [description]
 */
function getGitHubRateLimit() {
  // set up the service
  var service = getGithubService_();

  if (service.hasAccess()) {
    Logger.log("App has access.");

    var api = "https://api.github.com/rate_limit";

    var headers = {
      "Authorization": "Bearer " + getGithubService_().getAccessToken(),
      "Accept": "application/vnd.github.v3+json"
    };

    var options = {
      "headers": headers,
      "method" : "GET",
      "muteHttpExceptions": true
    };

    var response = UrlFetchApp.fetch(api, options);

    var json = JSON.parse(response.getContentText());
    var responseCode = response.getResponseCode();

    Logger.log(responseCode);

    Logger.log("You have " + json.rate.remaining + " requests left this hour.");

  }
  else {
    Logger.log("App has no access yet.");

    // open this url to gain authorization from github
    var authorizationUrl = service.getAuthorizationUrl();
    Logger.log("Open the following URL and re-run the script: %s",
        authorizationUrl);
  }
}
