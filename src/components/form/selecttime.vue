<template>
  <div class="select-time row">
    <q-scroll-area class="col-4" ref="hour" @scroll="scroll($event,'hour')">
      <div class="s-t-p">
        <div v-for="t in hl" :key="t" @click="go(t,'hour')" v-choosing="t===hour">{{t}}</div>
      </div>
    </q-scroll-area>
    <q-scroll-area class="col-4" ref="minute" @scroll="scroll($event,'minute')">
      <div class="s-t-p">
        <div v-for="t in ml" :key="t" @click="go(t,'minute')" v-choosing="t===minute">{{t}}</div>
      </div>
    </q-scroll-area>
    <q-scroll-area class="col-4" ref="second" @scroll="scroll($event,'second')">
      <div class="s-t-p">
        <div v-for="t in ml" :key="t" @click="go(t,'second')" v-choosing="t===second">{{t}}</div>
      </div>
    </q-scroll-area>
    <div class="s-t-i-t"></div>
    <div class="s-t-i-b"></div>
  </div>
</template>

<script>
import { debounce } from 'quasar';

export default {
  name: 'SelectTime',
  props: {
    value: String,
  },
  data() {
    return {
      hour: 0,
      minute: 0,
      second: 0,
      hl: this.array(24, (v, i) => i),
      ml: this.array(60, (v, i) => i),
    };
  },
  watch: {
    value(n, o) {
      if (n !== o) {
        this.init();
      }
    },
  },
  computed: {
    time() {
      return `${this.hour.toString().padStart(2, '0')}:${this.minute.toString().padStart(2, '0')}:${this.second.toString().padStart(2, '0')}`;
    },
  },
  methods: {
    array(length, map) {
      return Array.from({ length }, map);
    },
    init() {
      this.hour = 0;
      this.minute = 0;
      this.second = 0;
      if (this.value) {
        [this.hour, this.minute, this.second] = this.value.split(':').map((v) => v - 0);
      }
      this.go(this.hour, 'hour');
      this.go(this.minute, 'minute');
      this.go(this.second, 'second');
    },
    go(n, t) {
      this[t] = n;
      this.$refs[t].setScrollPosition(n * 40, 99);
      if (this.inited) {
        this.$emit('input', this.time);
      }
    },
    scroll({ verticalPosition }, t) {
      this.go(Math.round(verticalPosition / 40), t);
    },
  },
  mounted() {
    this.scroll = debounce(this.scroll, 200);
    this.init();
    setTimeout(() => {
      this.inited = true;
    }, 999);
  },
};
</script>

<style lang="stylus">
.select-time
  position relative
  width 160px
  height 290px
  .s-t-p
    padding 125px 0
    div
      height 40px
      line-height 40px
      text-align center
      cursor pointer
      border-radius 4px
      color $t-grey
      transition all .4s ease-out
      &:hover
        background $light
        color $deep
      &.v-choosing
        color $deep
  .s-t-i-t,.s-t-i-b
    position absolute
    left 0
    top 0
    width 100%
    height 125px
    border-bottom 1px $light solid
    background linear-gradient(to top, rgba(255,255,255,0.2), rgba(255,255,255,1))
    pointer-events none
  .s-t-i-b
    top 165px
    border-bottom 0
    border-top 1px $light solid
    background linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0.2))
</style>
