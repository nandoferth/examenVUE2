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

      <h1>Estas son los Documentos de {{trabajo.nombre}} de {{sucursal.estado}} del Cliente {{cliente.nombre}}</h1>
      <router-link
        :to="{name: 'AddDoc', params:{id: this.$route.params.id, id2:this.$route.params.id2, id3: this.$route.params.id3, id4: this.$route.params.id4}}"
      >
        <button type="button" class="btn btn-success">Agregar Documento</button>
      </router-link>|
      <router-link :to="{name: 'CoordTrabajo' , params:{id, id2,id3}}">
        <button type="button" class="btn btn-primary">Ir a Trabajos</button>
      </router-link>
      <br>
      <br>
      <div class="container">
      <ul>
        <li v-for="documento of docs" :key="documento.idDoc">
          
          Nombre: 
          {{documento.nombre}}
          <br />
          Vigencia: {{documento.vigencia}}
          <br />
          Fecha de Vigencia: {{documento.fechaVigencia}}
          <br>
          <div v-if="documento.url==''">
            
            <router-link :to="{name: 'Upload' , params:{id, id2,id3,id4,id5:documento.idDoc}}">
                  <button type="button" class="btn btn-outline-info">Agregar Archivo</button>
            </router-link>
            
          </div>
          <div v-else>
              <a :href="documento.url" target="_blank" class="btn btn-outline-info">Visualizar</a>
          <br />	 
          </div>
        
        </li>
      </ul>
      </div>
    </div>

    <!--BLOQUE COORDINADOR-->

    <!--div supremo-->
  </div>
  <!--div supremo-->
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "Documento",
  data() {
    return {
      id: this.$route.params.id,
      id2: this.$route.params.id2,
      id3: this.$route.params.id3,
      id4: this.$route.params.id4
    };
  },
  methods: {
    ...mapActions([
      "getTrabajo",
      "getDocs",
      "eliminarDoc",
      "getTrabajoStock",
      "eliminarTrabajoStock",
      "getDataUser",
      "getdata",
      "getCliente",
      "getTrabajos",
      "cerrarSesion",
      "getSucursal",
      "getTrabajo"
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
    this.getDocs({   id: this.$route.params.id,
      id2: this.$route.params.id2,
      id3: this.$route.params.id3,
      id4: this.$route.params.id4});


    this.getSucursal({
      id: this.$route.params.id,
      id2: this.$route.params.id2,
      id3: this.$route.params.id3
    });
    this.getTrabajo({
      id: this.$route.params.id,
      id2: this.$route.params.id2,
      id3: this.$route.params.id3,
      id4: this.$route.params.id4
    });
  },
  computed: {
    ...mapState([
      "docs",
      "trabajo",
      "usuario",
      "trabajos",
      "Alldata",
      "trabajoStock",
      "data",
      "cliente",
      "sucursal"
    ]),
    ...mapGetters(["existeUsuario"])
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
