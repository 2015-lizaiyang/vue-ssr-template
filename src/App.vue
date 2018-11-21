<template>
  <div id="app">
    <input v-model="msg">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'just ssr',
    };
  },
};
</script>
