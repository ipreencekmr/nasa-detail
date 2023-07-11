const apodResponse = require('./apod.json');
const neoResponse = require('./neo.json');
const mroResponse = require('./mro.json');
const donkiResponse = require('./donki.json');

module.exports = {
  success: [
    {
      request: '/proxy_api/planetary/apod',
      response: {
        contentType: 'application/json',
        status: 200,
        body: apodResponse,
      },
    },
    {
      request: '/proxy_api/neo/rest/v1/feed',
      response: {
        contentType: 'application/json',
        status: 200,
        body: neoResponse,
      },
    },
    {
      request: '/proxy_api/mars-photos/api/v1/rovers/curiosity/photos',
      response: {
        contentType: 'application/json',
        status: 200,
        body: mroResponse,
      },
    },
    {
      request: '/proxy_api/DONKI/notifications',
      response: {
        contentType: 'application/json',
        status: 200,
        body: donkiResponse,
      },
    },
  ],
};
