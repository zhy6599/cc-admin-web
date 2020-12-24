<template>
  <div
    class="chart-table"
    ref="chart"
  >
    <q-markup-table
      flat
      bordered
      color="primary"
      class="cross_table"
      separator="vertical"
    >
      <thead>
        <tr
          v-for="v in list.thead"
          :key="v.name"
        >
          <th class="text-left">{{v.cname}}</th>
          <td
            class="text-right"
            v-for="(t,i) in v.data"
            :key="i"
            :colspan="t.colspan"
          >
            {{t.val}}</td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="v in list.tbody"
          :key="v.name"
        >
          <th class="text-left">{{v.cname}}</th>
          <td
            class="text-right"
            v-for="(t,i) in v.data"
            :key="i"
          >
            {{t}}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import { debounce } from 'quasar';

export default {
  name: 'ChartTable',
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      data: [],
      interval: this.config.interval,
      ti: 0,
      loading: false,
      tableData: [],
    };
  },
  methods: {
    format() {
      this.data = this.data
        .slice(0, this.config.slice ? this.config.length : this.data.length);
    },
    loop() {
      clearTimeout(this.ti);
      this.interval -= 1;
      if (this.interval < 1) {
        this.getData();
      } else {
        this.ti = setTimeout(() => {
          this.loop();
        }, 999);
      }
    },
    confirmLoop() {
      if (this.loopHandler) {
        this.interval = this.config.interval - (-1);
        this.loop();
      } else {
        clearTimeout(this.ti);
      }
    },
    getOrders() {
      const orders = [];
      this.config.orders.forEach((o) => {
        orders.push({
          column: o.name,
          direction: o.sort,
        });
      });
      return orders;
    },
    doLoadData() {
      this.loading = true;
      return this.$axios.post(`/bi/view/getData/${this.config.viewId}`, {
        aggregators: this.config.rows.map((v) => ({
          column: v.name.split('@')[0],
          alias: v.field.alias,
          func: v.agg,
        })),
        allParam: this.allParam,
        cache: false,
        expired: 0,
        filters: this.config.filters,
        groups: this.config.cols.map((v) => v.name),
        nativeQuery: false,
        orders: this.getOrders(),
        pageNo: 1,
        pageSize: this.config.length,
      }).then(({ result }) => {
        this.data = (result && result.records) || [];
        this.format();
      }).finally(() => {
        this.loading = false;
      });
    },
  },
  created() {
    this.getData = debounce(this.doLoadData, 500);
  },
  mounted() {
    if (this.config.viewId) {
      this.getData();
    }
  },
  watch: {
    config: {
      deep: true,
      handler() {
        this.getData();
      },
    },
    'config.cols': {
      handler() {
        this.getData();
      },
      deep: true,
    },
    'config.rows': {
      handler() {
        this.getData();
      },
      deep: true,
    },
    'config.loop': {
      handler(n, o) {
        if (n !== o) {
          this.confirmLoop();
        }
      },
    },
    'config.interval': {
      handler(n, o) {
        if (n !== o) {
          this.confirmLoop();
        }
      },
    },
    'config.length': {
      handler(n, o) {
        if (n !== o) {
          this.format();
        }
      },
    },
  },
  computed: {
    list() {
      const thead = this.config.cols
        .map(({ name, field: { alias } }) => ({
          name,
          cname: !alias ? name : alias,
          data: [],
        }));
      const tbody = this.config.rows
        .map(({ agg, name, field: { alias } }) => (agg ? {
          name,
          tname: `${agg}(${name})`,
          cname: !alias ? name : alias,
          data: [],
        } : {
          name,
          cname: !alias ? name : alias,
          tname: name,
          data: [],
        }));
      this.data.forEach((v) => {
        thead.forEach((th, i) => {
          const val = v[th.name];
          if (!th.data.length) {
            th.data.push({
              val,
              colspan: 1,
            });
          } else if (i > 0 && thead[i - 1].data[thead[i - 1].data.length - 1].colspan === 1) {
            th.data.push({
              val,
              colspan: 1,
            });
          } else {
            const last = th.data[th.data.length - 1];
            if (val === last.val) {
              last.colspan += 1;
            } else {
              th.data.push({
                val,
                colspan: 1,
              });
            }
          }
        });
        tbody.forEach((tb) => {
          tb.data.push(v[tb.tname]);
        });
      });
      return {
        thead, tbody,
      };
    },
  },
};
</script>

<style lang="stylus">
.chart-table {
  th {
    position: sticky;
    left: 0;
    z-index: 1;
    background: $light-blue !important;
    color: #fff;
    border-bottom: 0;
  }

  tbody th {
    background: $positive !important;
  }
}
</style>
