<template>
<div class="col column">
  <decoration1 class="col column" v-if="config.decorationId === '1'" :config.sync="config"/>
  <decoration2 class="col column" v-if="config.decorationId === '2'" :config.sync="config"/>
  <decoration3 class="col column" v-if="config.decorationId === '3'" :config.sync="config"/>
  <decoration4 class="col column" v-if="config.decorationId === '4'" :config.sync="config"/>
  <decoration5 class="col column" v-if="config.decorationId === '5'" :config.sync="config"/>
  <decoration6 class="col column" v-if="config.decorationId === '6'" :config.sync="config"/>
  <decoration7 class="col column" v-if="config.decorationId === '7'" :config.sync="config"/>
  <decoration8 class="col column" v-if="config.decorationId === '8'" :config.sync="config"/>
  <decoration9 class="col column" v-if="config.decorationId === '9'" :config.sync="config"/>
  <decoration10 class="col column" v-if="config.decorationId === '10'" :config.sync="config"/>
  <decoration11 class="col column" v-if="config.decorationId === '11'" :config.sync="config"/>
  <decoration12 class="col column" v-if="config.decorationId === '12'" :config.sync="config"/>
  <q-resize-observer @resize="onResize" />
</div>
</template>

<script>
import Decoration1 from './widgets/decoration/decoration1/index';
import Decoration2 from './widgets/decoration/decoration2/index';
import Decoration3 from './widgets/decoration/decoration3/index';
import Decoration4 from './widgets/decoration/decoration4/index';
import Decoration5 from './widgets/decoration/decoration5/index';
import Decoration6 from './widgets/decoration/decoration6/index';
import Decoration7 from './widgets/decoration/decoration7/index';
import Decoration8 from './widgets/decoration/decoration8/index';
import Decoration9 from './widgets/decoration/decoration9/index';
import Decoration10 from './widgets/decoration/decoration10/index';
import Decoration11 from './widgets/decoration/decoration11/index';
import Decoration12 from './widgets/decoration/decoration12/index';

export default {
  name: 'borderview',
  components: {
    Decoration1,
    Decoration2,
    Decoration3,
    Decoration4,
    Decoration5,
    Decoration6,
    Decoration7,
    Decoration8,
    Decoration9,
    Decoration10,
    Decoration11,
    Decoration12,
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
    onResize(size){
      this.config.needResize = true;
    },
  },
};
</script>

<style scoped>
</style>
