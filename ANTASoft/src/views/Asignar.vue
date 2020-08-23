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
                        <b-nav-item @click="cerrarSesion" v-if="existeUsuario">Cerrar Sesion</b-nav-item>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
      
    <b-container class="bv-example-row">
        <b-row>
            <b-col>
                <h4>Hola Gestor :{{data.nombre}} {{data.Apaterno}} {{data.Amaterno}}</h4>
                <h5>Asignemos Clientes A Tus Coordinadores:</h5>
                    {{ocultar}}
            </b-col>
        </b-row>
        <b-row class="justify-content-md-center">
            <b-card class="text-center">
                <div>
                    <b-nav>
                        <b-nav-item>Asi </b-nav-item>
                        <b-nav-item>b</b-nav-item>
                        <b-nav-item>c</b-nav-item>
                    </b-nav>  
                </div>
                     
            </b-card>
        </b-row>
    </b-container>    
        <div class="container">

            <a v-if="ocultar  >=  0">
                <a v-if="ocultar ===4">
                    <b-button class="btn btn-success" :disabled="true">Siguiente</b-button>
                </a>
                <a v-else>
                    <b-button class="btn btn-success" v-on:click="ocultar += 1">Siguiente</b-button>
                </a>
            </a>

            <a v-if="ocultar ===0">
            <b-button class="btn btn-info" v-on:click="ocultar -= 1" :disabled="true" >Regresar</b-button>
            </a>
            <a  v-else>
                <b-button class="btn btn-info" v-on:click="ocultar -= 1" >Regresar</b-button>
                <b-button class="btn btn-danger" v-on:click="ocultar = 0 && cleanall(this.auxClientes=[],this.auxSucursales,auxUsuarios,auxTrabajos)" >Cannncelar</b-button>
            </a>


            <div class="container" v-if="ocultar === 0">
                <h2>CLIENTE STOCK</h2>
                <p>
                    Selected Rows:<br>
                    {{ selected }}
                </p>
                <div class="text-right">
                    <label>
                        <b-input type="search" v-model="busquedaClienteStock" placeholder="Buscar"/>
                    </label>
                </div>
                <b-table striped responsive
                selectable
                :filter="busquedaClienteStock" 
                :filter-function="filtrarClienteStock" 
                :items="clienteStock" 
                :fields="fieldsClienteStock"
                @row-selected="onRowSelected"
                  >
                    <template v-slot:cell(idCliente)='raw'>
                        <!--<div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="customCheck1">
                            asignamientoClienteStock(raw.value)
                        </div>-->
                            <button type="button" class="btn btn-success" @click="LlenarClientes(raw, auxClientes)">Seleccionar</button>
                        
                        
                    </template>
                </b-table>
            </div>
            <div class="container" v-else-if=" ocultar===1 ">
                <h2>SUCURSALES STOCK</h2>
                <div class="text-right">
                    <label>
                        <b-input type="search" v-model="busquedaSucurStock" placeholder="Buscar"/>
                    </label>
                </div>
                <b-table striped responsive :filter="busquedaSucurStock" :filter-function="filtracionSucurStock" :items="sucursaleStock" :fields="fieldSucurStock"  >
                    <template v-slot:cell(idSucursal)='raw'>
                        <button type="button" class="btn btn-success" @click="LlenarSucursales(raw,auxSucursales)">Seleccionar</button>

                    </template>
                </b-table>
            </div>
            

            <div class="container" v-else-if=" ocultar=== 2">
            <form @submit.prevent="asignarbienperro(data,fecha,hora)">
                <br>
                <h2>Asignemos Trabajos a la Seleccion Previa:</h2>
                <br>
                        <div v-for="(doto, index) in result">

                            {{doto.user}}
                            <br>
                            {{doto.cliente}}
                            <br>
                            <div>
                            {{doto.sucursal}}
                            {{index}}

                            <b-button v-b-modal="modalp(index)">Asignar Trabajos:</b-button>

                                <b-modal :id="'modal-'+index" title="Selecciona Aqui!">
                                     <div class="text-right">
                                            <label>
                                                <b-input type="search" v-model="busquedaTStock" placeholder="Buscar"/>
                                            </label>
                                        </div>
                                        <b-table striped responsive :filter="busquedaTStock" :filter-function="filtracionTStock" :items="trabajoStock" :fields="fieldsTStock">
                                            <template  v-slot:cell(id)='raw'>
                                                <button type="button" class="btn btn-success" @click="LlenarTrabajos(raw, index)">Seleccionar</button>
                                            </template>
                                        </b-table>
                                    
                                </b-modal>


                            </div>
                            <br>
                            <br>
                        </div>
                <br>
                <div v-if="!result.length">

                                <b-button :disabled="true" class="btn btn-success" type="submit">Confirmar Asignacion</b-button>

                            </div>
                            <div v-else>
                                <b-button :disabled="false" class="btn btn-success" type="submit">Confirmar Asignacion</b-button>
                            </div>
                </form>


               
            </div>
            <div class="container" v-else-if="ocultar === 3">
                <div class="text-right">
                    <label>
                        <b-input type="search" v-model="busquedaUsuarios" placeholder="Buscar"/>
                    </label>
                </div>
                <b-table striped responsive :filter="busquedaUsuarios" :filter-function="filtrar" :items="usuarios" :fields="fieldsUsuarios"  >
                    <template v-slot:cell(idData)='raw'>
                        <button type="button" class="btn btn-success" @click="LlenarUsuarios(raw, auxUsuarios )">Seleccionar</button>
                    </template>
                    |
                </b-table>
            </div>
            <div class="container" v-else-if="ocultar === 4">
                <h2>
                    Revisa tu asignacion:
                </h2>
                <form @submit.prevent="megaAsignacion({auxClientes,auxTrabajos,auxSucursales,auxUsuarios,fecha,hora,data,usuario})">
                        <div class="card-columns">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Asignaras A:</h5>
                                        <ul>
                                            <li v-for="usuario in auxUsuarios">
                                                <br>
                                                <a v-if="usuario.coordinador=true">
                                                    El Coordinador {{usuario.nombre}} {{usuario.paterno}}
                                                </a>
                                                <a v-else>
                                                    El Gestor {{usuario.nombre}} {{usuario.paterno}}
                                                </a>
                                                <br>
                                            </li>
                                        </ul>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Los Siguientes Clientes:</h5>
                                        <ul>
                                            <li v-for="cliente in auxClientes">
                                                <br>
                                                {{cliente.nombre}} ubicado en : {{cliente.estado}}, {{cliente.municipio}}
                                                <br>
                                            </li>
                                        </ul>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Con las Siguientes Sucursales:</h5>
                                    <ul>
                                        <li v-for="sucursal in auxSucursales">
                                            <br>
                                            {{sucursal.nombre}} ubicado en : {{sucursal.estado}}, {{sucursal.municipio}}
                                            <br>
                                            <div>
                                            <b-button v-b-modal.modal-1>Asignar Trabajo</b-button>

                                            <b-modal id="modal-1" title="Selecciona los Trabajos:">
                                                
                                                <div class="text-right">
                                                    <label>
                                                        <b-input type="search" v-model="busquedaTStock" placeholder="Buscar"/>
                                                    </label>
                                                </div>
                                                <b-table striped responsive :filter="busquedaTStock" :filter-function="filtracionTStock" :items="trabajoStock" :fields="fieldsTStock">
                                                    <template  v-slot:cell(id)='raw'>
                                                        <button type="button" class="btn btn-success" @click="LlenarTrabajos(raw, auxTrabajos, auxSucursales.index)">Seleccionar</button>
                                                    </template>
                                                </b-table>
                                            </b-modal>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Con Los Trabajos:</h5>
                                    <ul>
                                        <li v-for="trabajo in auxTrabajos">
                                            <br>
                                            {{trabajo.nombre}} con el contacto {{trabajo.contactoCiudad}} Asignado A:
                                            <br>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                            <div v-if="!auxClientes.length && !auxSucursales.length && !auxTrabajos.length">

                                <b-button :disabled="true" class="btn btn-success" type="submit">Confirmar Asignacion</b-button>

                            </div>
                            <div v-else>
                                <b-button :disabled="false" class="btn btn-success" type="submit">Confirmar Asignacion</b-button>
                            </div>
                </form>
            </div>
           


        </div>
        <br>


        <br>
        <br>


    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "Asignar",

  data(){
    return{
            auxClientes:[],
            auxSucursales:[],
            auxTrabajos:[],
            auxUsuarios:[],
            ocultar: 0,
            result: null,
          id: this.$route.params.id,
          nombre: this.nombre,
          estado: this.estado,
          municipio: this.municipio,

            //TODO LO DE USUARIO //TODO LO DE USUARIO //TODO LO DE USUARIO //TODO LO DE USUARIO //TODO LO DE USUARIO
             //TODO LO DE USUARIO //TODO LO DE USUARIO //TODO LO DE USUARIO //TODO LO DE USUARIO //TODO LO DE USUARIO
              //TODO LO DE USUARIO //TODO LO DE USUARIO //TODO LO DE USUARIO //TODO LO DE USUARIO //TODO LO DE USUARIO
                correo_asig: "",
                nombre_asig: "",
                
                
                
                //tabla de Usuarios
                
                fieldsUsuarios:[
                    {key:'email', label:'Email'},
                  {key:'nombre' , label: 'Nombre', sortable:true},
                  {key: 'Apaterno', label: 'Paterno'},
                  {key: 'gestor', label: 'GESTOR', sortable:true},
                  {key: 'coordinador', label: 'COORDINADOR', sortable:true},
                  {key: 'idData', label:'Seleccionar'}


                ],
                busquedaUsuarios: null,
                
                
                //tabla de Usuarios
                
             //TODO LO DE USUARIO //TODO LO DE USUARIO //TODO LO DE USUARIO //TODO LO DE USUARIO //TODO LO DE USUARIO
             //TODO LO DE USUARIO //TODO LO DE USUARIO //TODO LO DE USUARIO //TODO LO DE USUARIO //TODO LO DE USUARIO
              //TODO LO DE USUARIO //TODO LO DE USUARIO //TODO LO DE USUARIO //TODO LO DE USUARIO //TODO LO DE USUARIO


              //TODO LO DE CLIENTESTOCK //TODO LO DE CLIENTESTOCK //TODO LO DE CLIENTESTOCK //TODO LO DE CLIENTESTOCK 
              //TODO LO DE CLIENTESTOCK //TODO LO DE CLIENTESTOCK //TODO LO DE CLIENTESTOCK //TODO LO DE CLIENTESTOCK 
              //TODO LO DE CLIENTESTOCK //TODO LO DE CLIENTESTOCK //TODO LO DE CLIENTESTOCK //TODO LO DE CLIENTESTOCK 


                idCliente_selected:"",
                nombre_selected:"",
                estado_selected:"" ,
                municipio_selected:"",
               

                //Fields de ClienteStocklugar
                //Fields de ClienteStock
                //Fields de ClienteStock
                 fieldsClienteStock: [{key: 'nombre', label: 'Nombre', sortable: true},
                          {key: 'rfc', label: 'RFC'},
                          {key: 'estado', label:'Estado', sortable:true},
                          {key:'municipio',label:'Municipio', sortable: true},
                          {key: 'colonia',label:'Colonia'},
                          {key:'selected',label:'Seleccionado'},
                          {key: 'idCliente', label: 'idCliente'},
                          ],
                          busquedaClienteStock: null,
                        selected: [],
                //Fields de ClienteStock
                //Fields de ClienteStock
                //Fields de ClienteStock







                //TODO LO DE CLIENTESTOCK //TODO LO DE CLIENTESTOCK //TODO LO DE CLIENTESTOCK //TODO LO DE CLIENTESTOCK 
                //TODO LO DE CLIENTESTOCK //TODO LO DE CLIENTESTOCK //TODO LO DE CLIENTESTOCK //TODO LO DE CLIENTESTOCK 
                //TODO LO DE CLIENTESTOCK //TODO LO DE CLIENTESTOCK //TODO LO DE CLIENTESTOCK //TODO LO DE CLIENTESTOCK 
                //TODO LO DE CLIENTESTOCK //TODO LO DE CLIENTESTOCK //TODO LO DE CLIENTESTOCK //TODO LO DE CLIENTESTOCK 

                //TODO LO DE CLIENTE //TODO LO DE CLIENTE //TODO LO DE CLIENTE //TODO LO DE CLIENTE //TODO LO DE CLIENTE
                //TODO LO DE CLIENTE //TODO LO DE CLIENTE //TODO LO DE CLIENTE //TODO LO DE CLIENTE //TODO LO DE CLIENTE
                //TODO LO DE CLIENTE //TODO LO DE CLIENTE //TODO LO DE CLIENTE //TODO LO DE CLIENTE //TODO LO DE CLIENTE

                    namecliente_asign:'',
                    edocliente_asign:'',
                    municipiocliente_asign:'',

                   fieldsClientes: [{key: 'nombre', label: 'Nombre', sortable: true},
                          
                          {key: 'estado', label:'Estado', sortable:true},
                          {key:'municipio',label:'Municipio', sortable: true},
                          {key: 'idCliente', label: 'RFC'},
                          ],
                          busquedaClientes: null,
                          


                //Fields de Cliente Especifico
                //Fields de Cliente Especifico
                //Fields de Cliente Especifico

               //TODO LO DE CLIENTE //TODO LO DE CLIENTE //TODO LO DE CLIENTE //TODO LO DE CLIENTE //TODO LO DE CLIENTE
                //TODO LO DE CLIENTE //TODO LO DE CLIENTE //TODO LO DE CLIENTE //TODO LO DE CLIENTE //TODO LO DE CLIENTE
                //TODO LO DE CLIENTE //TODO LO DE CLIENTE //TODO LO DE CLIENTE //TODO LO DE CLIENTE //TODO LO DE CLIENTE
            
                //TODO LO DE SUCURSALSTOCK //TODO LO DE SUCURSALSTOCK //TODO LO DE SUCURSALSTOCK //TODO LO DE SUCURSALSTOCK
                //TODO LO DE SUCURSALSTOCK //TODO LO DE SUCURSALSTOCK //TODO LO DE SUCURSALSTOCK //TODO LO DE SUCURSALSTOCK
                //TODO LO DE SUCURSALSTOCK //TODO LO DE SUCURSALSTOCK //TODO LO DE SUCURSALSTOCK //TODO LO DE SUCURSALSTOCK

                    sucStockname_asign:'',
                    sucStockedo_asign:'',
                    sucStockmunic_asign:'',


                    fieldSucurStock: [{key: 'nombre', label: 'Nombre', sortable: true},
                                      {key:'municipio',label:'Municipio', sortable: true},
                                      {key: 'estado', label:'Estado', sortable:true},
                                        {key: 'idSucursal', label: 'idSucursal'},
                    ],
                        busquedaSucurStock: null,


                //TODO LO DE SUCURSALSTOCK //TODO LO DE SUCURSALSTOCK //TODO LO DE SUCURSALSTOCK //TODO LO DE SUCURSALSTOCK
                //TODO LO DE SUCURSALSTOCK //TODO LO DE SUCURSALSTOCK //TODO LO DE SUCURSALSTOCK //TODO LO DE SUCURSALSTOCK
                //TODO LO DE SUCURSALSTOCK //TODO LO DE SUCURSALSTOCK //TODO LO DE SUCURSALSTOCK //TODO LO DE SUCURSALSTOCK

                //TODO LO DE SUCURSAL //TODO LO DE SUCURSAL //TODO LO DE SUCURSAL //TODO LO DE SUCURSAL //TODO LO DE SUCURSAL
                //TODO LO DE SUCURSAL //TODO LO DE SUCURSAL //TODO LO DE SUCURSAL //TODO LO DE SUCURSAL //TODO LO DE SUCURSAL
                //TODO LO DE SUCURSAL //TODO LO DE SUCURSAL //TODO LO DE SUCURSAL //TODO LO DE SUCURSAL //TODO LO DE SUCURSAL

                    sucursalname_asign:'',
                    sucursaledo_asign:'',
                    sucursalmunic_asign:'',


                fieldSucursales: [{key: 'nombre', label: 'Nombre', sortable: true},
                        {key:'municipio',label:'Municipio', sortable: true},
                        {key: 'estado', label:'Estado', sortable:true},
                        {key: 'idSucursal', label: 'idSucursal'},
                    ],
                    busquedaSucursales: null,

                //TODO LO DE SUCURSAL //TODO LO DE SUCURSAL //TODO LO DE SUCURSAL //TODO LO DE SUCURSAL //TODO LO DE SUCURSAL
                //TODO LO DE SUCURSAL //TODO LO DE SUCURSAL //TODO LO DE SUCURSAL //TODO LO DE SUCURSAL //TODO LO DE SUCURSAL
                //TODO LO DE SUCURSAL //TODO LO DE SUCURSAL //TODO LO DE SUCURSAL //TODO LO DE SUCURSAL //TODO LO DE SUCURSAL

                //TODO LO DE TRABAJOSTOCK //TODO LO DE TRABAJOSTOCK //TODO LO DE TRABAJOSTOCK //TODO LO DE TRABAJOSTOCK
                //TODO LO DE TRABAJOSTOCK //TODO LO DE TRABAJOSTOCK //TODO LO DE TRABAJOSTOCK //TODO LO DE TRABAJOSTOCK
                //TODO LO DE TRABAJOSTOCK //TODO LO DE TRABAJOSTOCK //TODO LO DE TRABAJOSTOCK //TODO LO DE TRABAJOSTOCK

                    trabajoStockname_asign:'',



                    fieldsTStock: [{key: 'nombre', label: 'Nombre', sortable: true},

                        {key: 'id', label: ' '},
                    ],
                    busquedaTSock: null,

                //TODO LO DE TRABAJOSTOCK //TODO LO DE TRABAJOSTOCK //TODO LO DE TRABAJOSTOCK //TODO LO DE TRABAJOSTOCK
                //TODO LO DE TRABAJOSTOCK //TODO LO DE TRABAJOSTOCK //TODO LO DE TRABAJOSTOCK //TODO LO DE TRABAJOSTOCK
                //TODO LO DE TRABAJOSTOCK //TODO LO DE TRABAJOSTOCK //TODO LO DE TRABAJOSTOCK //TODO LO DE TRABAJOSTOCK

    }

  },
  computed: {
    ...mapState(["usuario", "trabajo", "Alldata", "trabajoStock", "data","clienteStock","sucursaleStock","Alldata","user","usuarios","clientes","sucursales","sucursal","auxClientes","auxSucursales","auxTrabajos","auxUsuarios"]),
    ...mapGetters(["existeUsuario"]),
     usersData() {
      return this.$store.state.users
    },
      fecha(){
          var date = new Date().toJSON().slice(0,10).replace(/-/g,'/');

          return date
      },
      hora(){
          var datetime = new Date();
          var time = datetime.toLocaleTimeString();

          return time

      },
      cleanall(){
        this.auxClientes.length=0;
        this.auxSucursales.length=0;
        this.auxTrabajos.length=0;
        this.auxUsuarios.length=0;


      }

  },
  created() {
    this.getTrabajoStock();
    this.getDataUser();
    this.getdata({ id: this.$route.params.id });
    this.getUsers();
    this.getClienteStock();
    this.getSucursaleStock();
    this.agregarCliente();
    this.asignarSucursal(this.correo_asig, this.namecliente_asign, this.sucStockname_asign);
    this.agregarTrabajo(this.correo_asig, this.namecliente_asign, this.sucursalname_asign,this.trabajoStockname_asign);
    this.megaAsignacion();

  },
   methods: {
    onRowSelected(items) {
        this.selected = items
    },
       modalp(inde){
           return 'modal-' + inde
       },
      LlenarClientes(raw,auxClientes){
          this.auxClientes=auxClientes;
          /*
          var clientes = null;
          var local_c = JSON.parse(localStorage.getItem('clientes'));
          if (local_c != null && local_c.length > 0){
              clientes = local_c;
          }
          else{
              clientes = new Array();
          }*/
          auxClientes.push({nombre: raw.item.nombre,rfc:raw.item.rfc ,estado: raw.item.estado, municipio: raw.item.municipio, calle: raw.item.calle, colonia: raw.item.colonia, numero: raw.item.numero});
          alert('Cliente ' + raw.item.nombre + ' agregado');


          return auxClientes;

        //  localStorage.setItem("clientes", JSON.stringify(clientes))
      },
      LlenarSucursales(raw,auxSucursales){
          this.auxSucursales=auxSucursales;

          /*
         var sucursales = null;
         var local_suc = JSON.parse(localStorage.getItem( 'sucursales'));
         if(local_suc != null && local_suc.length >0){
             sucursales = local_suc;
         }
         else{
             sucursales = new Array();
         }*/
         auxSucursales.push({nombre: raw.item.nombre,
                            calle: raw.item.calle,
                            numero: raw.item.numero,
                            colonia: raw.item.colonia,
                            municipio:raw.item.municipio,
                            estado: raw.item.estado,

         });
           alert('Sucursal ' + raw.item.nombre + ' agregada');
         return auxSucursales;
       },
       LlenarTrabajos(raw,index){
           alert(this.result[index])
           this.result[index]['trabajo'].push(raw.item)
            console.log(this.result[index])
       },
       LlenarUsuarios(raw,auxUsuarios){
          this.auxUsuarios= auxUsuarios;
          /*
           var usuarios = null;
           var local_user = JSON.parse(localStorage.getItem( 'usuarios'));
           if(local_user != null && local_user.length >0){
               usuarios = local_user;
           }
           else{
               usuarios = new Array();
           }*/
           auxUsuarios.push({email: raw.item.email ,nombre: raw.item.nombre});
           const flatten = (arr) => [].concat.apply([], arr);
           const product = (...sets) => sets.reduce((acc, set) => flatten(acc.map(x => set.map(y => [...x, y]))), [[]]);
           var r = product(this.auxClientes, this.auxSucursales)
           var final = new Array()
           var result = product(this.auxUsuarios, r)
           for (const i in result){
               final.push({user: result[i][0], cliente: result[i][1][0], sucursal: result[i][1][1], trabajo: new Array()})
           }
           console.log(final)
           this.result = final
           alert('Usuario ' + raw.item.nombre + ' agregado');
           //localStorage.setItem("usuarios", JSON.stringify(usuarios))
           return auxUsuarios;
       },
       cleanall(auxClientes,auxSucursales,auxUsuarios,auxTrabajos){
           this.auxClientes.length=0;
           this.auxSucursales.length=0;
           this.auxTrabajos.length=0;
           this.auxUsuarios.length=0;


       },
       asignarbienperro(data, fecha, hora){

           this.result
           console.log(this.result)
           this.$store.dispatch('megaAsignacion',{result: this.result,data: data,fecha: fecha,hora: hora})

           

       },


    ...mapActions([
      "getTrabajoStock",
      "eliminarTrabajoStock",
      "getDataUser",
      "cerrarSesion",
      "getdata",
      "getClienteStock",
      "getSucursaleStock",
      "getUsers",
      "agregarCliente",
      "getClientes",
        "asignarSucursal",
        "getSucursales",
        "agregarTrabajo",
        "megaAsignacion"
    ]),
    //Tabla de Usuarios  //Tabla de Usuarios //Tabla de Usuarios //Tabla de Usuarios //Tabla de Usuarios
    //Tabla de Usuarios //Tabla de Usuarios //Tabla de Usuarios //Tabla de Usuarios //Tabla de Usuarios 
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
      },

       asignamiento(val) {
        var usuario = null;
        for(var i in this.usuarios) {
            var elemtos = this.filtrar(this.usuarios[i], val);
            console.log(elemtos)
            if(elemtos === true) {
                usuario = this.usuarios[i];
                break;
            }
        }
        console.log(usuario)
        this.correo_asig = usuario.idData;
        this.nombre_asig = usuario.nombre;
       },
    
    //Tabla de Usuarios  //Tabla de Usuarios //Tabla de Usuarios //Tabla de Usuarios //Tabla de Usuarios 
    //Tabla de Usuarios //Tabla de Usuarios //Tabla de Usuarios //Tabla de Usuarios //Tabla de Usuarios 


    //Tabla de ClienteStock //Tabla de ClienteStock  //Tabla de ClienteStock  //Tabla de ClienteStock 
    //Tabla de ClienteStock //Tabla de ClienteStock  //Tabla de ClienteStock  //Tabla de ClienteStock 
    //Tabla de ClienteStock //Tabla de ClienteStock  //Tabla de ClienteStock  //Tabla de ClienteStock 

   
    nombre_selected:"",
    estado_selected:"",
    
   
   
   
   
   filtrarClienteStock(row,filterCS){
      var filtCS = Object.values(row)
      var retorna = false
      for (var j in filtCS){
        var palabra = String(filtCS[j])
          if(palabra.includes(filterCS)){
          retorna=true
          }
      }
        console.log(retorna)
        return retorna
      },

       asignamientoClienteStock(val) {
        var clientStock = null;
        for(var j in this.clienteStock) {
            var elemtos = this.filtrarClienteStock(this.clienteStock[j],val);
            console.log(elemtos)
            if(elemtos === true) {
                clientStock = this.clienteStock[j];
                break;
            }
        }
        console.log(clientStock)
        
        this.idCliente_selected = clientStock.idCliente;
        this.estado_selected = clientStock.estado; 
        this.municipio_selected = clientStock.municipio; 
       },

  
    //Tabla Clientes //Tabla Clientes //Tabla Clientes //Tabla Clientes //Tabla Clientes //Tabla Clientes
    //Tabla Clientes //Tabla Clientes //Tabla Clientes //Tabla Clientes //Tabla Clientes //Tabla Clientes
    //Tabla Clientes //Tabla Clientes //Tabla Clientes //Tabla Clientes //Tabla Clientes //Tabla Clientes

      filtrarClientes(row,filterClient){
      var filtClient = Object.values(row)
      var retorna = false
      for (var l in filtClient){
        var palabra = String(filtClient[l])
          if(palabra.includes(filterClient)){
          retorna=true
          }
      }
        console.log(retorna)
        return retorna
      },

       asignamientoCliente(val) {
        var cliente = null;
        for(var l in this.clientes) {
            var elemtos = this.filtrarClientes(this.clientes[l],val);
            console.log(elemtos)
            if(elemtos === true) {
                cliente = this.clientes[l];
                break;
            }
        }
        console.log(cliente)

        
        this.namecliente_asign = cliente.nombre;
        this.edocliente_asign = cliente.estado;
        this.municipiocliente_asign = cliente.municipio;
        alert('llego')
       },
       //Tabla Clientes //Tabla Clientes //Tabla Clientes //Tabla Clientes //Tabla Clientes //Tabla Clientes
       //Tabla Clientes //Tabla Clientes //Tabla Clientes //Tabla Clientes //Tabla Clientes //Tabla Clientes
       //Tabla Clientes //Tabla Clientes //Tabla Clientes //Tabla Clientes //Tabla Clientes //Tabla Clientes


       //Tabla SucursaleStock //Tabla SucursaleStock //Tabla SucursaleStock //Tabla SucursaleStock //Tabla SucursaleStock
       //Tabla SucursaleStock //Tabla SucursaleStock //Tabla SucursaleStock //Tabla SucursaleStock //Tabla SucursaleStock
       //Tabla SucursaleStock //Tabla SucursaleStock //Tabla SucursaleStock //Tabla SucursaleStock //Tabla SucursaleStock
       filtracionSucurStock(row,filterSucStock){
           var filtSucSt = Object.values(row)
           var retorna = false
           for (var m in filtSucSt){
               var palabra = String(filtSucSt[m])
               if(palabra.includes(filterSucStock)){
                   retorna=true
               }
           }
           console.log(retorna)
           return retorna
       },

       asignamientoSucurStock(val) {
           var sucurSt = null;
           for(var m in this.sucursaleStock) {
               var elemtos = this.filtracionSucurStock(this.sucursaleStock[m],val);
               console.log(elemtos)
               if(elemtos === true) {
                   sucurSt = this.sucursaleStock[m];
                   break;
               }
           }
           console.log(sucurSt)


           this.sucStockname_asign = sucurSt.nombre;
           this.sucStockedo_asign = sucurSt.estado;
           this.sucStockmunic_asign = sucurSt.municipio;
           alert('llego2')
       },
       //Tabla SucursaleStock //Tabla SucursaleStock //Tabla SucursaleStock //Tabla SucursaleStock //Tabla SucursaleStock
       //Tabla SucursaleStock //Tabla SucursaleStock //Tabla SucursaleStock //Tabla SucursaleStock //Tabla SucursaleStock
       //Tabla SucursaleStock //Tabla SucursaleStock //Tabla SucursaleStock //Tabla SucursaleStock //Tabla SucursaleStock

       //Tabla Sucursales //Tabla Sucursales //Tabla Sucursales //Tabla Sucursales //Tabla Sucursales //Tabla Sucursales
       //Tabla Sucursales //Tabla Sucursales //Tabla Sucursales //Tabla Sucursales //Tabla Sucursales //Tabla Sucursales
       //Tabla Sucursales //Tabla Sucursales //Tabla Sucursales //Tabla Sucursales //Tabla Sucursales //Tabla Sucursales

       filtracionSucursales(row,filterSucursales){
           var filtSucur = Object.values(row)
           var retorna = false
           for (var n in filtSucur){
               var palabra = String(filtSucur[n])
               if(palabra.includes(filterSucursales)){
                   retorna=true
               }
           }
           console.log(retorna)
           return retorna
       },

       asignamientoSucursal(val) {
           var sucursal = null;
           for(var o in this.sucursales) {
               var elemtos = this.filtracionSucursales(this.sucursales[o],val);
               console.log(elemtos)
               if(elemtos === true) {
                   sucursal = this.sucursales[o];
                   break;
               }
           }
           console.log(sucursal);


           this.sucursalname_asign = sucursal.nombre;
           this.sucursaledo_asign = sucursal.estado;
           this.sucursalmunic_asign = sucursal.municipio;

       },
       //Tabla Sucursales //Tabla Sucursales //Tabla Sucursales //Tabla Sucursales //Tabla Sucursales //Tabla Sucursales
       //Tabla Sucursales //Tabla Sucursales //Tabla Sucursales //Tabla Sucursales //Tabla Sucursales //Tabla Sucursales
       //Tabla Sucursales //Tabla Sucursales //Tabla Sucursales //Tabla Sucursales //Tabla Sucursales //Tabla Sucursales

       //Tabla Trabajo Stock //Tabla Trabajo Stock  //Tabla Trabajo Stock //Tabla Trabajo Stock //Tabla Trabajo Stock
       //Tabla Trabajo Stock //Tabla Trabajo Stock  //Tabla Trabajo Stock //Tabla Trabajo Stock //Tabla Trabajo Stock
       //Tabla Trabajo Stock //Tabla Trabajo Stock  //Tabla Trabajo Stock //Tabla Trabajo Stock //Tabla Trabajo Stock

       filtracionTStock(row,filterTStock){
           var filTS = Object.values(row)
           var retorna = false
           for (var p in filTS){
               var palabra = String(filTS[p])
               if(palabra.includes(filterTStock)){
                   retorna=true
               }
           }
           console.log(retorna)
           return retorna
       },

       asignamientoTS(val) {
           var tstock = null;
           for(var q in this.trabajoStock) {
               var elemtos = this.filtracionTStock(this.trabajoStock[q],val);
               console.log(elemtos)
               if(elemtos === true) {
                   tstock = this.trabajoStock[q];
                   break;
               }
           }
           console.log(tstock);


           this.trabajoStockname_asign = tstock.nombre;
       },



       //Tabla Trabajo Stock //Tabla Trabajo Stock  //Tabla Trabajo Stock //Tabla Trabajo Stock //Tabla Trabajo Stock
       //Tabla Trabajo Stock //Tabla Trabajo Stock  //Tabla Trabajo Stock //Tabla Trabajo Stock //Tabla Trabajo Stock
       //Tabla Trabajo Stock //Tabla Trabajo Stock  //Tabla Trabajo Stock //Tabla Trabajo Stock //Tabla Trabajo Stock



      


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
