<template>
  <q-select
    ref="qSelectCatalog"
    outlined
    dense
    emit-value
    map-options
    v-model="catalogId"
    :options="catalogOptions"
    :display-value="form.catalogId_dictText"
  >
    <template v-slot:option>
      <q-tree
        ref="qTree"
        :nodes="catalogList"
        node-key="id"
        label-key="name"
        selected-color="primary"
        :selected.sync="selectedCatalogKey"
        @update:selected="changeCatalog"
      />
    </template>
  </q-select>
</template>

<script>
import { getDictLabel } from 'boot/dictionary';
import { requiredTest } from 'boot/inputTest';

export default {
  name: 'CatalogSelect',
  props: {
    form: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      catalogId: '',
      catalogList: [],
      catalogOptions: [{}],
      selectedCatalogKey: '',
    };
  },
  methods: {
    requiredTest,
    getDictLabel,
    queryCatalog() {
      this.$axios.get(`/sys/catalog/treeList?type=${this.type}`).then(({ result }) => {
        this.catalogList = result;
        if (this.form.catalogId) {
          this.selectedCatalogKey = this.form.catalogId;
          this.changeCatalog(this.form.catalogId);
        }
      }).finally(() => {
        this.loading = false;
      });
    },
    initLabel(catalog) {
      if (this.selectedCatalogKey === catalog.id) {
        this.$set(this.form, 'catalogId_dictText', catalog.name);
      }
      if (catalog.children) {
        catalog.children.forEach((child) => { this.initLabel(child); });
      }
    },
    changeCatalog(n) {
      this.catalogList.forEach((catalog) => {
        this.initLabel(catalog);
      });
      this.$set(this.form, 'catalogId', n);
    },
  },
  mounted() {
    this.queryCatalog();
  },
};
</script>

<style lang="stylus"></style>
