<template>
  <div class="row justify-between">
    <div
      class="col-lg col-md-2 col-xs-4 text-center bg-white shadow-2 q-mx-sm q-mb-md"
      v-for="(data, index) in linkData"
      :key="index"
    >
      <ccshadow>
        <q-card-section class="bg-white">
          <q-avatar :icon="data.icon" :text-color="data.textColor"></q-avatar>
          <q-item-label>{{ data.desc }}</q-item-label>
        </q-card-section>
      </ccshadow>
    </div>
  </div>
</template>

<script>
import ccshadow from 'components/ccshadow';

export default {
  name: 'LinkCard',
  components: {
    ccshadow,
  },
  props: {
  },
  data() {
    return {
      linkData: [
        {
          icon: 'group',
          desc: '用户',
          textColor: 'primary',
        },
        {
          icon: 'leaderboard',
          desc: '分析',
          textColor: 'green',
        },
        {
          icon: 'shopping_cart',
          desc: '商品',
          textColor: 'orange',
        },
        {
          icon: 'assignment',
          desc: '订单',
          textColor: 'purple',
        },
        {
          icon: 'card_travel',
          desc: '票据',
          textColor: 'yellow',
        },
        {
          icon: 'email',
          desc: '消息',
          textColor: 'info',
        },
        {
          icon: 'bookmarks',
          desc: '标签',
          textColor: 'accent',
        },
        {
          icon: 'design_services',
          desc: '配置',
          textColor: 'deep-orange',
        },
      ],
    };
  },
  created() {

  },
  mounted() {

  },
  methods: {

  },
};
</script>

<style scoped lang="stylus"></style>
