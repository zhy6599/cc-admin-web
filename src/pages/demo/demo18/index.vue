<template>
  <div class="row">
    <div class="col">
      <q-input type="textarea" v-model="detail" :isClear="isClear" @change="change"></q-input>
    </div>
  </div>
</template>

<script>

export default {
  components: {
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
