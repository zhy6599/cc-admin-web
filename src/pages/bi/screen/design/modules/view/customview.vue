<template>
  <component :is="cmpName" :config="config"></component>
</template>
<script>
import pierunning from './custom/pie/pierunning';
import pie3d from './custom/pie/pie3d';
import piedouble from './custom/pie/piedouble';
import piestar from './custom/pie/piestar';
import piecolor from './custom/pie/piecolor';
import piefive from './custom/pie/piefive';
import piegroup from './custom/pie/piegroup';
import pienormal from './custom/pie/pienormal';
import gaugerunning from './custom/pie/gaugerunning';

import scattercommon from './custom/scatter/scattercommon';
import scatter3d from './custom/scatter/scatter3d';

import bar3dcolor from './custom/bar/bar3dcolor';
import bar3dtran from './custom/bar/bar3dtran';
import barcircle from './custom/bar/barcircle';
import bar3d from './custom/bar/bar3d';
import pictorialbar from './custom/bar/pictorialbar';
import bardouble from './custom/bar/bardouble';
import barhorizontal from './custom/bar/barhorizontal';
import barinfographic from './custom/bar/barinfographic';
import barline from './custom/bar/barline';
import barsquare from './custom/bar/barsquare';

import customheatweek from './custom/heat/customheatweek';
import customheatyear from './custom/heat/customheatyear';

import subway from './custom/line/subway';
import customline3d from './custom/line/customline3d';
import customwind3d from './custom/line/customwind3d';

import wordcloud from './custom/word/wordcloud';

import customplane from './custom/map/customplane';
import custommapll from './custom/map/custommapll';

import relationline from './custom/relation/relationline';
import structure from './custom/relation/structure';

export default {
  components: {
    relationline,
    structure,
    pierunning,
    pienormal,
    piegroup,
    piefive,
    pie3d,
    piedouble,
    piestar,
    piecolor,

    bar3dcolor,
    bar3dtran,
    bar3d,
    bardouble,
    barhorizontal,
    barinfographic,
    barline,
    barsquare,
    gaugerunning,
    customplane,
    customheatweek,
    customheatyear,
    customline3d,
    customwind3d,
    scattercommon,
    custommapll,
    scatter3d,
    pictorialbar,
    subway,
    barcircle,
    wordcloud,
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
