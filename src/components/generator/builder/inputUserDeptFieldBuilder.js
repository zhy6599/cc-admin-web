export function buildInputUserDeptField(draw, inputUserDeptInit, subTableName) {
  if (draw.config.inputType === 'user' || draw.config.inputType === 'dept') {
    inputUserDeptInit.push(`
        this.$axios.post(\`\${this.url.inputDataList}?dynFormId=\${this.$route.query.id}&inputField=${subTableName}${draw.vModel}\`,this.form).then(({ result }) => {
            this.${draw.vModel}Options = result;
          }).finally(() => {
          });
    `);
  }
  if (draw.config && draw.config.children && draw.config.children.length > 0) {
    const childSubTableName = draw.config.tag === 'table' ? draw.sub.tableId : '';
    draw.config.children.forEach((child) => { buildInputUserDeptField(child, inputUserDeptInit, `${childSubTableName}.`); });
  }
}
