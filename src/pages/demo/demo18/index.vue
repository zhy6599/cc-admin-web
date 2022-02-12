<template>
  <div class="row">
    <div class="col">
      <wang-editor v-model="detail" :isClear="isClear" @change="change"></wang-editor>
    </div>
  </div>
</template>

<script>
import WangEditor from 'components/wangeditor';

export default {
  components: {
    WangEditor,
  },
  data() {
    return {
      isClear: false,
      detail: '',
    };
  },
  methods: {
    change() {
    },
  },
};
</script>

<style scoped>
.container {
  display: inline-flex;
  width: 100%;
}
.md-text {
  width: 100%;
}
.md-body {
  width: 500%;
  margin-left: 20px;
}
</style>
