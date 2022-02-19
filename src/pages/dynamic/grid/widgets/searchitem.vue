<template>
  <div class="row q-gutter-sm items-center">
    <div class="col">
      <q-input
        dense
        outlined
        type="text"
        class="q-my-sm"
        v-model="item.label"
        prefix="标签:"
        input-class="text-left"
      />
    </div>
    <div class="col">
      <q-select
        dense
        outlined
        options-dense
        v-model="item.vModel"
        prefix="字段:"
        class="q-my-sm"
        :options="allColumns"
        option-value="name"
        option-label="label"
        emit-value
        map-options
        @input="changeColumn"
      />
    </div>
    <div>
      <q-select
        dense
        outlined
        options-dense
        v-model="item.opt"
        prefix="操作符:"
        class="q-my-sm"
        :options="optOptions"
        emit-value
        map-options
      />
    </div>
    <div class="col">
      <q-input
        dense
        outlined
        type="text"
        class="q-my-sm"
        v-model="item.defaultValue"
        prefix="默认值:"
        input-class="text-left"
      />
    </div>
    <div style="width:50px;">
      <q-input
        dense
        outlined
        type="number"
        class="q-my-sm"
        v-model="item.group"
        placeholder="查询组（同组and，不同组or）"
        input-class="text-left"
      />
    </div>
    <div style="width:30px;">
      <q-btn dense round text-color="red" icon="delete" @click="deleteItem(item.index)" />
    </div>
    <div></div>
  </div>
</template>

<script>
import { optOptions } from 'components/generator/util';

export default {
  components: {},
  props: {
    item: {
      type: Object,
      required: false,
    },
    allColumns: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      optOptions,
    };
  },
  watch: {},
  computed: {},
  methods: {
    deleteItem(index) {
      this.$emit('deleteItem', index);
    },
    changeColumn(v) {
      this.allColumns.forEach((column) => {
        if (column.name === v) { this.item.label = column.label; }
      });
    },
  },
  created() { },
  mounted() { },
};
</script>
<style lang="stylus"></style>
