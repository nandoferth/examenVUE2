<template>
<div>
    <div v-if="error" class="error">{{error.message}}</div>
    <v-form @submit.prevent="pressed">
        <div class="email">
            <v-container>
                <v-card>
                    <v-card-title>Register</v-card-title>
                    <v-card-text>
                    <v-row>
                        <v-col> 
                            <v-text-field type="email" v-model="email" label="email"> </v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field type="password" v-model="password" label="password"> </v-text-field>
                        </v-col>
                    </v-row>
                    
                    </v-card-text>
                    <v-card-actions>
                        <v-btn type="submit"> Submit</v-btn >
                    </v-card-actions>
                </v-card>
            </v-container>
        </div>
    </v-form>
</div>
</template>
    
<script>
import * as firebase from "firebase/app"
import "firebase/auth";
export default {
    data(){
        return{
            email:"",
            password:'',
            error:''
        }
    },
    methods:{
        async pressed(){
            try {
                const user =  firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                this.$router.replace({name:"Table"})

            } catch (error) {
                
            }
        }
    }
    
}
</script>