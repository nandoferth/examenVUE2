<template>
  <div>
    
    <!-- Bloque Gestor -->

    <div v-if="data.gestor==true">
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
              <b-nav-item :to="{name: 'sucursal'}" v-if="existeUsuario">Sucursales</b-nav-item>
              <b-nav-item :to="{name: 'trabajo'}" v-if="existeUsuario">Trabajos</b-nav-item>
                <b-nav-item :to="{name: 'Asignar'}" v-if="existeUsuario">Asignar</b-nav-item>
                <b-nav-item :to="{name: 'Actividad'}" v-if="existeUsuario">Actividad</b-nav-item>
              <b-nav-item
                :to="{name: 'home' }"
                @click="cerrarSesion"
                v-if="existeUsuario"
              >Cerrar Sesion</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>

      <h4>Hola Gestor :{{data.nombre}} {{data.Apaterno}} {{data.Amaterno}}</h4>
      <h5>Este es tu Stock de Trabajos:</h5>


       <div class="container"> 
        
            <div class="text-left"> 
                <label class="position-absolute top-left">
                    <router-link :to="{name:'AddTrabajo', params:{id: usuario.email}}">
                      <button type="button" class="btn btn-success">+</button>
                    </router-link>
                    
                </label>
            </div> 
            <div class="text-right">
                <label>
                  <b-input type="search" v-model="busqueda" placeholder="Buscar"/>
                </label>
            </div>  
              <b-table striped hover responsive :filter="busqueda" :filter-function="filtrar" :items="trabajoStock" :fields="fields">
                 <template v-slot:cell(id)="raw" >
                                    <router-link :to="{name: 'ModificarTrabajo' , params:{id: raw.value}}">
                                           <button type="button" class="btn btn-primary">Modificar</button>
                                     </router-link>|
                                    <button type="button" class="btn btn-danger" @click="eliminarTrabajoStock(raw.value)">Eliminar</button>
                        </template>
               
               |
                  <b-button
                  type="button"
                  class="btn btn-danger"
                  @click="eliminarTrabajoStock(raw.value)"
                >Eliminar</b-button>
              </b-table>
        </div>   

    </div>









      <!--DIV DE GESTOR-->
    </div>
  
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "Trabajo",
  data(){
    return{
                id: this.$route.params.id,
                fields:[
                  {key:'nombre' , label: 'Nombre', sortable:true},
                  {key: 'id', label:' '},
                              
                ],
                busqueda: null,
                filters:{search: this.busqueda}

    }

  },
  computed: {
    ...mapState(["usuario", "trabajo", "Alldata", "trabajoStock", "data"]),
    ...mapGetters(["existeUsuario"])
  },
  created() {
    this.getTrabajoStock();
    this.getDataUser();
    this.getdata({ id: this.$route.params.id });
  },
   methods: {
    ...mapActions([
      "getTrabajoStock",
      "eliminarTrabajoStock",
      "getDataUser",
      "cerrarSesion",
      "getdata"
    ]),
     filtering(val){
      console.log(val)
      return !this.busqueda || JSON.stringify(val).includes(this.busqueda)
    },
    filtrar(row,filter){
      var filt = Object.values(row)
      var retorna = false
      for (var i in filt){
        var palabra = String(filt[i]).toLowerCase()
          if(palabra.includes(filter)){
          retorna=true 
          }
      }
        console.log(retorna)
        return retorna
      }

   }
};
</script>
<!--NAV STYLE-->
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