<template>
  <component :is="cmpName" :config="config" ></component>
</template>
<script>
import customplane from './custom/customplane';
import customcar from './custom/customcar';
import customline from './custom/customline';

export default {
  components: {
    customplane,
    customcar,
    customline,
  },
  props: {
    config: {
      required: true,
    },
  },
  data() {
    return {
      cmpName: '',
    };
  },
  mounted() {
  },
  created() {
  },
  methods: {
  },
  watch: {
    'config.cmpName': {
      deep: true,
      handler(n, o) {
        if (n !== o) {
          this.cmpName = this.config.cmpName;
        }
      },
    },
  },
};
</script>
<style>
</style>
