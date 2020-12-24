<template>
  <q-dialog maximized flat persistent ref="dialog" position="right">
    <div class="dialog_card column">
      <h5 class="view_title justify-between q-px-md">
        {{title}}
        <q-btn dense outline round icon="mdi-close-box-outline" size="sm" v-close-popup />
      </h5>
      <q-scroll-area class="col">
        <slot></slot>
      </q-scroll-area>
      <div class="row justify-end q-pa-md">
        <q-btn outline color="primary" label="取消" v-close-popup />
        <q-btn unelevated color="primary" class="on-right" label="提交" type="submit" />
      </div>
    </div>
  </q-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {

    };
  },
  created() {

  },
  mounted() {

  },
  methods: {

  },
};
</script>

<style scoped lang="stylus"></style>
