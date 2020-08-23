<template>
  <div >
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
    <div class="container">
    <h1>Añadir Documento</h1>
    
    <h3>1.- Registra los Datos de Tu Documento:</h3>
    <form @submit.prevent="agregarDoc({id,id2,id3,id4,nombre,vigencia,fechaVigencia})">
      <br />
      <b-form-input type="text" placeholder="nombre" v-model="nombre" />
      <br />
      <b-form-input type="text" placeholder="status" v-model="vigencia" />
      <br />
      <b-form-input type="date" v-model="fechaVigencia" />
      <br />
      <b-button type="submit" class="mt-2" variant="outline-primary" :disabled="!desactivar">Agregar</b-button>
    </form>
  </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "AddDoc",
  data() {
    return {
      //se iguala con el id de created
      id: this.$route.params.id,
      id2: this.$route.params.id2,
      id3: this.$route.params.id3,
      id4: this.$route.params.id4,
      nombre: "",
      vigencia: "",
      fechaVigencia: "",
      file: null,
      urlTemporal: ""
    };
  },
  methods: {
    //con esto obtienes el trabajo
    ...mapActions(["getTrabajo", "agregarDoc", "cerrarSesion","getdata","getCliente","getSucursal"])
  },
  created() {
    //con esto el puro id
     this.getdata({ id: this.$route.params.id });
    this.getCliente({ id: this.$route.params.id, id2: this.$route.params.id2 });
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
    //con esto muestras el trabajo y el nombre
    ...mapState(["documento", "trabajo", "usuario","cliente","data","sucursal"]),
    ...mapGetters(["existeUsuario"]),
    desactivar() {
      return (
        this.nombre != "" && this.vigencia != "" && this.fechaVigencia != ""
      );
    }
  }
};
</script>