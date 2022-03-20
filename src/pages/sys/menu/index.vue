<template>
  <q-page class="cc-admin column q-pa-sm">
    <div class="col bg-white shadow-2 q-pa-md">
      <q-table
        color="primary"
        class="cross_table"
        flat
        separator="cell"
        virtual-scroll
        :columns="columns"
        :data="menuList"
        row-key="id"
        @request="query"
        :loading="loading"
        hide-bottom
        :rows-per-page-options="[0]"
        :grid="$q.screen.xs"
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
              <q-btn outline icon="add" color="primary" no-wrap label="新建菜单" @click="add" />
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

        <template v-slot:header="props">
          <q-tr>
            <q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th>
          </q-tr>
        </template>
        <template #body="props">
          <menu-item
            :menu="props.row"
            :props="props"
            @edit="edit"
            @addChild="addChild"
            @del="del"
            @toggleExpand="toggleExpand"
          />
        </template>
      </q-table>
    </div>

    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}{{getDictLabel(menuType,form.menuType)}}
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-6">
              <h5>
                <q-icon name="star" color="red" />
                {{form.menuType===2?'按钮/权限':'菜单'}}名称：
              </h5>
              <q-input outlined dense v-model="form.name" :rules="[requiredTest]" />
            </div>
            <div class="col-6" v-if="form.menuType!==0" key="0">
              <h5>
                <q-icon name="star" color="red" />上级菜单：
              </h5>
              <q-field
                outlined
                dense
                v-model="form.parentId"
                class="cursor-pointer"
                :rules="[requiredTest]"
              >
                <template #control>{{parent.name}}</template>
              </q-field>
            </div>
            <div class="col-6" v-if="form.menuType===0" key="1">
              <h5>菜单图标：</h5>
              <q-input outlined dense v-model="form.icon">
                <template #prepend>
                  <q-icon :name="form.icon" color="t-grey" />
                </template>
                <template #append>
                  <q-btn round dense flat icon="search" color="primary">
                    <q-menu>
                      <q-btn
                        round
                        dense
                        flat
                        v-for="v in icons"
                        :key="v"
                        :icon="v"
                        color="t-grey"
                        @click="form.icon=v"
                      />
                    </q-menu>
                  </q-btn>
                </template>
              </q-input>
            </div>
            <template v-if="form.menuType!==2">
              <div class="col-6">
                <h5>
                  <q-icon name="star" color="red" />访问地址：
                </h5>
                <q-input outlined dense v-model="form.url" :rules="[requiredTest]" />
              </div>
              <div class="col-6">
                <h5>
                  <q-icon name="star" color="red" />组件位置：
                </h5>
                <q-input outlined dense v-model="form.component" :rules="[requiredTest]" />
              </div>
              <div class="col-6">
                <h5>默认跳转：</h5>
                <q-input outlined dense v-model="form.redirect" />
              </div>
              <div class="col-6">
                <h5>菜单排序：</h5>
                <q-input outlined dense v-model="form.sortNo" type="number" />
              </div>
              <div class="col-4">
                <h5>
                  <q-icon name="star" color="red" />是否路由菜单：
                </h5>
                <q-btn-toggle
                  class="q_b_toggle"
                  v-model="form.route"
                  :options="[{label:'路由',value:true},{label:'不路由',value:false}]"
                />
              </div>
              <div class="col-4">
                <h5>
                  <q-icon name="star" color="red" />是否显示菜单：
                </h5>
                <q-btn-toggle
                  class="q_b_toggle"
                  v-model="form.hidden"
                  :options="[{label:'显示',value:false},{label:'隐藏',value:true}]"
                />
              </div>
              <div class="col-4">
                <h5>
                  <q-icon name="star" color="red" />打开方式：
                </h5>
                <q-btn-toggle
                  class="q_b_toggle"
                  v-model="form.internalOrExternal"
                  :options="[{label:'内部',value:false},{label:'外部',value:true}]"
                />
              </div>
            </template>
            <div class="col-6" v-if="form.menuType===2" key="2">
              <h5>
                <q-icon name="star" color="red" />授权标识：
              </h5>
              <q-input outlined dense v-model="form.perms" :rules="[requiredTest]" />
            </div>
          </div>
        </q-scroll-area>
        <div class="row justify-end q-pa-md">
          <q-btn outline color="primary" icon="mdi-close-thick" label="关闭" v-close-popup />
          <q-btn class="q-mx-sm" color="primary" icon="mdi-check-bold" label="提交" type="submit" />
        </div>
      </q-form>
    </q-dialog>
  </q-page>
</template>

<script>
import { requiredTest } from 'boot/inputTest';
import { getter, formatter, getDictLabel } from 'boot/dictionary';
import menuItem from './item';

