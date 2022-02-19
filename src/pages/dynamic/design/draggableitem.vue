/* eslint-disable */
<script>
import draggable from 'vuedraggable';
import render from 'components/render/render';

const components = {
  itemBtns(h, activeData, index, list) {
    const { copyItem, deleteItem } = this.$listeners;
    return [
      <span class="drawing-item-copy" title="复制" onClick={(event) => {
        copyItem(activeData, list); event.stopPropagation();
      }}>
        <q-icon name="mdi-content-copy" />
      </span>,
      <span class="drawing-item-delete" title="删除" onClick={(event) => {
        deleteItem(index, list); event.stopPropagation();
      }}>
        <q-icon name="mdi-delete-alert-outline" />
      </span>,
    ];
  },
};

function layoutIsNotFound() {
  throw new Error(`没有与${this.activeData.config.layout}匹配的layout`);
}
function renderChildren(h, currentItem) {
  const { config } = currentItem;
  if (!Array.isArray(config.children)) return null;
  return config.children.map((el, i) => {
    if (!el || !el.config) return null;
    const layout = layouts[el.config.layout];
    if (layout) {
      return layout.call(this, h, el, i, config.children);
    }
    return layoutIsNotFound.call(this);
  });
}

const layouts = {
  colFormItem(h, activeData, index, list) {
    const { activeItem } = this.$listeners;
    const { config } = activeData;
    const child = renderChildren.apply(this, arguments);
    let className = this.activeId === config.formId ? 'drawing-item active-from-item' : 'drawing-item';
    if (this.formConf.unFocusedComponentBorder) className += ' unfocus-bordered';
    className += ` col-${config.span}`;
    let labelClassName = 'dynamic-form-item-label';

    let labelStyle = 'width:100%;';
    let { labelWidth } = this.formConf;
    if (this.activeData.config.labelWidth) {
      labelWidth = this.activeData.config.labelWidth;
    }

    if (this.formConf.labelPosition !== 'top') {
      labelClassName += ' float-left';
      labelClassName += ` text-${this.formConf.labelPosition}`;
      labelStyle = `width:${labelWidth}px;`;
    }

    return (
      <div class={className} draggable="false">
        <div class="dynamic-form-item" onClick={(event) => { activeItem(activeData); event.stopPropagation(); }}>
          <div v-show={activeData.config.showLabel} class={labelClassName} style={labelStyle} >
            <q-icon name="star" color="red" v-show={activeData.config.required} />
            {config.label}
          </div>
          <render class="dynamic-form-item-field" key={config.renderKey} conf={activeData} onInput={(event) => {
            this.$set(config, 'defaultValue', event);
          }}>
            {child}
          </render>
        </div>
        {components.itemBtns.apply(this, arguments)}
      </div>
    );
  },
  rowFormItem(h, activeData, index, list) {
    const { activeItem } = this.$listeners;
    const { config } = activeData;
    let className = `drawing-row-item  row col-${config.span}`;
    if (this.activeId === config.formId) {
      className += ' active-from-item';
    }
    let child = renderChildren.apply(this, arguments);
    const flexClass = `col ${activeData.direction} ${activeData.wrap} ${activeData.justify} ${activeData.align}`;
    if (activeData.layout === 'flex') {
      child = <div class={flexClass}>
        {child}
      </div>;
    }
    return (
      <div class={className}
        onClick={(event) => { activeItem(activeData); event.stopPropagation(); }}>
        <span class="component-name">{config.componentName}</span>
        <draggable list={config.children || []} animation={340}
          group="componentsGroup" class="col row drag-wrapper">
          {child}
        </draggable>
        {components.itemBtns.apply(this, arguments)}
      </div>
    );
  },
  tableItem(h, activeData, index, list) {
    const { activeItem } = this.$listeners;
    const { config } = activeData;
    let className = `drawing-row-item  drawing-table-item col-${config.span}`;
    if (this.activeId === config.formId) {
      className += ' active-from-item';
    }
    const child = renderChildren.apply(this, arguments);
    const flexClass = `row ${activeData.direction} ${activeData.wrap} ${activeData.justify} ${activeData.align}`;
    return (
      <div class={className}
        onClick={(event) => { activeItem(activeData); event.stopPropagation(); }}>
        <span class="component-name">{config.componentName}</span>
        <draggable list={config.children || []} animation={340} onAdd={() => { config.children.forEach((c) => { if (c) c.config.span = 'grow'; }); }}
          group="componentsGroup" class="col row no-wrap drag-wrapper scroll overflow-hidden-y">
          {child}
        </draggable>
        <q-separator />
        <div class="row q-gutter-sm q-pa-sm">
          <q-btn dense flat text-color="light-blue-13" label="新增一行" icon="add" />
          <q-btn dense flat text-color="light-blue-13" label="批量导入" icon="mdi-import" />
        </div>
        {components.itemBtns.apply(this, arguments)}
      </div>
    );
  },
  customTable(h, activeData, index, list) {
    const { config } = activeData;
    const { activeItem } = this.$listeners;
    const columns = [{ name: 'name', label: 'Carbs (g)', field: 'name' }];
    const data = [{ name: 'Frozen Yogurt' }];
    if (config.children && config.children.length > 0) {
      config.children.forEach((c) => {
        columns.push({
          name: c.config.vModel, label: c.config.label, field: c.config.vModel,
        });
      });
    }
    const child = renderChildren.apply(this, arguments);
    return (<q-table data={data} columns={columns} class="col" title='Trea' rowKey='name' />);
  },
  raw(h, activeData, index, list) {
    const { config } = activeData;
    const child = renderChildren.apply(this, arguments);
    return <render key={config.renderKey} conf={activeData} onInput={(event) => {
      this.$set(config, 'defaultValue', event);
    }}>
      {child}
    </render>;
  },
};

export default {
  components: {
    render,
    draggable,
  },
  props: [
    'activeData',
    'index',
    'activeId',
    'formData',
    'drawingList',
    'formConf',
  ],
  data() {
    return { };
  },
  render(h) {
    const layout = layouts[this.activeData.config.layout];
    if (layout) {
      return layout.call(this, h, this.activeData, this.index, this.drawingList);
    }
    return layoutIsNotFound.call(this);
  },
};
</script>

<style scoped lang="stylus"></style>
