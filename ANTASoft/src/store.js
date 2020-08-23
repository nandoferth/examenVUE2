//BIENVENIDO AL BACK END :D

import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import db from './main'
var firebase = require ("firebase/app");



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    trabajos:[],
    trabajoStock: [],                                                              //status trabajo
    trabajo: {nombre:'',id:'',fechaCreacion:'' ,fechaVigencia:'', selected: false, activo:false, inactivo:false, pendiente:false, enTramite:false, concluido:false, vencido:false, provision:false, contactoCiudad:'' },
    clientes:[], //array exclusivo
    clienteStock:[], //array de bodega                                                                            //status cliente
    cliente: { idCliente: '', nombre: '', rfc: '', calle: '', numero: '', colonia: '', estado: '', municipio: '', selected:false , activo:false, inactivo:false},
    sucursales: [],
    size: 0,
    sucursaleStock:[],                                                                                                          //status sucursales
    sucursal: { idSucursal: '', nombre: '',  calle: '', numero: '', colonia: '', estado: '', municipio: '', claveInmueble: '', selected:false, activo:false, inactivo:false, reubicacion:false, remodelacion: false  },
    docs: [],
    documento: {idDoc:'', nombre:'', url: null, validado: false},
    pagos: [],                                                                                                                                          //tipo de pago:
    pago: { idPago: '', concepto: '', importe: '', nombre: '', beneficiario: '', BRFC: '', fechaCreacion: '', autorizacion: '', vigencia: '',status:'', cheque:false, reembolso:false },
    comprobantes: [],                                                                                           //status comprobante
    comprobante: { idComprobante: '', nombre: '', concepto: '', monto: '', referencia: '', fechaCreacion: '',archivo: null, validado:false},
    usuario: '',
    error: '',
    data:{ nombre: '', Apaterno: '', Amaterno: '', gestor: "", coordinador: "",email:""},
    Alldata: [],
    factura:{idFactura: '', nombre:'' },
    usuarios:[],
    movimiento:{idUser:'', fecha:'',hora:'', nombre:'', apellido:'',descripcion:'',correo:''},
    Actividad:[]





  },
  mutations: {

  	setUsuario(state,payload){
  	state.usuario=payload
  	},
  	setError(state,payload){
  		state.usuario=payload
  	},
  	setTrabajos(state,trabajos){
  		state.trabajos= trabajos
  	},
    setTrabajo(state,trabajo){
      state.trabajo=trabajo
    },
    setTrabajoStock(state,trabajoStock){
      state.trabajoStock = trabajoStock
    },
    setCliente(state,cliente){
      state.cliente=cliente
    },
    setClientes(state,clientes){
      state.clientes=clientes
    },
    setClienteStock(state, clienteStock) {
      state.clienteStock = clienteStock
    },
    setSucursal(state,sucursal) {
      state.sucursal = sucursal
    },
    setSucursales(state,sucursales) {
      state.sucursales = sucursales
    },
    setSucursaleStock(state, sucursaleStock) {
      state.sucursaleStock = sucursaleStock
    },
    setDocumento(state,documento){
      state.documento = documento
    },
    setSize(state, payload){
      state.size = payload
    },
    setDocumentos(state,docs){
      state.docs = docs
    },
    setPago(state, pago) {
      state.pago = pago
    },
    setPagos(state, pagos) {
      state.pagos = pagos
    },
    setComprobante(state,comprobante){
      state.comprobante=comprobante
    },
    setComprobantes(state,comprobantes){
      state.comprobantes=comprobantes
    },
    setdata(state,data){
      state.data=data
    },
    setAlldata(state,Alldata){
      state.Alldata=Alldata
    },
    setUsuarios(state,usuarios){
      state.usuarios=usuarios
    },
    setMovimiento(state,movimimento){
        state.movimiento=movimimento
      },
    setActividad(state,Actividad){
  	    state.Actividad=Actividad
    },
      setMegAsignacion(state,auxClientes,auxSucursales,auxTrabajos,auxUsuarios){
  	    state.auxClientes=auxClientes;
          state.auxSucursales=auxSucursales;
          state.auxTrabajos=auxTrabajos;
          state.auxUsuarios=auxUsuarios;
      }


  },
  actions: {

//BLOQUE FUNCIONAL BLOQUE FUNCIONAL BLOQUE FUNCIONAL BLOQUE FUNCIONAL BLOQUE FUNCIONAL BLOQUE FUNCIONAL BLOQUE FUNCIONAL BLOQUE FUNCIONAL

  //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO
  //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO
  //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO
  //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO

    crearUsuario({commit},payload){
      const uscollection = firebase.firestore().collection('usuarios')
      firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password).then(res=>{
        commit('setUsuario',{email:res.user.email , uid:res.user.uid})
        //create data
        uscollection.doc(payload.email).set({
          email: payload.email,
          nombre: payload.nombre,
          Apaterno: payload.Apaterno,
          Amaterno: payload.Amaterno,
          coordinador: payload.coordinador,
          gestor: payload.gestor
        }).then(()=>{
          alert("Completemos tu Registro :D");
          router.push({name: 'cliente'})
        })
      }).catch(err=>{
        commit('setError',err.message)
      })
    },
    //Update
    AddDataUser({commit,dispatch},{id:id, nombre,Apaterno,Amaterno,coordinador,gestor}) {
      const user = firebase.auth().currentUser
      const uscollection = firebase.firestore().collection('usuarios')
      db.uscollection.doc(user).add({
        test:"test"
      })

                 /* db.collection(user.email).doc(id).update({
                    nombre: nombre,
                    Apaterno: Apaterno,
                    Amaterno: Amaterno,
                    coordinador: coordinador,
                    gestor: gestor
                  })*/.
      then(() => {
        alert('Registro Completado, Pulsa Continuar');
      })
    },
    //Get One
    getdata({commit},payload) {
      const user = firebase.auth().currentUser
      const uscollection = firebase.firestore().collection('usuarios')
      uscollection.doc(user.email).get().then(doc => {
        let data = doc.data();
        data.email = doc.id
        commit('setdata', data)
      })
    },
    //getAll
    getDataUser({ commit }) {
      const user = firebase.auth().currentUser
      const Alldata = []
      db.collection(user.email).get().then(snapshot => {
        snapshot.forEach(doc =>{
          let data = doc.data();
          data.idData = doc.id
          Alldata.push(data)
        })
      })
      commit('setAlldata',Alldata)
    },

    ingresaUsuario({commit},payload){
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(res=>{
        commit('setUsuario',{email:res.user.email , uid:res.user.uid})
          router.push({
            name: 'cliente'
          })
      }).catch(err=>{
        commit('setError',err.message)
      })
    },
    detectarUsuario({commit},payload){
      if (payload != null){
        commit('setUsuario',{email: payload.email , uid:payload.password})
      }else{
        commit('setUsuario',null)
      }
    },
    cerrarSesion({commit}){
      firebase.auth().signOut()
      commit('setUsuario',null)
      router.push({name: 'home'})
      alert("Sesion Cerrada");
    },

    getFecha({commit}){
      var currentDate = new Date();
                alert(':v')
                alert(currentDate);
                var currentDateWithFormat = new Date().toJSON().slice(0,10).replace(/-/g,'/');
                alert(currentDateWithFormat);
              } ,


                getUsers({commit},payload){
               const user = firebase.auth().currentUser
               const uscollection = firebase.firestore().collection('usuarios')
               const usuarios = []
               uscollection.get()
               .then(snapshot => {
                snapshot.forEach(doc =>{
                  let data = doc.data();
                  data.idData = doc.id
                  usuarios.push(data)
                })
              })
              commit('setUsuarios',usuarios)
                },


                getActividad({commit},){
                    const user = firebase.auth().currentUser
                    const Actividad = []
                    db.collection('Actividad').get()
                        .then(snapshot =>{
                            snapshot.forEach(doc =>{
                                let movimiento = doc.data();
                                movimiento.idUser = doc.id;
                                Actividad.push(movimiento)
                            })
                        })
                    commit('setActividad',Actividad)
                },




  //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO
  //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO
  //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO
  //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO //BLOQUE USUARIO


