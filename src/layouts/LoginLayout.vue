<template>
  <div>
    <q-layout view="hHh LpR fff" style="font-family: 微软雅黑">
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  name: 'LoginLayout',
  props: {},
  data() {
    return {
      topMarginClass: 'q-mt-lg',
    };
  },
  methods: {
  },
  mounted() {
  },
};
</script>
