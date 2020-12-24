<template>
  <div>
    <q-tooltip anchor="bottom middle" self="top middle">{{value}}</q-tooltip>
    <span>
      {{ ellipsis(value,length) }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'ellipsisvalue',
  props: {
    value: {
      type: String,
      required: false,
    },
    length: {
      type: Number,
      required: false,
      default: 25,
    },
  },
  methods: {
    ellipsis(value, vlength = 25) {
      if (!value) {
        return '';
      }
      if (value.length > vlength) {
        return `${value.slice(0, vlength)}...`;
      }
      return value;
    },
  },
};
</script>
