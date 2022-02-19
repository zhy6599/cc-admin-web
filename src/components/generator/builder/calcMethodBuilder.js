// 这个方法通过遍历计算map 来把新增和计算方法准备好
export function buildCalcMethod(configMap) {
  const { calcFieldMap, calcMethodList, calcListForAdd } = configMap;
  Object.keys(calcFieldMap).forEach((key) => {
    const value = calcFieldMap[key];
    if (value.length === 0) {
      calcListForAdd.push(`this.${key}Cacl();`);
    }
    calcMethodList.push(`
      ${key}Cacl() {
        this.$axios.post(\`\${this.url.expression}?dynFormId=\${this.$route.query.id}&expressionField=${key}\`, this.form).then(({ result }) => {
          this.form.${key} = result;
        }).finally(() => {
        });
      }
    `);
  });
}
