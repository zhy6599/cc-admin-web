import { joinArray } from 'components/utils/index';
// 构建失去焦点需要触发函数列表
export function buildBlurMethod(draw, configMap) {
  const {
    blurFieldMap, calcFieldMap, blurMethodList, calcMethodList, calcListForAdd, optionsList, watchList, dataList, inputMethodList, inputFieldList,
  } = configMap;
  let calcBlurColumnList = [];
  const setValueList = [];
  // 这里判断出当前字段是否会触发计算函数
  Object.keys(calcFieldMap).forEach((key) => {
    const value = calcFieldMap[key];
    calcBlurColumnList = calcBlurColumnList.concat(value);
    if (value.length > 0) {
      // 这说明当前字段是可以触发值计算的。
      if (value.indexOf(draw.vModel) !== -1) {
        setValueList.push(`this.${key}Cacl();`);
      }
    }
  });

  if (blurFieldMap[draw.vModel] || calcBlurColumnList.indexOf(draw.vModel) !== -1) {
    const needSetList = blurFieldMap[draw.vModel];

    calcFieldMap.forEach((value, key, map) => {
      if (value.indexOf(draw.vModel) !== -1) {
        setValueList.push(`this.${key}Cacl();`);
      }
    });
    if (needSetList) {
      needSetList.forEach((needSet) => {
        if (needSet.type === 'sub') {
          const autoLoadData = needSet.autoLoadData ? 'Y' : 'N';
          // 如果是子表初始化，这里应该传子表进去
          setValueList.push(`
          this.$axios.post(\`\${this.url.relatedDataList}?dynFormId=${needSet.relatedForm}&subTable=${needSet.column}&autoLoadData=${autoLoadData}\`, this.form).then(({ result }) => {
              this.${needSet.column}_list = result.map((v) => ({ ${joinArray(needSet.mapperArray, ',', '')} }));
              this.calcDataIndex(this.${needSet.column}_list);
            }).finally(() => {
            });
          `);
          dataList.push(`${needSet.column}_list: []`);
        }
        if (needSet.type === 'related') {
          const autoLoadData = needSet.autoLoadData ? 'Y' : 'N';
          // 如果是普通字段这里也要观察下
          setValueList.push(`
          this.$axios.post(\`\${this.url.relatedDataList}?dynFormId=${needSet.relatedForm}&inputField=${needSet.column}&autoLoadData=${autoLoadData}\`, this.form).then(({ result }) => {
              this.${needSet.column}RelatedDataList = result;
            }).finally(() => {
            });
          `);

          dataList.push(`${needSet.column}RelatedDataList: []`);
          watchList.push(`${needSet.column}RelatedDataList() {
            if (this.${needSet.column}RelatedDataList && this.${needSet.column}RelatedDataList.length === 1) {
              this.form.${needSet.column} = this.${needSet.column}RelatedDataList[0].${needSet.relatedColumn};
            }else {
              this.form.${needSet.column} = '';
            }
          }`);
        }
        if (needSet.type === 'option') {
          setValueList.push(`
          this.$axios.post(\`\${this.url.optionDataList}?dynFormId=${needSet.optionForm}${needSet.subUrl}&inputField=${needSet.column}\`,  this.form).then(({ result }) => {
              if (result && result.length > 0) {
                this.${needSet.column}Options = result.map((m) => ({ label: m.${needSet.optionLabel}, value: m.${needSet.optionValue} }));
                if (result.length === 1) {
                  this.form.${needSet.column} = this.${needSet.column}Options[0].value;
                }
              } else {
                this.${needSet.column}Options = [];
              }
            }).finally(() => {
            });
          `);
        }
      });
    }

    blurMethodList.push(`${draw.vModel}Blur() {
      ${joinArray(setValueList, '', '')}
    }
    `);
  } else if (draw.vModel) {
    blurMethodList.push(`${draw.vModel}Blur() {}`);
  }

  const { logicList } = draw.config;
  if (logicList && logicList.length > 0) {
    const hideFiledList = [];
    logicList.forEach((logic) => {
      if (logic && logic.hideColumnList && logic.hideColumnList.length > 0) {
        logic.hideColumnList.forEach((hide) => {
          const hideField = `if (this.form.${draw.vModel} === '${logic.value}') { this.showForm.${hide} = false; }`;
          hideFiledList.push(hideField);
          // 隐藏所有表单列表
          inputFieldList.push(hideField);
        });
      }
    });
    inputMethodList.push(`${draw.vModel}Input() {
      this.showForm = { ...this.resetShowForm };
      ${joinArray(hideFiledList, '', '')}
    }
    `);
  } else {
    inputMethodList.push(`${draw.vModel}Input() {
    }
    `);
  }

  if (draw.config && draw.config.children && draw.config.children.length > 0) {
    draw.config.children.forEach((child) => { buildBlurMethod(child, configMap); });
  }
}
