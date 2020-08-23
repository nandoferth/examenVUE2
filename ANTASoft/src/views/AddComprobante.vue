<template>
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
    <h1>{{data.nombre}} añade el Comprobante de {{pago.nombre}} a {{trabajo.nombre}} de {{sucursal.status}}, de {{cliente.nombre}}</h1>
   
    <div class="container">
    <h3>Registra los Datos:</h3>
    <form
      @submit.prevent="addComprobante({id,id2,id3,id4,id5,nombre,concepto,monto,referencia,fechaCreacion})"
    >
      <br />
      <b-form-input type="text" placeholder="nombre" v-model="nombre" />
      <br />
      <b-form-input type="text" placeholder="concepto" v-model="concepto" />
      <br />
      <b-form-input type="text" placeholder="nombre" v-model="monto" />
      <br />
      <b-form-input type="text" placeholder="concepto" v-model="referencia" />
      <br />
      <b-form-input type="date" v-model="fechaCreacion" />
      <br />
      <b-button
        type="submit"
        class="mt-2"
        variant="outline-primary"
        :disabled="!desactivar"
      >Agregar Comprobante</b-button>
    </form>
    </div>
  </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "AddComprobante",
  data() {
    return {
      //se iguala con el id de created
      id: this.$route.params.id,
      id2: this.$route.params.id2,
      id3: this.$route.params.id3,
      id4: this.$route.params.id4,
      id5: this.$route.params.id5,
      nombre: "",
      concepto: "",
      monto: "",
      referencia: "",
      archivo: "",
      fechaCreacion: ""
    };
  },
  methods: {
    //con esto obtienes el trabajo
    ...mapActions(["getTrabajo", "getSucursal", "addComprobante","cerrarSesion","getPago"])
  },
  created() {
    //con esto el puro id
    this.getPago({ id: this.id, id2: this.id2, id3: this.id3 ,id4: this.id4 , id5: this.id5});

  },
  computed: {
    //con esto muestras el trabajo y el nombre
    ...mapState(["pago", "sucursal", "trabajo", "usuario","data","cliente","comprobante"]),
    ...mapGetters(["existeUsuario"]),
    desactivar() {
      return (
        this.nombre != "" &&
        this.concepto != "" &&
        this.monto != "" &&
        this.referencia != "" &&
        this.fechaCreacion != ""
      );
    }
  }
};
</script>