<template>
  <q-page class="cc-admin q-pa-sm">
    <div class="col bg-white shadow-2 q-pa-md">
      <div class="row items-center justify-start q-mb-md">
        <q-item class="col-xl-2 col-md-3 col-sm-6 col-xs-12">
          <q-item-section class="col-3 text-right gt-sm">
            <q-item-label>账号：</q-item-label>
          </q-item-section>
          <q-item-section class="col">
            <q-input
              outlined
              dense
              square
              clearable
              v-model="searchForm.username"
              placeholder="账号"
            />
          </q-item-section>
        </q-item>
        <q-item class="col-xl-2 col-md-3 col-sm-6 col-xs-12">
          <q-item-section class="col-3 text-right gt-sm">
            <q-item-label>姓名：</q-item-label>
          </q-item-section>
          <q-item-section class="col">
            <q-input
              outlined
              dense
              square
              clearable
              v-model="searchForm.realname"
              placeholder="姓名"
            />
          </q-item-section>
        </q-item>
        <q-item
          v-show="showQuery"
          v-if="$q.screen.gt.md"
          class="col-xl-2 col-md-3 col-sm-6 col-xs-12"
        >
          <q-item-section class="col-3 text-right gt-sm">
            <q-item-label>邮箱：</q-item-label>
          </q-item-section>
          <q-item-section class="col">
            <q-input outlined dense square clearable v-model="searchForm.email" placeholder="邮箱" />
          </q-item-section>
        </q-item>
        <q-item v-if="$q.screen.gt.md" class="col-xl-2 col-md-3 col-sm-6 col-xs-12">
          <q-item-section class="col-3 text-right gt-sm">
            <q-item-label>电话：</q-item-label>
          </q-item-section>
          <q-item-section class="col">
            <q-input outlined dense square clearable v-model="searchForm.phone" placeholder="电话" />
          </q-item-section>
        </q-item>
        <q-item v-show="showQuery" class="col-xl-2 col-md-3 col-sm-6 col-xs-12">
          <q-item-section class="col-3 text-right gt-sm">
            <q-item-label>状态：</q-item-label>
          </q-item-section>
          <q-item-section class="col">
            <q-select
              clearable
              outlined
              dense
              emit-value
              v-model="searchForm.status"
              map-options
              :options="userStatus"
              class="col"
              placeholder="状态"
            />
          </q-item-section>
        </q-item>
        <q-item
          v-show="showQuery"
          v-if="$q.screen.gt.md"
          class="col-xl-2 col-md-3 col-sm-6 col-xs-12"
        >
          <q-item-section class="col-3 text-right gt-sm">
            <q-item-label>工号：</q-item-label>
          </q-item-section>
          <q-item-section class="col">
            <q-input outlined dense square clearable v-model="searchForm.workNo" placeholder="工号" />
          </q-item-section>
        </q-item>
        <q-item
          v-show="showQuery"
          v-if="$q.screen.gt.md"
          class="col-xl-2 col-md-3 col-sm-6 col-xs-12"
        >
          <q-item-section class="col-3 text-right gt-sm">
            <q-item-label>职务：</q-item-label>
          </q-item-section>
          <q-item-section class="col">
            <q-select
              clearable
              outlined
              dense
              emit-value
              v-model="searchForm.post"
              map-options
              :options="sysPosition"
              class="col"
              placeholder="职务"
            />
          </q-item-section>
        </q-item>
        <q-item class="col-xl-2 col-md-3 col-sm-6 col-xs-12 q-pr-sm">
          <q-item-label class="col-12 text-right row no-wrap justify-center">
            <q-btn
              unelevated
              label="查询"
              no-wrap
              color="primary"
              class="q-mr-sm no-border-radius"
              :loading="loading"
              @click="query()"
            >
              <template v-slot:loading>
                <q-spinner-ios class="on-center" />
              </template>
            </q-btn>
            <q-btn
              outline
              unelevated
              label="重置"
              no-wrap
              class="q-mr-sm no-border-radius"
              color="secondary"
              @click="searchReset"
            />
            <q-btn-dropdown
              v-model="showQuery"
              persistent
              dense
              flat
              color="primary"
              :label="tableLabel"
              @before-show="show"
              @before-hide="hide"
            ></q-btn-dropdown>
          </q-item-label>
        </q-item>
      </div>
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
        <template #top-right="table">
          <q-btn-group outline>
            <q-btn outline icon="add" color="primary" label="新建" @click="add" />
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
              v-if="$q.screen.gt.md"
              icon="view_list"
            >
              <q-list>
                <q-item v-show="showQuery" tag="label" v-for="item in columns" :key="item.name">
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
              @click="exportExcel('用户列表')"
            />
            <q-btn
              :disable="selected.length === 0"
              outline
              color="primary"
              label="批量删除"
              no-wrap
              v-if="$q.screen.gt.sm"
              @click="showConfirm()"
              icon="mdi-delete-variant"
            />
          </q-btn-group>
        </template>
        <template #body-cell-avatar="props">
          <q-td key="avatar" :props="props">
            <q-avatar v-if="props.row.avatar">
              <img style="width: 30px;height: 30px;" :src="imagePath(props.row.avatar)" />
            </q-avatar>
          </q-td>
        </template>
        <template #body-cell-sex="props">
          <q-td key="sex" :props="props">{{getDictLabel(sex,props.row.sex) }}</q-td>
        </template>
        <template #body-cell-status="props">
          <q-td key="status" :props="props">{{getDictLabel(userStatus,props.row.status) }}</q-td>
        </template>
        <template #body-cell-delFlag="props">
          <q-td key="delFlag" :props="props">{{getDictLabel(delFlag,props.row.delFlag) }}</q-td>
        </template>
        <template #body-cell-activitiSync="props">
          <q-td
            key="activitiSync"
            :props="props"
          >{{getDictLabel(activitiSync,props.row.activitiSync) }}</q-td>
        </template>
        <template #body-cell-post="props">
          <q-td key="post" :props="props">{{getDictLabel(sysPosition,props.row.post) }}</q-td>
        </template>
        <template #body-cell-opt="props">
          <q-td :props="props" :auto-width="true">
            <q-btn flat round dense color="primary" icon="mdi-key" @click="change(props.row)">
              <q-tooltip>重置密码</q-tooltip>
            </q-btn>
            <q-btn
              flat
              round
              dense
              color="primary"
              icon="engineering"
              @click="editUserRole(props.row)"
            >
              <q-tooltip>分配角色</q-tooltip>
            </q-btn>
            <q-btn flat round dense color="primary" icon="edit" @click="edit(props.row)">
              <q-tooltip>编辑</q-tooltip>
            </q-btn>
            <btn-del label="用户表" @confirm="del(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog ref="changePassWord" maximized flat persistent position="right">
      <q-form @submit="changePassWord" class="dialog_card">
        <div class="view_title justify-between q-px-md">
          修改密码
          <q-btn dense outline round size="sm" icon="clear" v-close-popup />
        </div>
        <div class="row q-col-gutter-x-md dialog_form q-pa-md">
          <div class="col-12">
            <h5>用户账号：</h5>
            <q-input outlined readonly dense v-model="selectUser.username" />
          </div>
          <div class="col-12">
            <h5>用户姓名：</h5>
            <q-input outlined readonly dense v-model="selectUser.realname" />
          </div>

          <div class="col-6">
            <h5>
              <q-icon name="star" color="red" />密码：
            </h5>
            <q-input
              outlined
              dense
              type="password"
              v-model="password"
              :rules="[v => !!v || '不可以为空']"
            />
          </div>
          <div class="col-6">
            <h5>
              <q-icon name="star" color="red" />确认密码：
            </h5>
            <q-input
              outlined
              dense
              type="password"
              v-model="confirmpassword"
              :rules="[v => !!v || '不可以为空']"
              :error="!isValid"
            >
              <template v-slot:error>两次输入密码不一致！</template>
            </q-input>
          </div>
        </div>
        <div class="row justify-end q-pa-md">
          <q-btn outline color="white" text-color="primary" label="取消" v-close-popup />
          <q-btn unelevated color="primary" class="on-right" label="提交" type="submit" />
        </div>
      </q-form>
    </q-dialog>
    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}用户
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-6">
              <h5>
                <q-icon name="star" color="red" />登录账号：
              </h5>
              <q-input
                outlined
                dense
                square
                clearable
                v-model="form.username"
                type="text"
                :rules="[requiredTest]"
              />
            </div>
            <div class="col-6">
              <h5>
                <q-icon name="star" color="red" />姓名：
              </h5>
              <q-input
                outlined
                dense
                square
                clearable
                v-model="form.realname"
                type="text"
                :rules="[requiredTest]"
              />
            </div>
            <div v-if="editType==='新建'" class="col-6">
              <h5>
                <q-icon name="star" color="red" />密码：
              </h5>
              <q-input
                outlined
                dense
                v-model="form.password"
                type="password"
                :rules="[requiredTest]"
              />
            </div>
            <div class="col-6">
              <h5>头像：</h5>
              <div class="row wrap justify-center items-center content-center">
                <q-btn round @click="importAvatar">
                  <q-avatar size="100px">
                    <q-img style="width:100px;height:100px;" :src="imagePath(form.avatar)"></q-img>
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
              <h5>性别：</h5>
              <q-select outlined dense emit-value v-model="form.sex" map-options :options="sex" />
            </div>
            <div class="col-6">
              <h5>电子邮件：</h5>
              <q-input outlined dense square clearable v-model="form.email" type="text" />
            </div>
            <div class="col-6">
              <h5>电话：</h5>
              <q-input outlined dense square clearable v-model="form.phone" type="text" />
            </div>
            <div class="col-6">
              <h5>状态：</h5>
              <q-select
                outlined
                dense
                emit-value
                v-model="form.status"
                map-options
                :options="userStatus"
              />
            </div>
            <div class="col-6">
              <h5>工号：</h5>
              <q-input outlined dense square clearable v-model="form.workNo" type="text" />
            </div>
            <div class="col-6">
              <h5>职务：</h5>
              <q-select
                outlined
                dense
                emit-value
                v-model="form.post"
                map-options
                :options="sysPosition"
              />
            </div>
          </div>
        </q-scroll-area>
        <div class="row justify-end q-pa-md">
          <q-btn outline color="primary" label="取消" v-close-popup />
          <q-btn unelevated color="primary" class="on-right" label="提交" type="submit" />
        </div>
      </q-form>
    </q-dialog>

    <listselect
      ref="listselectDialog"
      :unselectedList="unselectedRoleList"
      :selectList="selectedRoleList"
      :msg="selectTitle"
      @saveSelect="setRoles"
    />
    <confirm ref="confirmDialog" :msg="confirmMsg" @confirm="deleteBatch()" />
  </q-page>