//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO
//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO
//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO

      //BLOQUE GESTOR STOCK//BLOQUE GESTOR STOCK//BLOQUE GESTOR STOCK//BLOQUE GESTOR STOCK//BLOQUE GESTOR STOCK//BLOQUE GESTOR STOCK
      //BLOQUE GESTOR STOCK//BLOQUE GESTOR STOCK//BLOQUE GESTOR STOCK//BLOQUE GESTOR STOCK//BLOQUE GESTOR STOCK//BLOQUE GESTOR STOCK

              //create
              agregarTrabajoStock({commit},{nombre,data,fecha,hora}) {
                  const user = firebase.auth().currentUser
                  db.collection('trabajoStock').add({
                      nombre: nombre,
                      activo: true,
                      inactivo: false,
                      pendiente: false,
                      enTramite: false,
                      concluido: false,
                      vencido: false,
                      provision: false,
                      selected: false
                  }).then(doc => {
                      db.collection('Actividad').add({
                          fecha: fecha,
                          hora: hora,
                          correo: data.email,
                          nombre: data.nombre,
                          apellido: data.Apaterno,
                          descripcion: 'Agregó ' + nombre + ' como trabajo de stock',

                          //prueba de observador de actividad


                      }).then(() => {
                          router.push({name: 'trabajo'})
                      })
                  })
              },

              //READ ALL
              getTrabajoStock({
                commit
              }) {
                const user = firebase.auth().currentUser
                const trabajoStock = []
                db.collection('trabajoStock').get()
                  .then(snapshot => {
                    snapshot.forEach(doc => {

                      let trabajo = doc.data();
                      trabajo.id = doc.id
                      trabajoStock.push(trabajo)

                    })
                  }) //termina then
                commit('setTrabajoStock', trabajoStock)
              },

              //READ ONE
              getTrabajStock({
                commit
              }, id) {
                const user = firebase.auth().currentUser
                db.collection('trabajoStock').doc(id).get()
                  .then(doc => {
                    let trabajo = doc.data();
                    trabajo.id = doc.id
                    commit('setTrabajo', trabajo)
                  })
              },
              //UPDATE
              editarTrabajoStock({commit}, {trabajo,data,fecha,hora}) {
                  const user = firebase.auth().currentUser
                  db.collection('trabajoStock').doc(trabajo.id).update({
                      nombre: trabajo.nombre,

                    }).then(()=>{
                      db.collection('Actividad').add({
                          fecha: fecha,
                          hora: hora,
                          correo: data.email,
                          nombre: data.nombre,
                          apellido: data.Apaterno,
                          descripcion: 'Modifico  el nombre de un trabajo por el de ' + trabajo.nombre ,

                      })
                  })
                    .then(() => {
                      alert("trabajo editado")
                      router.push({
                        name: 'trabajo'
                      })
                    })
                },
                //DELETE
              eliminarTrabajoStock({
                  commit,
                  dispatch
               }, id) {
                  const user = firebase.auth().currentUser
                  db.collection('trabajoStock').doc(id).delete()
                    .then(() => {
                      alert("eliminacion exitosa");
                      dispatch('getTrabajoStock')
                    })
                },
       //BLOQUE GESTOR STOCK//BLOQUE GESTOR STOCK//BLOQUE GESTOR STOCK//BLOQUE GESTOR STOCK//BLOQUE GESTOR STOCK//BLOQUE GESTOR STOCK
       //BLOQUE GESTOR STOCK//BLOQUE GESTOR STOCK//BLOQUE GESTOR STOCK//BLOQUE GESTOR STOCK//BLOQUE GESTOR STOCK//BLOQUE GESTOR STOCK

              //CREATE
              agregarTrabajo({commit},obj) {
                const user = firebase.auth().currentUser
              db.collection('usuarios').doc(obj.correo_asig).collection('clientes').doc(obj.edocliente_asign).collection('sucursales').doc(obj.sucursalname_asign).collection('trabajos').doc(obj.trabajoStockname_asign).set({
                  nombre: obj.trabajoStockname_asign,
                  activo: true,




                }).then(()=>{

                  db.collection('Actividad').add({
                      fecha: obj.fecha,
                      hora: obj.hora,
                      correo: obj.data.email,
                      nombre: obj.data.nombre,
                      apellido: obj.data.Apaterno,
                      descripcion: 'el usuario ' + obj.data.nombre + ' ' + obj.data.Apaterno + ' '
                          + 'le asignó a ' + obj.correo_asig + ' con cliente ' + obj.edocliente_asign
                          + ' y con sucursal ' + obj.sucursalname_asign + ' el trabajo '+
                       obj.trabajoStockname_asign,

                  })



                }).then(doc => {
                  const usi = db.collection('trabajoStock').where("nombre", "==", trabajo.nombre).get().then(snapshot => {
                    db.collection('trabajoStock').doc(snapshot.docs[0].id).update(
                      {
                        selected: true
                      }
                    )
                  })
                  router.push({
                    name: 'CoordTrabajo'
                  })
                })
              },

              //READ ONE
              getTrabajo({ commit }, {id,id2,id3,id4}) {
                const user = firebase.auth().currentUser
                db.collection(user.email).doc(id).collection('clientes').doc(id2).collection('sucursales').doc(id3).collection('trabajos').doc(id4).get()
                    .then(doc => {
                      let trabajo = doc.data();
                      trabajo.id = doc.id
                      commit('setTrabajo', trabajo)
                    })
              },


              //READ ALL
              getTrabajos({commit},{id,id2,id3}){
                const user = firebase.auth().currentUser
            		const trabajos = []
            		db.collection(user.email).doc(id).collection('clientes').doc(id2).collection('sucursales').doc(id3).collection('trabajos').get()
                		.then(snapshot =>{
                      			snapshot.forEach(doc =>{

                      				let trabajo = doc.data();
                      				trabajo.id=doc.id
                              trabajos.push(trabajo)

                      			})
                		})//termina then
            		  commit('setTrabajos',trabajos)
              },





















              


            megaAsignacion({commit},{result,fecha,hora,data}){
                    // const user = firebase.auth().currentUser
                    // console.log(result)
                    // for( i in result)
                    
                    // {


                    //} //llave del for
                  },//llave maestra,

                    //                   db.collection('usuarios').doc(result[i].user.email).collection('clientes').doc(result[i].cliente.nombre).set({


                    //                     nombre: result[i].cliente.nombre,
                    //                     rfc: result[i].cliente.rfc,
                    //                     status: status,
                    //                     calle: result[i].cliente.calle,
                    //                     numero: result[i].cliente.numero,
                    //                     colonia: result[i].cliente.colonia,
                    //                     estado: result[i].cliente.estado,
                    //                     municipio: result[i].cliente.municipio,
                    //                     selected: false
                    //                     }).then(() => {
                    //                         db.collection('Actividad').add({
                    //                           fecha: fecha,
                    //                           hora: hora,
                    //                           correo: data.email,
                    //                           nombre: data.nombre,
                    //                           apellido: data.Apaterno,
                    //                           descripcion: 'el usuario ' + data.nombre + ' ' + data.Apaterno + ' '
                    //                                       + 'le asignó a ' + result[i].usuario.email + ' el cliente ' 
                    //                                       + result[i].cliente.nombre,
                    //                         })

                    //                   }).then(() =>{

                    //                     db.collection('usuarios').doc(result[i].user.email).collection('clientes').doc(result[i].cliente).collection('sucursales').doc(result[i].sucursal.nombre).set({

                    //                       nombre: result[i].sucursal.nombre,
                    //                       calle: result[i].sucursal.calle,
                    //                       numero: result[i].sucursal.numero,
                    //                       colonia: result[i].sucursal.colonia,const user = firebase.auth().currentUser
                    // console.log(result)
                    // for( i in result)
                    
                    // {

                    //                   db.collection('usuarios').doc(result[i].user.email).collection('clientes').doc(result[i].cliente.nombre).set({


                    //                     nombre: result[i].cliente.nombre,
                    //                     rfc: result[i].cliente.rfc,
                    //                     status: status,
                    //                     calle: result[i].cliente.calle,
                    //                     numero: result[i].cliente.numero,
                    //                     colonia: result[i].cliente.colonia,
                    //                     estado: result[i].cliente.estado,
                    //                     municipio: result[i].cliente.municipio,
                    //                     selected: false
                    //                     }).then(() => {
                    //                         db.collection('Actividad').add({
                    //                           fecha: fecha,
                    //                           hora: hora,
                    //                           correo: data.email,
                    //                           nombre: data.nombre,
                    //                           apellido: data.Apaterno,
                    //                           descripcion: 'el usuario ' + data.nombre + ' ' + data.Apaterno + ' '
                    //                                       + 'le asignó a ' + result[i].usuario.email + ' el cliente ' 
                    //                                       + result[i].cliente.nombre,
                    //                         })

                    //                   }).then(() =>{

                    //                     db.collection('usuarios').doc(result[i].user.email).collection('clientes').doc(result[i].cliente).collection('sucursales').doc(result[i].sucursal.nombre).set({

                    //                       nombre: result[i].sucursal.nombre,
                    //                       calle: result[i].sucursal.calle,
                    //                       numero: result[i].sucursal.numero,
                    //                       colonia: result[i].sucursal.colonia,
                    //                       estado: result[i].sucursal.estado,
                    //                       municipio: result[i].sucursal.municipio,
                    //                       status: status,
                    //                       selected: false
                    //                       }).then(() => {
                    //                           db.collection('Actividad').add({
                    //                               fecha: fecha,
                    //                               hora: hora,
                    //                               correo: data.email,
                    //                               nombre: data.nombre,
                    //                               apellido: data.Apaterno,
                    //                               descripcion: 'el usuario ' + data.nombre + ' ' + data.Apaterno + ' '
                    //                                   + 'le asignó a ' + result[i].usuario.nombre + ' con cliente ' 
                    //                                   + result[i].cliente.nombre
                    //                                   + ' la sucursal ' + result[i].sucursal.nombre,
                       
                    //                       }).then(() =>{
                    //                         db.collection('usuarios').doc(result[i].user.email).collection('clientes').doc(result[i].cliente).collection('sucursales').doc(result[i].sucursal).collection('trabajos').doc(result[i].trabajo.nombre).set({

                    //                           nombre: result[i].trabajo.nombre,
                    //                           contactoCiudad: 'contactopendiente',
                    //                           status: status,
                    //                           selected: false
                    //                       }).then(() => {
                    //                           db.collection('Actividad').add({
                    //                               fecha: fecha,
                    //                               hora: hora,
                    //                               correo: data.email,
                    //                               nombre: data.nombre,
                    //                               apellido: data.Apaterno,
                    //                               descripcion: 'el usuario ' + data.nombre + ' ' + data.Apaterno + ' '
                    //                                   + 'le asignó a ' + result[i].usuario.nombre + ' con cliente ' 
                    //                                   + result[i].cliente.nombre
                    //                                   + ' con sucursal ' + result[i].sucursal.nombre
                    //                                   + 'el trabajo' + result[i].trabajo.nombre
                              
                    //                           })
                    //                         },
                    //                       estado: result[i].sucursal.estado,
                    //                       municipio: result[i].sucursal.municipio,
                    //                       status: status,
                    //                       selected: false
                    //                       }).then(() => {
                    //                           db.collection('Actividad').add({
                    //                               fecha: fecha,
                    //                               hora: hora,
                    //                               correo: data.email,
                    //                               nombre: data.nombre,
                    //                               apellido: data.Apaterno,
                    //                               descripcion: 'el usuario ' + data.nombre + ' ' + data.Apaterno + ' '
                    //                                   + 'le asignó a ' + result[i].usuario.nombre + ' con cliente ' 
                    //                                   + result[i].cliente.nombre
                    //                                   + ' la sucursal ' + result[i].sucursal.nombre,
                       
                    //                       }).then(() =>{
                    //                         db.collection('usuarios').doc(result[i].user.email).collection('clientes').doc(result[i].cliente).collection('sucursales').doc(result[i].sucursal).collection('trabajos').doc(result[i].trabajo.nombre).set({

                    //                           nombre: result[i].trabajo.nombre,
                    //                           contactoCiudad: 'contactopendiente',
                    //                           status: status,
                    //                           selected: false
                    //                       }).then(() => {
                    //                           db.collection('Actividad').add({
                    //                               fecha: fecha,
                    //                               hora: hora,
                    //                               correo: data.email,
                    //                               nombre: data.nombre,
                    //                               apellido: data.Apaterno,
                    //                               descripcion: 'el usuario ' + data.nombre + ' ' + data.Apaterno + ' '
                    //                                   + 'le asignó a ' + result[i].usuario.nombre + ' con cliente ' 
                    //                                   + result[i].cliente.nombre
                    //                                   + ' con sucursal ' + result[i].sucursal.nombre
                    //                                   + 'el trabajo' + result[i].trabajo.nombre
                              
                    //                           })
                    //                         },
                                       
                          

                        
                    
                                          
                                           
                                          
                                                                      
                                    
                            

                






