<template>
  <q-page class="cc-admin row">
    <viewcatalog
      class="q-mt-sm q-mb-sm q-ml-sm"
      type="BiScreen"
      @select="selectCatalog"
    />
    <div class="col column bg-white shadow-2 q-pa-md q-ma-sm">
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
        selection="multiple"
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
              >
                <template #append>
                  <q-btn
                    flat
                    round
                    icon="search"
                    color="primary"
                    @click="query"
                    :loading="loading"
                  >
                    <q-tooltip>搜索</q-tooltip>
                  </q-btn>
                </template>
              </q-input>
            </div>
          </div>
        </template>
        <template #top-right="table">
          <q-btn-group outline>
            <q-btn
              outline
              icon="add"
              color="primary"
              label="新建电子报告"
              @click="add"
            />
            <q-btn
              outline
              color="primary"
              label="切换全屏"
              @click="table.toggleFullscreen"
              :icon="table.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            />
            <q-btn-dropdown
              outline
              color="primary"
              label="自选列"
              icon="view_list"
            >
              <q-list>
                <q-item
                  tag="label"
                  v-for="item in columns"
                  :key="item.name"
                >
                  <q-item-section avatar>
                    <q-checkbox
                      v-model="group"
                      :val="item.name"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{item.label}}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-btn
              :disable="selected.length === 0"
              outline
              color="primary"
              label="批量删除"
              @click="showConfirm()"
              icon="mdi-delete-variant"
            />
          </q-btn-group>
        </template>

        <template #body-cell-opt="props">
          <q-td
            :props="props"
            :auto-width="true"
          >
            <q-btn
              flat
              round
              dense
              type="a"
              target="_blank"
              :href="`/screen/design?id=${props.row.id}`"
              color="primary"
              icon="mdi-image-edit-outline"
            >
              <q-tooltip>代码设计</q-tooltip>
            </q-btn>
            <q-btn
              flat
              round
              dense
              color="primary"
              icon="mdi-laptop"
              @click="viewScreen(props.row)"
            >
              <q-tooltip>原尺寸查看</q-tooltip>
            </q-btn>
            <q-btn
              flat
              round
              dense
              color="primary"
              icon="mdi-desktop-mac-dashboard"
              @click="viewFullScreen(props.row)"
            >
              <q-tooltip>全屏查看</q-tooltip>
            </q-btn>
            <q-btn
              flat
              round
              dense
              color="primary"
              icon="mdi-content-copy"
              @click="copy(props.row)"
            >
              <q-tooltip>复制</q-tooltip>
            </q-btn>
            <q-btn
              flat
              round
              dense
              color="primary"
              icon="edit"
              @click="edit(props.row)"
            >
              <q-tooltip>编辑</q-tooltip>
            </q-btn>
            <btn-del
              label="电子报告"
              @confirm="del(props.row)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog
      maximized
      flat
      persistent
      ref="dialog"
      position="right"
    >
      <q-form
        @submit="submit"
        class="dialog_card column"
      >
        <h5 class="view_title justify-between q-px-md">
          {{editType}}电子报告
          <q-btn
            dense
            outline
            round
            icon="clear"
            size="sm"
            v-close-popup
          />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-12">
              <h5> 名称：</h5>
              <q-input
                outlined
                dense
                v-model="form.name"
                type="text"
              />
            </div>
            <div class="col-12">
              <h5> 描述：</h5>
              <q-input
                outlined
                dense
                v-model="form.description"
                type="text"
              />
            </div>
            <div class="col-12">
              <h5> 目录编号：</h5>
              <catalogselect
                :form.sync="form"
                type="BiScreen"
              />
            </div>
          </div>
        </q-scroll-area>
        <div class="row justify-end q-pa-md">
          <q-btn
            outline
            color="primary"
            label="取消"
            v-close-popup
          />
          <q-btn
            unelevated
            color="primary"
            class="on-right"
            label="提交"
            type="submit"
          />
        </div>
      </q-form>
    </q-dialog>
    <confirm
      ref="confirmDialog"
      :msg="confirmMsg"
      @confirm="deleteBatch()"
    />
  </q-page>
</template>

<script>
import { IndexMixin } from 'boot/mixins';
import { getDictLabel } from 'boot/dictionary';
import confirm from 'components/confirm';
import catalogselect from 'components/catalogselect';
import viewcatalog from 'components/viewcatalog';

export default {
  name: 'BiScreen',
  mixins: [IndexMixin],
  components: {
    confirm,
    viewcatalog,
    catalogselect,
  },
  data() {
    return {
      columns: [
        {
          name: 'index',
          align: 'center',
          label: '序号',
          field: 'index',
        },
        {
          name: 'name', align: 'left', label: '名称', field: 'name',
        },
        {
          name: 'description', align: 'left', label: '描述', field: 'description',
        },
        {
          name: 'catalogId_dictText', align: 'left', label: '目录编号', field: 'catalogId_dictText',
        },
        {
          name: 'opt', align: 'center', label: '操作', field: 'id',
        },
      ],
      url: {
        list: '/bi/screen/list',
        add: '/bi/screen/add',
        copy: '/bi/screen/copy',
        edit: '/bi/screen/edit',
        delete: '/bi/screen/delete',
        deleteBatch: '/bi/screen/deleteBatch',
        exportXlsUrl: '/bi/screen/exportXls',
        importExcelUrl: '/bi/screen/importExcel',
      },
    };
  },
  methods: {
    addBefore() {
      this.form.catalogId = this.catalog;
      return true;
    },
    design(t) {
      this.$refs.edit.show(t.id);
    },
    selectCatalog(n) {
      this.catalog = n;
      this.query();
    },
    getDictLabel,
    initDict() {
    },
    viewScreen({ id }) {
      const { href } = this.$router.resolve({
        path: `/view?id=${id}`,
      });
      window.open(href, '_blank');
    },
    viewFullScreen({ id }) {
      const { href } = this.$router.resolve({
        path: `/viewfull?id=${id}`,
      });
      window.open(href, '_blank');
    },
    copy(p) {
      this.$q.dialog({
        title: '复制电子报告',
        message: '请输入电子报告名字',
        prompt: {
          model: '',
          outlined: true,
          isValid: (val) => val.length > 2,
          type: 'text',
        },
        cancel: true,
        persistent: true,
      }).onOk((data) => {
        this.$axios.post(`${this.url.copy}?id=${p.id}&name=${data}`, {}).then((r) => {
          this.$info(r.message);
          this.query();
        });
      });
    },
  },
  mounted() {
    this.initDict();
  },
};
</script>

<style lang="stylus"></style>