export default {
  name: 'SysMenu',
  mixins: [],
  components: {
    menuItem,
  },
  data() {
    return {
      loading: false,
      editType: '',
      key: '',
      form: {},
      columns: [
        {
          name: 'index',
          align: 'center',
          label: '展开/收缩',
          field: 'index',
        },
        {
          name: 'name',
          align: 'left',
          label: '菜单名称',
          field: 'name',
        },
        {
          name: 'icon',
          align: 'center',
          label: '图标',
          field: 'icon',
        },
        {
          name: 'menuType',
          align: 'left',
          label: '菜单类型',
          field: 'menuType',
        },
        {
          name: 'url', align: 'left', label: '访问地址', field: 'url',
        },
        {
          name: 'component', align: 'left', label: '组件路径', field: 'component',
        },
        {
          name: 'sortNo',
          align: 'center',
          label: '菜单排序',
          field: 'sortNo',
        },
        {
          name: 'opt',
          align: 'center',
          label: '操作',
          field: 'opt',
        },
      ],
      parent: {},
      menuType: formatter('menuType'),
      list: [],
      // 之前的菜单列表，主要用来还原状态
      orginMenuList: [],
      menuList: [],
      icons: getter('icon'),
      url: {
        list: '/sys/permission/list',
        add: '/sys/permission/add',
        edit: '/sys/permission/edit',
        delete: '/sys/permission/delete',
        deleteBatch: '/sys/permission/deleteBatch',
        exportXlsUrl: '/sys/permission/exportXls',
        importExcelUrl: '/sys/permission/importExcel',
      },
    };
  },
  methods: {
    requiredTest,
    getDictLabel,
    edit(p) {
      if (this.editBefore(p)) {
        this.editType = '编辑';
        this.form = {
          ...p,
        };
        this.$refs.dialog.show();
      }
      this.editAfter();
    },
    editAfter() {

    },
    toggleExpand(menu) {
      // 正常操作，展开只展开本级，收缩则收缩所有下级
      const expand = !menu.expand;
      this.menuList.forEach((m) => {
        if (m.id === menu.id) {
          m.expand = expand;
        }
        // 找到子节点
        if (m.parentId === menu.id) {
          m.parent.expand = expand;
          if (expand) {
            this.expandAllSon(menu.id);
          }
          // 折叠的话需要把所有后代后收缩起来
          if (!expand) {
            this.folderAllSon(menu.id);
          }
        }
      });
    },
    expandAllSon(id) {
      // 展开所有子节点
      this.menuList.forEach((m) => {
        if (m.parentId === id) {
          m.parent.expand = true;
          m.expand = true;
          this.expandAllSon(m.id);
        }
      });
    },
    folderAllSon(id) {
      this.menuList.forEach((m) => {
        if (m.parentId === id) {
          m.parent.expand = false;
          this.folderAllSon(m.id);
        }
      });
    },
    query() {
      this.loading = true;
      const url = this.key ? `${this.url.list}?key=${this.key}` : this.url.list;
      this.$axios.get(url).then((r) => {
        this.orginMenuList = this.menuList;
        this.menuList = [];
        this.list = r.result;
        this.initMenuList(this.list, 1, { expand: true });
      }).finally(() => {
        this.loading = false;
      });
    },
    initMenuList(list, level, parent) {
      list.forEach((m) => {
        // 尝试还原下原来的状态
        const orgin = this.orginMenuList.find((o) => m.id === o.id);
        const expand = orgin && orgin.expand;
        this.menuList.push({
          ...m, level, expand, parent,
        });
        if (m.children && m.children.length > 0) {
          this.initMenuList(m.children, level + 1, { expand });
        }
      });
    },
    reset() {
      this.form = {
        id: '',
        title: '',
        parentId: '',
        icon: '',
        component: '',
        url: '',
        redirect: '',
        sortNo: 100,
        menuType: 0,
        route: true,
        hidden: false,
        perms: '',
        status: '1',
        internalOrExternal: false,
      };
    },
    add() {
      this.editType = '新建';
      this.reset();
      this.$refs.dialog.show();
    },
    addChild(p) {
      this.editType = '新建';
      this.reset();
      this.parent = p;
      this.form.parentId = p.id;
      this.form.menuType = 1;
      this.$refs.dialog.show();
    },
    getMenuById(menuList, id) {
      // 根据Id把parent找出来
      menuList.forEach((menu) => {
        if (menu.id === id) {
          this.parent = menu;
        }
        if (menu.children && menu.children.length > 0) {
          this.getMenuById(menu.children, id);
        }
      });
    },
    editBefore(row) {
      this.getMenuById(this.list, row.parentId);
      return true;
    },
    submit() {
      const url = this.editType === '新建' ? this.url.add : this.url.edit;
      this.loading = true;
      this.$axios.post(url, this.form).then(({ message }) => {
        this.$info(message);
      }).finally(() => {
        this.$refs.dialog.hide();
        this.query();
      });
    },
    del({ id }) {
      this.loading = true;
      return this.$axios.delete(this.url.delete, { params: { id } }).then((r) => {
        this.$info(r.message);
      }).finally(() => {
        this.query();
      });
    },
  },
  mounted() {
    this.query();
  },
};
</script>

<style lang="stylus">
.cell-width
  max-width 200px
</style>
