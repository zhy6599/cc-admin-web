<template>
  <div>
    <iframe :src="ureport" id="mobsf" frameborder="0" style="position:absolute;"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    assignFormData() {
    },
    init() {
    },
  },
  mounted() {
    /**
     * iframe-宽高自适应显示
     */
    function changeMobsfIframe() {
      const mobsf = document.getElementById('mobsf');
      if (mobsf) {
        const deviceWidth = document.body.clientWidth;
        const deviceHeight = document.body.clientHeight;
        mobsf.style.width = `${Number(deviceWidth) - 20}px`; // 数字是页面布局宽度差值
        mobsf.style.height = `${Number(deviceHeight) - 80}px`; // 数字是页面布局高度差
      }
    }

    changeMobsfIframe();

    window.onresize = function resize() {
      changeMobsfIframe();
    };
  },
  beforeDestroy() {
    this.assignFormData();
  },
  computed: {
    ureport() {
      // ?_u=file:${this.$route.query.id}.ureport.xml
      return `${process.env.SERVER_URL}${process.env.BASE_URL}/ureport/designer`;
    },
  },
};
</script>
