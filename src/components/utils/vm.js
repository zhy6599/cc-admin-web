/**
 * 将字符串转换成代码对象
 * @param code 代码
 * @param value 默认值
 * @param params scoped变量，上下文变量，类似全局变量
 */
export function stringToCode(code, value, params) {
  const result = { value, error: null };
  try {
    result.value = new Function('context', `return ${code}`)(params) || value; // eslint-disable-line no-new-func
  } catch (e) {
    result.error = e;
  }
  return result;
}

/**
 * 执行一段字符串格式的函数
 */
export function runFnInVm(code, params, globalParams) {
  const NOOP = (args) => args;
  const result = stringToCode(code, NOOP, globalParams);
  const fn = result.value;
  result.value = params;
  if (result.error) {
    return result;
  }
  if (typeof fn !== 'function') {
    result.error = new Error('非法的js脚本函数');
    return result;
  }
  try {
    result.value = fn.call(fn, params);
  } catch (e) {
    result.error = e;
  }
  return result;
}
