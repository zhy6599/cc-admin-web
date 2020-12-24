<template>
  <q-page class="row">
    <div class="col column view_card shadow-2 q-pa-md q-ma-sm">
      <div class="row q-gutter-md">
        <div class="col">
          <q-card class="main_card">
            <q-card-section>
              <div class="row nowrap">
                总销售额
                <q-space />
                <q-icon name="mdi-information-outline">
                  <q-tooltip>指标说明</q-tooltip>
                </q-icon>
              </div>
              <div class="text-h5">￥126,560</div>
            </q-card-section>
            <q-card-section>
              周同比12%
              <q-icon name="mdi-menu-up" color="red" />日同比11%
              <q-icon name="mdi-menu-down" color="green" />
            </q-card-section>
            <q-separator />
            <q-card-actions>
              <div class="text-subtitle">日均销售额￥ 234.56</div>
            </q-card-actions>
          </q-card>
        </div>

        <div class="col">
          <q-card  class="main_card">
            <q-card-section>
              <div class="row nowrap">
                订单量
                <q-space />
                <q-icon name="mdi-information-outline">
                  <q-tooltip>指标说明</q-tooltip>
                </q-icon>
              </div>
              <div class="text-h5">8846</div>
            </q-card-section>
            <div class="q-mb-sm">
              <miniarea />
            </div>
            <q-separator />
            <q-card-actions>
              <div class="text-subtitle">日订单量 1,234</div>
            </q-card-actions>
          </q-card>
        </div>
        <div class="col">
          <q-card  class="main_card">
            <q-card-section>
              <div class="row nowrap">
                支付笔数
                <q-space />
                <q-icon name="mdi-information-outline">
                  <q-tooltip>指标说明</q-tooltip>
                </q-icon>
              </div>
              <div class="text-h5">6560</div>
            </q-card-section>
            <div class="q-mb-sm">
              <minibar />
            </div>
            <q-separator />
            <q-card-actions>
              <div class="text-subtitle">转化率60%</div>
            </q-card-actions>
          </q-card>
        </div>
        <div class="col">
          <q-card  class="main_card">
            <q-card-section>
              <div class="row nowrap">
                运营活动效果
                <q-space />
                <q-icon name="mdi-information-outline">
                  <q-tooltip>指标说明</q-tooltip>
                </q-icon>
              </div>
              <div class="text-h5">78%</div>
            </q-card-section>
            <q-card-section>
              <q-linear-progress size="15px" :value="0.8" color="secondary" class="q-mt-sm">
              </q-linear-progress>
            </q-card-section>
            <q-separator />
            <q-card-actions>
              <div class="text-subtitle">日订单量 1,234</div>
            </q-card-actions>
          </q-card>
        </div>
      </div>

      <div class="row q-my-md">
        <div class="col"><saletab /></div>
      </div>

      <div class="row">
        <div class="col"><visitline /></div>
      </div>
    </div>
  </q-page>
</template>

<script>
import miniarea from 'components/chart/miniarea';
import minibar from 'components/chart/minibar';
import visitline from 'components/chart/visitline';
import saletab from './saletab';

export default {
  name: 'DemoOrderMain',
  components: {
    miniarea,
    minibar,
    saletab,
    visitline,
  },
  data() {
    return {
    };
  },
  methods: {
    initDict() {
    },
  },
  mounted() {
    this.initDict();
  },
};
</script>

<style lang="stylus">
.main_card
  height 180px
</style>