</template>

<script>
import { IndexMixin } from 'boot/mixins';
import { getDictLabel } from 'boot/dictionary';
import confirm from 'components/confirm';
import listselect from 'components/listselect';
import { requiredTest } from 'boot/inputTest';

export default {
  name: 'SysUser',
  mixins: [IndexMixin],
  components: {
    confirm,
    listselect,
  },
  data() {
    return {
      showQuery: true,
      tableLabel: '展开',
      headers: [{ name: 'Authorization', value: localStorage.Authorization }],
      uploadUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/upload`,
      imgUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/static`,
      columns: [
        {
          name: 'index',
          align: 'center',
          label: '序号',
          field: 'index',
        },
        {
          name: 'username', align: 'left', label: '账号', field: 'username',
        },
        {
          name: 'realname', align: 'left', label: '姓名', field: 'realname',
        },
        {
          name: 'userRoleNames', align: 'left', label: '用户角色', field: 'userRoleNames',
        },
        {
          name: 'avatar', align: 'left', label: '头像', field: 'avatar',
        },
        {
          name: 'sex', align: 'left', label: '性别', field: 'sex',
        },
        {
          name: 'email', align: 'left', label: '电子邮件', field: 'email',
        },
        {
          name: 'phone', align: 'left', label: '电话', field: 'phone',
        },
        {
          name: 'status', align: 'left', label: '状态', field: 'status',
        },
        {
          name: 'workNo', align: 'left', label: '工号', field: 'workNo',
        },
        {
          name: 'post', align: 'left', label: '职务', field: 'post',
        },
        {
          name: 'opt', align: 'center', label: '操作', field: 'id',
        },
      ],
      sex: [{ value: 1, label: '男' }, { value: 2, label: '女' }],
      userStatus: [{ value: 1, label: '正常' }, { value: 2, label: '冻结' }],
      delFlag: [{ value: '0', label: '正常' }, { value: '1', label: '已删除' }],
      activitiSync: [{ value: '1', label: '同步' }, { value: '0', label: '不同步' }],
      sysPosition: [],
      selectUser: {},
      password: '',
      confirmpassword: '',
      selectTitle: '',
      roleList: [],
      unselectedRoleList: [],
      selectedRoleList: [],
      url: {
        list: '/sys/user/list',
        add: '/sys/user/add',
        edit: '/sys/user/edit',
        delete: '/sys/user/delete',
        deleteBatch: '/sys/user/deleteBatch',
        exportXlsUrl: '/sys/user/exportXls',
        importExcelUrl: '/sys/user/importExcel',
        setUserRoles: '/sys/user/setUserRoles',
      },
    };
  },
  methods: {
    requiredTest,
    getDictLabel,
    importAvatar() {
      this.$refs.avatarUploader.pickFiles();
    },
    importedAvatar({ xhr }) {
      const response = JSON.parse(xhr.responseText);
      if (response.success) {
        this.form.avatar = response.message;
        this.$q.notify('上传成功');
      } else {
        this.$q.notify({
          color: 'red',
          message: '上传失败',
        });
      }
      this.$refs.avatarUploader.removeUploadedFiles();
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
    show() {
      this.showQuery = true;
      this.tableLabel = '收起';
    },
    hide() {
      this.showQuery = false;
      this.tableLabel = '展开';
    },
    initDict() {
      this.$axios.get('/sys/dictItem/selectItemsByDefId?defId=sysPosition').then((r) => {
        this.sysPosition = r;
      });
      this.$axios.get('/sys/dictItem/selectItemsByDefId?defId=sysRole').then((r) => {
        this.roleList = r;
      });
    },
    change(row) {
      this.password = '';
      this.confirmpassword = '';
      this.selectUser = row;
      this.$refs.changePassWord.show();
    },
    changePassWord() {
      this.$axios.put('/sys/user/changePassword', {
        confirmpassword: this.confirmpassword,
        password: this.password,
        username: this.selectUser.username,
      }).then((r) => {
        this.$info(r.message);
        this.$refs.changePassWord.hide();
      });
    },
    editUserRole(row) {
      this.selectUser = row;
      const { userRoleIdList } = row;
      this.unselectedRoleList = [];
      this.selectedRoleList = [];
      this.selectTitle = `用户[${row.realname}]分配角色`;
      this.roleList.forEach((role) => {
        if (userRoleIdList.includes(role.value)) {
          this.selectedRoleList.push(role);
        } else {
          this.unselectedRoleList.push(role);
        }
      });
      this.$refs.listselectDialog.show();
    },
    setRoles(roleList) {
      const selectedRoles = [];
      if (roleList && roleList.length > 0) {
        roleList.forEach((role) => {
          selectedRoles.push(role.value);
        });
      }
      this.$axios.put(`${this.url.setUserRoles}?userId=${this.selectUser.id}&selectedRoles=${selectedRoles.join(',')}`)
        .then((r) => {
          if (r.success) {
            this.$refs.listselectDialog.hide();
            this.query();
          }
          this.$info(r.message);
        });
    },
  },
  mounted() {
    this.initDict();
  },
  computed: {
    isValid() {
      return this.confirmpassword === this.password;
    },
  },
};
</script>
<style lang="stylus"></style>
