<template>

                <div class="dropdown" v-if="typeNotes == 'home'">
                        <form   @submit.prevent="deleteNote()">
                             <button type="submit" class="menu-item">Delete
                                Note</button>
                        </form>
                        
                        <router-link :to="'note/'+note_id" class="menu-item">Add Labels</router-link>
                        <button @click="copyNote()" class="menu-item">Make a
                            copy</button>
                </div>

                <div class="dropdown" v-else>
                        <form   @submit.prevent="forceDelete()">
                         <button type="submit" class="menu-item">Delete Note</button>
                        </form>
                        <form   @submit.prevent="restoreNote()">
                         <button type="submit" class="menu-item">Restore Note</button>
                        </form>
    
                </div>
                

           
            
</template>


<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import global from '../global';
    export default{
       name :  'CardOptionsComponent',
       props: ['note_id','typeNotes'],
       mounted(){
        },
       methods: {
        deleteNote(){
            const token = localStorage.getItem('token');
            let headers = {
            'Authorization' : 'Bearer '+token
            }    
            axios.delete(global.url+'api/note/'+this.note_id,{headers: headers})
                .then(response =>{
                    if(response.data){
                        this.$router.push('/trash'); 
                        Swal.fire({
                                icon: 'success',
                                title: 'Note Sent to Trash',
                        })
                    }
                })
                .catch(error => {
                console.log(error);
                });
        },
        home(){
            this.$router.push('/home'); 
        },
        forceDelete(){
            const token = localStorage.getItem('token');
            let headers = {
            'Authorization' : 'Bearer '+token
            }    
            axios.delete(global.url+'api/force-delete/'+this.note_id,{headers: headers})
                .then(response =>{
                    if(response.data){
                        this.$router.push('/home'); 
                        Swal.fire({
                                icon: 'success',
                                title: 'Note Deleted',
                        })
                    }
                })
                .catch(error => {
                console.log(error);
                });
        },
        restoreNote(){

            const token = localStorage.getItem('token');
            let headers = {
            'Authorization' : 'Bearer '+token
            }    
            axios.get(global.url+'api/restore/'+this.note_id,{headers: headers})
                .then(response =>{
                    if(response.data){
                        this.$router.push('/home'); 
                        Swal.fire({
                                icon: 'success',
                                title: 'Note Restored',
                        })
                    }
                })
                .catch(error => {
                console.log(error);
                });
        },
        copyNote(){
            const token = localStorage.getItem('token');
            let headers = {
            'Authorization' : 'Bearer '+token
            }    
            axios.get(global.url+'api/copy/'+this.note_id,{headers: headers})
                .then(response =>{
                    if(response.data){
                        Swal.fire({
                                icon: 'success',
                                title: 'Note Copied',
                        });
                        this.emitNewNote();
                    }
                })
                .catch(error => {
                console.log(error);
                });
        },
        emitNewNote(){
            this.$emit('emitNewNote', true);
        }
        }
    }
   
</script>