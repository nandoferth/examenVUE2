<template>
  <div class="container">
    <h1>Modificar Documento</h1>
    Trabajo:
    {{id}} {{trabajo.nombre}} {{trabajo.status}}
    <br />
    Documento : {{documento.idDoc}}
    <form @submit.prevent="editarDocumento({id,id2,documento})">
      <br />
      <p class="text-left">Nombre:</p>
      <b-form-input type="text" placeholder="nombre" v-model="documento.nombre" />
      <br />
      <p class="text-left">Vigencia:</p>
      <b-form-input type="text" placeholder="status" v-model="documento.vigencia" />
      <br />
      <p class="text-left">Fecha de Vigencia:</p>
      <b-form-input type="date" v-model="documento.fechaVigencia" />
      <br />
      <button type="submit" class="btn btn-primary" :disabled="!desactivar">Modificar</button>
    </form>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "ModificarDoc",
  data() {
    return {
      id: this.$route.params.id,
      id2: this.$route.params.id2
    };
  },
  methods: {
    ...mapActions(["getTrabajo", "getDoc", "editarDocumento"])
  },
  created() {
    this.getTrabajo(this.id);
    this.getDoc({ id: this.id, id2: this.id2 });
  },
  computed: {
    ...mapState(["usuario", "trabajo", "documento"]),
    desactivar() {
      return (
        this.documento.nombre != "" &&
        this.documento.vigencia != "" &&
        this.documento.fechaVigencia != ""
      );
    }
  }
};
</script>
