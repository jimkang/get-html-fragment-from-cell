get-html-fragment-from-cell
==================

Given a [static-web-archive](https://github.com/jimkang/static-web-archive) cell, produces an HTML fragment representation of it.

Installation
------------

Currently only available on [GitHub Packages](https://help.github.com/en/github/managing-packages-with-github-packages/configuring-npm-for-use-with-github-packages#installing-a-package) for now. Add `@jimkang/get-html-fragment-from-cell` to your dependencies in package.json, then run `npm install` if you've already set up your npmrc with GitHub Packages.

Usage
-----

    var getHTMLFragmentFromCell = require('@jimkang/get-html-fragment-from-cell');

    var cell = {
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
    };

    const html = getHTMLFragmentFromCell({ mediaDir: 'media' }, cell);

See [static-web-archive](jimkang/static-web-archive) for stream usage.

License
-------

MIT.
