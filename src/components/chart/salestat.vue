<template>
  <div class="row">
    <div class="col-md-3 col-sm-6 col-xs-12 q-px-sm q-mb-md">
      <q-card class="home-sale-card">
        <q-card-section>
          <div class="row nowrap items-center">
            <q-avatar
              color="green-1"
              size="sm"
              text-color="green"
              class="q-mr-sm"
              icon="mdi-point-of-sale"
            />总销售额
            <q-space />
            <q-chip
              size="sm"
              square
              outline
              color="green"
              class="bg-green-1 float-right"
              label="日"
            />
          </div>
          <q-separator class="q-my-sm" />
          <div class="text-h5">￥126,560</div>
        </q-card-section>
        <q-card-section>
          周同比 %12
          <q-icon name="mdi-triangle" class="text-red q-mr-md" />日同比 11%
          <q-icon name="mdi-triangle" class="text-green rotate-180" />
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <div class="text-subtitle">日均销售额￥ 234.56</div>
        </q-card-actions>
      </q-card>
    </div>

    <div class="col-md-3 col-sm-6 col-xs-12 q-px-sm q-mb-md">
      <q-card class="home-sale-card">
        <q-card-section>
          <div class="row nowrap items-center">
            <q-avatar
              color="red-1"
              size="sm"
              text-color="red"
              class="q-mr-sm"
              icon="mdi-point-of-sale"
            />订单量
            <q-space />
            <q-chip size="sm" square outline color="blue" class="bg-blue-1" label="月"></q-chip>
          </div>
          <q-separator class="q-my-sm" />
          <div class="text-h5">8846</div>
        </q-card-section>
        <div class="q-mb-sm">
          <miniarea :screenWidth="screenWidth" />
        </div>
        <q-separator />
        <q-card-actions>
          <div class="text-subtitle">日订单量 1,234</div>
        </q-card-actions>
      </q-card>
    </div>
    <div class="col-md-3 col-sm-6 col-xs-12 q-px-sm q-mb-md">
      <q-card class="home-sale-card">
        <q-card-section>
          <div class="row nowrap items-center">
            <q-avatar
              color="orange-1"
              size="sm"
              text-color="orange"
              class="q-mr-sm"
              icon="mdi-point-of-sale"
            />支付笔数
            <q-space />
            <q-chip size="sm" square outline color="red" class="bg-red-1 float-right" label="周" />
          </div>
          <q-separator class="q-my-sm" />
          <div class="text-h5">6560</div>
        </q-card-section>
        <div class="q-mb-sm">
          <minibar :screenWidth="screenWidth" />
        </div>
        <q-separator />
        <q-card-actions>
          <div class="text-subtitle">转化率60%</div>
        </q-card-actions>
      </q-card>
    </div>
    <div class="col-md-3 col-sm-6 col-xs-12 q-px-sm q-mb-md">
      <q-card class="home-sale-card">
        <q-card-section>
          <div class="row nowrap items-center">
            <q-avatar
              color="green-1"
              size="sm"
              text-color="green"
              class="q-mr-sm"
              icon="mdi-point-of-sale"
            />运营活动效果
            <q-space />
            <q-icon size="sm" name="mdi-information-outline">
              <q-tooltip>指标说明</q-tooltip>
            </q-icon>
          </div>
          <q-separator class="q-my-sm" />
          <div class="text-h5">78%</div>
        </q-card-section>
        <q-card-section>
          <q-linear-progress size="15px" :value="0.8" color="secondary" class="q-mt-sm" />
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <div class="text-subtitle">
            同周比12%
            <q-icon name="mdi-triangle" class="text-green q-mr-md rotate-180" />日环比80%
            <q-icon name="mdi-triangle" class="text-red" />
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import miniarea from 'components/chart/miniarea';
import minibar from 'components/chart/minibar';

export default {
  name: 'SaleStat',
  props: {
    screenWidth: Number,
  },
  components: {
    miniarea,
    minibar,
  },
  data() {
    return {
    };
  },
  computed: {
  },
  created() {
  },
  mounted() {
  },
};
</script>

<style lang="stylus">
.home-sale-card
  min-width 200px
  height 200px
</style>
