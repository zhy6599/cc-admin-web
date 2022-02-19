<template>
  <q-scroll-area class="col main-menu">
    <div>
      <q-list v-for="u in $store.state.Rule.routes" :key="u.id">
        <cc-menu-item
          :menuInfo="u"
          :init-level="0"
        />
      </q-list>
    </div>
  </q-scroll-area>
</template>

<script>
import CcMenuItem from './ccmenuitem';

export default {
  name: 'CcMenu',
  components: { CcMenuItem },
  data() {
    return {
      bgColor: 'bg-white',
      thumbStyle: {
        right: '5px',
        borderRadius: '5px',
        backgroundColor: '#616161',
        width: '5px',
      },
      thumbStyleOfMenu: {
        borderRadius: '5px',
        backgroundColor: 'rgba(144,147,153,0.9)',
        padding: '10px;',
        margin: '10px;',
        width: '3px',
      }
      ,
    };
  },
};
</script>
