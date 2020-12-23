var test = require('tape');
var { cells, expectedFragments } = require('./fixtures/cases');

var lineBreakRegex = /\n/g;
var spaceBetweenTagsRegex = />(\s+)</g;
var getHTMLFragmentFromCell = require('../index');

cells.forEach(runTest);

function runTest(cell, i) {
  test('getCell test', cellTest);

  function cellTest(t) {
    checkHTMLFragment(
      t,
      getHTMLFragmentFromCell({ mediaDir: 'media', baseDir: 'root' }, cell)
    );
    t.end();

    function checkHTMLFragment(t, fragment) {
      t.equal(
        normalizeFragment(fragment),
        normalizeFragment(expectedFragments[i]),
        'The html fragment is correct.'
      );
    }
  }
}

// How is finding and replacing capture groups not a
// standard JS thing by now?
function normalizeFragment(s) {
  var withoutBreaks = s.replace(lineBreakRegex, '');
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