//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO
//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO
//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO//BLOQUE TRABAJO

//bloque cliente //bloque cliente //bloque cliente //bloque cliente //bloque cliente //bloque cliente //bloque cliente
//bloque cliente //bloque cliente //bloque cliente //bloque cliente //bloque cliente //bloque cliente//bloque cliente


                //BLOQUE STOCK DE GESTOR //BLOQUE STOCK DE GESTOR //BLOQUE STOCK DE GESTOR //BLOQUE STOCK DE GESTOR
                //BLOQUE STOCK DE GESTOR //BLOQUE STOCK DE GESTOR //BLOQUE STOCK DE GESTOR //BLOQUE STOCK DE GESTOR


              //CREATE
              agregarClienteStock({ commit }, { nombre, rfc, status, calle, numero, colonia, estado, municipio,data,fecha,hora }) {

                  console.log(colonia, estado, municipio);
                  const user = firebase.auth().currentUser
                  db.collection('clienteStock').add({
                      nombre: nombre,
                      rfc: rfc,
                      status: status,
                      calle: calle,
                      numero: numero,
                      colonia: colonia,
                      estado: estado,
                      municipio: municipio,
                      selected: false

                  }).then(() => {
                      db.collection('Actividad').add({
                          fecha: fecha,
                          hora: hora,
                          correo: data.email,
                          nombre: data.nombre,
                          apellido: data.Apaterno,
                          descripcion: 'Agrego al cliente ' + nombre + ' como cliente de tipo stock',

                          //prueba de observador de actividad
                      }).then(doc => {
                          alert("Cliente Asignado")
                          router.push({name: 'cliente'})
                      })
                  })
              },




              //READ-ONE
              getClientStock({ commit }, id) {
                const user = firebase.auth().currentUser
                db.collection('clienteStock').doc(id).get()
                  .then(doc => {
                    let cliente = doc.data();
                    cliente.idCliente = doc.id
                    commit('setCliente', cliente)
                  })

              },

              //READ-ALL
              getClienteStock({ commit }) {
                const user = firebase.auth().currentUser
                const clienteStock = []
                db.collection('clienteStock').orderBy('rfc').get()
                  .then(snapshot => {
                        snapshot.forEach(doc => {
                          let cliente = doc.data();
                          cliente.idCliente = doc.id
                          clienteStock.push(cliente)
                        })

                        commit('setClienteStock', clienteStock)
                      })


              },

              //UPDATE
              editarClienteStock({ commit }, { cliente,data,fecha,hora }) {
                const user = firebase.auth().currentUser
                db.collection('clienteStock').doc(cliente.idCliente).update({
                  nombre: cliente.nombre,
                  status: cliente.status,
                  rfc: cliente.rfc,
                  calle: cliente.calle,
                  numero: cliente.numero,
                  colonia: cliente.colonia,
                  estado: cliente.estado,
                  municipio: cliente.municipio
                })
                  .then(() => {
                          db.collection('Actividad').add({
                              fecha: fecha,
                              hora: hora,
                              correo: data.email,
                              nombre: data.nombre,
                              apellido: data.Apaterno,
                              descripcion: 'Modifico  los dato de un cliente con el RFC' + cliente.rfc ,

                            })
                      alert('Actualizacion Exitosa, Presiona Continuar')

                  })
              },

              //DELETE
              eliminarClienteStock({ commit, dispatch }, id) {
                  const user = firebase.auth().currentUser
                  db.collection('Actividad').add({
                      fecha: id.fecha,
                      hora: id.hora,
                      correo: id.data.email,
                      nombre: id.data.nombre,
                      apellido: id.data.Apaterno,
                      descripcion: 'Elimino  al cliente' + id.raw.item.rfc + ' ' + id.raw.item.nombre,


                  }).then(() => {
                      db.collection('clienteStock').doc(id.raw.value).delete()
                          .then(() => {
                              alert("Cliente Eliminado")
                              dispatch('getClienteStock')
                          })

                  })
              },

                 //BLOQUE STOCK DE GESTOR //BLOQUE STOCK DE GESTOR //BLOQUE STOCK DE GESTOR //BLOQUE STOCK DE GESTOR
                //BLOQUE STOCK DE GESTOR //BLOQUE STOCK DE GESTOR //BLOQUE STOCK DE GESTOR //BLOQUE STOCK DE GESTOR




                //BLOQUE COORDINADOR //BLOQUE COORDINADOR //BLOQUE COORDINADOR //BLOQUE COORDINADOR //BLOQUE COORDINADOR
                //BLOQUE COORDINADOR //BLOQUE COORDINADOR //BLOQUE COORDINADOR //BLOQUE COORDINADOR //BLOQUE COORDINADOR

            //READ-ALL
            getClientes({ commit },correo_asig) {

              const user = firebase.auth().currentUser
              const clientes = []
              db.collection('usuarios').doc(correo_asig).collection('clientes').get()

                .then(snapshot => {
                  snapshot.forEach(doc => {
                    let cliente = doc.data();
                    cliente.correo_asig = doc.id
                    clientes.push(cliente)
                  })
                  commit('setClientes', clientes)

                })
            },

           //READ-ONE
           getCliente({commit},{id,id2}) {
             const user = firebase.auth().currentUser
              db.collection(user.email).doc(id).collection('clientes').doc(id2).get()
                .then(doc => {
                 let cliente = doc.data();
                 cliente.idCliente = doc.id
                 commit('setCliente', cliente)
               })

           },

                //CREATE
          agregarCliente({ commit }, { correo_asig, estado_selected, municipio_selected,data,fecha,hora }) {

              const user = firebase.auth().currentUser
              const uscollection = firebase.firestore().collection('usuarios')
              db.collection('usuarios').doc(correo_asig).collection('clientes').doc(estado_selected).set({


                  estado: estado_selected,
                  municipio: municipio_selected

              }).then(() => {

                  db.collection('Actividad').add({
                      fecha: fecha,
                      hora: hora,
                      correo: data.email,
                      nombre: data.nombre,
                      apellido: data.Apaterno,
                      descripcion: 'el usuario ' + data.nombre + ' ' + data.Apaterno + ' '
                          + 'le asignó a ' + correo_asig + ' el cliente ' + estado_selected,


                  }).then((doc) => {

                      const usi = db.collection('clienteStock').where("rfc", "==", cliente.rfc).get().then(snapshot => {
                          db.collection('clienteStock').doc(snapshot.docs[0].id).update(
                              {
                                  selected: true
                              })

                          alert("Cliente Asignado")
                          router.push({name: 'cliente'})
                      })
                  })
              })
          },

              //bloque cliente //bloque cliente //bloque cliente //bloque cliente //bloque cliente //bloque cliente //bloque cliente
              //bloque cliente //bloque cliente //bloque cliente //bloque cliente //bloque cliente //bloque cliente//bloque cliente





