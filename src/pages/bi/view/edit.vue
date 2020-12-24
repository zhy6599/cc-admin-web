<template>
  <q-dialog flat persistent v-model="showDialog" :maximized="true">
    <q-form class="dialog_card column fit">
      <h5 class="view_title justify-between q-px-md">
        视图设计--{{this.view.name}}
        <q-btn dense outline round icon="clear" size="sm" v-close-popup />
      </h5>
      <div class="dialog_card col v_l_grid fit">
        <div class="v_l_grid_1 bg-grey-2 q-pa-md column">
          <q-select
            emit-value
            map-options
            v-model="view.sourceId"
            :options="sources"
            label="请选择数据源"
            @input="getTable"
          />
          <q-input clearable v-model.trim="treeFilter" :debounce="400" label="搜索关键字">
            <template #append v-if="!treeFilter">
              <q-icon name="search" />
            </template>
          </q-input>
          <q-scroll-area class="col">
            <q-linear-progress stripe indeterminate v-if="treeLoading" class="absolute-top" />
            <q-tree
              :nodes="database"
              node-key="key"
              :filter="treeFilter"
              @lazy-load="expand"
              class="q-mt-md"
            />
          </q-scroll-area>
        </div>
        <div class="v_l_grid_2 q-my-md relative-position">
          <textarea
            ref="textarea"
            placeholder="请输入 SQL 执行语句，比如：select * from table"
            style="opacity:0"
          />
          <q-btn
            flat
            round
            dense
            icon="play_arrow"
            color="primary"
            size="xl"
            @click="query"
            class="absolute-bottom-right"
            :loading="tableLoading"
          >
            <q-tooltip>执行 SQL</q-tooltip>
          </q-btn>
        </div>
        <div class="v_l_grid_3 q-pa-md column">
          <div class="header text-h6 row items-center q-pa-sm">
            <q-icon name="mdi-calculator-variant" class="on-left" />
            <span class="col">变量列表</span>
            <q-btn flat round dense color="primary" icon="add" class="self-end" @click="open()">
              <q-tooltip>新建</q-tooltip>
            </q-btn>
          </div>
          <q-scroll-area class="col" ref="scroll">
            <q-list separator>
              <q-item v-for="q in variable" :key="q.key" class="q-px-none">
                <q-item-section avatar>
                  <q-icon v-if="q.type==='query'" name="search" color="green" />
                  <q-icon v-else name="vpn_key" color="orange" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{q.name}}</q-item-label>
                  <q-item-label caption :lines="1">{{q.alias}}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <div>
                    <q-btn flat round dense color="primary" icon="edit" @click="open(q)">
                      <q-tooltip>修改</q-tooltip>
                    </q-btn>
                    <btn-del :label="q.name" @confirm="del(q)" />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </div>
        <div class="v_l_grid_4 q-mr-md q-mb-md relative-position">
          <q-table
            :data="list"
            row-key="T_U_I_D"
            color="primary"
            separator="vertical"
            :columns="columns"
            title="执行 SQL 数据列表"
            :loading="tableLoading"
            :filter="tableFilter"
            :rows-per-page-options="[10,20,50]"
            :pagination.sync="pagination"
            class="cross_table absolute-full column"
          >
            <template #top-right="table">
              <q-input
                clearable
                dense
                label="搜索关键字"
                v-model.trim="tableFilter"
                :debounce="400"
                style="width:200px"
                class="on-left"
              >
                <template #append v-if="!tableFilter">
                  <q-icon name="search" />
                </template>
              </q-input>
              <q-input
                dense
                v-model="tableLength"
                :debounce="400"
                @input="query"
                style="width:200px"
                class="on-left"
                type="number"
                min="10"
              >
                <template #prepend>
                  <span class="text-body1">展示前</span>
                </template>
                <template #append>
                  <span class="text-body1">条</span>
                </template>
              </q-input>
              <q-btn
                flat
                round
                dense
                size="20px"
                color="primary"
                icon="refresh"
                :loading="tableLoading"
                @click="query"
              >
                <q-tooltip>刷新</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                dense
                size="20px"
                color="primary"
                @click="table.toggleFullscreen"
                :icon="table.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              >
                <q-tooltip>切换全屏</q-tooltip>
              </q-btn>
            </template>
            <template #header="props">
              <q-tr>
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  <div class="row no-wrap justify-between items-center" @click.prevent.stop>
                    {{ col.label }}
                    <div class="row justify-between on-right" style="width:180px">
                      <q-select
                        dense
                        filled
                        emit-value
                        map-options
                        bg-color="white"
                        style="width:99px"
                        v-model="model[col.label].visualType"
                        :options="visualType"
                      >
                        <q-tooltip>可视化类型</q-tooltip>
                      </q-select>
                      <q-btn-toggle
                        dense
                        unelevated
                        color="white"
                        text-color="black"
                        v-model="model[col.label].modelType"
                        :options="modelType"
                      />
                    </div>
                  </div>
                </q-th>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
      <q-dialog ref="dialog">
        <q-card class="q-dialog-plugin">
          <q-form autocomplete="off" ref="popform" @submit="edit">
            <q-card-section class="q-dialog__title">{{vtype}}变量</q-card-section>
            <q-card-section>
              <q-input dense label="名称" v-model.trim="vunit.name" :rules="[val=>!!val||'不可为空']">
                <template #prepend>
                  <q-icon name="star" color="negative">
                    <q-tooltip>必填</q-tooltip>
                  </q-icon>
                </template>
              </q-input>
              <q-input dense label="别名" v-model.trim="vunit.alias" class="q-mb-md" />
              <q-select
                dense
                emit-value
                map-options
                v-model="vunit.type"
                :options="searchType"
                label="变量类型"
                class="q-mb-md"
              />
              <q-select
                dense
                emit-value
                map-options
                v-model="vunit.valueType"
                :options="visualType"
                label="数据类型"
                class="q-mb-md"
              />
              <div v-if="vunit.type==='query'">
                <q-field dense class="q-mb-md">
                  <template #prepend>
                    <span class="text-body1">使用表达式</span>
                  </template>
                  <template #append>
                    <q-toggle v-model="vunit.udf" />
                  </template>
                </q-field>
                <q-input dense v-if="vunit.udf" autogrow label="表达式" v-model.trim="vunit.udfText" />
                <div v-else>
                  <q-input
                    dense
                    label="默认值"
                    v-model.trim="dv"
                    ref="dv"
                    @keydown.enter.prevent="push"
                  >
                    <template #append>
                      <q-btn flat round dense icon="add" @click="push" />
                    </template>
                  </q-input>
                  <q-field dense v-if="vunit.defaultValues.length">
                    <div class="full-width scroll">
                      <q-chip
                        removable
                        v-for="(v,i) in vunit.defaultValues"
                        :key="i"
                        color="primary"
                        text-color="white"
                        @remove="vunit.defaultValues.splice(i,1)"
                      >{{v}}</q-chip>
                    </div>
                  </q-field>
                </div>
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat color="primary" v-close-popup>取消</q-btn>
              <q-btn color="primary" :label="vtype" type="submit" />
            </q-card-actions>
          </q-form>
        </q-card>
      </q-dialog>
      <div class="row justify-end q-pa-md">
        <q-btn outline color="primary" label="取消" v-close-popup />
        <q-btn unelevated color="primary" class="on-right" label="提交" @click="save" />
      </div>
    </q-form>
  </q-dialog>
