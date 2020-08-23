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
            <b-nav-item
              :to="{name: 'home' }"
              @click="cerrarSesion"
              v-if="existeUsuario"
            >Cerrar Sesion</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <div class="container">
      <h1>Hola Coordinador: {{data.nombre}} Estos son Pagos de la sucursal {{sucursal.nombre}} del trabajo {{trabajo.nombre}} del Cliente {{cliente.nombre}}</h1>
      <br />
      <br />
      <router-link :to="{name: 'AddPago',  params:{id, id2, id3: this.$route.params.id3,id4: this.$route.params.id4}}">
        <button type="button" class="btn btn-success">Agregar Pago</button>
      </router-link>
      <br>
      <br>
      <br>
      <ul>
        <li v-for="pago of pagos" :key="pago.idPago">
          
          Concepto: {{pago.concepto}}
          <br />
          Importe: {{pago.importe}}
          <br />
          Nombre: {{pago.nombre}}
          <br />
          Nombre del Beneficiario: {{pago.beneficiario}}
          <br />
          RFC del Beneficiario: {{pago.BRFC}}
          <br />
          Tipo de Pago:{{pago.tipoPago}}
          <br />
          Fecha de Creacion:{{pago.fechaCreacion}}
          <br />
          Fecha Maxima de Pago: {{pago.fechaMaxima}}
          <br />
           Fecha de Termino: {{pago.fechaTermino}}
          <br />
          Autorizó:{{pago.autorizacion}}
          <br />
          Vigencia: {{pago.vigencia}}
          <br />
          Status:{{pago.status}}
          <br />
            <router-link :to="{name: 'comprobante' , params:{id, id2,id3,id4,id5:pago.idPago}}">
                  <button type="button" class="btn btn-primary">Agregar Comprobante</button>
            </router-link>
          <br />
        </li> 
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "Pago",
  data() {
    return {
      id: this.$route.params.id,
      id2: this.$route.params.id2,
      id3: this.$route.params.id3,
      id4: this.$route.params.id4,
      id5: this.$route.params.id5
    };
  },
  methods: {
    ...mapActions([
      "getTrabajo",
      "getSucursal",
      "getPagos",
      "eliminarPago",
      "getPago",
      "cerrarSesion"
    ])
  },
  created() {
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
    this.getPagos({ 
       id: this.$route.params.id,
      id2: this.$route.params.id2,
      id3: this.$route.params.id3,
      id4: this.$route.params.id4,
     
    
    });
      
  },

    computed: {
    ...mapState(["usuario", "trabajo", "sucursal", "data", "cliente","pagos"]),
    ...mapGetters(["existeUsuario"])
  }
};
</script>
