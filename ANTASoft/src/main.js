import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//variable que requiere firebase
var firebase = require("firebase/app");

require("firebase/firestore");
require("firebase/auth");
require("firebase/storage");

var config = {
  apiKey: "AIzaSyADnjbXpbLfR86vQ8bXQiHPcUJwRP9pzHg",
  authDomain: "consultsoft-69aee.firebaseapp.com",
  databaseURL: "https://consultsoft-69aee.firebaseio.com",
  projectId: "consultsoft-69aee",
  storageBucket: "consultsoft-69aee.appspot.com",
  messagingSenderId: "1021121470694",
  appId: "1:1021121470694:web:cc362b22af5fd960"
};
// Initialize Firebase
const UsaFirebase = firebase.initializeApp(config);

export default UsaFirebase.firestore();
const storage = firebase.storage();
const db = firebase.firestore();



export { storage, db };

import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged(user => {
  console.log(user);

  if (user) {
    store.dispatch("detectarUsuario", { email: user.email, uid: user.uid });
  } else {
    store.dispatch("detectarUsuario", null);
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