//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal
//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal
//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal



            //BLOQUE STOCK DE GESTOR //BLOQUE STOCK DE GESTOR //BLOQUE STOCK DE GESTOR //BLOQUE STOCK DE GESTOR
            //BLOQUE STOCK DE GESTOR //BLOQUE STOCK DE GESTOR //BLOQUE STOCK DE GESTOR //BLOQUE STOCK DE GESTOR

            //CREATE
            asignarSucursalStock({commit}, {nombre, calle, numero, colonia, estado, municipio, status,data, fecha, hora}) {
                const user = firebase.auth().currentUser
                db.collection('sucursalStock').add({
                    nombre: nombre,
                    calle: calle,
                    numero: numero,
                    colonia: colonia,
                    estado: estado,
                    municipio: municipio,
                    status: status,
                    selected: false
                })
                    .then(() => {
                        db.collection('Actividad').add({
                            fecha: fecha,
                            hora: hora,
                            correo: data.email,
                            nombre: data.nombre,
                            apellido: data.Apaterno,
                            descripcion: 'Agrego al cliente ' + nombre + ' como cliente de tipo stock',

                        }).then(() => {
                            alert("Sucursal Asignada")
                            router.push({
                                name: 'sucursal'
                            })
                        })
                    })
            },


          //READ ALL
           getSucursaleStock({
             commit
           }) {
             const user = firebase.auth().currentUser
             const sucursaleStock = []
             db.collection('sucursalStock').get()
               .then(snapshot => {
                 snapshot.forEach(doc => {
                   let sucursal = doc.data();
                   sucursal.idSucursal = doc.id
                   sucursaleStock.push(sucursal)
                 })

                 commit('setSucursaleStock', sucursaleStock)

               })
           },


           //DELETE
           eliminarSucursaleStock({commit, dispatch}, id) {
             const user = firebase.auth().currentUser
               db.collection('Actividad').add({
                   fecha: id.fecha,
                   hora: id.hora,
                   correo: id.data.email,
                   nombre: id.data.nombre,
                   apellido: id.data.Apaterno,
                   descripcion: 'Elimino  la sucursal' + ' ' + id.raw.item.nombre,


               }).then(()=>{
                db.collection('sucursalStock').doc(id).delete()
                    .then(() => {
                        alert("Sucursal Eliminada")
                        dispatch('getSucursaleStock')
                    })
                })
           },

            //READ ONE
             getSucursalStock({
               commit
             }, id) {
               const user = firebase.auth().currentUser
               db.collection('sucursalStock').doc(id).get()
                 .then(doc => {
                   let sucursal = doc.data();
                   sucursal.idSucursal = doc.id
                   commit('setSucursal', sucursal)
                 })

             },

             //UPDATE
             editarSucursalStock({commit}, {sucursal,data,fecha,hora}) {
               const user = firebase.auth().currentUser
               db.collection('sucursalStock').doc(sucursal.idSucursal).update({
                   claveInmueble: sucursal.nombre,
                   nombre: sucursal.nombre,
                   calle: sucursal.calle,
                   numero: sucursal.numero,
                   colonia: sucursal.colonia,
                   estado: sucursal.estado,
                   municipio: sucursal.municipio,
                   status: sucursal.status
                 })
                 .then(() => {
                     db.collection('Actividad').add({
                         fecha: fecha,
                         hora: hora,
                         correo: data.email,
                         nombre: data.nombre,
                         apellido: data.Apaterno,
                         descripcion: 'Modifico  los datos de una sucursal con clave de inmueble' + sucursal.nombre ,

                     })
                     alert('Actualizacion Exitosa, Presiona Continuar')

                 })
             },


               //BLOQUE STOCK DE GESTOR //BLOQUE STOCK DE GESTOR //BLOQUE STOCK DE GESTOR //BLOQUE STOCK DE GESTOR
               //BLOQUE STOCK DE GESTOR //BLOQUE STOCK DE GESTOR //BLOQUE STOCK DE GESTOR //BLOQUE STOCK DE GESTOR
                         //CREATE
                 asignarSucursal({commit},{correo_asig,data,fecha,hora,edocliente_asign,sucStockname_asign,sucStockedo_asign,sucStockmunic_asign,namecliente_asign}) {
                     const user = firebase.auth().currentUser


                   db.collection('usuarios').doc(correo_asig).collection('clientes').doc(edocliente_asign).collection('sucursales').doc(sucStockname_asign).set({

                       //calle: sucursal.calle,
                       //numero: sucursal.numero,
                       //colonia: sucursal.colonia,
                       nombre: sucStockname_asign,
                       estado: sucStockedo_asign,
                       municipio: sucStockmunic_asign,
                     //  status: sucursal.status
                     }).then(()=>{

                           db.collection('Actividad').add({
                               fecha: fecha,
                               hora: hora,
                               correo: data.email,
                               nombre: data.nombre,
                               apellido: data.Apaterno,
                               descripcion: 'el usuario ' + data.nombre + ' ' + data.Apaterno + ' '
                                   + 'le asignó a ' + correo_asig + ' con cliente ' + namecliente_asign
                               + ' la sucursal ' + sucStockedo_asign,

                           })
                   })
                     .then(() => {

                      const usi = db.collection('sucursalStock').where("nombre", "==", sucursal.nombre).get().then(snapshot => {
                        db.collection('sucursalStock').doc(snapshot.docs[0].id).update(
                          {
                            selected: true
                          }
                        )
                      })


                       alert("Sucursal Asignada :D, Pulsa Continuar.")

                     })
                 },


              //READ ALL
              getSucursales({ commit }, obj ) {
                  const user = firebase.auth().currentUser
                  const sucursales = []
                  db.collection('usuarios').doc(obj.correo_asig).collection('clientes').doc(obj.edocliente_asign).collection('sucursales').get()
                  .then(snapshot => {
                    snapshot.forEach(doc => {
                      let sucursal = doc.data();
                      sucursal.idSucursal = doc.id
                      sucursales.push(sucursal)
                    });
                    commit('setSucursales', sucursales)
                  })
              },



            //READ ONE

              getSucursal({
                commit
              }, {id,id2,id3}) {
                const user = firebase.auth().currentUser
                db.collection(user.email).doc(id).collection('clientes').doc(id2).collection('sucursales').doc(id3).get()
                  .then(doc => {
                    let sucursal = doc.data();
                    sucursal.idSucursal = doc.id
                    commit('setSucursal', sucursal)
                  })

              },



              eliminarSucursal({commit,dispatch},{trabajo:trabajo,sucursal:sucursal  }) {
                    const user = firebase.auth().currentUser
                    db.collection(user.email).doc(trabajo).collection('sucursal').doc(sucursal).delete()
                      .then(() => {
                        console.log("eliminacion exitosa");
                        dispatch('getSucursales')
                      })
              },





