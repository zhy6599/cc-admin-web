<template>
  <q-page class="cc-admin row">
    <tree class="col q-mt-sm q-ml-sm" type="SysDepart" @select="selectCatalog" />
    <div class="col-8 column cc-admin shadow-2 q-ma-sm" v-if="this.$q.screen.gt.sm">
      <div class="q-gutter-y-md col">
        <q-card class="full-height">
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="left"
            narrow-indicator
          >
            <q-tab name="base" label="基本信息" />
            <q-tab name="author" label="图谱信息" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="base">
              <div class="q-px-md">
                <q-card square flat class>
                  <q-card-section class="text-center">
                    <q-img
                      style="width:100px;height:100px;border-radius:29px;"
                      :src="imagePath(form.pic)"
                    ></q-img>
                  </q-card-section>
                  <q-card-section>
                    <q-item-label class="text-body1">
                      <strong>基础信息</strong>
                    </q-item-label>
                    <q-item-label class="row q-gutter-y-md q-ml-lg">
                      <div class="col col-sm-6 col-xs-6">姓名：{{form.name}}</div>
                      <div
                        class="col col-md-4 col-sm-6 col-xs-6"
                      >{{form.isSon === '1'?'妻':'女婿'}}：{{form.wife}}</div>
                      <div class="col col-sm-6 col-xs-6">父亲：{{form.pName}}</div>
                      <div class="col col-sm-6 col-xs-6">居住地：{{ form.liveName}}</div>
                      <div class="col col-sm-6 col-xs-6">身份证号：{{form.idCard}}</div>
                      <div class="col col-sm-6 col-xs-6">联系电话：{{ form.phone}}</div>
                      <div class="col col-sm-6 col-xs-6">生于：{{ form.born }}</div>
                      <div class="col col-sm-6 col-xs-6">卒于：{{ form.dead }}</div>
                      <div class="col col-sm-6 col-xs-12">排行：{{ form.sortBy }}</div>
                      <div class="col col-sm-6 col-xs-12">坟经纬度：{{ form.lonlat }}</div>
                    </q-item-label>
                  </q-card-section>
                  <q-card-section>
                    <q-item-label class="text-body1">
                      <strong>生平简介</strong>
                    </q-item-label>
                    <q-separator spaced="15px" />
                    <q-item-label class="row q-gutter-y-md q-ml-lg">
                      <div class="col">{{form.remark}}</div>
                    </q-item-label>
                  </q-card-section>
                  <q-card-section>
                    <q-item-label class="text-body1">
                      <strong>照片视频</strong>
                    </q-item-label>
                    <q-separator spaced="15px" />
                    <div class="col-12">
                      <div class="q-gutter-md row items-start">
                        <q-img
                          v-for="f in imgList"
                          :key="f.id"
                          transition="fade"
                          :src="imagePath(f.path)"
                          style="width: 150px"
                          ratio="1"
                          spinner-color="white"
                          class="rounded-borders"
                        >
                            <q-btn
                              class="absolute-top"
                              dense round
                              @click="zoomImg(f.path)"
                              icon="mdi-magnify-scan"
                            >
                            </q-btn>
                        </q-img>
                      </div>
                    </div>
                    <div class="col-12 q-mt-sm">
                      <div class="q-gutter-md row items-start">
                        <video
                          v-for="f in videoList"
                          :key="f.id"
                          width="320"
                          height="240"
                          controls="controls"
                        >
                          <source :src="imagePath(f.path)" type="video/mp4" />
                          {{f.name}}
                        </video>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </q-tab-panel>

            <q-tab-panel name="author">
              <div class="treeChart column">
                <q-scroll-area horizontal class="col">
                  <TreeChart :json="treeChartData" />
                </q-scroll-area>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
      <q-dialog v-model="dialogVisible" >
        <q-card style="min-width: 1000px;">
          <q-toolbar>
            <q-toolbar-title>图像预览</q-toolbar-title>
            <q-btn icon="close" flat round dense v-close-popup />
          </q-toolbar>
          <q-card-actions>
            <img width="100%" :src="dialogImageUrl" alt="">
          </q-card-actions>
        </q-card>
    </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { getDictLabel } from 'boot/dictionary';
import { requiredTest, phoneTest } from 'boot/inputTest';
import TreeChart from './treeChart';
import tree from './tree';

export default {
  name: 'SysDepart',
  components: {
    tree,
    TreeChart,
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      dialogImageUrl: '',
      tab: 'base',
      form: {
      },
      attachments: [],
      treeChartData: {},
      headers: [{ name: 'Authorization', value: localStorage.Authorization }],
      uploadUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/upload`,
      imgUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/static`,
      uploadAttUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/file/upload`,
    };
  },
  methods: {
    requiredTest,
    phoneTest,
    zoomImg(path) {
      this.dialogImageUrl = `${this.imgUrl}/${path}`;
      this.dialogVisible = true;
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
    selectCatalog(n) {
      this.form = { ...n };
      this.queryImages();
    },
    getDictLabel,
    initTreeChart() {
      this.$axios.get('/jp/person/queryTreeChartData').then(({ result }) => {
        this.treeChartData = result;
      }).finally(() => {
      });
    },
    lock() {

    },
    lockSubmit() {
    },
    queryImages() {
      this.$axios.get(`/sys/file/listByMainId?mainId=${this.form.id}`).then(({ result }) => {
        this.attachments = result;
      });
    },
  },
  mounted() {
  },
  computed: {
    imgList() {
      return this.attachments.filter((f) => f.type === 'image');
    },
    videoList() {
      return this.attachments.filter((f) => f.type === 'video');
    },
  },
  watch: {
    tab: {
      handler(n) {
        if (n === 'author') {
          this.initTreeChart();
          this.$nextTick(() => {
            if (this.$refs.treelist) {
              this.$refs.treelist.expandAll();
            }
          });
        }
      },
    },
  },
};
</script>

<style lang="stylus">
.treeChart
  background $white
  min-width 780px
  height 80vh
  pointer-events all
</style>
