<template>
  <q-page class="cc-admin">
    <div class="col bg-white shadow-2 q-pa-md q-ma-sm">
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
              <q-btn
                outline
                icon="mdi-image-plus"
                no-wrap
                color="primary"
                label="文件上传"
                @click="upload"
              />
              <q-btn outline icon="add" no-wrap color="primary" label="新建" @click="add" />
              <q-btn
                outline
                color="primary"
                label="切换全屏"
                no-wrap
                v-if="$q.screen.gt.md"
                @click="table.toggleFullscreen"
                :icon="table.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              />
              <q-btn-dropdown
                outline
                color="primary"
                label="自选列"
                icon="view_list"
                no-wrap
                v-if="$q.screen.gt.md"
              >
                <q-list>
                  <q-item tag="label" v-for="item in columns" :key="item.name">
                    <q-item-section avatar>
                      <q-checkbox v-model="group" :val="item.name" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{item.label}}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
              <q-btn
                outline
                no-wrap
                v-if="$q.screen.gt.sm"
                label="导入"
                icon="mdi-cloud-upload-outline"
                :loading="importing"
                color="primary"
                @click="importExcel"
              >
                <q-uploader
                  auto-upload
                  ref="excelUploader"
                  :max-files="1"
                  class="hidden"
                  :url="importExcelUrlFull"
                  field-name="file"
                  :headers="[{name: 'authorization', value: $store.state.User.authorization}]"
                  @uploaded="importedExcel"
                />
              </q-btn>
              <q-btn
                outline
                no-wrap
                v-if="$q.screen.gt.sm"
                :loading="exporting"
                label="导出"
                icon="mdi-cloud-download-outline"
                color="primary"
                @click="exportExcel('文件管理')"
              />
              <q-btn
                :disable="selected.length === 0"
                outline
                no-wrap
                v-if="$q.screen.gt.md"
                color="primary"
                label="批量删除"
                @click="showConfirm()"
                icon="mdi-delete-variant"
              />
            </q-btn-group>
          </div>
        </template>
        <template #body-cell-opt="props">
          <q-td :props="props" :auto-width="true">
            <q-btn flat round dense color="primary" icon="edit" @click="edit(props.row)">
              <q-tooltip>编辑</q-tooltip>
            </q-btn>
            <btn-del label="文件管理" @confirm="del(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}文件管理
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-12">
              <h5>名称：</h5>
              <q-input outlined dense v-model="form.name" type="text" />
            </div>
            <div class="col-12">
              <h5>类型：</h5>
              <q-input outlined dense v-model="form.type" type="text" />
            </div>
            <div class="col-12">
              <h5>主表编号：</h5>
              <q-input outlined dense v-model="form.mainId" type="text" />
            </div>
            <div class="col-12">
              <h5>文件路径：</h5>
              <q-input outlined dense v-model="form.path" type="text" />
            </div>
            <div class="col-12">
              <h5>排序：</h5>
              <q-input outlined dense v-model="form.sortOrder" type="number" />
            </div>
          </div>
        </q-scroll-area>
        <div class="row justify-end q-pa-md">
          <q-btn outline color="primary" icon="mdi-close-thick" label="关闭" v-close-popup />
          <q-btn class="q-mx-sm" color="primary" icon="mdi-check-bold" label="提交" type="submit" />
        </div>
      </q-form>
    </q-dialog>
    <q-dialog maximized flat persistent ref="dialogUpload" position="right">
      <q-form @submit="doUpload" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}文件上传
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-12">
              <q-btn label="上传图片" @click="selectFiles">
                  <q-uploader
                    auto-upload
                    ref="fileUploader"
                    :max-files="1"
                    class="hidden"
                    fieldName="file"
                    :headers="headers"
                    accept="*"
                    :url="uploadUrl"
                    field-name="file"
                    :form-fields="[{name: 'mainId', value: mainId},{name: 'type', value: type}]"
                    @uploaded="uploadedFiles"
                  />
                  <q-tooltip>
                    点击上传图片
                  </q-tooltip>
                </q-btn>
            </div>
            <div class="col-12">
              <div class="q-gutter-md row items-start">
                <q-img
                  v-for="f in imgList"
                  :key="f.id"
                  transition="fade"
                  :src="imagePath(f.path)"
                  style="width: 150px"
                  ratio="1"
                  spinner-color="white"
                  class="rounded-borders"
                >
                  <div class="absolute-bottom text-center text-body2">{{ f.name }}</div>
                </q-img>
              </div>
            </div>
            <div class="col-12 q-mt-sm">
              <div class="q-gutter-md row items-start">
                <video
                  v-for="f in videoList"
                  :key="f.id" width="320" height="240" controls="controls" autoplay="autoplay">
                  <source :src="imagePath(f.path)" type="video/mp4" />{{f.name}}
                </video>
              </div>
            </div>
          </div>
        </q-scroll-area>
        <div class="row justify-end q-pa-md">
          <q-btn outline color="primary" icon="mdi-close-thick" label="关闭" v-close-popup />
          <q-btn class="q-mx-sm" color="primary" icon="mdi-check-bold" label="提交" type="submit" />
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

