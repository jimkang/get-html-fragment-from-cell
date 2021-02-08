var sanitizeHtml = require('sanitize-html');

// Expected from an incoming cell:
// id
// caption
// optional: isVideo
// optional: isAudio
// optional: mediaFilename
// optional: modFragmentFn({ cell, innerFragment }): string
// mediaDir can be a full URL or just a relative path like 'media'.
// baseDir can be a full URL or just a relative path like 'blog' or it can
// be an empty string, the entries should just link to the filename, without
// any path preceding it.
function getHTMLFragmentFromCell(opts = { mediaDir: 'media', baseDir: '', modFragmentFn: null }, cell) {
  var { mediaDir, baseDir } = opts;
  var cellDate = new Date(cell.date);
  var formattedDate = cellDate.toISOString();
  var readableDate = cellDate.toLocaleString();
  const basePath = baseDir ? baseDir + '/' : '';

  var innerFragment = `
  <div class="time-stamp entry-meta">
    <a href="${basePath}${cell.id}.html">
      <time datetime="${formattedDate}">${readableDate}</time>
    </a>
  </div>
  `;

  if (cell.mediaFilename) {
    if (cell.isVideo) {
      innerFragment += `<video controls preload="metadata" src="${mediaDir}/${cell.mediaFilename}"></video>\n`;
    } else if (cell.isAudio) {
      innerFragment += `<audio controls preload="metadata" src="${mediaDir}/${cell.mediaFilename}"></audio>\n`;
    } else {
      const altText = sanitizeHtml(cell.altText || cell.caption, { allowedTags: [], allowedAttributes: []});

      innerFragment += `<img src="${mediaDir}/${
        cell.mediaFilename
      }" alt="${altText}"></img>\n`;
    }
    innerFragment += `<div class="media-caption entry-meta">${cell.caption}</div>`;
  } else {
    innerFragment += `<div class="text-caption">${cell.caption}</div>\n`;
  }

  if (opts.modFragmentFn) {
    innerFragment = opts.modFragmentFn({ cell, innerFragment });
  }

  return `<li class="pane">
    ${innerFragment}
  </li>`;
}

module.exports = getHTMLFragmentFromCell;
