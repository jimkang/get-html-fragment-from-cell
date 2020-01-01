// Expected from an incoming cell:
// id
// caption
// optional: isVideo
// optional: mediaFilenamA
// mediaDir can be a full URL or just a relative path like 'media'.
function getHTMLFragmentFromCell(mediaDir, cell) {
  var cellDate = new Date(cell.date);
  var formattedDate = cellDate.toISOString();
  var readableDate = cellDate.toLocaleString();

  var htmlFragment = `<li class="pane">
  <div class="time-stamp entry-meta">
    <a href="${cell.id}.html">
      <time datetime="${formattedDate}">${readableDate}</time>
    </a>
  </div>
  `;

  if (cell.mediaFilename) {
    if (cell.isVideo) {
      htmlFragment += `<video controls loop="true" preload="metadata" src="${mediaDir}/${cell.mediaFilename}"></video>\n`;
    } else {
      htmlFragment += `<img src="${mediaDir}/${
        cell.mediaFilename
      }" alt="${cell.altText || cell.caption}"></img>\n`;
    }
    htmlFragment += `<div class="media-caption entry-meta">${cell.caption}</div>`;
  } else {
    htmlFragment += `<div class="text-caption">${cell.caption}</div>\n`;
  }

  htmlFragment += '</li>';

  return htmlFragment;
}

module.exports = getHTMLFragmentFromCell;
