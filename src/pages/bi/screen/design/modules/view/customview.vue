<template>
  <component :is="cmpName" :config="config"></component>
</template>
<script>
import sankeycom from './custom/sankey/sankeycom';

import pierunning from './custom/pie/pierunning';
import pie3d from './custom/pie/pie3d';
import piedouble from './custom/pie/piedouble';
import piestar from './custom/pie/piestar';
import piecolor from './custom/pie/piecolor';
import piefive from './custom/pie/piefive';
import piegroup from './custom/pie/piegroup';
import pienormal from './custom/pie/pienormal';
import piethree from './custom/pie/piethree';
import piethree2 from './custom/pie/piethree2';
import pietwo from './custom/pie/pietwo';
import pieprocess from './custom/pie/pieprocess';
import pieyellow from './custom/pie/pieyellow';
import gaugerunning from './custom/pie/gaugerunning';
import piefan from './custom/pie/piefan';
import piepercent from './custom/pie/piepercent';
import piefour from './custom/pie/piefour';
import piesix from './custom/pie/piesix';
import pieflower from './custom/pie/pieflower';
import pieshadow from './custom/pie/pieshadow';

import scattercommon from './custom/scatter/scattercommon';
import scatter3d from './custom/scatter/scatter3d';
import scattercircle from './custom/scatter/scattercircle';

import bar3dcolor from './custom/bar/bar3dcolor';
import bar3dtran from './custom/bar/bar3dtran';
import barcircle from './custom/bar/barcircle';
import barcircle2 from './custom/bar/barcircle2';
import barpictorial from './custom/bar/barpictorial';
import bardoublecircle from './custom/bar/bardoublecircle';
import bar3d from './custom/bar/bar3d';
import pictorialbar from './custom/bar/pictorialbar';
import bardouble from './custom/bar/bardouble';
import barhorizontal from './custom/bar/barhorizontal';
import barinfographic from './custom/bar/barinfographic';
import barline from './custom/bar/barline';
import barsquare from './custom/bar/barsquare';
import barproject from './custom/bar/barproject';
import barsort from './custom/bar/barsort';
import bar3dsqrt from './custom/bar/bar3dsqrt';
import barcircle3 from './custom/bar/barcircle3';
import barcolorful from './custom/bar/barcolorful';
import barone from './custom/bar/barone';
import barshaddle from './custom/bar/barshaddle';
import barbattery from './custom/bar/barbattery';
import barbattery2 from './custom/bar/barbattery2';
import bargroup from './custom/bar/bargroup';

import customheatweek from './custom/heat/customheatweek';
import customheatyear from './custom/heat/customheatyear';

import subway from './custom/line/subway';
import customline3d from './custom/line/customline3d';
import customwind3d from './custom/line/customwind3d';
import linerange from './custom/line/linerange';
import linepoint from './custom/line/linepoint';

import wordcloud from './custom/word/wordcloud';

import customplane from './custom/map/customplane';
import custommapll from './custom/map/custommapll';
import mapmove from './custom/map/mapmove';
import mapjs from './custom/map/mapjs';
import mapshandong from './custom/map/mapshandong';
import mapbeijing from './custom/map/mapbeijing';

import relationline from './custom/relation/relationline';
import structure from './custom/relation/structure';
import cloud from './custom/relation/cloud';
import linker from './custom/relation/linker';
import flow from './custom/relation/flow';

import mouse from './custom/graph/mouse';
import graphtable from './custom/graph/graphtable';
import temperature from './custom/graph/temperature';

export default {
  components: {
    sankeycom,

    mouse,
    temperature,
    graphtable,

    relationline,
    cloud,
    structure,
    linker,
    flow,

    pierunning,
    pienormal,
    piegroup,
    piefive,
    pie3d,
    piedouble,
    piestar,
    piecolor,
    piethree,
    piethree2,
    pietwo,
    pieprocess,
    pieyellow,
    piefan,
    barsort,
    piepercent,
    piefour,
    piesix,
    pieflower,
    pieshadow,

    bar3dcolor,
    bar3dtran,
    bar3d,
    bardouble,
    barhorizontal,
    barinfographic,
    barline,
    barsquare,
    barcircle,
    barcircle2,
    barpictorial,
    bardoublecircle,
    barproject,
    bar3dsqrt,
    barcircle3,
    barcolorful,
    barone,
    barshaddle,
    barbattery,
    barbattery2,
    bargroup,

    customline3d,
    linerange,
    linepoint,

    gaugerunning,
    customheatweek,
    customheatyear,
    customwind3d,

    scattercommon,
    scatter3d,
    scattercircle,

    pictorialbar,
    subway,
    wordcloud,

    custommapll,
    mapmove,
    mapbeijing,
    customplane,
    mapjs,
    mapshandong,
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
