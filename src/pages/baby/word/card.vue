<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>宝宝识字</q-toolbar-title>
        <q-btn-toggle
          v-model="model"
          spread
          no-caps
          toggle-color="purple"
          color="white"
          text-color="black"
          :options="[
          {label: '学习', value: '0'},
          {label: '复习', value: '1'}
        ]"
          @input="loadWordList"
        />
        <q-space />
        <q-btn
          flat
          round
          dense
          class="q-mr-sm"
          @click="$q.fullscreen.toggle()"
          :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
          :label="$q.fullscreen.isActive ? '退出全屏' : '全屏模式'"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="cc-admin q-pa-sm">
        <div class="q-pa-md">
          <q-table
            grid
            :card-container-class="cardContainerClass"
            :data="wordList"
            :columns="columns"
            row-key="name"
            :filter="filter"
            hide-header
            :pagination.sync="pagination"
            :rows-per-page-options="rowsPerPageOptions"
          >
            <template v-slot:item="props">
              <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
                <q-card>
                  <q-card-section class="flex flex-center"
                  :style="{ fontSize: '72px' }">
                    <div>{{ props.row.name }}</div>
                  </q-card-section>
                  <q-separator />
                </q-card>
              </div>
            </template>
          </q-table>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  data() {
    return {
      model: '0',
      index: 0,
      total: 0,
      word: '没有字词',
      wordList: [],
      filter: '',
      pagination: {
        page: 1,
        rowsPerPage: 15,
      },
      columns: [
        { name: 'name', label: '汉子', field: 'name' },
        { name: 'pinyin', label: '拼音', field: 'pinyin' },
      ],
    };
  },
  methods: {
    study(isKnow) {
      this.$axios.post('/baby/studyLog/add', { wordId: this.wordList[this.index].id, isKnow }).then(() => {
        if (isKnow === '1') {
          this.$info('宝宝真棒！');
        } else {
          this.$warn('你要加油啊！');
        }
        if (this.index + 1 - this.total >= 0) {
          this.$q.dialog({
            title: '学习完毕',
            message: '是否要重新学习一遍？',
            cancel: true,
            ok: {
              color: 'primary',
            },
          }).onOk(() => {
            this.index = 0;
          });
        } else {
          this.index += 1;
        }
      });
    },
    loadWordList() {
      this.$axios.get(`/baby/word/study?model=${this.model}`).then(({ result }) => {
        this.wordList = result;
        this.total = result.length;
        this.pagination.total = result.length;
        if (this.total > 0) {
          this.word = this.wordList[0].name;
        }
      });
    },
  },
  mounted() {
    this.loadWordList();
  },
  watch: {
    index() {
      this.word = this.wordList[this.index].name;
    },
  },
};
</script>
