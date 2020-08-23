<template>
  <div class="container">
    <h1>Modificar Pago</h1>
    <br />
    <br />
    <br />
    {{pago}}
    <br />
    <br />
    {{sucursal}}
    <br />
    {{trabajo}}
    <br />
    <form @submit.prevent="editarPago({id:id, id2:id2,id3:id3,pago})">
      <br />
      <p class="text-left">Concepto:</p>
      <b-form-input type="text" v-model="pago.concepto" />
      <br />
      <p class="text-left">Importe:</p>
      <b-form-input type="number" v-model="pago.importe" />
      <br />
      <p class="text-left">Nombre:</p>
      <b-form-input type="text" v-model="pago.nombre" />
      <br />
      <p class="text-left">Beneficiario:</p>
      <b-form-input type="text" v-model="pago.beneficiario" />
      <br />
      <p class="text-left">RFC del Beneficiario:</p>
      <b-form-input type="text" v-model="pago.BRFC" />
      <br />
      <p class="text-left">Tipo de Pago:</p>
      <b-form-input type="text" v-model="pago.tipoPago" />
      <br />
      <p class="text-left">Fecha de Creacion:</p>
      <b-form-input type="date" v-model="pago.fechaCreacion" />
      <br />
      <p class="text-left">Fecha Maxima:</p>
      <b-form-input type="date" v-model="pago.fechaMaxima" />
      <br />
      <p class="text-left">Fecha de Termino:</p>
      <b-form-input type="date" v-model="pago.fechaTermino" />
      <br />
      <p class="text-left">Autorizacion:</p>
      <b-form-input type="text" v-model="pago.autorizacion" />
      <br />
      <p class="text-left">Vigencia:</p>
      <b-form-input type="text" v-model="pago.vigencia" />
      <br />
      <p class="text-left">Status:</p>
      <b-form-input type="text" v-model="pago.status" />
      <br />
      <b-button
        type="submit"
        class="mt-2"
        variant="outline-primary"
        :disabled="!desactivar"
      >Modificar</b-button>
    </form>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "ModificarPago",
  data() {
    return {
      id: this.$route.params.id,
      id2: this.$route.params.id2,
      id3: this.$route.params.id3
    };
  },
  methods: {
    ...mapActions(["getSucursal", "editarPago", "getTrabajo", "getPago"])
  },
  created() {
    this.getPago({ id: this.id, id2: this.id2, id3: this.id3 });
  },
  computed: {
    ...mapState(["trabajo", "sucursal", "pago"]),
    desactivar() {
      return (
        this.pago.concepto != "" &&
        this.pago.importe != "" &&
        this.pago.nombre != "" &&
        this.pago.beneficiario != "" &&
        this.pago.BRFC != "" &&
        this.pago.tipoPago != "" &&
        this.pago.fechaCreacion != "" &&
        this.pago.fechaTermino != "" &&
        this.pago.fechaMaxima != "" &&
        this.pago.autorizacion != "" &&
        this.pago.vigencia != "" &&
        this.pago.status != ""
      );
    }
  }
};
</script>