<template>
    <q-dialog v-model="showDialog" :position="'right'" maximized flat persistent>
      <q-form @submit="submit" class="dialog_card q-pa-md column">
        <div class="view_title justify-between">
          生成配置
          <q-btn dense outline round icon="clear" size="sm" v-close-popup/>
        </div>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form">
            <div class="col-12">
              <h5><q-icon name="star" color="red"/> 模块名称：</h5>
              <q-input outlined dense v-model="form.moduleName"
                :rules="[v=>!!v||'不可以为空']"/>
            </div>
            <div class="col-12">
              <h5><q-icon name="star" color="red"/> 类名（首字母大写）：</h5>
              <q-input outlined dense autogrow v-model="form.className"
                :rules="[v=>!!v||'不可以为空']"/>
            </div>
            <div class="col-12">
              <h5><q-icon name="star" color="red"/> 包名（com.dstc.modules.）：</h5>
              <q-input outlined dense autogrow v-model="form.packageName"
                :rules="[v=>!!v||'不可以为空']"/>
            </div>
            <div class="col-12">
              <h5><q-icon name="star" color="red"/> js路径：</h5>
              <q-input outlined dense autogrow v-model="form.jsPath"
                :rules="[v=>!!v||'不可以为空']"/>
            </div>
          </div>
        </q-scroll-area>
        <div class="row justify-end q-pa-md">
          <q-btn outline color="white" text-color="primary" label="取消" v-close-popup/>
          <q-btn unelevated color="primary" class="on-right" label="提交" type="submit"/>
        </div>
      </q-form>
    </q-dialog>
</template>

<script>

export default {
  name: 'table-select',
  props: {
    fieldData: Object,
  },
  components: {},
  data() {
    return {
      options: [{
        value: 'demo1',
        label: 'demo1',
      }, {
        value: 'demo2',
        label: 'demo2',
      }, {
        value: 'demo3',
        label: 'demo3',
      }],
      form: {
        id: '',
        moduleName: '',
        className: '',
        packageName: '',
        jsPath: '',
      },
      loading: false,
      showDialog: false,
    };
  },
  methods: {
    changeName() {
    },
    submit() {
      this.loading = true;
      this.$axios.put('/generate/doGenerateCode', this.form)
        .then((res) => {
          if (res.success) {
            this.$emit('syncTableByName', this.data);
            this.$info('保存成功');
            this.showDialog = false;
          } else {
            this.$error('保存失败');
          }
        }).finally(() => {
          this.loading = false;
        });
    },
    show(id) {
      this.id = id;
      this.query();
      this.showDialog = true;
    },
    query() {
      this.loading = true;
      this.$axios.get(`/generate/queryById?id=${this.id}`)
        .then(({ result }) => {
          const contentObj = JSON.parse(result.content);
          const { config } = contentObj;
          if (config) {
            this.form = config;
            this.form.id = this.id;
          } else {
            const tableName = result.name;
            this.form = {
              id: this.id,
              moduleName: result.description,
              className: this.getClassName(tableName),
              packageName: this.getPackageName(tableName),
              jsPath: this.getJsPath(tableName),
            };
          }
        }).finally(() => {
          this.loading = false;
        });
    },
    getClassName(tableName) {
      tableName = tableName.substring(0, 1).toUpperCase() + tableName.substring(1);
      return tableName.replace(/_(\w)/g, (all, letter) => letter.toUpperCase());
    },
    getPackageName(tableName) {
      return tableName.split('_')[0];
    },
    getJsPath(tableName) {
      return tableName.split('_').join('/');
    },

  },
  mounted() {
  },
};
</script>
<style>
.table-select-dialog .qInput {
  height: 32px !important;
}
.table-select-dialog .qInput .q-field__control {
  height: 32px !important;
  min-height: 32px !important;
}
.table-select-dialog .qInput .q-field__control .q-field__control-container {
  height: 32px !important;
}
.table-select-dialog
  .qInput
  .q-field__control
  .q-field__control-container
  .q-field__native {
  min-height: 32px !important;
}
.table-select-dialog .qInput .q-field__append {
  height: 32px !important;
}
</style>