</template>

<script>
import { debounce } from 'quasar';
import {
  columnToIcon, visualType, modelType, searchType, dbToVisualType, dbToModelType,
} from 'boot/datatype';
import codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/sql-hint';
import 'codemirror/addon/display/placeholder';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';

export default {
  name: 'DataViewList',
  components: {
  },
  data() {
    return {
      showDialog: false,
      treeLoading: false,
      id: '',
      treeFilter: '',
      view: {},
      sources: [],
      database: [],
      tableLoading: false,
      tableFilter: '',
      tableLength: 1000,
      columns: [],
      list: [],
      pagination: {
        sortBy: 'name',
        page: 1,
        rowsPerPage: 10,
      },
      model: {},
      modelType,
      searchType,
      visualType,
      variable: [],
      vtype: '',
      vunit: {
        defaultValues: [],
      },
      dv: '',
    };
  },
  computed: {
    hints() {
      return this.database.flatMap((v) => {
        let t = [{ text: v.label }];
        if (v.children) {
          t = t.concat(v.children.map((x) => ({ text: x.label })));
        }
        return t;
      }).sort((a, b) => (a.text.toUpperCase() > b.text.toUpperCase() ? -1 : 1));
    },
  },
  methods: {
    show(viewId) {
      this.id = viewId;
      this.showDialog = true;
      this.loading = true;
      this.$axios.get('/sys/dataSource/list?pageSize=100').then(({ result }) => {
        this.sources = result.records.map(({ id, name }) => ({
          value: id,
          label: name,
        }));
      }).finally(() => {
        this.loading = false;
      });

      if (viewId) {
        this.getView(viewId).then(() => {
          if (this.view.sourceId) {
            this.getTable();
            this.query();
          }
          this.initEditor();
        });
      } else {
        this.view = {
          id: '',
          config: '',
          description: '',
          model: {},
          roles: [],
          source: {},
          sourceId: null,
          viewSql: '',
          variable: [],
        };
        this.initEditor();
      }
    },
    getView(viewId) {
      return this.$axios.get(`/bi/view/queryById?id=${viewId}`)
        .then(({ result }) => {
          if (result.model) {
            this.model = JSON.parse(result.model);
          }
          if (result.variable) {
            this.variable = JSON.parse(result.variable);
          }
          this.view = result;
        });
    },
    getTable() {
      this.treeLoading = true;
      return this.$axios.get(`/sys/dataSource/databases?id=${this.view.sourceId}`)
        .then(({ result }) => Promise.all(result
          .map((v) => this.$axios.get(`/sys/dataSource/tables?id=${this.view.sourceId}&dbName=${v}`)
            .then((r) => r.result.map(({ name, type }) => ({
              icon: type === 'TABLE' ? 'mdi-table' : 'mdi-table-edit',
              iconColor: 'primary',
              label: name,
              key: name,
              lazy: true,
              dbName: v,
            }))))).then((t) => {
          this.database = t.flat();
        }).finally(() => {
          this.treeLoading = false;
        }));
    },
    getColumn(node) {
      return this.$axios.get(`/bi/view/columns?id=${this.view.sourceId}&dbName=${node.dbName}&tableName=${node.label}`)
        .then(({ result }) => result.columns
          .map(({ name, type }) => ({
            iconColor: 'primary',
            icon: result.primaryKeys.includes(name) ? 'mdi-key-variant' : columnToIcon(type),
            label: name,
            key: name + node.dbName,
          })));
    },
    expand({ node, done }) {
      this.getColumn(node).then((r) => done(r));
    },
    open(q) {
      if (q) {
        this.vtype = '修改';
        this.vunit = {
          ...q,
        };
        if (q.udf) {
          [this.vunit.udfText] = q.defaultValues;
          this.vunit.defaultValues = [];
        } else {
          this.vunit.udfText = '';
          this.vunit.defaultValues = [...q.defaultValues];
        }
      } else {
        this.vtype = '新建';
        this.vunit = {
          name: '',
          alias: '',
          type: 'query',
          valueType: 'string',
          udf: false,
          udfText: '',
          key: `${Math.floor((1 + Math.random()) * 0x10000)} — ${Math.floor((1 + Math.random()) * 0x10000)}`,
          defaultValues: [],
        };
      }
      this.dv = '';
      this.$refs.dialog.show();
      this.$nextTick(() => {
        this.$refs.popform.resetValidation();
      });
    },
    push() {
      if (this.dv) {
        this.vunit.defaultValues.push(this.dv);
        this.dv = '';
      }
      this.$refs.dv.focus();
    },
    edit() {
      const i = this.variable.findIndex((v) => v.key === this.vunit.key);
      const q = {
        ...this.vunit,
      };
      if (q.udf) {
        q.defaultValues = [q.udfText];
      }
      if (i > -1) {
        this.$set(this.variable, i, q);
      } else {
        this.variable.unshift(q);
      }
      this.$refs.dialog.hide();
      this.$refs.scroll.setScrollPosition(0, 400);
    },
    del(q) {
      this.variable.splice(this.variable.findIndex((v) => v.key === q.key), 1);
    },
    exSQL() {
      this.tableLoading = true;
      return this.$axios.post('/bi/view/executeSql', {
        sql: this.view.viewSql,
        sourceId: this.view.sourceId,
        variables: this.variable,
        limit: this.tableLength,
      }).then((r) => {
        if (r.success) {
          const { result } = r;
          this.columns = result.columns.map(({ name, type }) => ({
            name, label: name, field: name, align: 'left', format: (val) => this.ellipsis(val), type,
          }));
          const t = {};
          this.columns.forEach(({ name, type }) => {
            if (this.model[name]) {
              t[name] = {
                ...this.model[name],
              };
            } else {
              t[name] = {
                sqlType: type,
                visualType: dbToVisualType(type),
                modelType: dbToModelType(type),
              };
            }
          });
          this.model = { ...t };
          this.list = result.records.map((v, i) => ({
            ...v,
            T_U_I_D: i,
          }));
        } else {
          this.$q.notify({
            color: 'red',
            position: 'top',
            message: r.message,
          });
        }
        return r.result;
      }).finally(() => {
        this.tableLoading = false;
      });
    },
    ellipsis(value, vlength = 25) {
      if (!value) {
        return '';
      }
      if (value.length > vlength) {
        return `${value.slice(0, vlength)}...`;
      }
      return value;
    },
    query() {
      if (this.view.viewSql) {
        return this.exSQL();
      }
      return '';
    },
    initEditor() {
      this.$nextTick(() => {
        this.editor = codemirror.fromTextArea(this.$refs.textarea, {
          tabSize: 4,
          mode: 'text/x-sql',
          theme: '3024-day',
          line: true,
          styleActiveLine: true,
          matchBrackets: true,
          autoCloseBrackets: true,
        });
        if (this.view.viewSql) {
          this.editor.doc.setValue(this.view.viewSql.trim());
        }
        this.editor.on('change', debounce((editor, change) => {
          this.view.viewSql = editor.getDoc().getValue().trim();
          if (change.origin === '+input'
          && change.text[0] !== ';'
          && change.text[0].trim() !== '') {
            this.editor.showHint({
              completeSingle: false,
              tables: change.text[0] === '$'
                ? this.variable.map((v) => ({
                  text: `${v.name}$`,
                  displayText: `$${v.name}$`,
                })) : this.hints,
            });
          }
        }, 400));
      });
    },
    save() {
      if (this.view.viewSql) {
        this.query().then(() => {
          const q = {
            ...this.view,
            source: this.sources.find((v) => v.id === this.view.sourceId),
            model: JSON.stringify(this.model),
            variable: JSON.stringify(this.variable),
          };
          let a;
          if (this.view.id === '') {
            a = this.$axios.post('/bi/view/add', q);
          } else {
            a = this.$axios.put('/bi/view/edit', q);
          }
          a.then((r) => {
            this.$retMsg(r);
          });
        });
      } else {
        this.$warn('SQL不能为空!');
      }
    },
  },
  mounted() {
  },
};
</script>

<style lang="stylus">
@import '~src/css/quasar.variables.styl';
@import '~src/css/codemirror.css';

.v_l_grid {
  display: grid;
  grid-template-columns: 300px auto 300px;
  grid-auto-rows: 50%;
}

.v_l_grid_1 {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 3;
}

.v_l_grid_2, .v_l_grid_3 {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
}

.v_l_grid_3 {
  grid-column-start: 3;
  grid-column-end: 4;
}

.v_l_grid_4 {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 3;
}

.v_l_grid_2 {
  .CodeMirror {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: text;
  }
}
</style>
