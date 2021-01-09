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
        label="背景图片"
        no-thumbnails
        auto-upload
        fieldName="file"
        :headers="headers"
        accept="image/*"
        :url="uploadUrl"
        :max-files="1"
        ref="uploadPic"
        @uploaded="uploaded"
      />
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
      <div class="q-pa-md">
        <q-badge color="secondary">透明度: {{ config.opacity }}% (0 to 100)</q-badge>
        <q-slider v-model="config.opacity" :min="0" :max="100" color="green" />
      </div>
      <q-toggle v-model="config.showGrid" label="显示网格" />
    </q-card>
  </div>
</template>
<script>

export default {
  name: 'backgroundsetting',
  components: {
  },
  data() {
    return {
      headers: [{ name: 'Authorization', value: localStorage.Authorization }],
      uploadUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/upload`,
      backSetOptions: [
        { label: '重复', value: 'repeat' },
        { label: '拉伸', value: 'stretch' },
        { label: '不重复', value: 'no-repeat' },
        { label: '水平重复', value: 'repeat-x' },
        { label: '垂直重复', value: 'repeat-y' },
      ],
    };
  },
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  methods: {
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
  computed: {},
  watch: {},
  mounted() {
  },
};
</script>
