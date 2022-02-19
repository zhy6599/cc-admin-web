// 失去交点触发 关联已有数据 和 关联其他表单
export function buildBlurField(draw, configMap) {
  const { blurFieldMap, calcFieldMap } = configMap;
  // 默认值，这里要考虑子表单以及输入项
  if (draw.config.defaultType === 'related') {
    if (draw.config.relatedFilter.length > 0) {
      const columnName = draw.config.tag === 'table' ? `${draw.sub.tableId}` : draw.vModel;
      const multiple = draw.config.tag === 'table' ? true : draw.multiple;
      const type = draw.config.tag === 'table' ? 'sub' : 'related';
      // 子表单还需要把对应关系对应出来
      const mapperArray = [];
      // 如果是子表单，还需要考虑对应关系
      if (draw.config.tag === 'table' && draw.config.relatedColumnList) {
        draw.config.relatedColumnList.forEach((relatedColumn) => {
          mapperArray.push(`${relatedColumn.subColumn}: v.${relatedColumn.column}`);
        });
      }
      const autoLoadData = draw.config.autoLoadData ? 'Y' : 'N';
      draw.config.relatedFilter.forEach((related) => {
        if (related.valueType === 'related') {
          if (!blurFieldMap[related.defaultValue]) {
            blurFieldMap[related.defaultValue] = [];
          }
          // 一个组件发生变化的时候可能会触发多个表单
          blurFieldMap[related.defaultValue].push({
            autoLoadData, type, column: columnName, relatedForm: draw.config.relatedForm, relatedColumn: draw.config.relatedColumn, multiple, mapperArray,
          });
        }
      });
    }
  }
  // 如果本字段是计算字段，那么需要根据表达式，看看本字段是由哪些字段触发的
  if (draw.config.defaultType === 'calc') {
    const { expression } = draw.config;
    if (expression) {
      // 当前字段计算，可能要依赖其他多个列
      calcFieldMap[draw.vModel] = [];
      const list = expression.split('$[');
      for (let i = 0; i < list.length; i += 1) {
        if (i > 0) {
          if (list[i].indexOf(']') > -1) {
            const field = list[i].slice(0, list[i].indexOf(']'));
            if (calcFieldMap[draw.vModel].indexOf(field) === -1) { calcFieldMap[draw.vModel].push(field); }
          }
        }
      }
    }
  }
  // 选择框，关联其他表单
  if (draw.config.optionSourceType === 'form' || draw.config.optionSourceType === 'subForm') {
    const subUrl = draw.config.optionSourceType === 'subForm' ? `&subFormId=${draw.config.optionSubForm}` : '';
    if (draw.config.optionFilter.length > 0) {
      draw.config.optionFilter.forEach((option) => {
        // 数据关联
        if (option.valueType === 'related') {
          if (!blurFieldMap[option.defaultValue]) {
            blurFieldMap[option.defaultValue] = [];
          }
          const { multiple } = draw;
          debugger;
          const autoLoadData = draw.config.autoLoadData ? 'Y' : 'N';
          // 一个组件发生变化的时候可能会触发多个表单
          blurFieldMap[option.defaultValue].push({
            autoLoadData, subUrl, type: 'option', column: draw.vModel, optionForm: draw.config.optionForm, optionValue: draw.config.optionValue, optionLabel: draw.config.optionLabel, multiple,
          });
        }
      });
    }
  }
  if (draw.config && draw.config.children && draw.config.children.length > 0) {
    draw.config.children.forEach((child) => { buildBlurField(child, configMap); });
  }
}
