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
      <q-form @submit="submit" class="dialog_card column">
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
              <h5><q-icon name="star" color="red"/>联系人：</h5>
              <q-input outlined dense v-model="form.contactUser" type="text"
              :rules="[requiredTest]"/>
            </div>
            <div class="col-12">
              <h5><q-icon name="star" color="red"/>联系方式：</h5>
              <q-btn-toggle
                class="pro-custom-toggle"
                v-model="form.contactType"
                spread
                no-caps
                rounded
                unelevated
                toggle-color="primary"
                color="white"
                text-color="primary"
                :options="[
                  {label: '手机号', value: 'phone'},
                  {label: '微信', value: 'wechat'},
                  {label: 'QQ', value: 'qq'}
                ]"
              />
            </div>
            <div class="col-12" v-if="form.contactType==='phone'">
              <h5>手机号：</h5>
              <q-input outlined dense v-model="form.phone" type="text"
              :rules="[phoneTest]"/>
            </div>
            <div class="col-12" v-if="form.contactType==='wechat'">
              <h5>微信：</h5>
              <q-input outlined dense v-model="form.wechat" type="text"/>
            </div>
            <div class="col-12" v-if="form.contactType==='qq'">
              <h5>QQ：</h5>
              <q-input outlined dense v-model="form.qq" type="text"/>
            </div>
            <div class="col-12">
              <h5><q-icon name="star" color="red"/>标题：</h5>
              <q-input outlined dense v-model="form.name" type="text" />
            </div>
            <div class="col-12">
              <h5>详细描述：</h5>
              <q-input outlined dense v-model="form.content" type="text" />
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
          <q-btn outline color="primary" icon="mdi-close-thick" label="关闭" v-close-popup />
          <q-btn class="q-mx-sm" color="primary" icon="mdi-check-bold" label="提交" type="submit" />
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

export default {
  name: 'ProInfo',
  mixins: [IndexMixin],
  components: {
    confirm,
    viewcatalog,
    catalogselect,
  },
  data() {
    return {
      attachments: [],
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
          name: 'content', align: 'left', label: '详细描述', field: 'content',
        },
        {
          name: 'contactType', align: 'left', label: '联系方式', field: 'contactType',
        },
        {
          name: 'contactUser', align: 'left', label: '联系人', field: 'contactUser',
        },
        {
          name: 'phone', align: 'left', label: '手机号', field: 'phone',
        },
        {
          name: 'wechat', align: 'left', label: '微信', field: 'wechat',
        },
        {
          name: 'qq', align: 'left', label: 'QQ', field: 'qq',
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
          name: 'status', align: 'left', label: '状态', field: 'status',
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
      this.form.contactType = 'phone';
      return true;
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
</style>
