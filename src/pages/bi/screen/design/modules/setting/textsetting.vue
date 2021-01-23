<template>
  <div class="col q-ma-xs column">
    <q-card class="col column q-pa-xs no-wrap">
      <q-scroll-area class="col">
        <div class="text-subtitle1 text-center q-py-sm">文字设置</div>
        <q-separator class="q-mb-sm" />
        <q-toggle label="时间字段" v-model="config.asDate" />
        <q-select
          v-if="config.asDate"
          dense
          filled
          v-model="config.dateFormat"
          transition-show="flip-up"
          emit-value
          map-options
          transition-hide="flip-down"
          prefix="格式："
          class="q-my-sm"
          :options="dateFormatOptions"
        />
        <div v-if="!config.asDate">文本内容：</div>
        <q-input
          v-if="!config.asDate"
          dense
          filled
          v-model="config.text"
          type="textarea"
          debounce="500"
        />
        <q-expansion-item dense dense-toggle expand-separator label="字体设置">
          <q-card>
            <q-card-section>
              <q-input
                dense
                filled
                v-model="config.fontSize"
                prefix="字体大小："
                class="q-my-sm"
                type="number"
                input-class="text-left"
              />
              <q-input
                dense
                filled
                v-model="config.color"
                prefix="字体颜色："
                class="q-my-sm"
                input-class="text-left"
              >
                <template v-slot:append>
                  <q-icon name="colorize" class="cursor-pointer" :style="{color:config.color}">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                      <q-color v-model="config.color" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input
                dense
                filled
                v-model="config.letterSpacing"
                type="number"
                prefix="字体间距："
                class="q-my-sm"
                input-class="text-left"
              />
              <q-select
                dense
                filled
                v-model="config.fontWeight"
                transition-show="flip-up"
                emit-value
                map-options
                transition-hide="flip-down"
                prefix="文字粗细："
                class="q-my-sm"
                :options="fontWeightOptions"
              />
              <q-select
                dense
                filled
                v-model="config.textAlign"
                transition-show="flip-up"
                emit-value
                map-options
                transition-hide="flip-down"
                prefix="对齐方式："
                class="q-my-sm"
                :options="alignOptions"
              />
              <div class="q-pa-md">
                <q-badge color="secondary">透明度: {{ config.opacity }}% (0 to 100)</q-badge>
                <q-slider v-model="config.opacity" :min="0" :max="100" color="green" />
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item dense dense-toggle expand-separator label="背景设置">
          <q-card>
            <q-card-section>
              <q-toggle label="使用背景色" v-model="config.useBackground" />
              <q-input filled v-model="config.bgColor" prefix="背景色：" class="q-my-sm">
                <template v-slot:append>
                  <q-icon name="colorize" class="cursor-pointer" :style="{color:config.bgColor}">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                      <q-color v-model="config.bgColor" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-uploader
                class="full-width"
                ref="uploadPic"
                label="背景图片"
                no-thumbnails
                auto-upload
                fieldName="file"
                :headers="headers"
                accept="image/*"
                :url="uploadUrl"
                :max-files="1"
                @uploaded="uploaded"
              >
                <template v-slot:list>
                  <q-img class="full-height"
                  :src="imagePath"
                  />
                </template>
              </q-uploader>
              <q-select
                dense
                filled
                options-dense
                v-model="config.backPicSet"
                prefix="背景设置："
                class="q-my-sm"
                :options="backSetOptions"
                emit-value
                map-options
              >
                <template v-slot:after>
                  <q-btn round dense flat icon="delete" @click="removeUpload" color="warning">
                    <q-tooltip content-class="bg-accent">删除背景</q-tooltip>
                  </q-btn>
                </template>
              </q-select>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item dense dense-toggle expand-separator label="跑马灯设置">
          <q-card>
            <q-card-section>
              <q-toggle label="开启跑马灯" v-model="config.marquee.loop" />
              <q-toggle label="轮流反向" v-model="config.marquee.alternate" />
              <q-input
                dense
                filled
                type="number"
                v-model="config.marquee.scrolldelay"
                prefix="滚动时间间隔："
                class="q-my-sm"
                input-class="text-left"
              />
              <q-select
                dense
                filled
                options-dense
                v-model="config.marquee.direction"
                prefix="滚动方向："
                class="q-my-sm"
                :options="directionOptions"
                emit-value
                map-options
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <div class="text-body2 q-pt-sm">数据</div>
        <draggable
          class="dotted w_l_g_cat"
          animation="200"
          v-model="config.datas"
          ghostClass="drag-ing"
          draggable=".drag-item"
          :group="{name:'datas',put:checkDrag('all','modelCat')}"
          @add="dragAdd($event,'datas')"
          @end="moveEnd($event,'datas')"
        >
          <div
            v-for="v in config.datas"
            :key="v.name"
            :class="checkClass(v)"
            class="rounded-borders row no-wrap justify-between items-center drag-item"
          >
            <div class="row justify-between items-center q-ml-md" style="width:190px">
              <span>
                {{v|cut(13)}}
                <q-tooltip>{{v.name}}</q-tooltip>
              </span>
              <q-select
                dense
                emit-value
                map-options
                borderless
                v-model="v.agg"
                :options="calculateType"
                dropdown-icon="mdi-calculator-variant"
              >
                <q-tooltip>计算方式</q-tooltip>
              </q-select>
            </div>
            <q-btn round dense flat icon="close" @click="del(v,'datas')">
              <q-tooltip>移除数据</q-tooltip>
            </q-btn>
          </div>
          <div class="drag-no" v-if="!config.datas.length&&!config.draging.type">
            <q-icon name="mdi-cursor-default-click" size="24px" />拖拽
            <b class="text-tertiary">字段</b>作为数据
          </div>
        </draggable>
        <div class="text-body2 q-pt-sm">配置</div>
        <q-input
          dense
          filled
          v-model="config.interval"
          mask="######"
          :readonly="!config.loop"
          :debounce="999"
          prefix="定时刷新："
          suffix="秒"
          class="q-my-sm"
          input-class="text-right"
        >
          <template #append>
            <q-toggle v-model="config.loop" />
          </template>
        </q-input>
      </q-scroll-area>
    </q-card>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { calculateType } from 'boot/datatype';

