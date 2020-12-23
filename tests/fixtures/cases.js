/* global __dirname */

var fs = require('fs');

var smidgeoBuffer = fs.readFileSync(__dirname + '/smidgeo_headshot.jpg', {
  encoding: null
});

var cells = [
  {
    id: '849617236574826497',
    caption: 'Tv2',
    date: 'Wed Apr 05 13:38:28 +0000 2017',
    isVideo: true,
    videoBufferInfo: {
      bitrate: 832000,
      content_type: 'video/mp4',
      url:
        'http://jimkang.com/static-web-archive/tests/fixtures/videos/pbDLD37qZWDBGBHW.mp4'
    },
    postedToGit: true,
    mediaFilename: 'pbDLD37qZWDBGBHW.mp4'
  },
  {
    id: '849617052130213888',
    caption: '',
    date: 'Wed Apr 05 13:37:45 +0000 2017',
    isVideo: true,
    videoBufferInfo: {
      bitrate: 832000,
      content_type: 'video/mp4',
      url:
        'http://jimkang.com/static-web-archive/tests/fixtures/videos/DPL17ys0-inDTwQW.mp4'
    },
    postedToGit: true,
    mediaFilename: 'DPL17ys0-inDTwQW.mp4'
  },
  {
    id: 'test-archive-image',
    date: 'Wed Apr 05 13:38:28 +0000 2019',
    caption: `OK, I am testing a thing.

      Here is more text with an image.`,
    mediaFilename: 'smidgeo.jpg',
    altText: 'It is <a href="https://smidgeo.com">Smidgeo</a>!',
    buffer: smidgeoBuffer,
    postedToGit: true
  }
];

var expectedFragments = [
  '<li class="pane">  <div class="time-stamp entry-meta">    <a href="root/849617236574826497.html">      <time datetime="2017-04-05T13:38:28.000Z">4/5/2017, 9:38:28 AM</time>    </a>  </div>  <video controls loop="true" preload="metadata" src="media/pbDLD37qZWDBGBHW.mp4"></video><div class="media-caption entry-meta">Tv2</div></li>',
  '<li class="pane">  <div class="time-stamp entry-meta">    <a href="root/849617052130213888.html">      <time datetime="2017-04-05T13:37:45.000Z">4/5/2017, 9:37:45 AM</time>    </a>  </div>  <video controls loop="true" preload="metadata" src="media/DPL17ys0-inDTwQW.mp4"></video><div class="media-caption entry-meta"></div></li>',
  '<li class="pane">  <div class="time-stamp entry-meta">    <a href="root/test-archive-image.html">      <time datetime="2019-04-05T13:38:28.000Z">4/5/2019, 9:38:28 AM</time>    </a>  </div>  <img src="media/smidgeo.jpg" alt="It is Smidgeo!"></img><div class="media-caption entry-meta">OK, I am testing a thing.      Here is more text with an image.</div></li>'
];

module.exports = { cells, expectedFragments };
