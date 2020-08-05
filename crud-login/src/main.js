import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from "axios"

import firebase from "firebase/app"
import "firebase/firestore"


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBB---LlK3PKkvM9IkN1tfZhe2uOn-ce4g",
    authDomain: "pokeapi-3518c.firebaseapp.com",
    databaseURL: "https://pokeapi-3518c.firebaseio.com",
    projectId: "pokeapi-3518c",
    storageBucket: "pokeapi-3518c.appspot.com",
    messagingSenderId: "1090419682059",
    appId: "1:1090419682059:web:0d882cc01e87c0ae05500e"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

Vue.prototype.$axios=axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