export default {
  name: 'textsetting',
  components: {
    draggable,
  },
  data() {
    return {
      calculateType,
      fontWeightOptions: [{ label: '正常', value: 'normal' }, { label: '加粗', value: 'bold' }],
      alignOptions: [{ label: '居中', value: 'center' }, { label: '左对齐', value: 'left' }, { label: '右对齐', value: 'right' }],
      headers: [{ name: 'Authorization', value: localStorage.Authorization }],
      backPicSet: 'repeat',
      uploadUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/upload`,
      backSetOptions: [
        { label: '重复', value: 'repeat' },
        { label: '拉伸', value: 'stretch' },
        { label: '不重复', value: 'no-repeat' },
        { label: '水平重复', value: 'repeat-x' },
        { label: '垂直重复', value: 'repeat-y' },
      ],
      dateFormatOptions: [
        { label: 'YYYY-MM-DD HH:mm:ss', value: 'YYYY-MM-DD HH:mm:ss' },
        { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
        { label: 'MM-DD', value: 'MM-DD' },
        { label: 'HH:mm:ss', value: 'HH:mm:ss' },
        { label: '星期几', value: '星期几' },
        { label: 'YYYY年MM月DD日 HH时mm分ss秒', value: 'YYYY年MM月DD日 HH时mm分ss秒' },
      ],
      directionOptions: [
        { label: '左', value: 'left' },
        { label: '右', value: 'right' },
        { label: '上', value: 'up' },
        { label: '下', value: 'down' },
      ],
      imgUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/static`,
    };
  },
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  methods: {
    changeBackPic() {
      this.config.backPicSet = this.backPicSet;
    },
    del(t, type) {
      if (type === 'datas') {
        this.config.datas = this.config.datas.filter((v) => v.name !== t.name);
      }
    },
    translate({ name, visualType, type }, tp) {
      const t = {
        name,
        visualType,
        type,
        field: {
          alias: '',
          desc: '',
          useExpression: false,
        },
        format: {
          formatType: 'default',
        },
      };
      if (tp === 'rows') {
        t.agg = '';
        t.chart = {};
      }
      return t;
    },
    dragAdd(e, type) {
      const list = this.config.draging.data
        .filter((v) => !this.config[type].some((d) => d.name === v.name));
      this.config[type].splice(
        e.newIndex,
        1,
        ...list.map((v) => this.translate(v, type)),
      );
    },
    cloneEnd() {
      this.config.draging = {
        type: '',
        data: [],
      };
    },
    moveEnd({
      originalEvent, from, to, oldIndex,
    }, v) {
      if (from === to) {
        const {
          x, y, width, height,
        } = from.getBoundingClientRect();
        if (originalEvent.pageX < x
          || originalEvent.pageX > (x + width)
          || originalEvent.pageY < y
          || originalEvent.pageY > (y + height)) {
          this.config[v].splice(oldIndex, 1);
        }
      }
    },
    checkClass({ name, type }) {
      const c = [];
      if (this.config.draging.data.some((d) => d.name === name)) {
        c.push('drag-ing');
      }
      if (type === 'value') {
        c.push('bg-positive');
      }
      if (type === 'category') {
        c.push('bg-light-blue');
      }
      return c;
    },
    checkDrag(a, b) {
      return a === 'all' || (this.config.draging.type === b
        && this.config.draging.data.some((v) => !this.config[a].some((d) => d.name === v.name)));
    },
    removeUpload() {
      this.config.src = '';
      this.$refs.uploadPic.removeUploadedFiles();
    },
    uploaded({ xhr }) {
      const response = JSON.parse(xhr.responseText);
      if (response.success) {
        this.config.src = response.message;
        this.$q.notify('图片上传成功');
      } else {
        this.$q.notify({
          color: 'red',
          message: '图片上传失败',
        });
      }
    },
  },
  filters: {
    cut(v, l) {
      let val = '';
      if (v.field.alias) {
        val = `${v.field.alias}:${v.name}`;
      } else {
        val = v.name;
      }
      return val.length < l ? val : `${val.slice(0, l)}…`;
    },
  },
  computed: {
    imagePath() {
      let path = '';
      if (this.config.src) {
        path = `${this.imgUrl}/${this.config.src}`;
      }
      return path;
    },
  },
  watch: {},
  mounted() {
  },
};
</script>

<style lang="less" scoped>
</style>
