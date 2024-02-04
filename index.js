var sanitizeHtml = require('sanitize-html');

// Expected from an incoming cell:
// id
// caption
// optional: isVideo
// optional: isAudio
// optional: mediaFilename
// optional: mediaFiles, an array of { filename: string, mimeType?: string, alt?: string } objects.
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

  var mediaFiles = [];
  if (cell.mediaFiles) {
    mediaFiles = cell.mediaFiles.map(mf => typeof mf === 'object' ? mf : typeof mf === 'string' ? { filename: mf } : undefined);
  }
  if (cell.mediaFilenames) {
    mediaFiles = mediaFiles.concat(cell.mediaFilenames.map(filename => typeof filename === 'string' ? { filename } : filename));
  }
  if (cell.mediaFilename) {
    mediaFiles.push({ filename: cell.mediaFilename });
  }

  if (mediaFiles.length > 0) {
    innerFragment += mediaFiles.map(mediaFile => htmlForMediaFile(mediaDir, cell, mediaFile)).join('\n');
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

function htmlForMediaFile(mediaDir, cell, mediaFile) {
  if (typeof mediaFile !== 'object') {
    console.error(new Error(`htmlForMedia cannot work with mediaFile of non-object type ${typeof mediaFile}.`));
    return '<!-- Placeholder for media reference that static-web-archive does not understand. -->\n';
  }
  if ((mediaFile.mimeType && mediaFile.mimeType.startsWith('video/')) || cell.isVideo) {
    return `<video controls preload="metadata" src="${mediaDir}/${mediaFile.filename}"></video>\n`;
  } 
  if ((mediaFile.mimeType && mediaFile.mimeType.startsWith('audio/')) || cell.isAudio) {
    return `<audio controls preload="metadata" src="${mediaDir}/${mediaFile.filename}"></audio>\n`;
  } 
  const altText = sanitizeHtml(mediaFile.alt || cell.altText || cell.caption, { allowedTags: [], allowedAttributes: []});

  return `<img src="${mediaDir}/${mediaFile.filename}" alt="${altText}"></img>\n`;
}

module.exports = getHTMLFragmentFromCell;
