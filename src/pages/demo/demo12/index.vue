<template>
  <q-page-sticky
          expand
          position="top"
          style="z-index: 2000"
          class="q-py-xs bg-grey-2"
        >
          <q-toolbar style="min-height: 40px">
            <q-tabs
              dense
              shrink
              inline-label
              indicator-color="transparent"
              active-bg-color="primary"
              active-color="white"
              v-model="currentPath"
            >
              <div
                v-for="(tab, index) in tabs"
                :key="index"
                class="q-mr-sm items-center"
              >
                <q-tab
                  :ripple="false"
                  :label="tab.name"
                  :name="tab.path"
                  @click="routeTo(tab.path)"
                  :class="{
                    'bg-white': !isActive(tab),
                    'text-grey-7': !isActive(tab),
                    'loading': tab.loading
                  }"
                  exact
                  style="padding: 0 8px; min-height: 24px; border-radius: 4px"
                >
                  <q-icon
                    v-if="tab.path !== '/home'"
                    size="18px"
                    name="close"
                    @click.stop="removeTab(index)"
                  ></q-icon>
                </q-tab>
              </div>
            </q-tabs>
          </q-toolbar>
        </q-page-sticky>
</template>
<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      tabs: this.$store.state.Rule.routeTabs,
      currentPath: this.$route.path,
    };
  },
  mounted() {
  },
  methods: {
    isActive(tab) {
      return this.$route.path === tab.path;
    },
    routeTo(path) {
      this.$router.push(path);
    },
    removeTab(index) {
      this.tabs.splice(index, 1);
      this.removeTabFlag = true;
      let path = '/';
      if (this.tabs.length > 0) {
        path = this.tabs[this.tabs.length - 1].path;
      }
      this.$router.push(path);
    },
  },
  computed: {
  },
};
</script>
