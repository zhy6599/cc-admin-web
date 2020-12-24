<template>
  <div class="view_nav column bg-white shadow-4">
    <h5 class="view_title">{{title}}</h5>
    <q-scroll-area class="col">
      <div class="vn_item" v-for="n in value" :key="n.label">
        <q-expansion-item v-if="n.children" v-model="n.expanded">
          <template v-slot:header>
            <label class="col">{{n.label}}
              <span v-if="n.tip" class="tip">{{n.tip}}</span>
            </label>
          </template>
          <div class="vn_item_c">
            <label v-for="c in n.children" :key="c.label"
              :class="{selected:selected===c}" @click="select(c)">
              {{c.label}}
              <span v-if="c.tip" class="tip">{{c.tip}}</span>
            </label>
          </div>
        </q-expansion-item>
        <label v-else :class="{selected:selected===n}" @click="select(n)">
          {{n.label}}
          <span v-if="n.tip" class="tip">{{n.tip}}</span>
        </label>
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
export default {
  name: 'ViewNav',
  props: {
    title: String,
    value: Array,
    selected: Object,
  },
  methods: {
    select(n) {
      this.$emit('update:selected', n);
      this.$emit('select', n);
    },
  },
};
</script>

<style lang="stylus">
.view_nav
  min-width 230px
  .view_title,.vn_item
    border-bottom 1px $light solid
  .view_title,label
    padding 0 0 0 30px
  .q-item
    min-height 0
    padding 0
  label
    display block
    line-height 50px
    font-size 16px
    color $t-dark
    cursor pointer
    &:hover
      background $base
    &.selected
      color $primary
      background $base
    .tip
      display inline-block
      top -9px
      position relative
      height 14px
      line-height 14px
      padding 0 4px
      font-size 12px
      background $red
      color $white
      border-radius 9px
      vertical-align middle
    &+.q-item__section
      position absolute
      right 0
      top 0
      height 100%
      padding 0 9px 0 0
  .vn_item_c
    label
      border-top 1px $base solid
      font-size 15px
</style>
