<template>
  <div class="col q-ma-xs column">
    <q-card class="col column q-pa-xs no-wrap">
      <div class="text-subtitle1 text-center q-py-sm">视频设置</div>
      <q-separator class="q-mb-sm" />
      <q-uploader
        class="full-width"
        label="上传视频"
        auto-upload
        fieldName="file"
        :headers="headers"
        accept="video/*"
        :url="uploadUrl"
        :max-files="1"
        @uploaded="uploaded"
      />
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'videosetting',
  components: {
  },
  data() {
    return {
      headers: [{ name: 'Authorization', value: localStorage.Authorization }],
      uploadUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/upload`,
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
        this.$q.notify('视频上传成功');
      } else {
        this.$q.notify({
          color: 'red',
          message: '视频上传失败',
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

<style lang="stylus" scoped>
</style>
