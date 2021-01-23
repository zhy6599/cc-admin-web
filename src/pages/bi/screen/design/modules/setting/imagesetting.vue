<template>
  <div class="col q-ma-xs column">
    <q-card class="col column q-pa-xs no-wrap">
      <div class="text-subtitle1 text-center q-py-sm">图片设置</div>
      <q-separator class="q-mb-sm" />
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
      <div class="q-pa-md">
        <q-badge color="secondary">透明度: {{ config.opacity }}% (0 to 100)</q-badge>
        <q-slider v-model="config.opacity" :min="0" :max="100" color="green" />
      </div>
      <q-toggle label="溢出隐藏" v-model="config.overflowHiden" />
      <q-toggle label="开启旋转" v-model="config.loop" />
      <q-toggle label="轮流反向" v-model="config.alternate" />
      <q-input
        dense
        filled
        type="number"
        v-model="config.scrolldelay"
        prefix="滚动时间间隔："
        class="q-my-sm"
        input-class="text-left"
      />
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'imagesetting',
  components: {
  },
  data() {
    return {
      headers: [{ name: 'Authorization', value: localStorage.Authorization }],
      fontWeightOptions: [{ label: '正常', value: 'normal' }, { label: '加粗', value: 'bold' }],
      alignOptions: [{ label: '居中', value: 'center' }, { label: '左对齐', value: 'left' }, { label: '右对齐', value: 'right' }],
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
  watch: {
    'config.src': {
      handler(n, o) {
        if (n !== o) {
          this.$refs.uploadPic.reset();
        }
      },
    },
  },
  mounted() {
  },
};
</script>

<style lang="less" scoped>
</style>
