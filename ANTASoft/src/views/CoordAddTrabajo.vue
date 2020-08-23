<template>
  <!--div supremo-->
  <div>
    <!--div supremo-->

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
              <b-nav-item
                :to="{name: 'home' }"
                @click="cerrarSesion"
                v-if="existeUsuario"
              >Cerrar Sesion</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>

      <h1>Hola Coordinador :{{data.nombre}} {{data.Apaterno}} {{data.Amaterno}}</h1>
      <h5>Tu id: {{data.idData}}</h5>
      <h4>Elige uno de los siguientes Trabajos para añadirlo a tus Trabajos:</h4>
      <div class="container">
        <b-list-group horizontal class="table-responsive">
          <b-list-group-item v-for="trabajo of trabajoStock" :key="trabajo.id" class="mr-2">
            
              
            Nombre:{{trabajo.nombre}}
            <br />
            Status: {{trabajo.status}}
            <br />
            Fecha de Creacion: {{trabajo.fechaCreacion}}
            <br />  
            Fecha de Termino: {{trabajo.fechaTermino}}
            <br />
            Fecha de Vigencia: {{trabajo.fechaVigencia}}
            <br />
            <div v-if="trabajo.selected==true">
                        <b>
                          <b-button :disabled="true" variant="warning">Sucursal Asignada </b-button>
                        </b>
              </div>
                      <div v-else>
                      
            <br>

            <b-button
              class="mt-2"
              variant="outline-primary"
              @click="agregarTrabajo({trabajo,id,id2,id3})"
            >Asignar</b-button>
                      </div>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>

    <!--div supremo-->
  </div>
  <!--div supremo-->
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "CoordAddTrabajo",
  data() {
    return {
      id: this.$route.params.id,
      id2: this.$route.params.id2,
      id3: this.$route.params.id3
    };
  },
  computed: {
    ...mapState([
      "usuario",
      "sucursaleStock",
      "sucursal",
      "trabajoStock",
      "Alldata",
      "data",
      "cliente"
    ]),
    ...mapGetters(["existeUsuario"])
  },
  created() {
    this.getdata({ id: this.$route.params.id });
    this.getSucursaleStock();
    this.getDataUser();
    this.getCliente({ id: this.$route.params.id, id2: this.$route.params.id2 });
    this.getTrabajoStock();
  },
  methods: {
    ...mapActions([
      "getdata",
      "getDataUser",
      "getSucursaleStock",
      "getCliente",
      "getTrabajoStock",
      "cerrarSesion",
      "eliminarSucursaleStock",
      "asignarSucursal",
      "agregarTrabajo"
    ])
  }
};
</script>
