<template>
  <component :is="cmpName" :config="config" ></component>
</template>
<script>
import customplane from './custom/customplane';
import customcar from './custom/customcar';
import customline from './custom/customline';
import customheatweek from './custom/customheatweek';
import customheatyear from './custom/customheatyear';
import custombar3d from './custom/custombar3d';
import custombar3dtran from './custom/custombar3dtran';
import customline3d from './custom/customline3d';
import customwind3d from './custom/customwind3d';
import customscatter from './custom/customscatter';

export default {
  components: {
    customplane,
    customcar,
    customline,
    customheatweek,
    customheatyear,
    custombar3d,
    custombar3dtran,
    customline3d,
    customwind3d,
    customscatter,
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
    this.cmpName = this.config.cmpName;
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
