<template>
  <q-page class="cc-admin row">
    <div class="col bg-white shadow-2 q-pa-md q-ma-sm">
      <q-table
        flat
        grid
        color="primary"
        class="cross_table"
        separator="cell"
        :columns="columns"
        :data="list"
        row-key="id"
        :pagination.sync="pagination"
        :visible-columns="group"
        @request="query"
        :rows-per-page-options="[12,24,48,60]"
        :loading="loading"
        selection="multiple"
        :selected.sync="selected"
      >
        <template v-slot:top="table">
          <div class="row no-wrap full-width">
            <q-input
              clearable
              outlined
              dense
              placeholder="请输入关键字搜索"
              class="on-left"
              @input="query"
              debounce="500"
              v-model="key"
            >
              <template #append>
                <q-btn flat round icon="search" color="primary" @click="query" :loading="loading">
                  <q-tooltip>搜索</q-tooltip>
                </q-btn>
              </template>
            </q-input>
            <q-space />
            <q-btn-group outline>
              <q-btn outline no-wrap icon="add" color="primary" label="新建" @click="add" />
              <q-btn
                outline
                color="primary"
                label="切换全屏"
                no-wrap
                v-if="$q.screen.gt.md"
                @click="table.toggleFullscreen"
                :icon="table.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              />
            </q-btn-group>
          </div>
        </template>
        <template v-slot:item="props">
          <div class="q-pa-xs col-lg-2 col-md-4 col-sm-12">
            <q-card>
              <q-card-section class="text-center">
                <q-img
                  :src="imagePath(props.row.imageUrl)"
                  spinner-color="white"
                  class="screen-image"
                >
                  <div class="absolute-bottom text-subtitle1 text-center">
                    {{ props.row.name }}
                  </div>
                </q-img>
              </q-card-section>
              <q-separator />
              <q-card-section class="flex flex-center" >
                <div>
                  <q-btn
                    flat
                    round
                    dense
                    type="a"
                    target="_blank"
                    :href="`/#/screen/design?id=${props.row.id}`"
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
                  <q-btn flat round dense color="primary" icon="edit" @click="edit(props.row)">
                    <q-tooltip>编辑</q-tooltip>
                  </q-btn>
                  <btn-del label="电子报告" @confirm="del(props.row)" />
                  </div>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>
    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}电子报告
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-12">
              <h5>名称：</h5>
              <q-input outlined dense v-model="form.name" type="text" />
            </div>
            <div class="col-12">
              <h5>描述：</h5>
              <q-input outlined dense v-model="form.description" type="text" />
            </div>
            <div class="col-12">
              <h5>目录编号：</h5>
              <catalogselect :form.sync="form" type="BiScreen" />
            </div>
            <div class="col-12">
              <h5>封面图片：</h5>
              <div class="row wrap justify-center items-center content-center">
                <q-btn round @click="importImage">
                  <q-avatar square size="200px">
                    <q-img class="screen-image" :src="imagePath(form.imageUrl)" />
                  </q-avatar>
                  <q-uploader
                    auto-upload
                    ref="imageUploader"
                    :max-files="1"
                    class="hidden"
                    fieldName="file"
                    :headers="headers"
                    accept="image/*"
                    :url="uploadUrl"
                    field-name="file"
                    @uploaded="importedImage"
                  />
                  <q-tooltip>
                    点击上传图片
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </div>
        </q-scroll-area>
        <div class="row justify-end q-pa-md">
          <q-btn outline color="primary" label="取消" v-close-popup />
          <q-btn unelevated color="primary" class="on-right" label="提交" type="submit" />
        </div>
      </q-form>
    </q-dialog>
    <confirm ref="confirmDialog" :msg="confirmMsg" @confirm="deleteBatch()" />
  </q-page>
</template>

<script>
import { IndexMixin } from 'boot/mixins';
import { getDictLabel } from 'boot/dictionary';
import confirm from 'components/confirm';
import catalogselect from 'components/catalogselect';

export default {
  name: 'BiScreen',
  mixins: [IndexMixin],
  components: {
    confirm,
    catalogselect,
  },
  data() {
    return {
      headers: [{ name: 'Authorization', value: localStorage.Authorization }],
      uploadUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/upload`,
      imgUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/static`,
      pagination: {
        page: 1,
        rowsPerPage: 12,
        rowsNumber: 99,
      },
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
    importImage() {
      this.$refs.imageUploader.pickFiles();
    },
    importedImage({ xhr }) {
      const response = JSON.parse(xhr.responseText);
      if (response.success) {
        this.form.imageUrl = response.message;
        this.$q.notify('上传成功');
      } else {
        this.$q.notify({
          color: 'red',
          message: '上传失败',
        });
      }
      this.$refs.imageUploader.removeUploadedFiles();
    },
    selectFiles() {
      this.$refs.fileUploader.pickFiles();
    },
    imagePath(src) {
      let path = '';
      if (src) {
        if (src.startsWith('http')) {
          return src;
        }
        path = `${this.imgUrl}/${src}`;
      } else {
        path = '/img/bi/empty-chart.jpg';
      }
      return path;
    },
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
  watch: {
  },
  computed: {
  },
};
</script>

<style lang="stylus">
.screen-image
  height 200px
  width 200px
</style>