//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal
//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal
//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal//bloque sucursal


              agregarDoc({ commit}, { id,id2,id3,id4, nombre, vigencia, fechaVigencia}) {
              const user = firebase.auth().currentUser

              console.log(user.email);
              db.collection(user.email).doc(id).collection('clientes').doc(id2).collection('sucursales').doc(id3).collection('trabajos').doc(id4).collection('documentos').add({
                nombre: nombre,
                vigencia: vigencia,
                fechaVigencia: fechaVigencia,
                url:''
              })
                .then(() => {


                  alert("Datos Registrados, Añade un Archivo");
                  router.push({
                    name: 'documento'
                  })
                })

              },

              visualizar({commit},id){

                const user = firebase.auth().currentUser
                db.collection(user.email).doc(id.id).collection('documento').doc(id.id2).get({
                  url:url
                })
                .then(()=>{
                  alert("carga correcta")
                })
              },

              getDoc({ commit }, {id,id2,id3,id4,id5}) {

              const user = firebase.auth().currentUser
              db.collection(user.email).doc(id).collection('clientes').doc(id2).collection('sucursales').doc(id3).collection('trabajos').doc(id4).collection('documentos').doc(id5).get()

                .then(doc => {

                    let documento = doc.data();
                    documento.idDoc = doc.id
                    commit('setDocumento', documento)
                  })
              },

              getDocs({commit},{id,id2,id3,id4}) {
              const user = firebase.auth().currentUser
              const docs = []
              db.collection(user.email).doc(id).collection('clientes').doc(id2).collection('sucursales').doc(id3).collection('trabajos').doc(id4).collection('documentos').get()
                .then(snapshot => {
                  snapshot.forEach(doc =>{

                   let documento = doc.data();
                   documento.idDoc = doc.id
                   docs.push(documento)

                  })

                  commit('setDocumentos', docs)
                })
              },

              editarDocumento({ commit }, id) {
              const user = firebase.auth().currentUser
              db.collection(user.email).doc(id.id).collection('documento').doc(id.id2).update({
                nombre: id.documento.nombre,
                vigencia: id.documento.vigencia,
                fechaVigencia: id.documento.fechaVigencia
              })
                .then(() => {
                  alert('documento editado');
                  router.push({ name: 'documento' })
                })
              },

              eliminarDoc({ commit, dispatch }, obj) {
              const user = firebase.auth().currentUser
              db.collection(user.email).doc(obj.id).collection('documento').doc(obj.id2).delete()
                .then(() => {
                  alert("Documento Eliminado")
                  router.push({ name: 'trabajo' })
                })
              },
//BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO
//BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO
//BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO

              addPago({ commit }, { id, id2,id3,id4,concepto, importe, nombre, beneficiario, BRFC, tipoPago, fechaCreacion, fechaMaxima,
                     fechaTermino, autorizacion, vigencia, status }) {
                  const user = firebase.auth().currentUser

                  db.collection(user.email).doc(id).collection('clientes').doc(id2).collection('sucursales').doc(id3).collection('trabajos').doc(id4).collection('pagos').add({
                    concepto: concepto,
                    importe: importe,
                    nombre: nombre,
                    beneficiario: beneficiario,
                    BRFC: BRFC,
                    tipoPago: tipoPago,
                    fechaCreacion: fechaCreacion,
                    fechaMaxima: fechaMaxima,
                    fechaTermino: fechaTermino,
                    autorizacion: autorizacion,
                    vigencia: vigencia,
                    status:status
                  })
                    .then(() => {
                      alert("Pago Asignado :D")
                      router.push({ name: 'pago' })

                    })
              },

              getPagos({commit}, {id,id2,id3,id4}){

              const user = firebase.auth().currentUser
              const pagos = []
              db.collection(user.email).doc(id).collection('clientes').doc(id2).collection('sucursales').doc(id3).collection('trabajos').doc(id4).collection('pagos').get()
                .then(snapshot => {
                  snapshot.forEach(doc =>{
                   let pago = doc.data();
                   pago.idPago = doc.id
                   pagos.push(pago)

                  })
                  commit('setPagos', pagos)
                })
              },


              getPago({commit},{id,id2,id3,id4,id5}){
              const user = firebase.auth().currentUser
              db.collection(user.email).doc(id).collection('clientes').doc(id2).collection('sucursales').doc(id3).collection('trabajos').doc(id4).collection('pagos').doc(id5).get()
              .then(doc => {

                let pago = doc.data();
                pago.idPago = doc.id
                commit('setPago', pago)
              })
              },

              editarPago({ commit }, {id:id, id2:id2, id3:id3,pago}) {
              const user = firebase.auth().currentUser
              db.collection(user.email).doc(id).collection('sucursal').doc(id2).collection('pago').doc(id3).update({
                concepto: pago.concepto,
                importe: pago.importe,
                nombre: pago.nombre,
                beneficiario: pago.beneficiario,
                BRFC: pago.BRFC,
                tipoPago: pago.tipoPago,
                fechaCreacion: pago.fechaCreacion,
                fechaMaxima: pago.fechaMaxima,
                fechaTermino: pago.fechaTermino,
                autorizacion: pago.autorizacion,
                vigencia: pago.vigencia,
                status:pago.status
              })
                .then(() => {
                  alert('pago editado');
                  router.push({ name: 'pago' })
                })
              },

              eliminarPago({commit,dispatch},obj){

              const user = firebase.auth().currentUser
              db.collection(user.email).doc(obj.id).collection('sucursal').doc(obj.id2).collection('pago').doc(obj.id3).delete()
              .then(()=>{
                alert("Pago Eliminado")
                router.push({name: 'sucursal'})
              })
              },

//BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO
//BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO
//BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO //BLOQUE PAGO


//BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE
//BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE
//BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE
//BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE
//es opcional
              addComprobante({ commit }, {id,id2,id3,id4,id5,nombre,concepto,monto,referencia,fechaCreacion,archivo}) {
                const user = firebase.auth().currentUser
                db.collection(user.email).doc(id).collection('clientes').doc(id2).collection('sucursales').doc(id3).collection('trabajos').doc(id4).collection('pagos').doc(id5).collection('comprobantes').add({
                  nombre:nombre,
                  concepto: concepto,
                  monto: monto,
                  referencia: referencia,
                  archivo: '',
                  fechaCreacion: fechaCreacion
                })
                  .then(() => {
                    alert("Comprobante Asignado")
                    router.push({ name: 'comprobante' })

                  })
              },//termina asignar pago

              getComprobantes({commit},{id,id2,id3,id4,id5}){
                    const user = firebase.auth().currentUser
                    const comprobantes = []
                    db.collection(user.email).doc(id).collection('clientes').doc(id2).collection('sucursales').doc(id3).collection('trabajos').doc(id4).collection('pagos').doc(id5).collection('comprobantes').get()
                    .then(snapshot => {
                          snapshot.forEach(doc => {

                                let comprobante = doc.data();
                                comprobante.idComprobante = doc.id
                                comprobantes.push(comprobante)
                          })
                          commit('setComprobantes',comprobantes)
                  })
              },

              getComprobante({commit},{id, id2, id3,id4,id5,id6}){
                const user = firebase.auth().currentUser

                db.collection(user.email).doc(id).collection('clientes').doc(id2).collection('sucursales').doc(id3).collection('trabajos').doc(id4).collection('pagos').doc(id5).collection('comprobantes').doc(id6).get()
                .then(doc => {
                  console.log(doc.id);
                  console.log(doc.data());
                  let comprobante = doc.data();
                  comprobante.idComprobante = doc.id
                  commit('setComprobante', comprobante)
                })
              },

              editarComprobante({commit},{id:id,id2:id2,id3:id3,id4:id4,comprobante}){

                const user = firebase.auth().currentUser
                db.collection(user.email).doc(id).collection('sucursal').doc(id2).collection('pago').doc(id3).collection('comprobante').doc(id4).update({
                  nombre : comprobante.nombre,
                  concepto: comprobante.concepto,
                  monto: comprobante.monto,
                  referencia: comprobante.referencia,
                  fechaCreacion: comprobante.fechaCreacion
                })
                .then(() => {
                  console.log('comprobante editado');
                  router.push({
                    name: 'comprobante'
                  })
                })
              },

              eliminarComprobante({commit,dispatch},obj) {
                const user = firebase.auth().currentUser
                db.collection(user.email).doc(obj.id).collection('sucursal').doc(obj.id2).collection('pago').doc(obj.id3).collection('comprobante').doc(obj.id4).delete()
                .then(() => {
                    alert("Comprobante Eliminado");
                    router.push({name: 'pago'})
                  }).then(()=>{

                })
              },

//BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE
//BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE
//BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE
//BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE //BLOQUE COMPROBANTE

//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA
//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA
//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA
//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA
//ES OBLIGATORIA

    addFactura({ commit }, {id,id2,id3,id4,id5,id6,nombre,concepto,monto,referencia,fechaCreacion,archivo}) {
    const user = firebase.auth().currentUser
    db.collection(user.email).doc(id).collection('clientes').doc(id2).collection('sucursales').doc(id3).collection('trabajos').doc(id4).collection('pagos').doc(id5).collection('comprobantes').doc(id6).collection('facturas').add({
      nombre:nombre,
      concepto: concepto,
      monto: monto,
      referencia: referencia,
      archivo: '',
      fechaCreacion: fechaCreacion
    })
      .then(() => {
        alert("Comprobante Asignado")
        router.push({ name: 'comprobante' })
      })
    },//termina asignar pago










//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA
//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA
//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA
//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA//BLOQUE FACTURA


//BLOQUE FUNCIONAL BLOQUE FUNCIONAL BLOQUE FUNCIONAL BLOQUE FUNCIONAL BLOQUE FUNCIONAL BLOQUE FUNCIONAL BLOQUE FUNCIONAL BLOQUE FUNCIONAL


},//termina actions
    getters:{
      existeUsuario(state){
        if(state.usuario === null || state.usuario===''|| state.usuario=== undefined || state.usuario.password ===''){
          return false
        }
        else{
          return true
        }
      }

    }
}
)
