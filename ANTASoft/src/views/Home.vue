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

            <b-nav-item :to="{name: 'registro'}" v-if="!existeUsuario">Registrarse</b-nav-item>


            <b-nav-item :to="{name: 'cliente',params:{id: usuario.email} }" v-if="existeUsuario">Bienvenido</b-nav-item>
            <b-nav-item @click="cerrarSesion" v-if="existeUsuario">Cerrar Sesion</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div class="container">
      <br />
      
      <div v-if="existeUsuario">
        {{usuario}}
        <router-link :to="{name:'cliente',params:{id: usuario.email}}" >
          
        </router-link>
                      <!--
                      <h1> Ya haz iniciado sesión, 
                      <br> Dirigite a "Bienvenido"</h1>
                      {{user}}-->
      </div> 
      <div v-else>
      <HelloWorld msg="Iniciar Limpio, piensa en tu nena" />
      <form class="container" @submit.prevent="ingresaUsuario({email:email,password:password})">
        <b-form-input type="email" placeholder="E-Mail" class="pl-1" size="sm" v-model="email"></b-form-input>

        <b-form-input
          type="password"
          placeholder="Password"
          class="pl-1"
          size="sm"
          v-model="password
                      "
        ></b-form-input>

        <b-button
          type="submit"
          class="mt-2"
          variant="outline-primary"
          :disabled="!desactivar"
        >Ingresar</b-button>
      </form>
       
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Inegi from "@/components/Inegi.vue";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "home",
  data() {
    return {
      id: this.usuario.email,
      email: "",
      password: "",
       date: new Date().toISOString().substr(0, 10) ,
      
    };
    
  },
  components: {
    HelloWorld,
    Inegi
  },
  methods: {
    ...mapActions(["ingresaUsuario", "cerrarSesion"]),
  },
  computed: {
    ...mapState(["error","list","firstOption","secondOption","usuario","user","payload"]),
    ...mapGetters(["existeUsuario"]),

    desactivar() {
      return this.email != "" && this.password != "";
    }
  },
  
 
};
</script>
