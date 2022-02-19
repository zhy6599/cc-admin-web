let confGlobal;
import { deepClone } from 'components/utils/index';

export function dialogWrapper(str) {
  return `<q-dialog maximized flat persistent ref="dialog" position="right">
    <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          编辑
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
        ${str}
        </q-scroll-area>
      </q-form>
  </q-dialog>`;
}
export function formWrapper(str) {
  return str;
}

export function vueTemplate(str) {
  return `<template>
    <div>
      ${str}
    </div>
</template>`;
}

export function vueScript(str) {
  return `<script>
    ${str}
</script>`;
}

export function cssStyle(cssStr) {
  return `<style>
    ${cssStr}
</style>`;
}
function buildFormTemplate(scheme, child) {
  const str = `<div class="col row">
      ${child}
    </div>`;
  return str;
}
/**
 * 校验规则
 */
function getRules(el) {
  if (confGlobal.formModel === 'form') {
    const ruleList = [];
    if (el.config.required) {
      ruleList.push("val => val && val.length > 0 || '这是必填字段'");
    }
    if (el.config.rule) {
      ruleList.push(el.config.rule);
    }
    if (el.config.regList && el.config.regList.length > 0) {
      el.config.regList.forEach((reg) => {
        ruleList.push(`val => ${reg.pattern} || '${reg.message}'`);
      });
    }
    return `:rules="${JSON.stringify(ruleList).replaceAll('"', '')}"`;
  }
  return '';
}

function attrBuilder(el) {
  const vModel = `v-model="${el.formModel || confGlobal.formModel}.${el.vModel}"`;
  const clearable = el.clearable ? 'clearable' : '';
  const placeholder = el.placeholder ? `placeholder="${el.placeholder}"` : '';
  const width = el.style && el.style.width ? ':style="{width: \'100%\'}"' : '';
  const disabled = el.disabled ? ':disabled=\'true\'' : '';
  const autofocus = el.autofocus ? 'autofocus' : '';
  const dense = el.dense ? 'dense' : '';
  const outlined = el.outlined ? 'outlined' : '';
  const maxlength = el.maxlength ? `maxlength="${el.maxlength}"` : '';
  const readonly = el.readonly ? 'readonly' : '';
  const disable = el.disable ? 'disable' : '';
  const counter = el.disable ? 'counter' : '';
  const type = el.type ? `type="${el.type}"` : '';
  const filterable = el.filterable ? 'filterable' : '';
  const multiple = el.multiple ? 'multiple' : '';
  const inline = el.inline ? 'inline' : '';
  const markers = el.markers ? 'markers' : '';
  const vertical = el.vertical ? 'vertical' : '';
  const reverse = el.reverse ? 'reverse' : '';
  const range = el.range ? 'range' : '';
  const min = el.min ? `:min="${el.min}"` : '';
  const max = el.max ? `:max="${el.max}"` : '';
  const step = el.step ? `:step="${el.step}"` : '';
  const label = el.label ? `label="${el.label}"` : '';
  const icon = el.icon ? `icon="${el.icon}"` : '';
  const labelAlways = el.labelAlways ? 'labelAlways' : '';
  const color = el.color ? `color="${el.color}"` : '';
  const labelColor = el.labelColor ? `labelColor="${el.labelColor}"` : '';
  const labelTextColor = el.labelTextColor ? `labelTextColor="${el.labelTextColor}"` : '';
  const size = el.size ? `size="${el.size}"` : '';
  const trackColor = el.trackColor ? `trackColor="${el.trackColor}"` : '';
  const centerColor = el.centerColor ? `centerColor="${el.centerColor}"` : '';
  const showValue = el.showValue ? 'showValue' : '';
  const options = el.options ? `:options="${el.optionsKey || el.vModel}Options"` : '';
  const blur = (confGlobal.formModel === 'searchForm') ? '' : `@blur="${el.vModel}Blur" @input="${el.vModel}Input"`;
  const lazyRules = 'lazy-rules';

  return `${dense} ${outlined} ${options} ${vModel} ${type} ${blur} ${lazyRules} ${getRules(el)} ${showValue} ${centerColor} ${trackColor} ${range} ${markers} ${size} ${color} ${labelColor} ${labelTextColor} ${label} ${icon} ${labelAlways} ${min} ${max} ${step} ${reverse} ${vertical} ${inline} ${filterable} ${multiple} ${placeholder} ${maxlength} ${autofocus} ${readonly} ${disabled} ${clearable} ${disable} ${counter} ${width}`;
}

