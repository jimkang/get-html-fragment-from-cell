var cells = [
  {
    id: '849617236574826497',
    caption: 'Tv2',
    date: 'Wed Apr 05 13:38:28 +0000 2017',
    isVideo: true,
    mediaFilename: 'pbDLD37qZWDBGBHW.mp4',
  },
  {
    id: '849617052130213888',
    caption: '',
    date: 'Wed Apr 05 13:37:45 +0000 2017',
    isVideo: true,
    mediaFilename: 'DPL17ys0-inDTwQW.mp4',
  },
  {
    id: 'test-archive-image',
    date: 'Wed Apr 05 13:38:28 +0000 2019',
    caption: `OK, I am testing a thing.

      Here is more text with an image.`,
    mediaFilename: 'smidgeo.jpg',
    altText: 'It is <a href="https://smidgeo.com">Smidgeo</a>!',
  }
];

var multimediaCells = [
  {
    id: '849617236574826497mm',
    caption: 'Two videos',
    date: 'Wed Apr 05 13:38:28 +0000 2017',
    isVideo: true,
    mediaFilenames: ['pbDLD37qZWDBGBHW.mp4', 'DPL17ys0-inDTwQW.mp4']
  },
  {
    id: 'test-archive-image',
    date: 'Wed Apr 05 13:38:28 +0000 2019',
    caption: `OK, I am testing two things.

      Here is more text with two images and a video.`,
    mediaFiles: [{ filename: 'smidgeo.jpg', alt: 'Smidgeo with tie' }, { filename: 'smidgeo-promise.mp4', mimeType: 'video/mp4' }, 'smallcatlabs.png'],
    altText: 'It is <a href="https://smidgeo.com">Smidgeo</a>!',
  }
];

module.exports = { cells, multimediaCells };
