<template>
  <div>
    <div class="text-body2 q-pt-sm">维度</div>
    <draggable
      class="dotted w_l_g_cat"
      animation="200"
      v-model="config.cols"
      ghostClass="drag-ing"
      draggable=".drag-item"
      :group="{name:'cols',put:checkDrag('cols','modelCat')}"
      @add="dragAdd($event,'cols')"
      @end="moveEnd($event,'cols')"
    >
      <div
        v-for="v in config.cols"
        :key="v.name"
        :class="checkClass(v)"
        class="rounded-borders row no-wrap justify-between items-center drag-item"
      >
        <q-btn round dense flat :icon="sort(v.sort).icon" @click="changeSort(v)">
          <q-tooltip>排序方式：{{sort(v.sort).label}}</q-tooltip>
        </q-btn>
        <span>
          {{v|cut(20)}}
          <q-popup-edit v-model="v.field.alias" title="设置别名">
            <q-input dense autofocus v-model="v.field.alias" debounce="999" :label="v.name" />
          </q-popup-edit>
          <q-tooltip>{{v.name}}</q-tooltip>
        </span>
        <q-btn round dense flat icon="close" @click="del(v,'category')">
          <q-tooltip>移除数据</q-tooltip>
        </q-btn>
      </div>
      <div class="drag-no" v-if="!config.cols.length&&config.draging.type!=='modelCat'">
        <q-icon name="mdi-cursor-default-click" size="24px" />拖拽
        <b class="text-tertiary">维度</b>获取数据
      </div>
    </draggable>
    <div class="text-body2 q-pt-sm">指标</div>
    <draggable
      class="dotted w_l_g_val"
      animation="200"
      v-model="config.rows"
      ghostClass="drag-ing"
      draggable=".drag-item"
      :group="{name:'rows',put:checkDrag('rows','modelVal')}"
      @add="dragAdd($event,'rows')"
      @end="moveEnd($event,'rows')"
    >
      <div
        v-for="v in config.rows"
        :key="v.name"
        :class="checkClass(v)"
        class="rounded-borders row no-wrap justify-between items-center drag-item"
      >
        <q-btn round dense flat :icon="leftRight(v.leftRight).icon" @click="changeLeftRight(v)">
          <q-tooltip>坐标轴位置：{{leftRight(v.leftRight).label}}</q-tooltip>
        </q-btn>
        <div class="row no-wrap justify-between items-center" style="width:190px">
          <span>
            {{v|cut(10)}}
            <q-popup-edit v-model="v.field.alias" title="设置别名">
              <q-input dense autofocus v-model="v.field.alias" debounce="999" :label="v.name" />
            </q-popup-edit>
            <q-tooltip>{{v.name}}</q-tooltip>
          </span>
          <q-select
            dense
            emit-value
            map-options
            borderless
            v-model="v.agg"
            :options="calculateType"
            dropdown-icon="mdi-calculator-variant"
          >
            <q-tooltip>计算方式</q-tooltip>
          </q-select>
        </div>
        <q-btn round dense flat icon="close" @click="del(v,'value')">
          <q-tooltip>移除数据</q-tooltip>
        </q-btn>
      </div>
      <div class="drag-no" v-if="!config.rows.length&&config.draging.type!=='modelVal'">
        <q-icon name="mdi-cursor-default-click" size="24px" />拖拽
        <b class="text-tertiary">指标</b>获取数据
      </div>
    </draggable>
    <div class="text-body2 q-pt-sm">排序</div>
    <draggable
      class="dotted w_l_g_cat"
      animation="200"
      v-model="config.orders"
      ghostClass="drag-ing"
      draggable=".drag-item"
      :group="{name:'orders',put:checkDrag('all','modelCat')}"
      @add="dragAdd($event,'orders')"
      @end="moveEnd($event,'orders')"
    >
      <div
        v-for="v in config.orders"
        :key="v.name"
        :class="checkClass(v)"
        class="rounded-borders row no-wrap justify-between items-center drag-item"
      >
        <q-btn round dense flat :icon="sort(v.sort).icon" @click="changeSort(v)">
          <q-tooltip>排序方式：{{sort(v.sort).label}}</q-tooltip>
        </q-btn>
        <div class="row justify-between items-center" style="width:190px">
          <span>
            {{v|cut(13)}}
            <q-tooltip>{{v.name}}</q-tooltip>
          </span>
        </div>
        <q-btn round dense flat icon="close" @click="del(v,'orders')">
          <q-tooltip>移除数据</q-tooltip>
        </q-btn>
      </div>
      <div class="drag-no" v-if="!config.orders.length&&!config.draging.type">
        <q-icon name="mdi-cursor-default-click" size="24px" />拖拽
        <b class="text-tertiary">字段</b>排序
      </div>
    </draggable>
    <div class="text-body2 q-pt-sm">配置</div>
    <q-input
      dense
      filled
      v-model="config.length"
      type="number"
      :readonly="!config.slice"
      :debounce="999"
      prefix="数据数量："
      suffix="条"
      class="q-my-sm"
      input-class="text-right"
    >
      <template #append>
        <q-toggle v-model="config.slice" />
      </template>
    </q-input>
    <q-input
      dense
      filled
      v-model="config.interval"
      mask="######"
      :readonly="!config.loop"
      :debounce="999"
      prefix="定时刷新："
      suffix="秒"
      class="q-my-sm"
      input-class="text-right"
    >
      <template #append>
        <q-toggle v-model="config.loop" />
      </template>
    </q-input>
    <q-field v-if="config.loop" stack-label>
      <template v-slot:control>
        <q-toggle v-model="config.showLoop" label="显示定时" />
      </template>
    </q-field>
  </div>
