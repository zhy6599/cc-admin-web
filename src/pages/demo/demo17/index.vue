<template>
  <div class="row">
    <div class="col">
      <textarea class="md-text" rows="30" v-model="content"/>
    </div>
  </div>
</template>

<script>

export default {
  components: {
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
