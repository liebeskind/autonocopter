(function() {
var faye, theImage, faceDetector, imageProcessing;

  faye = new Faye.Client("/faye", {
    timeout: 120, // may need to adjust. If server doesn't send back any data for the given period of time, the client will assume the server has gone away and will attempt to reconnect. Timeout is given in seconds and should be larger than timeout on server side to give the server ample time to respond.
    retry: 2 // may need to adjust. How often the client will try to reconnect if connection to server is lost
  });

  faye.subscribe("/drone/image", function(lastPng) {
    console.log(lastPng);
    theImage = lastPng;
  });

  faceDetector = function() {
// should add test for whether flying
		if (!imageProcessing && lastPng) {
			imageProcessing = true;
			cv.readImage(lastPng, function(err, im){
			  im.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
			    //add test for biggest or a particular face
			    var face;
			    for (var i=0;i<faces.length; i++){
			      face = faces[i]
			      im.ellipse(face.x + face.width/2, face.y + face.height/2, face.width/2, face.height/2);
			    }
			    im.save('./out.jpg');
			  });
			})
		}
  }


}).call(this);