</template>

<script>
import { calculateType, sortType, leftRightType } from 'boot/datatype';
import draggable from 'vuedraggable';

export default {
  components: {
    draggable,
  },
  props: {
    config: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      calculateType,
      sortType,
    };
  },
  created() {

  },
  mounted() {

  },
  methods: {

    changeSort(v) {
      if (v.sort === 'desc') {
        this.$set(v, 'sort', undefined);
      } else {
        this.$set(v, 'sort', 'desc');
      }
    },
    sort(val) {
      return sortType.find((v) => v.value === val);
    },
    leftRight(val) {
      return leftRightType.find((v) => v.value === val);
    },
    changeLeftRight(v) {
      if (v.leftRight === '0') {
        this.$set(v, 'leftRight', '1');
        v.leftRight = '1';
      } else if (v.leftRight === '1') {
        this.$set(v, 'leftRight', undefined);
      } else {
        this.$set(v, 'leftRight', '1');
      }
    },
    del(t, type) {
      if (type === 'value') {
        this.config.rows = this.config.rows.filter((v) => v.name !== t.name);
      } else if (type === 'orders') {
        this.config.orders = this.config.orders.filter((v) => v.name !== t.name);
      } else if (type === 'colors') {
        this.config.colors = this.config.colors.filter((v) => v.name !== t.name);
      } else {
        this.config.cols = this.config.cols.filter((v) => v.name !== t.name);
      }
    },
    checkClass({ name, type }) {
      const c = [];
      if (this.config.draging.data.some((d) => d.name === name)) {
        c.push('drag-ing');
      }
      if (type === 'value') {
        c.push('bg-positive');
      }
      if (type === 'category') {
        c.push('bg-light-blue');
      }
      return c;
    },
    checkDrag(a, b) {
      return a === 'all' || (this.config.draging.type === b
        && this.config.draging.data.some((v) => !this.config[a].some((d) => d.name === v.name)));
    },
    translate({ name, visualType, type }, tp) {
      const t = {
        name,
        visualType,
        type,
        field: {
          alias: '',
          desc: '',
          useExpression: false,
        },
        format: {
          formatType: 'default',
        },
      };
      if (tp === 'rows') {
        t.agg = '';
        t.chart = {};
      }
      return t;
    },
    dragAdd(e, type) {
      const list = this.config.draging.data
        .filter((v) => !this.config[type].some((d) => d.name === v.name));
      this.config[type].splice(
        e.newIndex,
        1,
        ...list.map((v) => this.translate(v, type)),
      );
    },
    cloneEnd() {
      this.config.draging = {
        type: '',
        data: [],
      };
    },
    moveEnd({
      originalEvent, from, to, oldIndex,
    }, v) {
      if (from === to) {
        const {
          x, y, width, height,
        } = from.getBoundingClientRect();
        if (originalEvent.pageX < x
          || originalEvent.pageX > (x + width)
          || originalEvent.pageY < y
          || originalEvent.pageY > (y + height)) {
          this.config[v].splice(oldIndex, 1);
        }
      }
    },
  },
  filters: {
    cut(v, l) {
      let val = '';
      if (v.field.alias) {
        val = `${v.field.alias}:${v.name}`;
      } else {
        val = v.name;
      }
      return val.length < l ? val : `${val.slice(0, l)}…`;
    },
  },
};
</script>

<style scoped lang="stylus"></style>
