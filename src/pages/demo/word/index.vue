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
      <q-page class="column q-pa-sm bg-positive">
        <div class="col column justify-center items-center">
          <q-card class="fit bg-cyan-2">
            <q-card-section>
              <div class="row">
                <q-btn
                  flat
                  size="xl"
                  :disable="index === 0"
                  @click="index -= 1"
                  icon="mdi-arrow-left"
                />
                <div class="col text-h1 text-center text-weight-bolder">{{ word }}</div>
                <q-btn
                  flat
                  size="xl"
                  :disable="index+1 - total >= 0"
                  @click="index += 1"
                  icon="mdi-arrow-right"
                />
              </div>
            </q-card-section>
            <q-card-actions align="around">
              <q-btn
                icon="mdi-emoticon-outline"
                color="secondary"
                style="width:100px;"
                @click="study('1')"
              >认识</q-btn>
              <q-btn
                icon="mdi-emoticon-dead"
                color="red"
                style="width:100px;"
                @click="study('0')"
              >不认识</q-btn>
            </q-card-actions>
          </q-card>
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
