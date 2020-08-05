<template>
<div>
<v-form @submit.prevent="pressed">
    <div class="login">
    <v-container>
        <v-card>
            <v-card-title>Login</v-card-title>
            <v-card-text>
            <v-row>
                <v-col> 
                    <v-text-field type="email" label="email" v-model="email"> </v-text-field>
                </v-col>
                <v-col>
                    <v-text-field type="password" label="password" v-model="password"> </v-text-field>
                </v-col>
            </v-row>
            
            </v-card-text>
            <v-card-actions>
                <v-btn type="submit" > login</v-btn >
            </v-card-actions>
        </v-card>
    </v-container>
    </div>
</v-form>
<div class="error" v-if="error">{{error.message}}
    <span><router-link to='/register'>register</router-link></span>
</div>
</div>
</template>
<script>
import * as firebase from "firebase/app"
import "firebase/auth";
export default {
    name: 'Login',
    data(){
        return{
            email:'',
            password:'',
            error:''
        }
    },
    methods:{
        async pressed(){
            try {
                const val = firebase.auth().signInWithEmailAndPassword(this.email,this.password)
                this.$router.replace({name:"Table"})
            } catch (error) {
                
            }
        }
    }
}
</script>