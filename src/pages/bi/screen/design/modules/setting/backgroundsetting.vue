<template>
  <div class="col q-ma-xs column">
    <q-card class="col column q-pa-xs">
      <div class="text-subtitle1 text-center q-py-sm">背景设置</div>
      <q-separator class="q-mb-sm" />
      <q-input
        dense
        filled
        v-model="config.width"
        type="number"
        prefix="宽度："
        class="q-my-sm"
        input-class="text-left"
      />
      <q-input
        dense
        filled
        v-model="config.height"
        type="number"
        prefix="高度："
        class="q-my-sm"
        input-class="text-left"
      />
      <q-input filled v-model="config.color" prefix="背景色：" class="q-my-sm">
        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-color v-model="config.color" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-uploader
        class="full-width"
        ref="uploadPic"
        label="上传图片"
        auto-upload
        fieldName="file"
        :headers="headers"
        accept="image/*"
        :url="uploadUrl"
        :max-files="1"
        no-thumbnails
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
        :options="picSetOptions"
        emit-value
        map-options
      >
        <template v-slot:after>
          <q-btn round dense flat icon="delete" @click="removeUpload" color="warning">
            <q-tooltip content-class="bg-accent">删除背景</q-tooltip>
          </q-btn>
        </template>
      </q-select>
      <div class="q-pa-md">
        <q-badge color="secondary">透明度: {{ config.opacity }}% (0 to 100)</q-badge>
        <q-slider v-model="config.opacity" :min="0" :max="100" color="green" />
      </div>
      <q-toggle v-model="config.showGrid" label="显示网格" />
      <q-toggle v-model="config.darkModel" label="深色主题" @input="changeDarkModel">
        <q-tooltip>新增图表文字等颜色会适应深色主题</q-tooltip>
      </q-toggle>
    </q-card>
  </div>
</template>
<script>
import { picSetOptions } from 'boot/datatype';

export default {
  name: 'backgroundsetting',
  components: {
  },
  data() {
    return {
      picSetOptions,
      headers: [{ name: 'Authorization', value: localStorage.Authorization }],
      uploadUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/upload`,
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
    changeDarkModel() {
      this.config.color = this.config.darkModel ? '#000' : '#fff';
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
