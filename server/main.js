import { Meteor } from 'meteor/meteor';
import {WebApp} from 'meteor/webapp';

import { Links } from '../imports/api/links';
import '../imports/api/users';
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {

  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({ _id });

    if (link) {
      res.statusCode = 307;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }
  });
  // Temporary Middleware
  // WebApp.connectHandlers.use((req, res, next) => {
  //   console.log('This is my custom middleware');
  //   console.log(req.url, req.method, req.headers, req.query);
  //   // Set HTTP status code
  //   // res.statusCode = 404;
  //   // Set HTTP Headers
  //   // res.setHeader('my-custom-header', 'Tim was here');
  //   // Override HTTP Body
  //   // res.write('<h1>This is my middleware at work</h1>');
  //   // End HTTP Request
  //   // res.end();
  //
  //   next();
  // });
});
