<template>
    <div>
        <span v-if="loggedIn">Yes</span>
        <span v-else>No</span>
        <v-card dark>
            <v-app-bar>
                <v-toolbar-title>User</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="error" @click="out()" >Out</v-btn>
                <v-btn color="info" class="ma-2" @click="register()">Register</v-btn>
                <v-btn color="green" class="ma-2" @click="login()">Login</v-btn>
            </v-app-bar>
        </v-card>  
    </div>
</template>

<script>
import * as firebase from "firebase/app"
import "firebase/auth"
export default {
    data(){
        return{
            disables:false,
            loggedIn:false
        }
    },
    created(){
        firebase.auth().onAuthStateChanged(user=>{
            this.loggedIn=!!user
            //if(user){
            //    this.loggedIn=true
            //}else{
            //    ths.loggedIn=false
            //}
        })
    },
    methods:{
        async out(){
            try {
                const data = await firebase.auth().signOut();
                this.$router.replace({name:"Home"})
            } catch (error) {
                console.log(error)
            }
             
        },
        async register(){
            try {
                const data = await firebase.auth().signOut();
                this.$router.replace({name:"Register"})
            } catch (error) {
                console.log(error)
            }
             
        },
        async login(){
            try {
                const data = await firebase.auth().signOut();
                this.$router.replace({name:"Home"})
            } catch (error) {
                console.log(error)
            }
             
        }
    }
}
</script>