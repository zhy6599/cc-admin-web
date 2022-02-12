<template>
  <q-field outlined dense ref="field" :value="value" :readonly="readonly"
    :rules="required?[requiredTest]:undefined" :label="label" class="input-Date">
    <template #control>
      {{value}}
    </template>
    <template #append v-if="!readonly">
      <q-btn flat dense round color="primary" icon="schedule" @click="toggle"/>
      <q-menu no-parent-event ref="menu" :target="$refs.field"
        anchor="top right" self="top right" :offset="[0, -40]">
        <div class="row">
          <q-date minimal mask="YYYY-MM-DD" :value="date" @input="input($event,time)"/>
          <select-time :value="time" @input="input(date,$event)"/>
        </div>
      </q-menu>
    </template>
  </q-field>
</template>

<script>
import { date } from 'quasar';
import { requiredTest } from 'boot/inputTest';
import selectTime from 'components/form/selecttime';

export default {
  name: 'InputDatetime',
  components: {
    selectTime,
  },
  props: {
    value: [String, Object],
    required: Boolean,
    readonly: Boolean,
    label: String,
  },
  data() {
    return {
      date: '',
      time: '',
    };
  },
  methods: {
    requiredTest,
    toggle() {
      this.date = '';
      this.time = '';
      if (this.value) {
        [this.date, this.time] = this.value.split(' ');
      }
      this.$refs.menu.toggle();
    },
    input(d, t) {
      this.date = d || date.formatDate(Date.now(), 'YYYY-MM-DD');
      this.time = t || date.formatDate(Date.now(), 'HH:mm:ss');
      this.$emit('input', `${this.date} ${this.time}`);
    },
    validate() {
      return this.$refs.field.validate();
    },
    resetValidation() {
      return this.$refs.field.resetValidation();
    },
  },
};
</script>
