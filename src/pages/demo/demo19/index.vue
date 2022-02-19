<template>
  <q-page class="cc-admin column">
    <div class="col bg-white shadow-2 q-pa-md q-ma-sm">
      <div class="row q-gutter-md">
        <div class="col">
          <inputdate v-model="detail" :isClear="isClear" @change="change"></inputdate>
        </div>
        <div class="col">
          <inputdatetime v-model="detail" :isClear="isClear" @change="change"></inputdatetime>
        </div>
        <div class="col">
          <inputeditdatetime v-model="detail" :isClear="isClear" @change="change" />
        </div>
      </div>
      <div class="row q-gutter-md q-mt-md">
        <div class="col">
          <inputtime v-model="detail" :isClear="isClear" @change="change"></inputtime>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import inputdate from 'components/form/inputdate';
import inputdatetime from 'components/form/inputdatetime';
import inputeditdatetime from 'components/form/inputeditdatetime';
import inputtime from 'components/form/inputtime';

export default {
  components: {
    inputdate, inputdatetime, inputeditdatetime, inputtime,
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
</style>
