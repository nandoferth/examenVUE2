<template>
  <div>
     <div id="nav">
      <b-navbar variant="dark">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-navbar-brand>
              <img src="@/assets/advr_efectos.png" height="35" width="150" />
            </b-navbar-brand>
            <b-nav-item @click="cerrarSesion" v-if="existeUsuario"></b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>


    <h1>Añadir Trabajo</h1>
    <br>

    <!--prueba cliente-->
     <div class="container" style="width: 500px;">
      <form
        @submit.prevent="agregarTrabajoStock({nombre,data,fecha,hora})"
      >
        <b-form-input type="text" placeholder="Nombre" v-model="nombre"></b-form-input>
        <br />
        <br />
        <b-button
          type="submit"
          class="mt-2"
          variant="outline-primary"
          :disabled="!desactivar"
        >Agregar</b-button>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState,mapGetters } from "vuex";
export default {
  name: "AddTrabajo",
  data() {
    return {
      id: this.$route.params.id,
      nombre: "",
      status: "",
      fechaCreacion: new Date().toISOString().substr(0, 10),
      fechaTermino: "",
      fechaVigencia: ""
    };
  },
  methods: {
    ...mapActions(["agregarTrabajoStock","cerrarSesion"])
  },
  computed: {
    ...mapState(["data"]),
    ...mapGetters(["existeUsuario"]),
    desactivar() {
      return (
        this.nombre != "" 
     
      );
    },
      fecha(){
          var date = new Date().toJSON().slice(0,10).replace(/-/g,'/');

          return date
      },
      hora(){
          var datetime = new Date();
          var time = datetime.toLocaleTimeString();

          return time

      }
  }
};
</script>
<!--NAV STYLE-->
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
