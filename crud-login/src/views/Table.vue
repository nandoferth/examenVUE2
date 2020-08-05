<template>
    <v-container>
            <v-data-table
            :headers="haeders"
            :items="pokemons"
            > 
                <template v-slot:top>
                    <v-toolbar color="info">
                        <v-toolbar-title>NameUser</v-toolbar-title>
                        <v-spacer/>
                        <v-dialog v-model="dialog" max-width="50%">
                            <template v-slot:activator="{ on, attrs}"> 
                                <v-btn color="white" v-bind="attrs" v-on="on" > Add Pokemon </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    Form Tag
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6">
                                                <v-text-field label="Name" v-model="pokemons_edit.name"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-text-field lable="URL" background-color="amber ligthen-4" v-model="pokemons_edit.url"></v-text-field>
                                            </v-col> 
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer/>
                                    <v-btn colr="info" @click.stop="cancel"> Cancel</v-btn>
                                    <v-btn color="green" @click.stop="save"> Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>

                </template>
                
                <template v-slot:item.actions="{item}">
                    <v-spacer/>
                    <v-icon @click="editPoket(item)"> mdi-pencil</v-icon>
                    <v-icon @click="deletePoket(item)"> mdi-delete</v-icon>
                </template>
            </v-data-table>
    </v-container>
</template>

<script>
import {db} from '../main'
export default {
    data: ()=>({
        dialog:false,
        pokemons_idex:-1,
        haeders:[
            {text:'#id', value:'id'},
            {text:'Name', value:'name'},
            {text:'URL', value:'url'},
            {text:'Actions', value:'actions'}
        ],
        pokemons:[
            {id:'73', name:'f', url:'ff/dd', entrenador:'Fernando'},
        ],
        pokemons_default:{
            id:null, name:'', url:'', entrenador:''
        },
        pokemons_edit:{
            id:null, name:'', url:'', entrenador:''
        }
    }),
    created(){
        this.getpokemons()
    },
    methods:{
        async getpokemons(){
            this.pokemons=[]
            try {
                const collectionofpokemon=await db.collection('pokemones').get()
                collectionofpokemon.forEach(doc=>{
                    const namepokemon=doc.data().name
                    const urlkemon=doc.data().url
                    const idpokemon=doc.id
                    const fromentrenador=''
                    //console.log()
                    this.pokemons.push({name:namepokemon,url:urlkemon, id:idpokemon, entrenador:fromentrenador })
                })
            } catch (error) {
                console.log(error)
            }
        },
        cancel(){
            this.dialog=false
            this.$nextTick( ()=>{
                this.pokemons_edit=Object.assign({}, this.pokemons_default)
                this.pokemons_idex=-1
            })
        },
        async edit_save_poket(pokemon){
            try {
                //console.log(pokemon)
                await db.collection('pokemones').doc(pokemon.id).set(pokemon)
            } catch (error) {
                console.log(error)
            }
        },
        async savepokemon(pokemon){
            try {
                await db.collection('pokemones').add(pokemon)
            } catch (error) {
                console.log(error)
            }
        }, 
        async editPoket(item){
            
            this.pokemons_idex=this.pokemons.indexOf(item)
            console.log(this.pokemons_idex)
            this.pokemons_edit=Object.assign({},item)
            this.dialog=true
        } ,
        save(){
            if(this.pokemons_idex>-1){
                Object.assign(this.pokemons[this.pokemons_idex],this.pokemons_edit)
                this.edit_save_poket(this.pokemons[this.pokemons_idex])
            }else{
                //console.log(this.pokemons_edit)
                this.pokemons.push(this.pokemons_edit)
                this.savepokemon(this.pokemons_edit)
                this.getpokemons()
            }
            this.cancel()
        },
        async deletePoket ( item){
            const index= this.pokemons.indexOf(item)
            console.log(confirm('Are you sure?') && this.pokemons.splice(index,1)) 
            try {
                await db.collection('pokemones').doc(item.id).delete()
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>