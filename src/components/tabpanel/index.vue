<template>
  <div class="vue-tabpanel bg-white">
    <div class="tabs-list-wrapper">
      <ul class="tabs-list">
        <tab
          v-for="tab in tabs"
          :tab-data="tab"
          @close="close(tab)"
          :key="tab.path"
          @click.native="clickTab(tab)"
        ></tab>
      </ul>
    </div>
  </div>
</template>

<script>
import Tab from './Tab.vue';

export default {
  components: {
    Tab,
  },
  name: 'des-tabs',
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
  methods: {
    clickTab(tab) {
      this.$router.push(`${tab.path}`);
    },
    close(tab) {
      this.$store.commit('Rule/removeRouteTabs', tab.path);
    },
  },
};
</script>
<style lang="stylus">
.vue-tabpanel {
  position: relative;
}

.tabs-list-wrapper {
  padding: 0px 8px;
}

@keyframes loading-rotate {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes loading-rotate {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

.tabs-list {
  list-style: none;
  margin: 0px;
  padding: 0px;
  overflow: auto;
  width: auto;
  zoom: 1;

  >li {
    float: left;
    padding: 12px 18px 6px 18px;
    position: relative;
    color: #999;

    &.loading:before {
      content: ' ';
      box-sizing: border-box;
      display: inline-block;
      width: 14px;
      height: 14px;
      position: absolute;
      left: 0px;
      top: 10px;
      border-radius: 9px;
      border: 2px solid #1ab394;
      border-top-color: transparent;
      border-left-color: transparent;
      animation: loading-rotate 0.8s infinite linear;
      -webkit-animation: loading-rotate 0.8s infinite linear;
    }

    &.active {
      color: #333;

      &:after {
        content: ' ';
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 2px;
        background-color: #1ab394;
        left: 0px;
      }

      .btn-close {
        opacity: 1;
      }
    }

    &:hover {
      cursor: pointer;
      background-color: $grey-1;
      .btn-close {
        opacity: 1;
      }
    }

    .btn-close {
      position: absolute;
      display: inline-block;
      opacity: 0;
      top: 6px;
      right: 0px;
      line-height: 12px;
      width: 14px;
      height: 14px;
      border-radius: 14px;
      font-size: 12px;
      color: #999;
      transition: all 0.2s ease;

      &:hover {
        color: #333;
        transform: scale(1.5);
        cursor: pointer;
      }
    }
  }
}

.tabs-content-wrapper {
  position: relative;

  .tabs-content {
    display: none;

    &.active {
      display: block;
    }
  }
}
</style>
