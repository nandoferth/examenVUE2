<template>
  <!--div supremo-->
  <div>
    <!--div supremo-->

    <!-- Bloque Gestor --><!-- Bloque Gestor --><!-- Bloque Gestor --><!-- Bloque Gestor --><!-- Bloque Gestor --><!-- Bloque Gestor -->

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
     
      <h5>Este es tu Stock de Sucursales:</h5>
    <div class="container"> 
      <div class="card" style="width: 30%;" >
        <div class="card-body"> 
          {{fecha}}
        </div>
      </div>
      <div class="card" >
        <div class="card-body">
          {{data}}
        </div>
      </div>
    </div>
    <br>
     <div class="container"> 
        
          <div class="text-left"> 
              <label class="position-absolute top-left">
             <router-link :to="{name:'AddSucursal', params:{id: usuario.email}}">
        <button type="button" class="btn btn-success">+</button>
      </router-link>
             
              </label>
          </div> 
          <div class="text-right">
            <label>
           <b-input type="search" v-model="busqueda" placeholder="Buscar"/>
            </label>
        </div>
         


      <b-table striped hover responsive :filter="busqueda" :filter-function="filtrar" :items="sucursaleStock" :fields="fields">
        <template v-slot:cell(idSucursal)="raw" >
                                    <router-link :to="{name: 'ModificarSucursal' , params:{id: raw.value}}">
                                           <button type="button" class="btn btn-primary">Modificar</button>
                                     </router-link>|
                                    <button type="button" class="btn btn-danger" @click="eliminarSucursaleStock(raw)">Eliminar</button>
                        </template>
       
      </b-table>
      </div>   

    </div>
    <!-- Bloque Gestor --><!-- Bloque Gestor --><!-- Bloque Gestor --><!-- Bloque Gestor --><!-- Bloque Gestor --><!-- Bloque Gestor -->
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

      <h1>Hola Coordinador :{{data.nombre}} {{data.Apaterno}} {{data.Amaterno}}</h1>
      <h5>Tu id: {{data.idData}}</h5>
       
      <h1>Estas son las sucursales de {{cliente.nombre}}</h1>
      <router-link :to="{name: 'AddSucursal'}">
        <button type="button" class="btn btn-success">Agregar Sucursal</button>
      </router-link>
  
        
            <ul>
              <li v-for="sucursal of sucursales" :key="sucursal.idSucursal">
                <br>
                
               <br />
                Nombre: {{sucursal.nombre}}
                <br />Direccion:
                <br />
                Calle: {{sucursal.calle}} , Numero: {{sucursal.numero}} , Colonia: {{sucursal.colonia}}
                <br />
                Status: {{sucursal.status}}, Estado: {{sucursal.estado}}, Municipio: {{sucursal.municipio}}
                <br />
                SELECTED: {{sucursal.selected}}
                                  <br />
                <router-link :to="{name: 'CoordSucursal' , params:{id: this.$route.params.id, id2: cliente.idCliente}}">
                        <button type="button" class="btn btn-primary">Ir a Sucursales</button>
                </router-link>
              </li>
            </ul>
          
    </div>

    <!--BLOQUE COORDINADOR-->



    <!--div supremo-->
  </div>
  <!--div supremo-->
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "Sucursal",
  data() {
    return {
      id: this.$route.params.id,
      fields:[
        {key:'nombre', label: 'Nombre', sortable:true},
        {key:'calle', label: 'Calle'},
        {key:'numero', label: 'Numero'},
        {key: 'colonia', label: 'Colonia', sortable:true},
        {key:'status', label:'Status', sortabe:true},
        {key:'estado',label: 'Estado', sortable:true},
        {key:'municipio', label: 'Municipio', sortable:true},
        {key: 'idSucursal', label: ' '}
      ],
      busqueda: null,
      filters:{search: this.busqueda}
    };
  },
  computed: {
    ...mapState(["usuario", "sucursaleStock", "sucursal", "Alldata", "data","cliente" ]),
    ...mapGetters(["existeUsuario"]),
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
    this.getdata({ id: this.$route.params.id });
    this.getSucursaleStock();
    this.getDataUser();
    this.eliminarSucursaleStock({raw,fecha,hora,data});
  },
  methods: {
    ...mapActions([
      "getdata",
      "getDataUser",
      "getSucursaleStock",
      "cerrarSesion",
      "eliminarSucursaleStock"
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
