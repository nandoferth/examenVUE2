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
      <h1>Asignar Pago</h1>

      <br />
      <form
        @submit.prevent="addPago({id, id2,id3,id4,concepto, importe, nombre, beneficiario, BRFC, tipoPago, fechaCreacion, fechaMaxima, fechaTermino, autorizacion, vigencia,status})"
      >
        <br />
        <b-form-input type="text" placeholder="concepto" v-model="concepto" />
        <br />
        <b-form-input type="number" placeholder="importe" v-model="importe" />
        <br />
        <b-form-input type="text" placeholder="nombre" v-model="nombre" />
        <br />
        <b-form-input type="text" placeholder="beneficiario" v-model="beneficiario" />
        <br />
        <b-form-input type="text" placeholder="RFC" v-model="BRFC" />
        <br />
        <b-form-input type="text" placeholder="tipoPago" v-model="tipoPago" />
        <br />
        <p class="text-left">Fecha de Creacion:</p>
        <b-form-input type="date" placeholder="fechaCreacion" v-model="fechaCreacion" />
        <br />
        <p class="text-left">Fecha Maxima:</p>
        <b-form-input type="date" placeholder="fechaMaxima" v-model="fechaMaxima" />
        <br />
        <p class="text-left">Fecha de Termino:</p>
        <b-form-input type="date" placeholder="fechaTermino" v-model="fechaTermino" />
        <br />
        <b-form-input type="text" placeholder="autorizacion" v-model="autorizacion" />
        <br />
        <b-form-input type="text" placeholder="vigencia" v-model="vigencia" />
        <br />
        <b-form-input type="text" placeholder="status" v-model="status" />
        <br />
        <b-button
          type="submit"
          class="mt-2"
          variant="outline-primary"
          :disabled="!desactivar"
        >Asignar</b-button>
      </form>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "AddPago",
  data() {
    return {
      id: this.$route.params.id,
      id2: this.$route.params.id2,
      id3: this.$route.params.id3,
      id4: this.$route.params.id4,
      concepto: "",
      importe: "",
      nombre: "",
      beneficiario: "",
      BRFC: "",
      tipoPago: "",
      fechaCreacion: "",
      fechaMaxima: "",
      fechaTermino: "",
      autorizacion: "",
      vigencia: "",
      status: ""
    }; //return
  }, //data
  methods: {
    ...mapActions(["getTrabajo", "addPago", "getSucursal","getdata","cerrarSesion","getCliente"])
    
  },
  created() {

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
    ...mapState(["trabajo", "pago", "sucursal","data","cliente"]),
    ...mapGetters(["existeUsuario"]),
    desactivar() {
      return (
        this.concepto != "" &&
        this.importe != "" &&
        this.nombre != "" &&
        this.beneficiario != "" &&
        this.BRFC != "" &&
        this.tipoPago != "" &&
        this.fechaCreacion != "" &&
        this.fechaMaxima != "" &&
        this.fechaTermino != "" &&
        this.autorizacion != "" &&
        this.vigencia != "" &&
        this.status != ""
      );
    }
  }

};
</script>