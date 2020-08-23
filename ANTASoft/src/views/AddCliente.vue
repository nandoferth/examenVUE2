<template>
  <!--DIV MAESTRO-->
  <div>


    <div id="nav">
        <b-navbar variant="dark">
          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
          <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>

              <b-navbar-brand>
                <img src="@/assets/advr_efectos.png" height="35" width="150" />
              </b-navbar-brand>
              <b-nav-item @click="cerrarSesion" v-if="existeUsuario">Cerrar Sesion</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    <div class="container">

    <h1>Crear Cliente</h1>
      <!--BLOQUE GESTOR--><!--BLOQUE GESTOR--> <!--BLOQUE GESTOR--> <!--BLOQUE GESTOR--> <!--BLOQUE GESTOR-->
        <div v-if="data.gestor==true">

           <div class="container" style="width: 500px;">
          <form
            @submit.prevent="agregarClienteStock({nombre, rfc, status,calle, numero, colonia, estado, municipio,activo, inactivo,data,fecha,hora })"
            @reset="onReset"
          >

            <br />
            <b-form-input required="" type="text" placeholder="nombre" v-model="nombre"  onkeypress="return (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)" />
            <br />
            <b-form-input type="text" placeholder="rfc" v-model="rfc" @keydown.space="(event) => event.preventDefault()"/>
            <br />
            <p class="text-left">
            <Inegi @dataperrona="datos($event)">

            </Inegi>
            <br />
            <b-form-input type="text" placeholder="calle" v-model="calle"></b-form-input>
            <br />
             <b-form-input type="number"  min="1" placeholder="numero" v-model="numero"></b-form-input>
            <br />

            Status:

            <label for="checkbox" >Activo</label>
            </p>
            <br>
            <b-button type="submit" class="mt-2" variant="outline-primary" >Asignar</b-button>

          </form>
           </div>
        </div>
      <!--BLOQUE GESTOR--><!--BLOQUE GESTOR--><!--BLOQUE GESTOR--><!--BLOQUE GESTOR--><!--BLOQUE GESTOR-->


    <!--BLOQUE COORDINADOR--><!--BLOQUE COORDINADOR--><!--BLOQUE COORDINADOR--><!--BLOQUE COORDINADOR-->
    <div v-else-if="data.coordinador==true">
      <div class="overflow-auto">


      <h4>Elige uno de los siguientes Clientes para añadirlo a tus Clientes:</h4>
            <div class="container">

                    <b-list-group horizontal class="table-responsive" >
                      <b-list-group-item v-for="cliente of clienteStock" :key="cliente.idCliente" class="mr-5" >
                      Nombre:
                      <br>
                      {{cliente.nombre}}  <br>
                      RFC:<br>
                       {{cliente.rfc}} <br>
                      Status:<br>
                       {{cliente.status}} <br>
                       <br>
                      <br>
                      <b>Direccion:</b>
                      <br>
                      <br>
                      Calle:
                      <br> {{cliente.calle}} <br>
                      Numero:
                      <br> {{cliente.numero}} <br>
                      Colonia:
                      <br> {{cliente.colonia}} <br>
                      Municipio:
                      <br> {{cliente.municipio}} <br>
                      Estado:<br> {{cliente.estado}} <br>
                      Status: <br>{{cliente.status}}

                      <br />
                      <div v-if="cliente.selected==true">
                        <b>
                          <b-button :disabled="true" variant="warning">Cliente Asignado </b-button>
                        </b>
                      </div>
                      <div v-else>
                        <b-button type="submit" class="mt-2" variant="outline-primary" @click="agregarCliente({cliente,id})">Asignar</b-button>
                      </div>
                      </b-list-group-item>
                      </b-list-group>
                  </div>
              </div>
              </div>

    </div>
    </div>
    <!--BLOQUE COORDINADOR--><!--BLOQUE COORDINADOR--><!--BLOQUE COORDINADOR--><!--BLOQUE COORDINADOR-->

  <!--DIV MAESTRO-->



</template>
<script>


import Inegi from "@/components/Inegi.vue";
import { mapActions, mapState, mapMutations, mapGetters} from "vuex";

export default {
  name: "AddCliente",
  data() {
    return {
      //se iguala con el id de created
      id: this.$route.params.id,
      nombre: "",
      rfc: "",
      status: "",
      calle: "",
      numero: "",
      colonia: "",
      estado: "",
      municipio: "",
      activo: "",
      inactivo: "",
      uno: "",
      dos: "",
      tres: "",
      cuatro: "",

    };
  },
  methods: {
    //con esto obtienes el trabajo
    ...mapActions(["getdata", "agregarClienteStock","cerrarSesion","getClienteStock","agregarCliente"]),
    datos: function (e) {
      [this.estado, this.municipio, this.colonia] = e;
    }


  },
  created() {
    //con esto el puro id
    this.getdata({id:this.$route.params.id });

  },
  computed: {
    //con esto muestras el trabajo y el nombre
    ...mapState(["usuario", "data","clienteStock","cliente","usi","size","soloLetras" ]),
    ...mapGetters(["existeUsuario"]),
    desactivar() {
      return (
        this.nombre != "" &&
        this.rfc != "" &&
        this.status != "" &&
        this.colonia != "" &&
        this.estado != "" &&
        this.estado != "" &&
        this.municipio != ""
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
  },
  components:{
    Inegi
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



        .horizontal-scrollable > .row {
            overflow-x: auto;
            white-space: nowrap;
        }

        .horizontal-scrollable > .row > .col-xs-4 {
            display: inline-block;
            float: none;
        }

</style>
