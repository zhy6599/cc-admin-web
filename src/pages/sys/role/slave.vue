<template>
  <div class="row">
    <div class="col column">
      <q-table
        flat
        color="primary"
        class="cross_table"
        separator="cell"
        :columns="columns"
        :data="list"
        row-key="id"
        :pagination.sync="pagination"
        :visible-columns="group"
        @request="query"
        :rows-per-page-options="[10,20,50,100]"
        :loading="loading"
        :grid="$q.screen.xs"
        :selection="$q.screen.xs?'none':'multiple'"
        :selected.sync="selected"
      >
        <template #top-left>
          <div class="row no-wrap">
            <div class="row items-center">
              <q-input
                outlined
                dense
                placeholder="请输入关键字搜索"
                class="on-left"
                clearable
                @input="query"
                debounce="500"
                v-model="key"
              ></q-input>
            </div>
          </div>
        </template>
        <template #top-right>
          <div class="q-gutter-sm">
            <q-btn color="primary" label="添加" @click="addData" />
            <q-btn
              :disable="selected.length === 0"
              color="negative"
              label="删除"
              @click="showConfirm()"
            />
          </div>
        </template>
        <template #body-cell-opt="props">
          <q-td :props="props" :auto-width="true">
            <btn-del label="删除" @confirm="del(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
    <tableselect ref="tableSelect" :columns="tableSelectColumns" :url="tableSelectUrl"
    @saveSelect="saveSelect" :selectQueryParam="selectQueryParam"/>
    <confirm ref="confirmDialog" :msg="confirmMsg" @confirm="deleteBatch()" />
  </div>
</template>

<script>
import { IndexMixin } from 'boot/mixins';
import confirm from 'components/confirm';
import tableselect from 'components/tableselect';

export default {
  name: 'SysRoleSlave',
  mixins: [IndexMixin],
  components: {
    confirm,
    tableselect,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      columns: [
        {
          name: 'username',
          align: 'left',
          label: '用户账号',
          field: 'username',
        },
        {
          name: 'realname',
          align: 'left',
          label: '用户名称',
          field: 'realname',
        },
        {
          name: 'status_dictText',
          align: 'left',
          label: '状态',
          field: 'status_dictText',
        },
        {
          name: 'opt', align: 'center', label: '操作', field: 'id',
        },
      ],
      url: {
        list: '/sys/userRole/list',
        add: '/sys/userRole/add',
        delete: '/sys/userRole/delete',
        deleteBatch: '/sys/userRole/deleteBatch',
      },
      tableSelectColumns: [
        {
          name: 'username',
          align: 'left',
          label: '用户账号',
          field: 'username',
        },
        {
          name: 'realname',
          align: 'left',
          label: '用户名称',
          field: 'realname',
        },
        {
          name: 'status_dictText',
          align: 'left',
          label: '状态',
          field: 'status_dictText',
        },
      ],
      tableSelectUrl: {
        list: '/sys/userRole/list',
      },
    };
  },
  methods: {
    addData() {
      this.$refs.tableSelect.show();
    },
    queryParam() {
      return {
        roleId: this.id,
        selected: true,
      };
    },
    saveSelect(records) {
      const userRoleList = [];
      if (records.length > 0) {
        records.forEach((rec) => {
          userRoleList.push({
            userId: rec.id,
            roleId: this.id,
          });
        });
        this.$axios.post(this.url.add, userRoleList).then((r) => {
          this.$info(r.message);
          this.$refs.tableSelect.hide();
        }).finally(() => {
          this.query();
        });
      } else {
        this.$refs.tableSelect.hide();
      }
    },
    del({ id }) {
      this.loading = true;
      return this.$axios.delete(this.url.delete, { params: { userId: id, roleId: this.id } })
        .then((r) => {
          this.$info(r.message);
        }).finally(() => {
          this.query();
        });
    },
    deleteBatch() {
      this.loading = true;
      const ids = [];
      this.selected.forEach(({ id }) => { ids.push({ userId: id, roleId: this.id }); });
      return this.$axios.post(this.url.deleteBatch, ids).then((r) => {
        this.$info(r.message);
        this.selected = [];
      }).finally(() => {
        this.query();
      });
    },
  },
  mounted() {
  },
  computed: {
    selectQueryParam() {
      return {
        roleId: this.id,
        selected: false,
      };
    },
  },
};
</script>

<style lang="stylus"></style>
