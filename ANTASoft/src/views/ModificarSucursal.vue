<template>
  <div class="container">
    <h1>Modificar Sucursal</h1>
    <br />
    {{fecha}}
    {{hora}}
    {{data}}
    <br />      
    <form @submit.prevent="editarSucursalStock({sucursal,data,fecha,hora})">
      <p class="text-left">Nombre:</p>
      <b-form-input type="text" v-model="sucursal.nombre" />
      <br />
      Direccion:
      <br>
      <p class="text-left">Calle:</p>
      <b-form-input type="text" v-model="sucursal.calle" />
      <br />
      <p class="text-left">Numero:</p>
      <b-form-input type="number" v-model="sucursal.numero" />
      <br />
      <p class="text-left">Colonia:</p>
      <b-form-input type="text" v-model="sucursal.colonia" />
      <br />
      <p class="text-left">Municipio:</p>
      <b-form-input type="text" v-model="sucursal.municipio" />
      <br />
      <p class="text-left">Estado:</p>
      <b-form-input type="text" v-model="sucursal.estado" />
      <br />
      <p class="text-left">Status:</p>
      <b-form-input type="text" v-model="sucursal.status" />
      <br />
      <button type="submit" class="btn btn-primary" :disabled="!desactivar" id="completar" v-on:click="isHidden = !isHidden">Modificar</button>
    </form>
    <br>
    <div v-if="isHidden">
    <router-link :to="{name: 'sucursal', params:{id:data.idData}}" class="btn btn-success">Continuar</router-link>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "ModificarSucursal",
  data() {
    return {
      id: this.$route.params.id,
      isHidden: false
    };
  },
  methods: {
    ...mapActions(["getSucursalStock", "editarSucursalStock", "getDataUser"])
  },
  created() {
    this.getDataUser();
    this.getSucursalStock(this.id);
  },
  computed: {
    ...mapState(["usuario", "sucursal", "data"]),
    desactivar() {
      return (
        this.sucursal.nombre != "" &&
        this.sucursal.calle != "" &&
        this.sucursal.numero != "" &&
        this.sucursal.colonia != "" &&
        this.sucursal.municipio != "" &&
        this.sucursal.estado != "" &&
        this.sucursal.status != ""
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
