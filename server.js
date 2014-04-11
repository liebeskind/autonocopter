  var express, path, drone, server, app, faye, client, leap, controller, pngStream;

  express = require("express");
  path = require("path");
  faye = require('faye');
  drone = require("ar-drone").createClient(); // enables communication with drone in javascript
  pngStream = drone.getPngStream(); //pulls PNGs for image processing
  leap = require('leapjs');
  cv = require('opencv');
  require("dronestream").listen(3001); // for video rendering
  app = express();
  app.configure(function () {
    app.set('port', process.env.PORT || 3000); // process.env.PORT adjusts PORT to accept environmental parameter (ie deploying to Heroku)
    app.use(app.router);  // optimizes performance when put before static, but isn't necessary as express will implicity add.  Putting before static prevents accidentally-named static files from overwriting routes
    app.use(express.static(__dirname + '/public'));  // serves static files from disk
    return app.use("/node_modules", express.static(path.join(__dirname, 'node_modules'))); // adds in jQuery
  });

  server = require('http').createServer(app);
  
  var bayeux = new faye.NodeAdapter({  // central messaging server for clients to communicate with one another; Can also add 'engine' property, which controls backend of the server (ie faye-redis) and 'ping' property, which is how often, in seconds, to send keep-alive ping messages over WebSocket and EventSource connections. Used if Faye server will be accessed through a proxy that kills idle connections.
    mount: '/faye', // path on the host at which the Faye service is available (ie http://localhost:3001/faye).
    timeout: 40  // maximum time to hold connection open before returning response. Given in seconds and must be smaller than timeout on frontend webserver. 
  }); 

  bayeux.attach(server); // attached to server; will handle all requests to paths matching the mount path and delegate all other requests to handlers.

  client = new faye.Client("http://localhost:" + (app.get("port")) + "/faye", {}); // sets up new client at environmental port that accesses the server at the /faye mount 

  client.subscribe("/drone/move", function (d) { // move includes any directional actions
    console.log(d);
    return drone[d.action](d.speed);
  });

  client.subscribe("/drone/drone", function (d) { // drone commands include takeoff and landing
    console.log(d);
      return drone[d.action]();
  });

  pngStream
  .on('error', console.log('error with pngStream'))
  .on("data", function(pngBuffer) {  // requires ffmpeg to be installed, which can be done with HomeBrew
    lastPng = pngBuffer;
    client.publish("/drone/image", "/image/" + (Math.random())); // publishes each image to a randomly generated number
  });

  app.get("/image/:id", function(req, res) {
    res.writeHead(200, {
      "Content-Type": "image/png"
    });
    return res.end(lastPng);
  });

  server.listen(app.get('port'), function () {
    return console.log("Express server listening on port" + app.get("port"));
  })
