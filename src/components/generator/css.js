const styles = {
  'el-rate': '.el-rate{display: inline-block; vertical-align: text-top;}',
  'el-upload': '.el-uploadtip{line-height: 1.2;}',
};

function addCss(cssList, el) {
  const css = styles[el.config.tag];
  if (css && cssList.indexOf(css) === -1) {
    cssList.push(css);
  }
  if (el.config.children) {
    el.config.children.forEach((el2) => addCss(cssList, el2));
  }
}

export function makeUpCss(conf) {
  const cssList = [];
  conf.drawingList.forEach((el) => addCss(cssList, el));
  return cssList.join('\n');
}
