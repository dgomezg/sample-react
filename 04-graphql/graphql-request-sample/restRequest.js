const http = require('http');

var options = {
  host: 'comparo.serveo.net',
  port: 80,
  path: '/o/headless-delivery/v1.0/content-sets/34604/content-set-elements?fields=content.title',
  method: 'GET',
  headers: {
    'Authorization': 'Basic dGVzdEBsaWZlcmF5LmNvbTp0ZXN0' 
 } 
};

http.request(options, function(res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + (typeof chunk));
    console.log(JSON.parse(chunk).items.map(destination => destination.content.title).join(', '));
  });
}).end();


async function getDestinations() {
    const response = await graphQLClient.request(getDestinationsQuery);
    const dests = response.destinations.items.map(destination => destination.title)
    console.log(dests.join(' or '));
    return response
}

