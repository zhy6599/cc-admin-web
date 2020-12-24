<template>
  <div>
    <q-dialog v-model="showDialog" :maximized="true">
      <q-card class="dialog_card column">
        <q-card-section class=" row no-wrap">
          <q-tabs
            v-model="tab"
            dense
            align="left"
            class="row text-grey"
            active-color="primary"
            indicator-color="primary"
            narrow-indicator
            @input="changeTab"
          >
            <q-tab v-for="key in keys" :key="key" :name="key" :label="key" />
          </q-tabs>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup style="width: 45px;">
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-card-section>
        <q-card-section class="col q-col-gutter-md q-pa-sm">
          <q-scroll-area class="fit">
            <q-input v-model="code" filled type="textarea" autogrow class="fit" @click="copyCode" />
          </q-scroll-area>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat color="primary" dense v-close-popup>关闭</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { copyToClipboard } from 'quasar';

export default {
  name: 'preview',
  props: {
    fieldData: Object,
  },
  data() {
    return {
      id: '',
      tab: '',
      code: '',
      showDialog: false,
      keys: [],
      values: [],
      result: {},
    };
  },
  methods: {
    copyCode() {
      copyToClipboard(this.code)
        .then(() => {
          this.$info('代码已经成功复制');
        })
        .catch(() => {
          // 失败
        });
    },
    changeTab(id) {
      this.code = this.result[id];
    },
    show(id) {
      this.id = id;
      this.query();
      this.showDialog = true;
    },
    query() {
      this.loading = true;
      this.$axios.get(`/generate/queryCodeById?id=${this.id}`)
        .then(({ result }) => {
          this.keys = Object.keys(result);
          this.result = result;
          this.tab = 'index.ftl';
          this.code = result['index.ftl'];
        }).finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
  },
};
</script>
<style>
</style>