const tags = {
  'q-input': (el) => {
    const attrs = attrBuilder(el);
    const { tag } = el.config;
    return `<${tag} ${attrs} />`;
  },
  'q-select': (el) => {
    const attrs = attrBuilder(el);
    const { tag } = el.config;
    return `<${tag} ${attrs} emit-value map-options />`;
  },
  'q-option-group': (el) => {
    const attrs = attrBuilder(el);
    const { tag } = el.config;
    return `<${tag} ${attrs} />`;
  },
  'q-checkbox': (el) => {
    const attrs = attrBuilder(el);
    const { tag } = el.config;
    const valueSet = ' trueValue="1" falseValue="0"';
    return `<${tag} ${attrs} ${valueSet} />`;
  },
  'q-toggle': (el) => {
    const attrs = attrBuilder(el);
    const { tag } = el.config;
    const valueSet = ' trueValue="1" falseValue="0"';
    return `<${tag} ${attrs} ${valueSet} />`;
  },
  'input-date': (el) => {
    const attrs = attrBuilder(el);
    const { tag } = el.config;
    return `<${tag} ${attrs} />`;
  },
  'input-color': (el) => {
    const attrs = attrBuilder(el);
    const { tag } = el.config;
    return `<${tag} ${attrs} />`;
  },
  'q-btn-toggle': (el) => {
    const attrs = attrBuilder(el);
    const { tag } = el.config;
    const options = `:options="${el.vModel}Options"`;
    return `<${tag} ${attrs} ${options} />`;
  },
  'q-btn': (el) => {
    const attrs = attrBuilder(el);
    const { tag, btnAction } = el.config;
    const onClick = btnAction === 'save' ? 'type="submit"' : `@click="${btnAction}()"`;
    return `<${tag} ${attrs} ${onClick} />`;
  },
  'q-range': (el) => {
    const attrs = attrBuilder(el);
    const { tag } = el.config;
    return `<${tag} ${attrs} />`;
  },
  'q-separator': (el) => {
    const attrs = attrBuilder(el);
    const { tag } = el.config;
    return `<${tag} ${attrs} />`;
  },
  'q-item-label': (el) => {
    const attrs = attrBuilder(el);
    const { tag } = el.config;
    return `<${tag} ${attrs} />`;
  },
  'q-icon': (el) => {
    const attrs = attrBuilder(el);
    const { tag } = el.config;
    return `<${tag} ${attrs} />`;
  },
  'q-knob': (el) => {
    const attrs = attrBuilder(el);
    const { tag } = el.config;
    return `<${tag} ${attrs} />`;
  },
  'q-slider': (el) => {
    const attrs = attrBuilder(el);
    const { tag } = el.config;
    return `<${tag} ${attrs} />`;
  },
  'q-time-picker': (el) => {
    const attrs = attrBuilder(el);
    const { tag } = el.config;
    return `<${tag} ${attrs} />`;
  },
  'q-date-picker': (el) => {
    const attrs = attrBuilder(el);
    const { tag } = el.config;
    return `<${tag} ${attrs} />`;
  },
  'q-rating': (el) => {
    const attrs = attrBuilder(el);
    const { tag } = el.config;
    return `<${tag} ${attrs} />`;
  },
  'q-chip': (el) => {
    const attrs = attrBuilder(el);
    const { tag } = el.config;
    return `<${tag} ${attrs} />`;
  },
  'q-uploader': (el) => {
    const attrs = attrBuilder(el);
    const { tag } = el.config;
    return `<${tag} ${attrs} />`;
  },
};

