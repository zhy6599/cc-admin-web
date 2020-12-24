<template>
  <q-page class="column q-pa-sm">
    <div class="col column view_card shadow-2 q-pa-md">
      <div class="row items-center justify-between q-ma-md">
        <div class="col"></div>
        <q-btn-group outline>
          <q-btn outline icon="add" color="primary" label="新建菜单" @click="add" />
        </q-btn-group>
      </div>
      <q-markup-table flat separator="cell" class="cross_table col scroll">
        <thead>
          <tr class="menu_width_set">
            <th>菜单名称</th>
            <th>图标</th>
            <th>菜单类型</th>
            <th class="mw_mid_width">访问地址</th>
            <th class="mw_mid_width">组件位置</th>
            <th>排序</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <td colspan="7" class="menu_tree_set">
            <q-tree ref="tree" no-connectors :nodes="list" node-key="id" class="q-ml-md">
              <template #default-header="{node}">
                <div class="col row items-center menu_width_set">
                  <div class="col">{{node.name}}</div>
                  <div>
                    <q-icon :name="node.icon" color="t-grey" />
                  </div>
                  <div>{{getDictLabel(menuType,node.menuType)}}</div>
                  <div class="mw_mid_width">{{node.url}}</div>
                  <div class="mw_mid_width">{{node.component}}</div>
                  <div>{{node.sortNo}}</div>
                  <div>
                    <q-btn flat round dense color="primary" icon="edit" @click.stop="edit(node)">
                      <q-tooltip>编辑</q-tooltip>
                    </q-btn>
                    <q-btn flat round dense color="primary" icon="add" @click.stop="addChild(node)">
                      <q-tooltip>添加</q-tooltip>
                    </q-btn>
                    <btn-del label="删除" @confirm="del(node)" />
                  </div>
                </div>
              </template>
            </q-tree>
          </td>
        </tbody>
      </q-markup-table>
    </div>

    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}
          <q-btn dense outline round icon="clear" size="md" v-close-popup/>
        </h5>
        <q-tabs v-model="form.menuType" align="justify" class="q_b_tabs">
          <q-tab v-for="v in menuType" :key="v.value" :name="v.value" :label="v.label" />
        </q-tabs>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-6">
              <h5><q-icon name="star" color="red"/> {{form.menuType===2?'按钮/权限':'菜单'}}名称：</h5>
              <q-input outlined dense v-model="form.name"
                :rules="[requiredTest]"/>
            </div>
            <div class="col-6" v-if="form.menuType!==0" key="0">
              <h5><q-icon name="star" color="red"/> 上级菜单：</h5>
              <q-field outlined dense v-model="form.parentId" class="cursor-pointer"
                :rules="[requiredTest]">
                <template #control>
                  {{$refs.tree.getNodeByKey(form.parentId).name}} - {{form.parentId}}
                </template>
                <template #append>
                  <q-btn flat dense round color="primary" icon="list">
                    <q-menu content-style="min-width:320px">
                      <q-tree :nodes="list" node-key="id" label-key="name"
                        class="q-pa-sm" :selected.sync="form.parentId">
                        <template #default-header="{node}">
                          {{node.name}}
                        </template>
                      </q-tree>
                    </q-menu>
                  </q-btn>
                </template>
              </q-field>
            </div>
            <div class="col-6" v-if="form.menuType===0" key="1">
              <h5>菜单图标：</h5>
              <q-input outlined dense v-model="form.icon">
                <template #prepend>
                  <q-icon :name="form.icon" color="t-grey"/>
                </template>
                <template #append>
                  <q-btn round dense flat icon="search" color="primary">
                    <q-menu>
                      <q-btn round dense flat v-for="v in icons" :key="v"
                        :icon="v" color="t-grey" @click="form.icon=v"/>
                    </q-menu>
                  </q-btn>
                </template>
              </q-input>
            </div>
            <template v-if="form.menuType!==2">
              <div class="col-6">
                <h5><q-icon name="star" color="red"/> 访问地址：</h5>
                <q-input outlined dense v-model="form.url"
                  :rules="[requiredTest]"/>
              </div>
              <div class="col-6">
                <h5><q-icon name="star" color="red"/> 组件位置：</h5>
                <q-input outlined dense v-model="form.component"
                  :rules="[requiredTest]"/>
              </div>
              <div class="col-6">
                <h5>默认跳转：</h5>
                <q-input outlined dense v-model="form.redirect"/>
              </div>
              <div class="col-6">
                <h5>菜单排序：</h5>
                <q-input outlined dense v-model="form.sortNo" type="number"/>
              </div>
              <div class="col-6">
                <h5><q-icon name="star" color="red"/> 是否路由菜单：</h5>
                <q-btn-toggle class="q_b_toggle" v-model="form.route"
                  :options="[{label:'路由',value:true},{label:'不路由',value:false}]"/>
              </div>
              <div class="col-6">
                <h5><q-icon name="star" color="red"/> 是否显示菜单：</h5>
                <q-btn-toggle class="q_b_toggle" v-model="form.hidden"
                  :options="[{label:'显示',value:false},{label:'隐藏',value:true}]"/>
              </div>
            </template>
            <div class="col-6" v-if="form.menuType===2" key="2">
              <h5><q-icon name="star" color="red"/> 授权标识：</h5>
              <q-input outlined dense v-model="form.perms"
                :rules="[requiredTest]"/>
            </div>
          </div>
        </q-scroll-area>
        <div class="row justify-end q-pa-md">
          <q-btn outline color="primary" label="取消" v-close-popup/>
          <q-btn unelevated color="primary" class="on-right" label="提交" type="submit"/>
        </div>
      </q-form>
    </q-dialog>
  </q-page>
</template>

<script>
import { IndexMixin } from 'boot/mixins';
import { requiredTest } from 'boot/inputTest';
import { getter, formatter, getDictLabel } from 'boot/dictionary';

export default {
  name: 'Demo4',
  mixins: [IndexMixin],
  data() {
    return {
      columns: [],
      loading: false,
      editType: '',
      list: [],
      form: {},
      menuType: formatter('menuType'),
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
    query() {
      this.loading = true;
      return this.$axios.get('/sys/permission/list')
        .then((r) => {
          this.list = r.result;
        }).finally(() => {
          this.loading = false;
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
      this.form.parentId = p.id;
      this.form.menuType = p.menuType + 1;
      this.$refs.dialog.show();
    },
  },
  mounted() {
    this.query();
  },
};
</script>

<style lang="stylus">
.menu_width_set {
  >th, >div {
    text-align: left;
    width: 99px;

    &:first-child {
      width: auto;
    }

    &:last-child {
      width: 120px;
      border-width: 0;
      text-align: center;
    }

    &.mw_mid_width {
      width: 350px;
    }
  }

  >div {
    padding: 0 16px;
    line-height: 42px;
    min-height: 42px;
    border-right: 1px #eee solid;
  }
}

.menu_tree_set {
  padding: 0 !important;
  vertical-align: top;

  .q-tree__node {
    padding-bottom: 0;
  }

  .q-tree__node-header {
    margin: 0;
    padding: 0;
    border-radius: 0;
    border-bottom: 1px #eee solid;

    .q-tree__arrow {
      color: $primary;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.03);
    }
  }
}
</style>
