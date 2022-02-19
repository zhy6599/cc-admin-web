// 初衷是将不同类型的处理分开便于维护
export function buildOptions(draw, configMap) {
  if (draw.options && draw.vModel) {
    const { options } = draw;
    const str = `${draw.vModel}Options: ${JSON.stringify(options)}`;
    configMap.optionsList.push(str);
    if (draw.config.optionSourceType === 'dict' && draw.config.sysDicCode) {
      configMap.initDictList.push(`this.$axios.get('/sys/dictItem/selectItemsByDictCode', { params: { dictCode: '${draw.config.sysDicCode}' } }).then((r) => {
        this.${draw.vModel}Options = r;
      });
      `);
    } else if (draw.config.optionSourceType === 'form' || draw.config.optionSourceType === 'subForm') {
      const subUrl = draw.config.optionSourceType === 'subForm' ? `&subFormId=${draw.config.optionSubForm}` : '';
      configMap.initDictList.push(`
          this.$axios.post(\`\${this.url.optionDataList}?dynFormId=${draw.config.optionForm}${subUrl}&inputField=${draw.vModel}\`,  this.form).then(({ result }) => {
              if (result && result.length > 0) {
                this.${draw.vModel}Options = result.map((m) => ({ label: m.${draw.config.optionLabel}, value: m.${draw.config.optionValue} }));
                if (result.length === 1) {
                  this.form.${draw.vModel} = this.${draw.vModel}Options[0].value;
                }
              } else {
                this.${draw.vModel}Options = [];
              }
            }).finally(() => {
            });
          `);
    }
  }
  if (draw.config && draw.config.children && draw.config.children.length > 0) {
    draw.config.children.forEach((child) => { buildOptions(child, configMap); });
  }
}
