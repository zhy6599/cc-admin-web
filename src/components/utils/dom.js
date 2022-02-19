export function appendLink(href, doc = document) {
  const link = doc.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = href;
  link.media = 'all';
  doc.head.appendChild(link);
}

export function appendScriptLink(data, doc = document) {
  const list = !Array.isArray(data) ? [data] : data;
  return Promise.all(list.map((item) => new Promise((resolve) => {
    const script = doc.createElement('script');
    script.type = 'text/javascript';
    script.onload = resolve;
    Object.assign(script, item);
    doc.head.appendChild(script);
  })));
}

export function appendStyle(data, doc = document) {
  const style = doc.createElement('style');
  style.id = Math.random().toString(36).slice(2);
  style.type = 'text/css';
  style.appendChild(doc.createTextNode(data));
  doc.head.appendChild(style);
  return style.id;
}

export function appendScript(data, doc = document) {
  const script = doc.createElement('script');
  script.id = Math.random().toString(36).slice(2);
  script.type = 'text/javascript';
  script.appendChild(doc.createTextNode(data));
  doc.head.appendChild(script);
  return script.id;
}

export function prependDom(data, doc = document) {
  const tag = typeof data === 'string' ? data : data.tag;
  const dom = doc.createElement(tag);
  Object.assign(dom, data);
  doc.body.prepend(dom);
}

export function removeElement(id, doc = document) {
  if (!id) {
    return;
  }
  const ele = doc.getElementById(id);
  if (ele) {
    ele.parentNode.removeChild(ele);
  }
}
