<template>
  <div class="q-pa-md bg-white shadow-4 col column">
    <q-splitter class=" col column" v-model="splitterModel" unit="px" horizontal>
      <template v-slot:before>
        <div class="row no-wrap items-center">
          <div class="col-3 text-subtitle1" v-if="$q.screen.gt.md">家谱管理</div>
          <q-space />
          <div class="col row q-gutter-sm justify-end">
            <q-btn-group outline>
              <q-btn outline no-wrap icon="add" color="primary" v-auth="'maintain:add'"
              v-if="catalogList.length === 0" @click="addCatalog()">
              <q-tooltip>
                  添加祖宗
                </q-tooltip>
              </q-btn>
              <q-btn outline no-wrap icon="add" color="primary" v-auth="'maintain:add'"
              @click="addCatalog('son')" >
              <q-tooltip>
                  添加子女
                </q-tooltip>
              </q-btn>
              <q-btn outline no-wrap icon="edit" color="primary" v-auth="'maintain:edit'"
              @click="updateCatalog()" >
              <q-tooltip>
                  编辑
                </q-tooltip>
              </q-btn>
              <q-btn outline no-wrap icon="delete" color="primary" v-auth="'maintain:delete'"
              :disable="selected ===''"
              @click="showConfirm()" >
              <q-tooltip>
                  删除
                </q-tooltip>
              </q-btn>
              <q-btn
                outline
                no-wrap
                :loading="exporting"
                icon="mdi-cloud-download-outline"
                color="primary"
                @click="exportWord()"
                v-auth="'maintain:export'"
              >
              <q-tooltip>
                  导出
                </q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </div>
      </template>
      <template v-slot:after>
        <div class="col column q-gutter-sm full-height">
          <q-input ref="filter" outlined dense v-model="filter" placeholder="查找人员" >
            <template v-slot:append>
              <q-icon
                v-if="filter !== ''"
                name="clear"
                class="cursor-pointer"
                @click="resetFilter"
              />
            </template>
          </q-input>
          <q-scroll-area horizontal class="col column">
            <q-tree
              class="col column"
              ref="qTree"
              :nodes="allCatalogList"
              node-key="id"
              label-key="name"
              selected-color="primary"
              :selected.sync="selected"
              :filter="filter"
              :filter-method="filterPerson"
              :expanded.sync="expanded"
              @update:selected="select"
            >
              <template v-slot:default-header="prop">
                <div class="row items-center tree-person"
                :class="prop.node.isSon!=='1'?'text-cyan-5':''">
                  {{toChinesNum(prop.node.oid)}}世
                  <div class="q-mx-sm">
                    <b class="q-mr-sm">{{ prop.node.name }}</b>
                    <span v-if="prop.node.wife">({{ prop.node.wife }})</span>
                  </div>
                </div>
              </template>
            </q-tree>
          </q-scroll-area>
        </div>
      </template>
    </q-splitter>
    <q-dialog maximized flat persistent ref="dialogCatalog" position="right">
      <q-form @submit="submitCatalog" ref="popform" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}人员信息
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-6" v-if="form.pid !== '-1'">
              <h5>父亲：</h5>
              <q-input outlined readonly dense v-model="form.pName" type="text" />
            </div>
            <div class="col-6">
              <h5>子女：</h5>
              <q-btn-toggle
                v-model="form.isSon"
                spread
                no-caps
                toggle-color="primary"
                :options="[
                  {label: '儿子', value: '1'},
                  {label: '女儿', value: '0'}
                ]"
              />
            </div>
            <div class="col-6">
              <h5>姓名：</h5>
              <q-input outlined dense autofocus v-model="form.name" type="text" />
            </div>
            <div class="col-6">
              <h5>{{form.isSon === '1'?'妻':'女婿'}}：</h5>
              <q-input outlined dense v-model="form.wife" type="text" />
            </div>
            <div class="col-12" v-show="false">
              <h5>父编号：</h5>
              <q-input outlined dense v-model="form.pid" type="text" />
            </div>
            <div class="col-12" v-show="false">
              <h5>层级：</h5>
              <q-input outlined dense v-model="form.oid" type="number" />
            </div>
            <div class="col-6">
              <h5>居住地：</h5>
              <q-select outlined dense emit-value v-model="form.live" map-options :options="live" />
            </div>
            <div class="col-6">
              <h5>准确：</h5>
              <q-select outlined dense emit-value v-model="form.sure" map-options :options="yn" />
            </div>
            <div class="col-6">
              <h5>身份证号：</h5>
              <q-input outlined dense v-model="form.idCard" type="text" />
            </div>
            <div class="col-6">
              <h5>联系电话：</h5>
              <q-input outlined dense v-model="form.phone" type="text" />
            </div>

            <div class="col-6 q-mb-md">
              <h5>生平简介：</h5>
              <q-input outlined dense v-model="form.remark" type="textarea" />
            </div>
            <div class="col-6">
              <h5>头像：</h5>
              <div class="row wrap justify-center items-center content-center">
                <q-btn round @click="importAvatar">
                  <q-avatar size="100px">
                    <q-img style="width:100px;height:100px;" :src="imagePath(form.pic)"></q-img>
                  </q-avatar>
                  <q-uploader
                    auto-upload
                    ref="avatarUploader"
                    :max-files="1"
                    class="hidden"
                    fieldName="file"
                    :headers="headers"
                    accept="image/*"
                    :url="uploadUrl"
                    field-name="file"
                    @uploaded="importedAvatar"
                  />
                  <q-tooltip>
                    点击上传图片
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
            <div class="col-6">
              <h5>生于：</h5>
              <q-field outlined dense v-model="form.born">
                <template v-slot:control>{{form.born}}</template>
                <template v-slot:append>
                  <q-btn flat dense round color="primary" icon="today">
                    <q-popup-proxy>
                      <q-date v-model="form.born" mask="YYYY-MM-DD" />
                    </q-popup-proxy>
                  </q-btn>
                </template>
              </q-field>
            </div>
            <div class="col-6">
              <h5>卒于：</h5>
              <q-field outlined dense v-model="form.dead">
                <template v-slot:control>{{form.dead}}</template>
                <template v-slot:append>
                  <q-btn flat dense round color="primary" icon="today">
                    <q-popup-proxy>
                      <q-date v-model="form.dead" mask="YYYY-MM-DD" />
                    </q-popup-proxy>
                  </q-btn>
                </template>
              </q-field>
            </div>
            <div class="col-6">
              <h5>排行（老大1，老二2）：</h5>
              <q-input outlined dense v-model="form.sortBy" type="number" />
            </div>
            <div class="col-6">
              <h5>坟经纬度：</h5>
              <q-input outlined dense v-model="form.lonlat" type="text" />
            </div>
            <div class="col-12">
              <q-btn label="上传图片视频" @click="selectFiles">
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
    <confirm ref="confirmDialog" :msg="confirmMsg" @confirm="delCatalog()" />
  </div>