const layouts = {
  colFormItem(scheme) {
    const { config } = scheme;
    const tagDom = tags[config.tag] ? tags[config.tag](scheme) : null;

    let className = 'drawing-item';
    className += ` col-${config.span}`;
    let labelClassName = 'dynamic-form-item-label';
    let { labelWidth } = confGlobal;
    if (scheme.labelWidth) {
      labelWidth = scheme.labelWidth;
    }
    let labelStyle = 'width:100%;';
    if (confGlobal.labelPosition !== 'top') {
      labelClassName += ' float-left';
      labelClassName += ` text-${confGlobal.labelPosition}`;
      labelStyle = `width:${labelWidth}px;`;
    }
    const str = `<div class="${className}"  v-if="showForm.${scheme.vModel}">
        <div class="dynamic-form-item">
          <div v-show="${config.showLabel}" class="${labelClassName}" style=${labelStyle} >
            <q-icon name="star" color="red" v-show="${config.required}" />
            ${config.label}
          </div>
          ${tagDom}
        </div>
      </div>`;
    return str;
  },
  rowFormItem(scheme) {
    const { config } = scheme;
    const className = `row col-${config.span}`;
    const children = config.children.map((el) => layouts[el.config.layout](el));
    const str = `<div class="${className} ${scheme.justify} ${scheme.align} ${scheme.gutter}">
      ${children.join('\n')}
    </div>`;
    return str;
  },
  // 这里实现根据表单配置渲染表格
  tableItem(scheme) {
    const { sub, config } = scheme;
    const className = `column col-${config.span}`;
    const children = config.children.map((child) => {
      const el = child.config;
      const subScheme = deepClone(child);
      subScheme.formModel = 'props.row';
      let tagDom = `{{props.row.${subScheme.vModel}}}`;
      if (!subScheme.readonly) {
        tagDom = tags[el.tag] ? tags[el.tag](subScheme) : null;
      }
      return `<template #body-cell-${child.vModel}="props">
              <q-td :props="props">
                ${tagDom}
                </q-td>
              </template>`;
    });
    const { tableId, tableName } = sub;
    // 有新增才添加这段
    const addHtml = config.showAdd
      ? `<div class="row q-gutter-sm q-pa-sm">
          <q-btn dense flat text-color="light-blue-13" label="新增一行" icon="add"  @click="addSub(${tableId}_list,${tableId}Form)"/>
          <q-btn dense flat text-color="light-blue-13" label="批量导入" icon="mdi-import" />
        </div>` : '';
    return `
      <div class="${className}">
        <q-table
            flat
            color="primary"
            class="cross_table col"
            separator="cell"
            :columns="${tableId}_columns"
            :data="${tableId}_list"
            row-key="id"
            :pagination.sync="${tableId}_pagination"
            :rows-per-page-options="[10,20,50,100]"
            :loading="loading"
            hide-bottom
          >
                    ${children.join('\n')}
                    <template #body-cell-opt="props">
                      <q-td :props="props" :auto-width="true">
                        <btn-del label="${tableName}" @confirm="delSub(${tableId}_list,props.row)" />
                      </q-td>
                    </template>
          </q-table>
        ${addHtml}
      </div>
    `;
  },
};

/**
 * 组装Tag代码。【入口函数】
 * @param {Object} config 整个表单配置
 */
export function makeUpTag(scheme, formModel) {
  const { config } = scheme;
  confGlobal = { formModel };
  return tags[config.tag] ? tags[config.tag](scheme) : null;
}

/**
 * 组装html代码。【入口函数】
 * @param {Object} config 整个表单配置
 */
export function makeUpHtml(config) {
  const htmlList = [];
  confGlobal = config.formConf;
  // 判断布局是否都沾满了12个栅格，以备后续简化代码结构
  // 遍历渲染每个组件成html
  config.drawingList.forEach((el) => {
    htmlList.push(layouts[el.config.layout](el));
  });
  const htmlStr = htmlList.join('\n');
  // 将组件代码放进form标签
  const temp = buildFormTemplate(config, htmlStr);
  confGlobal = null;
  return formWrapper(temp);
}
