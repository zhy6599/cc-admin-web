const callbacks = {};

/**
 * 加载一个远程脚本
 * @param {String} src 一个远程脚本
 * @param {Function} callback 回调
 */
function loadScript(src, callback) {
  const existingScript = document.getElementById(src);
  const cb = callback || (() => {});

  function ieOnEnd(script) {
    script.onreadystatechange = () => {
      if (this.readyState !== 'complete' && this.readyState !== 'loaded') return;
      this.onreadystatechange = null;
      callbacks[src].forEach((item) => {
        item(null, script);
      });
      delete callbacks[src];
    };
  }
  function stdOnEnd(script) {
    script.onload = () => {
      this.onerror = null; this.onload = null;
      callbacks[src].forEach((item) => {
        item(null, script);
      });
      delete callbacks[src];
    };
    script.onerror = () => {
      this.onerror = null; this.onload = null;
      cb(new Error(`Failed to load ${src}`), script);
    };
  }

  if (!existingScript) {
    callbacks[src] = [];
    const $script = document.createElement('script');
    $script.src = src;
    $script.id = src;
    $script.async = 1;
    document.body.appendChild($script);
    const onEnd = 'onload' in $script ? stdOnEnd.bind($script) : ieOnEnd.bind($script);
    onEnd($script);
  }

  callbacks[src].push(cb);
}

/**
 * 顺序加载一组远程脚本
 * @param {Array} list 一组远程脚本
 * @param {Function} cb 回调
 */
export function loadScriptQueue(list, cb) {
  const first = list.shift();
  if (list.length) {
    loadScript(first, () => loadScriptQueue(list, cb));
  } else {
    loadScript(first, cb);
  }
}

export default loadScript;
