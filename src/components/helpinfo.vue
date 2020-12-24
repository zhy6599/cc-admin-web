<template>
  <q-icon name="info" color="t-grey" style="cursor:help" size="sm">
    <q-tooltip><slot/></q-tooltip>
  </q-icon>
</template>

<script>
export default {
  name: 'HelpInfo',
};
</script>
