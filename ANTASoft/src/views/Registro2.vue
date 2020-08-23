<template>
  <div class="container">
    <h1>Datos Personalesss</h1>

    <ul>
      <li v-for="data of Alldata" :key="data.idData">
        <form
          @submit.prevent="AddDataUser({id: data.idData, nombre, Apaterno, Amaterno, gestor, coordinador})"
        >
          <b-form-input type="text" placeholder="Nombre" class="my-3" v-model="nombre"></b-form-input>

          <b-form-input type="text" placeholder="A.Paterno" class="my-3" v-model="Apaterno"></b-form-input>
          <b-form-input type="text" placeholder="A.Materno" class="my-3" v-model="Amaterno"></b-form-input>
          <br />
          <p class="text-left">Selecciona Tu Rol:</p>
          <p class="text-left">
            <input
              type="checkbox"
              id="gestor"
              :disabled="coordinador ? true : false"
              v-model="gestor"
            />
            <label for="checkbox">Gestor</label>
          </p>
          <p class="text-left">
            <input
              type="checkbox"
              id="coordinador"
              :disabled="gestor ? true : false"
              v-model="coordinador"
            />
            <label for="checkbox">Coordinador</label>
          </p>
          <br />
          <br />

          <b-button
            type="submit"
            class="mt-2"
            variant="outline-primary"
            :disabled="!desactivar" id="completar" v-on:click="isHidden = !isHidden"
          >Completar Registro</b-button>
        </form>
        <br>
        <div v-if="isHidden">
        <router-link
          :to="{name: 'cliente', params:{id: data.idData}}"
          class="btn btn-success"
        >Continuar</router-link>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Registro2",
  data() {
    return {
      nombre: "",
      Apaterno: "",
      Amaterno: "",
      gestor: "",
      coordinador: "",
      isHidden: false
    };
  },
  methods: {
    ...mapActions(["AddDataUser", "getDataUser", "cerrarSesion"])
  },
  created() {
    this.getDataUser();
  },
  computed: {
    ...mapState(["Alldata"]),
    desactivar() {
      return (
        (this.nombre != "" &&
          this.Apaterno != "" &&
          this.Amaterno != "" &&
          this.gestor != "") ||
        (this.nombre != "" &&
          this.Apaterno != "" &&
          this.Amaterno != "" &&
          this.coordinador != "")
      );
    }
  }
};
</script>