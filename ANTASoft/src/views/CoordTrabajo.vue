<template>
  <!--div supremo-->
  <div>
    <div v-if="data.coordinador==true">
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
              <b-nav-item
                :to="{name: 'home' }"
                @click="cerrarSesion"
                v-if="existeUsuario"
              >Cerrar Sesion</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>

      <h1>Hola Coordinador :{{data.nombre}} {{data.Apaterno}} {{data.Amaterno}}</h1>
      <h5>Tu id: {{data.idData}}</h5>

      <h1>Estas son las sucursales de {{cliente.nombre}}</h1>
      <!--usuario                   cliente                     sucursal -->
      <router-link
        :to="{name: 'CoordAddTrabajo', params:{id: this.$route.params.id, id2:this.$route.params.id2, id3: this.$route.params.id3}}"
      >
        <button type="button" class="btn btn-success">Agregar Trabajo</button>
      </router-link>

      <ul>
        <li v-for="trabajo of trabajos" :key="trabajo.id">
          <br />
         
          
            <br />
            Nombre:{{trabajo.nombre}}
            <br />
            Status: {{trabajo.status}}
            <br />
            Fecha de Creacion: {{trabajo.fechaCreacion}}
            <br />  
            Fecha de Termino: {{trabajo.fechaTermino}}
            <br />
            Fecha de Vigencia: {{trabajo.fechaVigencia}}
            <br />

          <router-link :to="{name: 'documento' , params:{id, id2,id3, id4:trabajo.id}}">
            <button type="button" class="btn btn-primary">Ir a Documentos</button>
          </router-link>|
          <router-link :to="{name: 'pago' , params:{id, id2,id3, id4:trabajo.id}}">
            <button type="button" class="btn btn-primary">Ir a Pagos</button>
          </router-link>
        </li>
      </ul>
    </div>

   

    <!--div supremo-->
  </div>
  <!--div supremo-->
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "CoordTrabajo",
  data() {
    return {
      id: this.$route.params.id,
      id2: this.$route.params.id2,
      id3: this.$route.params.id3
    };
  },
  computed: {
    ...mapState([
      "usuario",
      "trabajo",
      "trabajos",
      "Alldata",
      "trabajoStock",
      "data",
      "cliente"
    ]),
    ...mapGetters(["existeUsuario"])
  },
  methods: {
    ...mapActions([
      "getTrabajoStock",
      "eliminarTrabajoStock",
      "getDataUser",
      "getdata",
      "getCliente",
      "getTrabajos",
      "cerrarSesion"
    ])
  },
  created() {
    this.getdata({ id: this.$route.params.id });
    this.getTrabajoStock();
    this.getDataUser();
    this.getCliente({ id: this.$route.params.id, id2: this.$route.params.id2 });
    this.getTrabajos({
      id: this.$route.params.id,
      id2: this.$route.params.id2,
      id3: this.$route.params.id3
    });
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