</template>

<script>
import { getDictLabel } from 'boot/dictionary';
import confirm from 'components/confirm';
import { requiredTest, phoneTest } from 'boot/inputTest';

export default {
  name: 'AncestorMaintain',
  components: {
    confirm,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      form: {
        pid: '',
        isSon: '1',
        oid: 1,
        sortBy: 1,
        pName: '',
        name: '',
        wife: '',
        sure: '',
        remark: '',
        pic: '',
        video: '',
        born: '',
        dead: '',
        lonlat: '',
        idCard: '',
        phone: '',
      },
      headers: [{ name: 'Authorization', value: localStorage.Authorization }],
      uploadUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/upload`,
      uploadAttUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/file/upload`,
      imgUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/static`,
      filter: '',
      expanded: [],
      attachments: [],
      addType: 'son',
      exporting: false,
      live: [],
      yn: [{ value: '1', label: '是' }, { value: '0', label: '否' }],
      levelName: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十'],
      splitterModel: 30,
      checking: false,
      loading: false,
      selected: '',
      confirmMsg: '',
      editType: '',
      allCatalogList: [],
      catalogList: [],
      catalog: {
        id: 0,
        name: '',
        type: '',
        pid: '-1',
      },
      columns: [
        {
          name: 'index',
          align: 'center',
          label: '序号',
          field: 'index',
        },
        {
          name: 'name', align: 'left', label: '姓名', field: 'name',
        },
        {
          name: 'pid', align: 'left', label: '上级编号', field: 'pid',
        },
        {
          name: 'wife', align: 'left', label: '妻子', field: 'type',
        },
        {
          name: 'opt', align: 'center', label: '操作', field: 'id',
        },
      ],
    };
  },
  methods: {
    requiredTest,
    phoneTest,
    getDictLabel,
    importAvatar() {
      this.$refs.avatarUploader.pickFiles();
    },
    importedAvatar({ xhr }) {
      const response = JSON.parse(xhr.responseText);
      if (response.success) {
        this.form.pic = response.message;
        this.$q.notify('上传成功');
      } else {
        this.$q.notify({
          color: 'red',
          message: '上传失败',
        });
      }
      this.$refs.avatarUploader.removeUploadedFiles();
    },
    selectFiles() {
      this.$refs.fileUploader.pickFiles();
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
    initDict() {
      this.$axios.get('/sys/dictItem/selectItemsByDictCode?dictCode=live').then((r) => {
        this.live = r;
      });
    },
    filterPerson(node, filter) {
      const filt = filter.toLowerCase();
      return node.name && node.name.indexOf(filt) > -1;
    },
    resetFilter() {
      this.filter = '';
      this.$refs.filter.focus();
    },
    select(n) {
      if (n) {
        this.selected = n;
        const selNode = this.$refs.qTree.getNodeByKey(n);
        if (selNode.pid && selNode.pid !== '-1') {
          const parentNode = this.$refs.qTree.getNodeByKey(selNode.pid);
          if (parentNode) {
            selNode.pName = parentNode.name;
          }
        }
        selNode.liveName = getDictLabel(this.live, selNode.live);

        this.$emit('select', selNode);
      }
    },
    showConfirm() {
      this.confirmMsg = '确认删除条记录吗？';
      this.$refs.confirmDialog.show();
    },
    query() {
      this.$axios.get('/jp/person/queryTreeList').then(({ result }) => {
        this.catalogList = result;
        this.select(this.selected);
      }).finally(() => {
        this.loading = false;
      });
    },
    addCatalog(type) {
      this.addType = type;
      if (type === 'son') {
        if (!this.selected) {
          this.$warn('请先父节点');
          return;
        }
        const selNode = this.$refs.qTree.getNodeByKey(this.selected);
        if (selNode.isSon === '0') {
          this.$warn('女儿不能添加子节点');
          return;
        }
        this.form.name = '';
        this.form.born = '';
        this.form.dead = '';
        this.form.remark = '';
        this.form.pic = '';
        this.form.live = selNode.live;
        this.form.pid = this.selected;
        this.form.oid = selNode.oid + 1;
        this.form.pName = selNode.name;
        this.form.sortBy = selNode.children.length + 1;
        this.form.idCard = '';
        this.form.phone = '';
        this.form.lonlat = '';
        this.form.video = '';
      } else {
        this.form.pid = '-1';
        this.form.oid = 1;
        this.form.sortBy = 1;
        this.form.pName = '';
      }
      this.mainId = this.id;
      this.form.wife = '';
      this.form.isSon = '1';
      this.form.sure = '1';
      this.editType = '新建';
      this.$refs.dialogCatalog.show();
      this.$nextTick(() => {
        this.$refs.popform.resetValidation();
      });
    },
    updateCatalog() {
      if (!this.selected) {
        this.$warn('请先要修改的人');
        return;
      }
      this.form = JSON.parse(JSON.stringify(this.$refs.qTree.getNodeByKey(this.selected)));
      this.$refs.dialogCatalog.show();
      this.editType = '修改';
      this.$nextTick(() => {
        this.$refs.popform.resetValidation();
        this.mainId = this.form.id;
        this.queryImages();
      });
    },
    submitCatalog() {
      this.loading = true;
      let a;
      const param = { ...this.form };
      if (this.editType === '修改') {
        a = this.$axios.put('/jp/person/edit', param);
      } else {
        a = this.$axios.post('/jp/person/add', param);
      }
      a.then((r) => {
        this.$info(r.message);
        this.$refs.dialogCatalog.hide();
      }).finally(() => {
        this.query();
      });
    },
    delCatalog() {
      this.$axios.delete(`/jp/person/delete?id=${this.selected}`).then((r) => {
        this.$info(r.message);
      }).finally(() => {
        this.query();
        this.selected = '';
      });
    },
    toChinesNum(num) {
      const changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
      const unit = ['', '十', '百', '千', '万'];
      num = parseInt(num, 10);
      const getWan = (temp) => {
        const strArr = temp.toString().split('').reverse();
        let newNum = '';
        const newArr = [];
        strArr.forEach((item, index) => {
          newArr.unshift(item === '0' ? changeNum[item] : (index === 1 && item === '1' ? '' : changeNum[item]) + unit[index]);
        });
        const numArr = [];
        newArr.forEach((m, n) => {
          if (m !== '零') numArr.push(n);
        });
        if (newArr.length > 1) {
          newArr.forEach((m, n) => {
            if (newArr[newArr.length - 1] === '零') {
              if (n <= numArr[numArr.length - 1]) {
                newNum += m;
              }
            } else {
              newNum += m;
            }
          });
        } else {
          [newNum] = newArr;
        }

        return newNum;
      };
      const overWan = Math.floor(num / 10000);
      let noWan = num % 10000;
      if (noWan.toString().length < 4) {
        noWan = `0${noWan}`;
      }
      return overWan ? `${getWan(overWan)}万${getWan(noWan)}` : getWan(num);
    },
    exportWord() {
      this.exporting = true;
      this.$downFile('/jp/person/exportWord', {
        params:
        {
          key: this.key,
          pageNo: 1,
          pageSize: 1000,
        },
      }).then((data) => {
        if (!data) {
          this.$message.warning('文件下载失败');
          return;
        }
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(new Blob([data], { type: 'application/vnd.ms-word' }), 'jp.doc');
        } else {
          const url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.ms-word' }));
          const link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.setAttribute('download', 'jp.doc');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link); // 下载完成移除元素
          window.URL.revokeObjectURL(url); // 释放掉blob对象
        }
      }).finally(() => {
        this.exporting = false;
      });
    },
    deleteImage(id) {
      this.$axios.delete(`/sys/file/delete?id=${id}`).then((r) => {
        this.$info(r.message);
      }).finally(() => {
        this.queryImages();
      });
    },
  },
  watch: {
    catalogList: {
      handler() {
        this.allCatalogList = this.catalogList;
        this.$nextTick(() => {
          this.$refs.qTree.expandAll();
        });
      },
    },
  },
  mounted() {
    this.initDict();
    this.query();
  },
  computed: {
    imgList() {
      return this.attachments.filter((f) => f.type === 'image');
    },
    videoList() {
      return this.attachments.filter((f) => f.type === 'video');
    },
  },
};
</script>

<style lang="stylus">
.tree-person
  width 200px
</style>
