<template>
  <q-page class="cc-admin row">
    <viewcatalog
      class="q-mt-sm q-mb-sm q-ml-sm"
      type="ProInfo"
      @select="selectCatalog"
      v-if="this.$q.screen.gt.md"
    />
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
        :grid="$q.screen.xs"
        :selection="$q.screen.xs?'none':'multiple'"
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
                @click="exportExcel('信息发布')"
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
        <template #body-cell-name="props">
          <q-td :props="props" >
            <q-btn flat dense color="primary" :label="props.row.name"
            @click="showDetail(props.row)">
              <q-tooltip>查看详情</q-tooltip>
            </q-btn>
          </q-td>
        </template>
        <template #body-cell-opt="props">
          <q-td :props="props" :auto-width="true">
            <q-btn flat round dense color="primary" icon="edit" @click="edit(props.row)">
              <q-tooltip>编辑</q-tooltip>
            </q-btn>
            <btn-del label="信息发布" @confirm="del(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_tool column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}信息发布
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-12">
              <h5><q-icon name="star" color="red"/>选择分类：</h5>
              <catalogselect :form.sync="form" type="ProInfo" />
            </div>
            <div class="col-12">
              <h5><q-icon name="star" color="red"/>标题：</h5>
              <q-input outlined dense v-model="form.name" type="text" />
            </div>
            <div class="col-12">
              <h5>详细描述：</h5>
              <div class="row">
                <div class="col">
                  <textarea class="md-text" rows="20" v-model="form.content"/>
                </div>
                <div class="col">
                  <markdown-it-vue class="md-body" :content="form.content"/>
                </div>
              </div>
            </div>
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
                    :url="uploadAttUrl"
                    field-name="file"
                    :form-fields="[{name: 'mainId', value: this.form.id}]"
                    @uploaded="uploadedFiles"
                  />
                  <q-tooltip>
                    点击上传图片视频
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
                  <q-btn class="absolute-top text-right" dense round @click="deleteImage(f.id)"
                  icon="close" />
                  <div class="absolute-bottom text-center text-body2">{{ f.name }}</div>
                </q-img>
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
    <q-dialog v-model="dialogVisible" maximized flat persistent position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{form.name}}
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-12">
              <markdown-it-vue :content="form.content"/>
            </div>
            <q-separator class="q-ma-lg" />
            <div class="col-12 no-wrap">
              <h5>
                文章有用，我要点赞
              </h5>
              <span class="col-sm-auto col-xs-12 q-pl-xs">
                <q-btn
                  flat
                  dense
                  icon="thumb_up"
                  :label="form.upCount"
                  size="12px"
                  color="grey-6"
                  class="q-mx-sm"
                  @click="upInfo(form.id)"
                />
              </span>
            </div>
            <div class="col-12 no-wrap">
              <q-input outlined dense v-model="remark" type="text" >
                <template v-slot:after>
                  <q-btn color="primary" label="评论" @click="addRemark" />
                </template>
              </q-input>
            </div>
            <div class="col-12">
                <div v-for="re in remarkList" :key="re.id" class="text-subtitle1">
                  <cc-shadow class="q-pa-sm">
                    <q-item-section>
                      <p class="text-grey-8 q-mb-sm q-pl-xs">
                        {{re.name}}
                      </p>
                      <q-item-label class="row text-body2 text-grey-7 items-center q-gutter-x-xs">
                      <q-chip color="white" text-color="primary" class="col-auto cursor-pointer" >
                        <q-avatar size="18px">
                          <img
                            :src="$store.state.User.info.avatar"
                          />
                        </q-avatar>
                        guest
                      </q-chip>
                      <span class="col-auto q-ml-none">发布在</span>
                      <span class="col-auto text-primary cursor-pointer" >https://cc-admin.top</span >
                      <span class="col-sm-auto col-xs-12 q-pl-xs"> {{ re.createTime }} </span>
                      <span class="col-sm-auto col-xs-12 q-pl-xs">
                        <q-btn
                          flat
                          dense
                          icon="thumb_up"
                          :label="re.upCount"
                          size="12px"
                          color="grey-6"
                          class="q-mx-sm"
                          @click="upRemark(re.id)"
                        />
                      </span>
                    </q-item-label>
                    </q-item-section>
                  </cc-shadow>
                </div>
            </div>
          </div>
        </q-scroll-area>
        <div class="row justify-end q-pa-md">
          <q-btn outline color="primary" label="关闭" v-close-popup />
        </div>
      </q-form>
    </q-dialog>
    <confirm ref="confirmDialog" :msg="confirmMsg" @confirm="deleteBatch()" />
  </q-page>
