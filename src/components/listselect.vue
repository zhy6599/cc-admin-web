<template>
  <q-dialog maximized v-model="showDialog" flat persistent ref="dialog" position="right">
    <div class="dialog_card column">
      <h5 class="view_title justify-between q-px-md">
        {{msg}}
        <q-btn dense outline round icon="clear" size="sm" v-close-popup />
      </h5>
      <q-scroll-area class="col">
        <div class="row q-col-gutter-x-md dialog_form q-pa-md">
          <div class="col">
            <q-toolbar class="bg-primary text-white shadow-2">
              <q-toolbar-title class="text-subtitle2">未选择</q-toolbar-title>
            </q-toolbar>
            <q-list bordered separator>
              <q-item
                v-for="item in unselectedList"
                :key="item.value"
                clickable
                v-ripple
                :active="link === item.value"
                @click="link = item.value"
                @dblclick="select()"
              >
                <q-item-section>{{item.label}}</q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="column justify-center">
            <q-btn flat color="primary" @click="select()" icon="mdi-arrow-right" />
            <q-btn flat color="primary" @click="selectAll()" icon="mdi-arrow-right-thick" />
            <q-btn flat color="primary" @click="unselect()" icon="mdi-arrow-left" />
            <q-btn flat color="primary" @click="unselectAll()" icon="mdi-arrow-left-thick" />
          </div>
          <div class="col">
            <q-toolbar class="bg-primary text-white shadow-2">
              <q-toolbar-title class="text-subtitle2">已选择</q-toolbar-title>
            </q-toolbar>
            <q-list bordered separator>
              <q-item
                v-for="item in selectList"
                :key="item.value"
                clickable
                v-ripple
                :active="link === item.value"
                @click="link = item.value"
                @dblclick="unselect()"
              >
                <q-item-section>{{item.label}}</q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-scroll-area>
      <div class="row justify-end q-pa-md">
        <q-btn outline color="primary" label="取消" v-close-popup />
        <q-btn unelevated color="primary" class="on-right" label="保存" @click="save" />
      </div>
    </div>
  </q-dialog>
</template>

<script>

export default {
  name: 'ListSelect',
  props: {
    unselectedList: {
      type: Array,
      required: true,
    },
    selectList: {
      type: Array,
      required: true,
    },
    msg: String,
  },
  data() {
    return {
      showDialog: false,
      link: '',
    };
  },
  methods: {
    select() {
      if (this.link !== '') {
        const item = this.unselectedList.find((data) => this.link === data.value);
        if (item) {
          this.unselectedList.splice(this.unselectedList
            .findIndex((data) => this.link === data.value), 1);
          this.selectList.push(item);
        }
      }
    },
    unselect() {
      if (this.link !== '') {
        const item = this.selectList.find((data) => this.link === data.value);
        if (item) {
          this.selectList.splice(this.selectList.findIndex((data) => item.value === data.value), 1);
          this.unselectedList.push(item);
        }
      }
    },
    selectAll() {
      if (this.unselectedList.length > 0) {
        this.selectList = this.selectList.concat(this.unselectedList);
        this.unselectedList = [];
      }
    },
    unselectAll() {
      if (this.selectList.length > 0) {
        this.unselectedList = this.unselectedList.concat(this.selectList);
        this.selectList = [];
      }
    },
    show() {
      this.showDialog = true;
    },
    hide() {
      this.showDialog = false;
    },
    save() {
      this.$emit('saveSelect', this.selectList);
    },
  },
  mounted() {
  },
};
</script>

<style lang="stylus">
</style>
