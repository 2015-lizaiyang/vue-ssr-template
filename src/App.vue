<style lang="scss">
#app {
  width: max-content;
  margin: 0 auto;
  input {
    width: -webkit-fill-available;
  }
}
</style>

<style src="./app.less"></style>


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
