<template>
  <q-page class="column q-pa-sm">
    <div class="col column view_card shadow-2 q-pa-md">
      <q-table
        color="primary"
        class="cross_table"
        flat
        separator="cell"
        virtual-scroll
        :columns="columns"
        :data="list"
        row-key="id"
        :visible-columns="group"
        @request="query"
        :loading="loading"
        hide-bottom
        :rows-per-page-options="[0]"
        style="height: calc(100vh - 200px);"
      >
        <template #top-left>
          <div class="row no-wrap">
            <div class="row items-center">
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
            </div>
          </div>
        </template>
        <template #top-right="table">
          <q-btn-group outline>
            <q-btn outline icon="add" color="primary" label="新建菜单" @click="add" />
            <q-btn
              outline
              color="primary"
              label="切换全屏"
              @click="table.toggleFullscreen"
              :icon="table.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            />
            <q-btn-dropdown outline color="primary" label="自选列" icon="view_list">
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
          </q-btn-group>
        </template>

        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template #body="props">
          <q-tr :props="props">
            <q-td key="index" :props="props">
              <q-btn
                dense
                round
                flat
                v-if="props.row.children"
                :icon="props.expand ? 'mdi-minus' : 'mdi-plus'"
                @click="props.expand = !props.expand"
              />
            </q-td>
            <q-td key="name" :props="props">{{ props.row.name }}</q-td>
            <q-td key="icon" :props="props">
              <q-icon :name="props.row.icon" color="t-grey" />
            </q-td>
            <q-td key="menuType" :props="props">
              {{getDictLabel(menuType,props.row.menuType)}}
            </q-td>
            <q-td class="ellipsis" key="url" :props="props">
              <div class="text-left" style="white-space: normal;">{{ props.row.url }}</div>
            </q-td>
            <q-td class="ellipsis" key="component" :props="props">
              {{ props.row.component }}
            </q-td>
            <q-td key="sortNo" :props="props">{{ props.row.sortNo }}</q-td>
            <q-td key="opt" :props="props">
              <div>
                <q-btn flat round dense color="primary" icon="edit" @click.stop="edit(props.row)">
                  <q-tooltip>编辑</q-tooltip>
                </q-btn>
                <q-btn flat round dense color="primary" icon="add"
                  @click.stop="addChild(props.row)">
                  <q-tooltip>添加</q-tooltip>
                </q-btn>
                <btn-del label="删除" @confirm="del(props.row)" />
              </div>
            </q-td>
          </q-tr>

          <template v-for="menu in props.row.children">
            <q-tr :key="menu.id"
              v-show="props.expand" :props="props">
              <q-td key="index" :props="props">
                <div class="q-ml-lg">
                  <q-btn
                  dense
                  round
                  flat
                  v-if="menu.children"
                  :icon="menu.isLeaf ? 'mdi-minus' : 'mdi-plus'"
                  @click="menu.isLeaf = !menu.isLeaf"
                />
                </div>
              </q-td>
              <q-td key="name" :props="props">
                <div class="q-ml-lg">{{ menu.name }}</div>
              </q-td>
              <q-td key="icon" :props="props">{{ menu.icon }}</q-td>
              <q-td key="menuType" :props="props">
                {{getDictLabel(menuType,menu.menuType)}}
              </q-td>
              <q-td style="max-width:100px;" class="ellipsis"  key="url" :props="props">
                {{ menu.url }}
              </q-td>
              <q-td style="max-width:100px;" class="ellipsis" key="component" :props="props">
                {{ menu.component }}
              </q-td>
              <q-td key="sortNo" :props="props">{{ menu.sortNo }}</q-td>
              <q-td key="opt" :props="props">
                <div>
                  <q-btn flat round dense color="primary" icon="edit" @click.stop="edit(menu)">
                    <q-tooltip>编辑</q-tooltip>
                  </q-btn>
                  <q-btn flat round dense color="primary" icon="add" @click.stop="addChild(menu)">
                    <q-tooltip>添加</q-tooltip>
                  </q-btn>
                  <btn-del label="删除" @confirm="del(menu)" />
                </div>
              </q-td>
            </q-tr>
            <template v-for="btn in menu.children">
              <q-tr :key="btn.id" v-show="menu.isLeaf">
                <q-td key="index"></q-td>
                <q-td key="name">
                  <div class="q-ml-lg"><div class="q-ml-lg">{{ btn.name }}</div></div>
                </q-td>
                <q-td key="icon">{{ btn.icon }}</q-td>
                <q-td key="menuType">
                  {{getDictLabel(menuType,btn.menuType)}}
                </q-td>
                <q-td key="url">
                  {{ btn.url }}
                </q-td>
                <q-td key="component">
                  {{ btn.component }}
                </q-td>
                <q-td key="sortNo">{{ btn.sortNo }}</q-td>
                <q-td key="opt">
                  <q-btn flat round dense color="primary" icon="edit" @click.stop="edit(menu)">
                    <q-tooltip>编辑</q-tooltip>
                  </q-btn>
                  <btn-del label="删除" @confirm="del(menu)" />
                </q-td>
              </q-tr>
            </template>
          </template>

        </template>
      </q-table>
    </div>

    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}{{getDictLabel(menuType,form.menuType)}}
          <q-btn dense outline round icon="clear" size="sm" v-close-popup/>
        </h5>
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
                  {{parent.name}}
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
  name: 'SysMenu',
  mixins: [IndexMixin],
  components: {
  },
  data() {
    return {
      columns: [
        {
          name: 'index',
          align: 'left',
          label: '展开/收缩',
          field: 'index',
          style: 'width:120px;',
        },
        {
          name: 'name',
          align: 'left',
          label: '菜单名称',
          field: 'name',
          style: 'width:200px;',
        },
        {
          name: 'icon',
          align: 'left',
          label: '图标',
          field: 'icon',
          style: 'width:80px;',
        },
        {
          name: 'menuType',
          align: 'left',
          label: '菜单类型',
          field: 'menuType',
          style: 'width:100px;',
        },
        {
          name: 'url', align: 'left', label: '访问地址', field: 'url', classes: 'cell-width',
        },
        {
          name: 'component', align: 'left', label: '组件路径', field: 'component', classes: 'cell-width',
        },
        {
          name: 'sortNo',
          align: 'left',
          label: '菜单排序',
          field: 'sortNo',
          classes: 'cell-width',
          style: 'width:50px;',
        },
        {
          name: 'opt',
          align: 'center',
          label: '操作',
          field: 'id',
          style: 'width:50px;',
        },
      ],
      parent: {},
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
      this.$axios.get(`${this.url.list}?key=${this.key}`).then((r) => {
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
        status: '1',
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
.cell-width {
  max-width: 200px;
}
</style>
