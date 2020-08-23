<template>
  <div class="container">
    <h1>Modificar Comprobante</h1>
    <br />Trabajo:
    <br />
    {{trabajo}}
    <br />
    <br />
    Sucursal:
    {{sucursal}}
    <br />
    <br />
    Pago:
    {{pago}}
    <br />
    <br />
    Comprobante:
    {{comprobante}}
    <br />
    <br />
    <form
      @submit.prevent="editarComprobante({id:trabajo.id,id2:sucursal.idSucursal,id3:pago.idPago,id4:comprobante.idComprobante,comprobante})"
    >
      <br />
      <p class="text-left">Nombre:</p>
      <b-form-input type="text" placeholder="nombre" v-model="comprobante.nombre" />
      <br />
      <p class="text-left">Concepto:</p>
      <b-form-input type="text" placeholder="status" v-model="comprobante.concepto" />
      <br />
      <p class="text-left">Monto:</p>
      <b-form-input type="text" placeholder="status" v-model="comprobante.monto" />
      <br />
      <p class="text-left">Referencia:</p>
      <b-form-input type="text" placeholder="status" v-model="comprobante.referencia" />
      <br />
      <p class="text-left">Fecha de Creacion:</p>
      <b-form-input type="date" v-model="comprobante.fechaCreacion" />
      <br />
      <button type="submit" class="btn btn-primary" :disabled="!desactivar">Modificar</button>
    </form>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "ModificarComprobante",
  data() {
    return {
      id: this.$route.params.id,
      id2: this.$route.params.id2,
      id3: this.$route.params.id3,
      id4: this.$route.params.id4
    };
  },
  methods: {
    ...mapActions(["getComprobante", "editarComprobante"])
  },
  created() {
    this.getComprobante({
      id: this.id,
      id2: this.id2,
      id3: this.id3,
      id4: this.id4
    });
  },
  computed: {
    ...mapState([
      "usuario",
      "trabajo",
      "documento",
      "sucursal",
      "pago",
      "comprobante"
    ]),
    desactivar() {
      return (
        this.comprobante.nombre != "" &&
        this.comprobante.concepto != "" &&
        this.comprobante.monto != "" &&
        this.comprobante.referencia != "" &&
        this.comprobante.fechaVigencia != ""
      );
    }
  }
};
</script>
