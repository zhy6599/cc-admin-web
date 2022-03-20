<template>
<div class="col column">
  <border-box1 class="col column" v-if="config.borderId === '1'" :config.sync="config"/>
  <border-box2 class="col column" v-if="config.borderId === '2'" :config.sync="config"/>
  <border-box3 class="col column" v-if="config.borderId === '3'" :config.sync="config"/>
  <border-box4 class="col column" v-if="config.borderId === '4'" :config.sync="config"/>
  <border-box5 class="col column" v-if="config.borderId === '5'" :config.sync="config"/>
  <border-box6 class="col column" v-if="config.borderId === '6'" :config.sync="config"/>
  <border-box7 class="col column" v-if="config.borderId === '7'" :config.sync="config"/>
  <border-box8 class="col column" v-if="config.borderId === '8'" :config.sync="config"/>
  <border-box9 class="col column" v-if="config.borderId === '9'" :config.sync="config"/>
  <border-box10 class="col column" v-if="config.borderId === '10'" :config.sync="config"/>
  <border-box11 class="col column" v-if="config.borderId === '11'" :config.sync="config"/>
  <border-box12 class="col column" v-if="config.borderId === '12'" :config.sync="config"/>
  <border-box13 class="col column" v-if="config.borderId === '13'" :config.sync="config"/>
  <q-resize-observer @resize="onResize" />
</div>
</template>

<script>
import BorderBox1 from './widgets/border/borderbox1/index';
import BorderBox2 from './widgets/border/borderbox2/index';
import BorderBox3 from './widgets/border/borderbox3/index';
import BorderBox4 from './widgets/border/borderbox4/index';
import BorderBox5 from './widgets/border/borderbox5/index';
import BorderBox6 from './widgets/border/borderbox6/index';
import BorderBox7 from './widgets/border/borderbox7/index';
import BorderBox8 from './widgets/border/borderbox8/index';
import BorderBox9 from './widgets/border/borderbox9/index';
import BorderBox10 from './widgets/border/borderbox10/index';
import BorderBox11 from './widgets/border/borderbox11/index';
import BorderBox12 from './widgets/border/borderbox12/index';
import BorderBox13 from './widgets/border/borderbox13/index';

export default {
  name: 'borderview',
  components: {
    BorderBox1,
    BorderBox2,
    BorderBox3,
    BorderBox4,
    BorderBox5,
    BorderBox6,
    BorderBox7,
    BorderBox8,
    BorderBox9,
    BorderBox10,
    BorderBox11,
    BorderBox12,
    BorderBox13,
  },
  props: {
    config: {
      required: true,
      default: () => { },
    },
  },
  data() {
    return {
    };
  },
  methods: {
    onResize() {
      this.config.needResize = true;
    },
  },
};
</script>

<style scoped>
</style>
