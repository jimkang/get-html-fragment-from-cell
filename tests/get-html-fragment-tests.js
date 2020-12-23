var test = require('tape');
var cells = require('./fixtures/cells');

var lineBreakRegex = /\n/g;
var spaceBetweenTagsRegex = />(\s+)</g;
var getHTMLFragmentFromCell = require('../index');

var testCases = [
  {
    name: 'Basic fragment-making',
    opts: { mediaDir: 'media', baseDir: 'root' },
    cells,
    expectedFragments: [
      '<li class="pane">  <div class="time-stamp entry-meta">    <a href="root/849617236574826497.html">      <time datetime="2017-04-05T13:38:28.000Z">4/5/2017, 9:38:28 AM</time>    </a>  </div>  <video controls loop="true" preload="metadata" src="media/pbDLD37qZWDBGBHW.mp4"></video><div class="media-caption entry-meta">Tv2</div></li>',
      '<li class="pane">  <div class="time-stamp entry-meta">    <a href="root/849617052130213888.html">      <time datetime="2017-04-05T13:37:45.000Z">4/5/2017, 9:37:45 AM</time>    </a>  </div>  <video controls loop="true" preload="metadata" src="media/DPL17ys0-inDTwQW.mp4"></video><div class="media-caption entry-meta"></div></li>',
      '<li class="pane">  <div class="time-stamp entry-meta">    <a href="root/test-archive-image.html">      <time datetime="2019-04-05T13:38:28.000Z">4/5/2019, 9:38:28 AM</time>    </a>  </div>  <img src="media/smidgeo.jpg" alt="It is Smidgeo!"></img><div class="media-caption entry-meta">OK, I am testing a thing.      Here is more text with an image.</div></li>'
    ]
  },
  {
    name: 'Making fragments with modifiers',
    opts: {
      mediaDir: 'media',
      baseDir: 'root',
      modFragmentFn({ cell, innerFragment }) {
        return `${innerFragment}
<a href="https://smidgeo.com/thing/${cell.id}.html">Extra link</a>`;
      }
    },
    cells,
    expectedFragments: [
      '<li class="pane">  <div class="time-stamp entry-meta">    <a href="root/849617236574826497.html">      <time datetime="2017-04-05T13:38:28.000Z">4/5/2017, 9:38:28 AM</time>    </a>  </div>  <video controls loop="true" preload="metadata" src="media/pbDLD37qZWDBGBHW.mp4"></video><div class="media-caption entry-meta">Tv2</div> <a href="https://smidgeo.com/thing/849617236574826497.html">Extra link</a></li>',
      '<li class="pane">  <div class="time-stamp entry-meta">    <a href="root/849617052130213888.html">      <time datetime="2017-04-05T13:37:45.000Z">4/5/2017, 9:37:45 AM</time>    </a>  </div>  <video controls loop="true" preload="metadata" src="media/DPL17ys0-inDTwQW.mp4"></video><div class="media-caption entry-meta"></div><a href="https://smidgeo.com/thing/849617052130213888.html">Extra link</a></li>',
      '<li class="pane">  <div class="time-stamp entry-meta">    <a href="root/test-archive-image.html">      <time datetime="2019-04-05T13:38:28.000Z">4/5/2019, 9:38:28 AM</time>    </a>  </div>  <img src="media/smidgeo.jpg" alt="It is Smidgeo!"></img><div class="media-caption entry-meta">OK, I am testing a thing.      Here is more text with an image.</div><a href="https://smidgeo.com/thing/test-archive-image.html">Extra link</a></li>'
    ]
  }
];

testCases.forEach(runTestSet);

function runTestSet(testCase) {
  testCase.cells.forEach(runTest);

  function runTest(cell, i) {
    test(`${testCase.name} cell ${i}`, cellTest);

    function cellTest(t) {
      checkHTMLFragment(t, getHTMLFragmentFromCell(testCase.opts, cell));
      t.end();
    }

    function checkHTMLFragment(t, fragment) {
      t.equal(
        normalizeFragment(fragment),
        normalizeFragment(testCase.expectedFragments[i]),
        'The html fragment is correct.'
      );
    }
  }
}

function normalizeFragment(s) {
  var withoutBreaks = s.replace(lineBreakRegex, '');

  // How is finding and replacing capture groups not a
  // standard JS thing by now?
  var normalized = '';
  var startIndex = 0;
  var endIndex;
  var match;

  while ((match = spaceBetweenTagsRegex.exec(withoutBreaks)) !== null) {
    endIndex = match.index + 1;
    normalized += withoutBreaks.slice(startIndex, endIndex);
    startIndex = match.index + match[1].length + 1;
  }

  if (startIndex > 0) {
    normalized += withoutBreaks.slice(startIndex);
  }

  return normalized;
}
