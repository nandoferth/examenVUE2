<template>
  <!--div supremo-->
  <div>
 
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
      <h4>Elige una de las siguientes Sucursales para Asignarla a tu Cliente {{cliente.nombre}}:</h4>
      <div class="container">
        <b-list-group horizontal class="table-responsive">
          <b-list-group-item v-for="sucursal of sucursaleStock" :key="sucursal.idSucursal" class="mr-2">
           
            
            Nombre:{{sucursal.nombre}}
            <br />
            RFC: {{sucursal.rfc}}
            <br />
            Status: {{sucursal.status}}
            <br />Direccion:
            <br />
            Calle: {{sucursal.calle}}
            <br />
            Numero: {{sucursal.numero}}
            <br />
            Colonia: {{sucursal.colonia}}
            <br />
            Municipio: {{sucursal.municipio}}
            <br />
            Estado: {{sucursal.estado}}
            <br />
            Status: {{sucursal.status}}
            
            <br />
              <div v-if="sucursal.selected==true">
                        <b>
                          <b-button :disabled="true" variant="warning">Sucursal Asignada </b-button>
                        </b>
              </div>
                      <div v-else>
                      
            <br>

            <b-button
              class="mt-2"
              variant="outline-primary"
              @click="asignarSucursal({sucursal,id,id2})" v-on:click="isHidden = !isHidden"
            >Asignar</b-button>
            </div>
          </b-list-group-item>
        </b-list-group>
        <br>
        <br>
          <div v-if="isHidden">
        <router-link
          :to="{name: 'CoordSucursal', params:{id: data.idData}}"
          class="btn btn-success"
        >Continuar</router-link>
        </div>
      </div>
    </div>
  
  </div>
  <!--div supremo-->
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "CoordAddSucursal",
  data() {
    return {
      id: this.$route.params.id,
      id2: this.$route.params.id2,
      isHidden: false
    };
  },
  computed: {
    ...mapState([
      "usuario",
      "sucursaleStock",
      "sucursal",
     
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

  },
  methods: {
    ...mapActions([
      "getdata",
      "getDataUser",
      "getSucursaleStock",
      "getCliente",
      "cerrarSesion",
      "eliminarSucursaleStock",
      "asignarSucursal"
    ])
  }
};
</script>
