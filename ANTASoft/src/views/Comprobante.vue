<template>
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
    <h1> {{data.nombre}} Estos son los Comprobantes de {{pago.nombre}} de {{sucursal.nombre}} de {{trabajo.nombre}} de {{sucursal.nombre}} de {{cliente.nombre}}</h1>
    <router-link
      :to="{name: 'AddComprobante', params:{id:this.id, id2:this.id2, id3: this.id3, i4: this.id4, id5:this.id5}}"
    >
      <button type="button" class="btn btn-success">Agregar</button>
    </router-link>
   <br>
   <br>
    <ul>
      <li v-for="comprobante of comprobantes" :key="comprobante.idComprobante">
      
        Nombre: {{comprobante.nombre}}
        <br />
        Concepto: {{comprobante.concepto}}
        <br />
        Monto: {{comprobante.monto}}
        <br />
        Referencia: {{comprobante.referencia}}
        <br />
        Fecha de Creacion: {{comprobante.fechaCreacion}}
        <div v-if="comprobante.archivo==''">
          <p>
            <b>Archivo no añadido.</b>
            <br />
              <!--
            <router-link
              :to="{name: 'ModificarComprobante', params:{id: trabajo.id , id2:sucursal.idSucursal, id3:pago.idPago, id4:comprobante.idComprobante}}"
            >
              <button type="button" class="btn btn-primary">Modificar</button>
            </router-link>| 
            <button
              type="button"
              class="btn btn-danger"
              @click="eliminarComprobante({id:trabajo.id,id2:sucursal.idSucursal,id3:pago.idPago,id4:comprobante.idComprobante})"
            >Eliminar</button>
            <br />
            <br />
            <br />-->
            <router-link
            :to="{name: 'UploadComprobante', params:{id, id2, id3, id4, id5, id6:comprobante.idComprobante}}"
            >
              <button type="button" class="btn btn-outline-info">Añadir Archivo</button>
            </router-link>
          </p>
        </div>
        <div v-else>
          <a :href="comprobante.archivo" target="_blank">Visualizar</a>
          <br />
        <!--
          <router-link
            :to="{name: 'ModificarComprobante', params:{id: trabajo.id , id2:sucursal.idSucursal, id3:pago.idPago, id4:comprobante.idComprobante}}"
          >
            <button type="button" class="btn btn-primary">Modificar</button>
          </router-link>|
          <button
            type="button"
            class="btn btn-danger"
            @click="eliminarComprobante({id:trabajo.id,id2:sucursal.idSucursal,id3:pago.idPago,id4:comprobante.idComprobante})"
          >Eliminar</button>
          |
          <router-link
            :to="{name: 'UploadComprobante', params:{id, id2, id3, id4, id5, id6:comprobante.idComprobante}}"
          >
            <button type="button" class="btn btn-outline-info" :disabled="true">Añadir Archivo</button>
          </router-link> -->
        </div>
      </li>
    </ul>
  </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "Comprobante",
  data() {
    return {
      id: this.$route.params.id,
      id2: this.$route.params.id2,
      id3: this.$route.params.id3,
      id4: this.$route.params.id4,
      id5: this.$route.params.id5,
      
      
    };
  },
  methods: {
    ...mapActions([
      "getTrabajo",
      "getComprobantes",
      "getPago",
      "eliminarComprobante",
      "cerrarSesion",
      "getSucursal",
      "getdata"
    ])
  },
  created() {
    this.getPago({ id: this.id, id2: this.id2, id3: this.id3 ,id4: this.id4 , id5: this.id5});
    this.getComprobantes({ id: this.id, id2: this.id2, id3: this.id3, id4:this.id4,id5:this.id5 });
     this.getTrabajo({
      id: this.$route.params.id,
      id2: this.$route.params.id2,
      id3: this.$route.params.id3,
      id4: this.$route.params.id4
    });
    this.getSucursal({
      id: this.id,
      id2: this.id2,
      id3: this.$route.params.id3
    });
     this.getdata({ id: this.$route.params.id });

  },
  computed: {
    ...mapState(["comprobantes", "trabajo", "usuario", "sucursal", "pago","cliente","sucursal","data","comprobante"]),
    ...mapGetters(["existeUsuario"])
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
