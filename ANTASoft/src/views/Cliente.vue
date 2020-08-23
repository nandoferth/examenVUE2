<template>
  <div>
    <!--div SUPREMO-->
    <!--BLOQUE COORDINADOR-->
    <div v-if="data.coordinador==true">
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
              <b-nav-item :to="{name: 'home' }" @click="cerrarSesion" v-if="existeUsuario">Cerrar Sesion</b-nav-item>

            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>

      <h4>Hola Coordinador:{{data.nombre}} {{data.Apaterno}} {{data.Amaterno}}</h4>
      <h5>Tus Clientes de Coordinador</h5>
      <div class="container">

            <div class="text-left">
                <label class="position-absolute top-left">
                  <!--
                <router-link :to="{name:'AddCliente', params:{id: data.idData}}">
                <button type="button" class="btn btn-success  text-right">+</button>
                </router-link>
              -->
                </label>
            </div>
            <div class="text-right">
              <label>
            <b-input type="search" v-model="busqueda" placeholder="Buscar"/>
              </label>
            </div>


            <v-data-table striped hover responsive :filter="busqueda2" :filter-function="filtracion" :items="clientes" :fields="fields2">
              <template slot='idCliente' slot-scope='raw'>
                <router-link :to="{name: 'ModificarCliente' , params:{id: raw.value}}">
                    <button type="button" class="btn btn-primary">Modificar</button>
                </router-link> |
                <button type="button" class="btn btn-danger" @click="eliminarClienteStock(raw.value)">Eliminarf</button>
              </template>
            </v-data-table>
      </div>



    </div>

    <!--BLOQUE COORDINADOR-->

    <!-- Bloque Gestor-->

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
                    <b-nav-item @click="cerrarSesion" v-if="existeUsuario">Cerrar Sesion</b-nav-item>
                  </b-navbar-nav>
                </b-collapse>
              </b-navbar>
        </div>

                <h3>Hola Gestor :{{data.nombre}} {{data.Apaterno}} {{data.Amaterno}}</h3>

                <h4>Este es tu Stock de Clientes:</h4>



            <div class="container">

                      <div class="text-left">
                          <label class="position-absolute top-left">
                          <router-link :to="{name:'AddCliente', params:{id: usuario.email}}">
                          <button type="button" class="btn btn-success  text-right">+</button>
                          </router-link>

                          </label>
                      </div>
                      <div class="text-right">
                        <label>
                            <b-input type="search" v-model="busqueda" placeholder="Buscar"/>
                        </label>
                      </div>


                      <b-table striped responsive :filter="busqueda" :filter-function="filtracion" :items="clienteStock" :fields="fields"  >
                        <template v-slot:cell(idCliente)='raw'>
                                    <router-link :to="{name: 'ModificarCliente' , params:{id: raw.value}}">
                                           <button type="button" class="btn btn-primary">Modificar</button>
                                     </router-link>|
                                    <button type="button" class="btn btn-danger" @click="eliminarClienteStock(raw)">Eliminar</button>
                        </template>
                      </b-table>
            </div>
    </div>
  </div>
  <!--div SUPREMO-->
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "Cliente",
  data() {
    return {
      id: this.$route.params.id,
        raw: this.raw,
      //Gestor
      fields: [{key: 'nombre', label: 'Nombre', sortable: true},
      {key: 'rfc', label: 'RFC'},
      {key:'calle', label: 'Calle'},
      {key:'numero', label:'Numero'},
      {key: 'colonia', label:'Colonia', sortable:true},
      {key: 'estado', label:'Estado', sortable:true},
      {key:'municipio',label:'Municipio', sortable: true},
      {key: 'idCliente', label: 'idCliente'},
      ],
      busqueda: null,
      //filters:{search: this.busqueda},
      // Termina Gestor
      //Coordinador
      fields2: [{key: 'nombre', label: 'Nombre', sortable: true},
      {key: 'rfc', label: 'RFC'},
      {key:'calle', label: 'Calle'},
      {key:'numero', label:'Numero'},
      {key: 'colonia', label:'Colonia', sortable:true},
      {key: 'estado', label:'Estado', sortable:true},
      {key:'municipio',label:'Municipio', sortable: true},
      {key: '', label: 'Modificar'},
      {key: '', label:'Sucursales'}
      ],
      busqueda2: null,
      filters2:{search: this.busqueda2}
      //Termina Coordinador


     };
  },
  computed: {
    ...mapState([
      "usuario",
      "cliente",
      "Alldata",
      "clienteStock",
      "data",
      "clientes",
      "user"
    ]),
    ...mapGetters(["existeUsuario"]),
    clientData() {
      return this.$store.state.clientes
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
  },
  created() {
    this.getdata(this.id);
    this.getClienteStock();
    this.getClientes(this.id);
    this.eliminarClienteStock({raw, fecha, hora, data});
  },
  methods: {
    ...mapActions([
      "eliminarClienteStock",
      "getdata",
      "getClienteStock",
      "getClientes",
      "cerrarSesion"
    ]),
    filtracion(row, filter){
      var kaka = Object.values(row)
      var returno = false
      for(var i in kaka){
        var palabra = String(kaka[i]).toLowerCase()
        if (palabra.includes(filter)) {
          returno = true
        }
      }
      console.log(returno)
      return returno
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
