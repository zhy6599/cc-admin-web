<template>
  <q-scroll-area class="col q-ma-xs column">
    <q-card class="col column q-pa-xs no-wrap">
      <q-tabs
        v-model="curTab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="flow" label="工作流设置" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="curTab" animated>
        <q-tab-panel name="flow" class="q-pa-none">
          <q-select
            dense
            outlined
            options-dense
            v-model="flowDef.flowType"
            prefix="工作流类型："
            class="q-my-sm"
            :options="flowTypeOptions"
            emit-value
            map-options
            option-value="id"
            option-label="name"
            @input="flowTypeChange"
          />
          <q-list bordered class="rounded-borders" v-if="element">
            <q-expansion-item
              icon="mdi-bug-check-outline"
              dense
              default-opened
              dense-toggle
              expand-separator
              label="节点设置"
            >
              <q-card>
                <q-card-section>
                  <q-select
                    dense
                    outlined
                    options-dense
                    v-if="form.type === 'bpmn:SequenceFlow'"
                    v-model="form.action"
                    prefix="操作："
                    class="q-my-sm"
                    :options="actionOptions"
                    clearable
                    :use-input="true"
                    emit-value
                    map-options
                    option-value="id"
                    option-label="name"
                    @input="actionChange"
                  />
                  <q-input
                    dense
                    outlined
                    type="text"
                    class="q-my-sm"
                    v-model="form.id"
                    prefix="节点ID："
                    v-if="false"
                    input-class="text-left"
                  />
                  <q-input
                    dense
                    outlined
                    type="text"
                    class="q-my-sm"
                    v-model="form.name"
                    prefix="节点名称："
                    input-class="text-left"
                    @input="nameChange"
                  />
                  <q-input
                    dense
                    outlined
                    v-if="false"
                    v-model="form.color"
                    class="q-my-sm"
                    :inputStyle="inputStyle"
                  >
                    <template v-slot:append>
                      <q-icon name="colorize" class="cursor-pointer" :style="{color:form.color}">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                          <q-color v-model="form.color" @input="colorChange" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
          <q-list bordered class="rounded-borders q-mt-sm" v-if="form.type === 'bpmn:UserTask'">
            <q-expansion-item
              icon="mdi-bug-check-outline"
              dense
              default-opened
              dense-toggle
              expand-separator
              label="权限设置"
            >
              <q-card class="q-pa-xs">
                <q-card-section class="q-pa-none">
                  <q-select
                    dense
                    outlined
                    options-dense
                    v-model="form.userList"
                    prefix="用户："
                    class="q-my-sm"
                    :options="userList"
                    emit-value
                    map-options
                    option-value="id"
                    option-label="name"
                    multiple
                    @input="userChange"
                  />
                  <q-select
                    dense
                    outlined
                    options-dense
                    v-model="form.roleList"
                    multiple
                    prefix="角色："
                    class="q-my-sm"
                    :options="roleList"
                    emit-value
                    map-options
                    option-value="id"
                    option-label="name"
                    @input="roleChange"
                  />
                  <q-select
                    dense
                    outlined
                    options-dense
                    v-model="form.deptList"
                    multiple
                    prefix="部门："
                    class="q-my-sm"
                    :options="deptList"
                    emit-value
                    map-options
                    option-value="id"
                    option-label="name"
                    @input="deptChange"
                  />
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
          <q-list bordered class="rounded-borders q-mt-sm" v-if="form.type === 'bpmn:UserTask'">
            <q-expansion-item
              icon="mdi-bug-check-outline"
              dense
              default-opened
              dense-toggle
              expand-separator
              label="表单设置"
            >
              <q-card class="q-pa-xs">
                <q-card-section class="q-pa-none">
                  <q-table :data="data" :columns="columns" row-key="name" hide-bottom>
                    <template #body-cell-show="props">
                      <q-td :props="props" :auto-width="true">
                        <q-checkbox v-model="props.row.show" trueValue="Y" falseValue="N" @input="tableChange" />
                      </q-td>
                    </template>
                    <template #body-cell-edit="props" :auto-width="true">
                      <q-td :props="props">
                        <q-checkbox v-model="props.row.edit" trueValue="Y" falseValue="N" @input="tableChange" />
                      </q-td>
                    </template>
                  </q-table>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-scroll-area>
</template>

<script>
import { buildColumnList } from 'components/generator';