</template>

<script>
import { uid } from 'quasar';
import { IndexMixin } from 'boot/mixins';
import { getDictLabel } from 'boot/dictionary';
import { requiredTest, phoneTest } from 'boot/inputTest';
import confirm from 'components/confirm';
import catalogselect from 'components/catalogselect';
import viewcatalog from 'components/viewcatalog';
import MarkdownItVue from 'markdown-it-vue';
import 'markdown-it-vue/dist/markdown-it-vue.css';
import CcShadow from 'components/ccshadow';

export default {
  name: 'ProInfo',
  mixins: [IndexMixin],
  components: {
    confirm,
    viewcatalog,
    catalogselect,
    MarkdownItVue,
    CcShadow,
  },
  data() {
    return {
      dialogVisible: false,
      remark: '',
      content: '',
      attachments: [],
      remarkList: [
      ],
      columns: [
        {
          name: 'index',
          align: 'center',
          label: '序号',
          field: 'index',
        },
        {
          name: 'name', align: 'left', label: '标题', field: 'name',
        },
        {
          name: 'catalogId_dictText', align: 'left', label: '所属分类', field: 'catalogId_dictText',
        },
        {
          name: 'readCount', align: 'left', label: '围观', field: 'readCount',
        },
        {
          name: 'upCount', align: 'left', label: '点赞数', field: 'upCount',
        },
        {
          name: 'opt', align: 'center', label: '操作', field: 'id',
        },
      ],
      showQuery: true,
      headers: [{ name: 'Authorization', value: localStorage.Authorization }],
      uploadAttUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/file/upload`,
      imgUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/static`,
      url: {
        list: '/pro/info/list',
        add: '/pro/info/add',
        edit: '/pro/info/edit',
        delete: '/pro/info/delete',
        deleteBatch: '/pro/info/deleteBatch',
        exportXlsUrl: '/pro/info/exportXls',
        importExcelUrl: '/pro/info/importExcel',
      },
    };
  },
  methods: {
    requiredTest,
    phoneTest,
    addBefore() {
      this.form.catalogId = this.catalog;
      this.form.id = uid();
      this.form.content = '';
      this.form.contactType = 'phone';
      return true;
    },
    showDetail(row) {
      this.form = row;
      this.dialogVisible = true;
      // 获取评论列表
      this.loadRemark();
    },
    loadRemark() {
      this.$axios.get(`/pro/remark/queryListByPid?pid=${this.form.id}`).then(({ result }) => {
        this.remarkList = result;
      });
    },
    upInfo(id) {
      this.$axios.post('/pro/info/upRemark', { id })
        .then((r) => {
          this.$retMsg(r);
          this.form.upCount += 1;
        });
    },
    upRemark(id) {
      this.$axios.post('/pro/remark/upRemark', { id })
        .then((r) => {
          this.$retMsg(r);
          this.loadRemark();
        });
    },
    addRemark() {
      if (this.remark === '') {
        this.$warn('请先输入评论内容！');
        return;
      }
      this.$axios.post('/pro/remark/add', { pid: this.form.id, name: this.remark, upCount: 0 })
        .then((r) => {
          this.$retMsg(r);
          this.remark = '';
          this.loadRemark();
        });
    },
    selectCatalog(n) {
      this.catalog = n;
      this.query();
    },
    getDictLabel,
    selectFiles() {
      this.$refs.fileUploader.pickFiles();
    },
    editAfter() {
      this.queryImages();
    },
    uploadedFiles({ xhr }) {
      const response = JSON.parse(xhr.responseText);
      if (response.success) {
        this.$q.notify('上传成功');
        this.queryImages();
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
    queryImages() {
      this.$axios.get(`/sys/file/listByMainId?mainId=${this.form.id}`).then(({ result }) => {
        this.attachments = result;
      });
    },
    deleteImage(id) {
      this.$axios.delete(`/sys/file/delete?id=${id}`).then((r) => {
        this.$info(r.message);
      }).finally(() => {
        this.queryImages();
      });
    },
    initDict() {
    },
  },
  mounted() {
    this.initDict();
  },
  computed: {
    imgList() {
      return this.attachments.filter((f) => f.type === 'image');
    },
  },
};
</script>

<style lang="stylus">
.pro-custom-toggle
  border: 1px solid #027be3
.container {
  display: inline-flex;
  width: 100%;
}
.md-text {
  width: 100%;
}
.md-body {
  width: 500%;
  margin-left: 20px;
}
</style>
