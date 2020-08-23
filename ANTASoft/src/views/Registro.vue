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
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div class="container">
      <h1>Formulario de Registro</h1>

      <form @submit.prevent="crearUsuario({email:email , password:pass1, email, nombre, Apaterno, Amaterno,gestor, coordinador,})">
              <b-form-input type="email" placeholder="Email" class="my-3" v-model="email"></b-form-input>
              <b-form-input type="text" placeholder="Nombre" class="my-3" v-model="nombre"></b-form-input>

              <b-form-input type="text" placeholder="A.Paterno" class="my-3" v-model="Apaterno"></b-form-input>
              <b-form-input type="text" placeholder="A.Materno" class="my-3" v-model="Amaterno"></b-form-input>
              <br />
                <p class="text-left">Selecciona Tu Rol:</p>
                  <p class="text-left">
                    <input type="checkbox" id="gestor" :disabled="coordinador ? true : false" v-model="gestor"/>
                    <label for="checkbox">Gestor</label>
                  </p>
                <p class="text-left">
                  <input type="checkbox" id="coordinador" :disabled="gestor ? true : false" v-model="coordinador"/>
                  <label for="checkbox">Coordinador</label>
                </p>
                <br />
              
              <b-form-input type="password" placeholder="Contraseña" class="my-3" v-model="pass1"></b-form-input>
              <b-form-input type="password" placeholder="Verficiar Contraseña" class="my-3" v-model="pass2" ></b-form-input>     
                                           <!-- PENDIENTE, params:{id: user.email}-->
                                   
              <b-button type="submit" class="mt-2" variant="outline-primary" :disabled="!desactivar" id="completar" v-on:click="isHidden = !isHidden"  >
                Continuar Registro
              </b-button>
               
      </form>
      <p>{{error}}</p>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "Registro",
  data() {
    return {
      email: "",
      pass1: "",
      pass2: "",
      nombre: "",
      Apaterno: "",
      Amaterno: "",
      gestor: "",
      coordinador: "",
      isHidden: false

    };
  },
  methods: {
    ...mapActions(["crearUsuario"])
  },
  computed: {
    ...mapState(["error"]),
    ...mapGetters(["existeUsuario"]),

    desactivar() {
      return (
          this.pass1 === this.pass2 && this.pass1 != "" && 

       (this.nombre != "" && this.Apaterno != "" && this.Amaterno != "" && this.gestor != "") 
       ||
        (this.nombre != "" && this.Apaterno != "" && this.Amaterno != "" && this.coordinador != "")

      );


    }
  }
};
</script>