export default {
  name: 'PropertyPanel',
  props: {
    flowDef: {
      type: Object,
      required: true,
    },
    modeler: {
      type: Object,
      required: true,
    },
    formData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      defaultData: [],
      data: [],
      columns: [
        {
          name: 'label', align: 'center', label: '字段名称', field: 'label',
        },
        {
          name: 'show', align: 'center', label: '可见', field: 'show',
        },
        {
          name: 'edit', align: 'center', label: '编辑', field: 'edit',
        }],
      userList: [],
      roleList: [],
      deptList: [],
      curTab: 'flow',
      flowTypeOptions: [],
      actionOptions: [],
      form: {
        id: '',
        name: '',
        type: '',
        action: '',
        color: null,
        userList: [],
        roleList: [],
        deptList: [],
        data: [],
      },
      element: null,
      users: [
        {
          value: 'zhangsan',
          label: '张三',
        },
      ],
      roles: [
        {
          value: 'manager',
          label: '经理',
        },
      ],
    };
  },
  mounted() {
    this.handleModeler();
  },
  methods: {
    init() {
      const formData = { ...this.formData };
      buildColumnList(formData);
      formData.grid.allColumns.forEach((column) => {
        this.defaultData.push({
          label: column.label,
          name: column.name,
          show: 'Y',
          edit: 'Y',
        });
      });
      this.$axios.get('/flow/def/allFlowType').then(({ result }) => {
        this.flowTypeOptions = result;
      });
      this.flowTypeChange();
      this.$axios.get('/dyn/form/userRoleDeptList').then(({ result }) => {
        this.userList = result.user;
        this.roleList = result.role;
        this.deptList = result.dept;
      });
    },
    flowTypeChange() {
      if (this.flowDef.flowType) {
        this.$axios.get('/flow/def/impStatus', { params: { flowType: this.flowDef.flowType } }).then(({ result }) => {
          this.actionOptions = result;
        });
      }
    },
    actionChange(v) {
      this.form.name = v;
      this.nameChange(v);
      // 把用户操作存储下来
      this.updateProperties({ action: v });
    },
    handleModeler() {
      // 监听节点选择变化
      this.modeler.on('selection.changed', (e) => {
        const element = e.newSelection[0];
        if (element) {
          this.element = element;
          this.form = {
            type: element.type,
            ...element.businessObject,
            ...element.businessObject.$attrs,
          };
          // 只有任务节点才需要设置这些
          if (this.form.type === 'bpmn:UserTask') {
            if (this.form.userList) {
              this.form.userList = JSON.parse(this.form.userList);
            }
            if (this.form.roleList) {
              this.form.roleList = JSON.parse(this.form.roleList);
            }
            if (this.form.deptList) {
              this.form.deptList = JSON.parse(this.form.deptList);
            }
            if (this.form.data) {
              this.form.data = JSON.parse(this.form.data);
            } else {
              this.form.data = JSON.parse(JSON.stringify(this.defaultData));
            }
            this.data = this.form.data;
          }
        }
      });
    },
    // 属性面板名称，更新回流程节点
    nameChange(name) {
      const modeling = this.modeler.get('modeling');
      modeling.updateLabel(this.element, name);
    },
    // 属性面板颜色，更新回流程节点
    colorChange(color) {
      const modeling = this.modeler.get('modeling');
      modeling.setColor(this.element, {
        fill: null,
        stroke: color,
      });
      modeling.updateProperties(this.element, { color });
    },
    // 任务节点配置人员
    userChange() {
      const userObject = { userList: JSON.stringify(this.form.userList) };
      this.updateProperties(userObject);
    },
    roleChange() {
      const roleObject = { roleList: JSON.stringify(this.form.roleList) };
      this.updateProperties(roleObject);
    },
    deptChange() {
      const deptObject = { deptList: JSON.stringify(this.form.deptList) };
      this.updateProperties(deptObject);
    },
    tableChange() {
      const dataObject = { data: JSON.stringify(this.data) };
      this.updateProperties(dataObject);
    },
    // 在这里我们封装一个通用的更新节点属性的方法
    updateProperties(properties) {
      const modeling = this.modeler.get('modeling');
      modeling.updateProperties(this.element, properties);
    },
  },
  computed: {
    inputStyle() {
      return { color: this.form.color };
    },
  },
};
</script>

<style lang="stylus" scoped></style>
