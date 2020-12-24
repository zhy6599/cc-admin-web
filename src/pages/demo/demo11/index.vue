<template>
  <div class="q-pa-md">
    <q-table title="表格展开演示" :data="funcDataList" :columns="funcColumnList" row-key="type">
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td style="width:30px;">
            <q-btn
              size="sm"
              round
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'add'"
            />
          </q-td>
          <q-td>{{props.key}}</q-td>
          <q-td />
          <q-td />
          <q-td />
        </q-tr>
        <q-tr
          v-show="props.expand"
          colspan="100%"
          v-for="func in props.row.functions"
          :key="func.expression"
        >
          <q-td style="width:30px;" />
          <q-td auto-width>{{ func.expression }}</q-td>
          <q-td auto-width>{{ func.remark }}</q-td>
          <q-td auto-width>{{ func.help }}</q-td>
          <q-td>{{ func.returnType }}</q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { funcDataList } from 'boot/functions';

export default {
  name: 'Demo11',
  components: {
  },
  data() {
    return {
      funcColumnList: [
        {
          name: 'type',
          align: 'left',
          label: '函数名称',
          field: 'type',
        },
        {
          name: 'remark',
          align: 'left',
          label: '功能说明',
          field: 'remark',
        },
        {
          name: 'example',
          align: 'left',
          label: '示例',
          field: 'example',
        },
        {
          name: 'returnType',
          align: 'left',
          label: '返回类型',
          field: 'returnType',
        },
      ],
      funcDataList,
      columns: [
        {
          name: 'leibie', align: 'center', label: '类别', field: 'calories', sortable: true,
        },
        {
          name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true, style: 'width: 10px',
        },
      ],
      data: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%',
        },
      ],
    };
  },
};
</script>

<style lang="stylus"></style>
