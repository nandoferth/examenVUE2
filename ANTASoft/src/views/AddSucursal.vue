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
            <b-nav-item @click="cerrarSesion" v-if="existeUsuario">Cerrar Sesión</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div class="container">
    <h1>Crear Sucursal</h1>
      {{data}}
      {{fecha}}
      {{hora}}


    <div class="container" style="width: 500px;">
    <form
      @submit.prevent="asignarSucursalStock({nombre, calle, numero, colonia, estado, municipio, status, data, fecha, hora})"
    >
      <br />
        <!--<b-form-input type="text" placeholder="Clave de Inmueble" v-model="claveInmueble" @keydown.space="(event) => event.preventDefault()"/>-->
       <br />
        <br />
      <b-form-input type="text" placeholder="Nombre" v-model="nombre" />
      <br />
       <p class="text-left">
      <Inegi @dataperrona="datos($event)">

      </Inegi>
       </p>
      <br />
     
      <br />
       <b-form-input type="text" placeholder="calle" v-model="calle" />
      <br />
      <b-form-input type="number" placeholder="numero" v-model="numero" />
      <br />
      <b-button type="submit" class="mt-2" variant="outline-primary" :disabled="!desactivar">Asignar</b-button>
       <!--
      <p class="text-left">Status:</p>
          <p class="text-left">
            <input
              type="checkbox"
              id="gestor"
              :disabled="coordinador ? true : false"
              v-model="gestor"
            />
            <label for="checkbox">Activo</label>
          </p>
          <p class="text-left">
            <input
              type="checkbox"
              id="coordinador"
              :disabled="gestor ? true : false"
              v-model="coordinador"
            />
            <label for="checkbox">inacti</label>
          </p>-->
    </form>
    </div>
  </div>
  </div>
</template>
<script>
import Inegi from "@/components/Inegi.vue";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "AddSucursal",
  data() {
    return {
      id: this.$route.params.id,
      nombre: "",
      calle: "",
      numero: "",
      colonia: "",
      estado: "",
      municipio: "",
      status: ""
    };
  },
  methods: {
    ...mapActions(["getTrabajo", "asignarSucursalStock", "cerrarSesion","getdata"]),
    datos: function (e) {
      [this.estado, this.municipio, this.colonia] = e
    }
  },
  created() {
    this.getdata(this.id)
  },
  computed: {
    ...mapState(["sucursal", "trabajo","data"]),
    ...mapGetters(["existeUsuario"]),
    desactivar() {
      return (
        this.nombre != "" &&
        this.calle != ""

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
  },
   components:{
    Inegi
  }
};
</script>