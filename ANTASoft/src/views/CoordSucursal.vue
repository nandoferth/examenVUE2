<template>
  <!--div supremo-->
  <div>
    <!--div supremo-->

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

      <h1>Estas son las sucursales de {{cliente.nombre}}</h1>
      <router-link
        :to="{name: 'CoordAddSucursal', params:{id: this.$route.params.id, id2:this.$route.params.id2 }}"
      >
        <button type="button" class="btn btn-success">Agregar Sucursal</button>
      </router-link>

      <ul>
        <li v-for="sucursal of sucursales" :key="sucursal.idSucursal">
          <br />
           <br />
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
            <br>
            <br>
          <router-link :to="{name: 'CoordTrabajo' , params:{id, id2,id3: sucursal.idSucursal}}">
            <button type="button" class="btn btn-primary">Ir a Trabajos</button>
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
  name: "CoordSucursal",
  data() {
    return {
      id: this.$route.params.id,
      id2: this.$route.params.id2
    };
  },
  computed: {
    ...mapState([
      "usuario",
      "sucursaleStock",
      "sucursal",
      "sucursales",
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
    this.getSucursales({
      id: this.$route.params.id,
      id2: this.$route.params.id2
    });
  },
  methods: {
    ...mapActions([
      "getdata",
      "getDataUser",
      "getSucursales",
      "getSucursaleStock",
      "getCliente",
      "cerrarSesion",
      "eliminarSucursaleStock"
    ])
  }
};
</script>
