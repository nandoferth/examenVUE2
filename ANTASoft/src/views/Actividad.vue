<template>
  <div>
    <!--div SUPREMO-->
    <div v-if="data.gestor==true">
            <div id="nav">
              <b-navbar variant="dark">
                <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                <b-collapse is-nav id="nav_collapse">
                  <b-navbar-nav>
                    <b-navbar-brand>
                      <img src="@/assets/advr_efectos.png" height="35" width="150" />
                    </b-navbar-brand>
                    <b-nav-item :to="{name: 'home' }" v-if="!existeUsuario">Inicio</b-nav-item>
                    <b-nav-item :to="{name: 'registro'}" v-if="!existeUsuario">Registrarse</b-nav-item>
                    <b-nav-item :to="{name: 'cliente'}" v-if="existeUsuario">Inicio</b-nav-item>
                    <b-nav-item :to="{name: 'sucursal'}" v-if="existeUsuario">Sucursales</b-nav-item>
                    <b-nav-item :to="{name: 'trabajo'}" v-if="existeUsuario">Trabajos</b-nav-item>
                    <b-nav-item :to="{name: 'Asignar'}" v-if="existeUsuario">Asignar</b-nav-item>
                    <b-nav-item :to="{name: 'Actividad'}" v-if="existeUsuario">Actividad</b-nav-item>
                    <b-nav-item @click="cerrarSesion" v-if="existeUsuario">Cerrar Sesion</b-nav-item>
                  </b-navbar-nav>
                </b-collapse>
              </b-navbar>
            </div>

              <h1>Esta es la Actividad del Sistema</h1>
              <h5>Puedes filtrarla y Manipularla</h5>
            <br>
            <br>

            <div class="container">
                          <!-- :filter="busquedaActividad" :filter-function="filtracion"-->
              <b-table striped responsive  :items="Actividad" :fields="fieldsActividad"  >

              </b-table>
            </div>
    </div>
  </div>
  <!--div SUPREMO-->
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "Actividad",
  data() {
    return {
      id: this.user,
      fieldsActividad:[
        {key:'fecha', label:'Fecha', sortable:true},
          {key:'hora', label: 'Hora', sortable:true},
        {key:'correo', label:'Email', sortable: true},
        {key:'nombre', label: 'Nombre', sortable: true},
        {key:'apellido', label: 'Apellido', sortable: false},
        {key:'descripcion', label: 'Descripcion', sortable: false},


      ],
      busquedaActividad:null,
      filters: {search: this.busquedaActividad}
    };
  },
  computed: {
    ...mapState(["usuario", "Alldata", "data","Actividad"]),
    ...mapGetters(["existeUsuario"])
  },
  created() {
    this.getActividad();
  },
  methods: {
    ...mapActions(["getDataUser", "cerrarSesion","getActividad"]),



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
