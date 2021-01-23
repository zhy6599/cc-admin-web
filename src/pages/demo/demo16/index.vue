<template>
  <div class="q-pa-sm bg-green cross-chart-table">
    <q-markup-table
      :style="config.table.tableStyle">
      <thead v-if="true">
        <tr>
          <th :style="config.table.tableHead">Dessert (100g serving)</th>
          <th :style="config.table.tableHead">Calories</th>
          <th :style="config.table.tableHead">Fat (g)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td :style="config.table.tableBody">Frozen Yogurt</td>
          <td :style="config.table.tableBody">159</td>
          <td :style="config.table.tableBody">6</td>
        </tr>
        <tr>
          <td :style="config.table.tableBody">Frozen Yogurt</td>
          <td :style="config.table.tableBody">159</td>
          <td :style="config.table.tableBody">6</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>

export default {
  name: 'Demo16',
  components: {
  },
  data() {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true,
        },
        {
          name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true,
        },
        { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
        { name: 'protein', label: 'Protein (g)', field: 'protein' },
        { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
        {
          name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
        {
          name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
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
      config: {
        table: {
          horizontal: false,
          loop: false,
          direction: 'up',
          scrolldelay: 6,
          alternate: true,

          tableStyle: {
            borderWidth: 1,
            borderStyle: 'solid',
            color: '#000',
          },
          tableHead: {
            show: true,
            color: '#000',
            borderWidth: '1px',
            borderStyle: '',
            borderColor: '#feffff',
            backgroundColor: '#eee',
            fontSize: '12px',
            fontWeight: 'bold',
            textAlign: 'center',
            opacity: 1,
          },
          tableBody: {
            color: '#000',
            borderWidth: '1px',
            borderStyle: '',
            borderColor: '#feffff',
            backgroundColor: '#f8f8f8',
            fontSize: '12px',
            fontWeight: 'bold',
            textAlign: 'center',
          },
        },
      },
    };
  },
  methods: {
  },
  computed: {
  },
  mounted() {
  },
};
</script>

<style lang="stylus">
.bg-transparent-table
  background-color transparent
.cross-chart-table
  .q-table
    thead
      th,td
        position sticky
        opacity 1
        z-index: 1
      tr
        th
          position sticky
          top 0
          z-index 1
</style>
