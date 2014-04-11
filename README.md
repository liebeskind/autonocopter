Description
=======================

Control an AR Drone 2.0 using a Leap Motion / keyboard and display video & control visualization in browser.

How to Fly
=======================

1. Hold hand above Leap Motion controller
2. To takeoff, gesture with your pointer finger as though left clicking a mouse
3. Keeping fingers together as though saluting, move hand right to move drone right, up to move drone up and forward to move drone forward
4. To rotate, make a circle with pointer finger in a clockwise or counterclockwise motion
5. To land, gesture with pointer finger as though left clicking a mouse

Stack
=======================

Node.js for server
Express for web app deployment
Faye for publishing and subscribing between leap, server and drone
Leap.js for converting leap motions into javascript
jQuery for browser displays and accessing keypresses for optional keyboard controls

Installing OpenCV
=======================

You will need to install opencv on your local machine.  This is done most easily by using Homebrew.
brew install opencv

If you get the error "Error: No available formula for opencv", then first run: 
brew tap homebrew/science

If you're still having trouble, try using this guide: http://www.jeffreythompson.org/blog/2013/08/22/update-installing-opencv-on-mac-mountain-lion/

Learn More
=======================

http://wp.me/p2BKrb-4k - Read my blog post about why I did this and what I hope for the future

YouTube Video of Drone in Flight
=======================

http://youtu.be/hfq2SisPvCU

Thanks
=======================

Thanks to @phillipalexander for introducing me to Faye, @felixge for AR-Drone and @bkw for Dronestream