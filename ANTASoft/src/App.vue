<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "App",
  methods: {
    ...mapActions(["cerrarSesion", "getDataUser"])
  },
  computed: {
    ...mapGetters(["existeUsuario", "usuario", "Alldata", "data"]),
    ...mapState(["Alldata"])
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: #d7eae2;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
