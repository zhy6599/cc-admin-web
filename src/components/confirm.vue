<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card>
      <q-card-section class="row items-center q-ml-lg q-mt-lg" style="min-width: 400px;">
        <q-avatar :icon="icon" color="primary" text-color="white" />
        <span class="q-ml-md">{{msg}}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn outline label="取消" color="primary" v-close-popup />
        <q-btn label="确定" color="primary" @click="$emit('confirm')" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'confirm',
  props: {
    msg: String,
    icon: {
      type: String,
      default: 'mdi-delete-variant',
    },
  },
  data() {
    return {
      showDialog: false,
    };
  },
  methods: {
    show() {
      this.showDialog = true;
    },
  },
};
</script>
