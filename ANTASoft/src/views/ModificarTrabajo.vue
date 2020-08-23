<template>
  <div class="container">
    <h1>Modificar Trabajo</h1>

    <form @submit.prevent="editarTrabajoStock({trabajo,data,hora,fecha})">
      <p class="text-left">Nombre:</p>
      <b-form-input type="text" v-model="trabajo.nombre" />
      <br />


      <b-button
        type="submit"
        class="mt-2"
        variant="outline-primary"
        :disabled="!desactivar" id="completar" v-on:click="isHidden = !isHidden"
      >Modificar</b-button>
    </form>
    <br>
    <div v-if="isHidden">
    <router-link :to="{name: 'cliente', params:{id:data.idData}}" class="btn btn-success">Continuar</router-link>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "ModificarTrabajo",
  data() {
    return {
      id: this.$route.params.id,
      isHidden: false
    };
  },
  methods: {
    ...mapActions(["getTrabajStock", "editarTrabajoStock", "getDataUser"])
  },
  created() {
    this.getDataUser();
    this.getTrabajStock(this.id);
  },
  computed: {
    ...mapState(["trabajo", "usuario", "data"]),
    desactivar() {
      return (
        this.trabajo.nombre != "" &&
        this.trabajo.status != "" &&
        this.trabajo.fechaTermino != "" &&
        this.trabajo.fechaCreacion != "" &&
        this.trabajo.fechaVigencia != ""
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
  }
};
</script>