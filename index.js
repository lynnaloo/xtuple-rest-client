var fs = require('fs'),
  googleapis = require('googleapis-plus'),
  dotenv = require('dotenv'),
  jwt,
  host,
  baseUrl,
  database,
  api;

// load environment variables
dotenv.load();

// setup the base url
database = process.env.DATABASE;
host = 'https://' + process.env.APPLICATION_HOST;
if (process.env.APPLICATION_PORT) {
  host = host + ':' + process.env.APPLICATION_PORT;
}
baseUrl = host + '/' + database;

var restclient = module.exports = function (callback) {

  /**
   * The JWT authorization is ideal for performing server-to-server
   * communication without asking for user consent.
   */
  jwt = new googleapis.auth.JWT(
    //email, keyFile, key, scopes, person, audience, host, path, port, grant
    process.env.CLIENTID,
    process.env.PRIVATE_KEY_PATH,
    process.env.PRIVATE_KEY,
    // make sure this is an array
    [baseUrl + '/auth/' + database],
    process.env.USERNAME,
    baseUrl + '/oauth/token',
    process.env.APPLICATION_HOST,
    '/' + database + '/oauth/token',
    process.env.APPLICATION_PORT,
    'assertion'
  );

  // Don't specify a name because xTuple discovery url does not include it
  googleapis.discover('', 'v1alpha1',
    {baseDiscoveryUrl: baseUrl + '/discovery/v1alpha1/apis'}
  ).execute(function(err, client) {

    api = client;

    if (err) {
      console.log('Problem during the client discovery:', err);
      return;
    }

    jwt.authorize(function(err, result) {
      if (err) {
        console.log('Problem during the authorization:', err);
        return;
      }
      restclient.token = result.access_token;
      callback(restclient);
    });
  });
};

/**
  Query to the REST Api
 */
restclient.query = function (options) {
  api[database][options.type][options.method](options.params)
  .withAuthClient(jwt)
  .execute(options.callback);
};
