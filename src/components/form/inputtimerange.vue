<template>
  <q-select outlined dense emit-value map-options ref="field"
    :label="label" :options="list" :value="value" :readonly="readonly"
    :rules="required?[requiredTest]:undefined" @input="$emit('input', $event)"/>
</template>

<script>
import { requiredTest } from 'boot/inputTest';

export default {
  name: 'InputTimerange',
  props: {
    value: String,
    required: Boolean,
    readonly: Boolean,
    label: String,
    type: String,
  },
  data() {
    return {
      list: [],
    };
  },
  watch: {
    type(n, o) {
      if (n !== o) {
        this.$emit('input', null);
        this.query();
      }
    },
  },
  methods: {
    requiredTest,
    query() {
      return this.$a.getTimeList({
        pageSize: 9999,
        type: this.type,
      }).then((r) => {
        this.list = r.result.records.map((v) => ({
          value: v.id,
          label: v.name,
        }));
      });
    },
    validate() {
      return this.$refs.field.validate();
    },
    resetValidation() {
      return this.$refs.field.resetValidation();
    },
  },
  mounted() {
    this.query();
  },
};
</script>
