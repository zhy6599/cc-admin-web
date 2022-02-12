<template>
  <div class="row">
    <div class="col">
      <textarea class="md-text" rows="30" v-model="content"/>
    </div>
    <div class="col">
      <markdown-it-vue class="md-body" :content="content"/>
    </div>
  </div>
</template>

<script>
import MarkdownItVue from 'markdown-it-vue';
import 'markdown-it-vue/dist/markdown-it-vue.css';

export default {
  components: {
    MarkdownItVue,
  },
  data() {
    return {
      content: '# your markdown content',
    };
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
