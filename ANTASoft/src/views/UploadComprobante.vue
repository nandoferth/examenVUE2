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
    <h1>Añadir Archivo de {{comprobante.nombre}}</h1>
    <br>
    <br>
    <h3> Busca y Carga Tu Archivo:</h3>
    <h5> (PDF o Imagen) </h5>
    <input type="file" ref="boton" @change="buscarImagen($event)" class="d-none"/>
    <button class="btn btn-primary" @click="$refs.boton.click()">Buscar Documento</button> |     <button class="btn btn-success" :disabled="file === null" @click="subirImagen()">Subir Documento</button>
    <br />
              <br>
                <h4>Visualizalo Aqui</h4>
              <br>
              <div class="container" >
                              <b-embed :src="urlTemporal" />
              </div>
              <br>
              <br>

   
  </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { storage, db } from "@/main.js";

export default {
  name: "UploadComprobante",
  data() {
    return {
      //se iguala con el id de created
      id: this.$route.params.id,
      id2: this.$route.params.id2,
      id3: this.$route.params.id3,
      id4: this.$route.params.id4,
      id5: this.$route.params.id5,
      id6: this.$route.params.id6,


      nombre: "",
      vigencia: "",
      fechaVigencia: "",
      file: null,
      urlTemporal: ""
    };
  },
  methods: {
    //con esto obtienes el trabajo
    ...mapActions(["getSucursal","getCliente","cerrarSesion","getdata","getTrabajo","getComprobante"]),

    //bloque FIles
    buscarImagen(event) {
      console.log(event.target.files[0]);
      this.file = event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = e => {
        console.log(e.target.result);
        this.urlTemporal = e.target.result;
      };
    },
    async subirImagen() {
      try {
        const refImagen = storage.ref().child(this.file.name);

        const res = await refImagen.put(this.file);
        console.log(res);

        const urlDescarga = await refImagen.getDownloadURL();
        console.log(urlDescarga);
        db.collection(this.usuario.email).doc(this.data.idData).collection("clientes").doc(this.cliente.idCliente).collection('sucursales').doc(this.sucursal.idSucursal).collection("trabajos").doc(this.trabajo.id).collection('pagos').doc(this.pago.idPago).collection('comprobantes').doc(this.comprobante.idComprobante)
.update({
            archivo: urlDescarga
          }).then(()=>{
              alert("CargaFinalizada");
              this.$router.push({name:'comprobante'})
          });
      
      } catch (error) {
        console.log(error);
      }
    }
    //bloque FIles
  },
  created() {
    //con esto el puro id
    this.getComprobante({
      id: this.id,
      id2: this.id2,
      id3: this.id3,
      id4: this.id4,
      id5: this.id5,
      id6: this.id6
    });
    this.getdata({ id: this.$route.params.id });
     this.getCliente({ id: this.$route.params.id, id2: this.$route.params.id2 });
    this.getSucursal({
      id: this.$route.params.id,
      id2: this.$route.params.id2,
      id3: this.$route.params.id3
    });
    this.getTrabajo({ id: this.$route.params.id,
      id2: this.$route.params.id2,
      id3: this.$route.params.id3,
      id4: this.$route.params.id4});
   
  },
  computed: {
    //con esto muestras el trabajo y el nombre
    ...mapState(["comprobante", "sucursal", "pago", "trabajo", "usuario","data","cliente"]),
    ...mapGetters(["existeUsuario"])
  }
};
</script>
