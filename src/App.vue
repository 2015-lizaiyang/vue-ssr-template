<style lang="scss">
#app {
  width: min-content;
  margin: 0 auto;
}
</style>

<style src="./app.less"></style>


<template>
  <div id="app">
    <input v-model="msg">
    <h1>{{ msg }}</h1>
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
