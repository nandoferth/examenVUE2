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
                   
                  </b-navbar-nav>
                </b-collapse>
              </b-navbar>
        </div>


  <div class="container">
  
    <h1>Modificar Cliente</h1>

    <br />
    
    <form @submit.prevent="editarClienteStock({cliente,data,fecha,hora})">

      <p class="text-left">Nombre:</p>
      <b-form-input type="text" v-model="cliente.nombre" />
      <br />
      <p class="text-left">Status:</p>
      <div class="custom-control custom-radio custom-control-inline">
        <input type="radio" id="customRadioInline1" name="customRadioInline1" class="custom-control-input">
        <label class="custom-control-label" for="customRadioInline1">Toggle this custom radio</label>
      </div>
      <div class="custom-control custom-radio custom-control-inline">
        <input type="radio" id="customRadioInline2" name="customRadioInline1" class="custom-control-input">
        <label class="custom-control-label" for="customRadioInline2">Or toggle this other custom radio</label>
      </div>
      <br />
      <p class="text-left">RFC:</p>
      <b-form-input disabled type="text" v-model="cliente.rfc" />
      <br />
      Direccion:
      <br>
      <br>
      <p class="text-left">Calle:</p>
      <b-form-input type="text" v-model="cliente.calle" />
      <br>
      <p class="text-left">Numero:</p>
      <b-form-input type="text" v-model="cliente.numero" />
      <br>
      <p class="text-left">Colonia:</p>
      <b-form-input type="text" v-model="cliente.colonia" />
      <br>
      <p class="text-left">Estado:</p>
      <b-form-input type="text" v-model="cliente.estado" />
      <br>
      <p class="text-left">Municipio:</p>
      <b-form-input type="text" v-model="cliente.municipio" />
      <br>     
      <button type="submit" class="btn btn-primary" :disabled="desactivar" id="completar" v-on:click="isHidden = !isHidden">Modificar</button>
    </form>
    <br />
    <div v-if="isHidden">
      <router-link :to="{name: 'cliente', params:{id:data.idData}}" class="btn btn-success">Continuar</router-link>
    </div>
  </div>
</div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "ModificarCliente",
  data() {
    return {
      id: this.$route.params.id,
      isHidden: false
    };
  },
  methods: {
    ...mapActions(["getClientStock", "editarClienteStock", "getDataUser"])
  },
  created() {
    this.getDataUser();
    this.getClientStock(this.id);
  },
  computed: {
    ...mapState(["cliente", "usuario", "data"]),
    desactivar() {
      return (
        this.cliente.nombre != "" &&
        this.cliente.status != "" &&
        this.cliente.rfc != ""
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
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: #d7eae2;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

