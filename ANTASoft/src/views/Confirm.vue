<template>
  <div>
    <!--div SUPREMO-->

    <div id="nav">
      <b-navbar variant="dark">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-navbar-brand>
              <img src="@/assets/advr_efectos.png" height="35" width="150" />
            </b-navbar-brand>
            <b-nav-item @click="cerrarSesion" v-if="existeUsuario">Cerrar Sesion</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <h1>Hola, Confirma Tus Datos</h1>
    <h5>Para Continuar:</h5>
    {{payload}}
    {{usuario}}
    <ul>
      <li v-for="data of Alldata" :key="data.idData">
        
        <br />
        Nombre: {{data.nombre}}
        <br />
        Apellido Paterno: {{data.Apaterno}}
        <br />
        Apellido Materno: {{data.Amaterno}}
        <br />
        Tu Rol:
        <div v-if="data.coordinador==true">Coordinador</div>
        <div v-else>
          Gestor
          <br />
        </div>

        <router-link :to="{name: 'cliente' , params:{id: this.user.email}}">
          <button type="button" class="btn btn-primary">Continuar</button>
        </router-link>
        <!--
                <router-link :to="{name: 'ModificarData' , params:{id: data.idData}}">
                        <button type="button" class="btn btn-warning">Modificar</button>
        </router-link>-->
      </li>
    </ul>
  </div>
  <!--div SUPREMO-->
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "confirm",
  data() {
    return {
      id: this.user.email,
    };
  },
  computed: {
    ...mapState(["usuario", "Alldata", "data"]),
    ...mapGetters(["existeUsuario"])
  },
  created() {
    this.getDataUser();
  },
  methods: {
    ...mapActions(["getDataUser", "cerrarSesion"])
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