export default {
  name: 'SysFile',
  mixins: [IndexMixin],
  components: {
    confirm,
  },
  data() {
    return {
      mainId: '123456',
      type: 'img',
      headers: [{ name: 'Authorization', value: localStorage.Authorization }],
      uploadUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/file/upload`,
      imgUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/static`,
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
          name: 'type', align: 'left', label: '类型', field: 'type',
        },
        {
          name: 'mainId', align: 'left', label: '主表编号', field: 'mainId',
        },
        {
          name: 'path', align: 'left', label: '文件路径', field: 'path',
        },
        {
          name: 'sortOrder', align: 'left', label: '排序', field: 'sortOrder',
        },
        {
          name: 'opt', align: 'center', label: '操作', field: 'opt',
        },
      ],
      showQuery: true,
      url: {
        list: '/sys/file/list',
        add: '/sys/file/add',
        edit: '/sys/file/edit',
        delete: '/sys/file/delete',
        deleteBatch: '/sys/file/deleteBatch',
        exportXlsUrl: '/sys/file/exportXls',
        importExcelUrl: '/sys/file/importExcel',
      },
      picUrl: 'https://placeimg.com/500/300/nature',
      transitions: [
        'slide-right',
        'slide-left',
        'slide-up',
        'slide-down',
        'fade',
        'scale',
        'rotate',
        'flip-right',
        'flip-left',
        'flip-up',
        'flip-down',
        'jump-right',
        'jump-left',
        'jump-up',
        'jump-down',
      ],
    };
  },
  methods: {
    getDictLabel,
    initDict() {
    },
    upload() {
      this.$refs.dialogUpload.show();
    },
    doUpload() {

    },
    trigger() {
      this.picUrl = `https://placeimg.com/500/300/nature?t=${Math.random()}`;
    },
    selectFiles() {
      this.$refs.fileUploader.pickFiles();
    },
    uploadedFiles({ xhr }) {
      const response = JSON.parse(xhr.responseText);
      if (response.success) {
        this.form.avatar = response.message;
        this.$q.notify('上传成功');
        this.query();
      } else {
        this.$q.notify({
          color: 'red',
          message: '上传失败',
        });
      }
      this.$refs.fileUploader.removeUploadedFiles();
    },
    imagePath(src) {
      let path = '';
      if (src) {
        if (src.startsWith('http')) {
          return src;
        }
        path = `${this.imgUrl}/${src}`;
      }
      return path;
    },
  },
  mounted() {
    this.initDict();
  },
  computed: {
    imgList() {
      return this.list.filter((f) => f.type === 'image');
    },
    videoList() {
      return this.list.filter((f) => f.type === 'video');
    },
  },
};
</script>

<style lang="stylus"></style>
