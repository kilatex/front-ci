<template>

<section v-if="notes.length >= 1 " class="notes-section row" id="notes-section">
    <div v-for="note in notes" v-bind:key="note" class="card-container my-2 col-sm-4 ">

        <div>

            <div class="card" :style="{background: note.color}">
                
                <router-link v-if="this.$route.path == '/trash'" to="#" @click="trash(note.id)">
                    <h3>{{note.title}}</h3>
                  <div class="content">
                        {{note.string}}
                  </div>
                  
                </router-link >

                <router-link v-else :to="'/note/'+note.id">
                    <h3>{{note.title}}</h3>
                  <div class="content">
                        {{note.string}}
                  </div>
                  
                </router-link>

                
                 
                    <div v-if="note.labels && note.labels.length >= 1"  class="tags-container">
                        <span v-for="label in note.labels" v-bind:key="label">
                            <router-link to="/" class="label">{{label.content}}</router-link>
                        </span>
                    </div>
       
                 
                 <div class="icons">
                
                    <div v-if="this.$route.path == '/trash'" > 
                          <span class="material-icons-outlined"> <i class="fas fa-trash-restore"></i></span>
                    </div>

                    <router-link v-else :to="'/note/'+note.id">
                        <span class="material-icons-outlined"><i class="fas fa-arrow-right"></i></span>
                    </router-link>

                      <div class="options">
                           <button @click="openOptions(note.id)" class="material-icons-outlined dropdown-menu-bttn"><i class="fas fa-ellipsis-v"></i></button>
                        </div>
                    </div>
                </div>
                <card-options-component :typeNotes="typeNotes" :note_id="note.id" :id="'options_'+note.id"></card-options-component>
       
       
        </div>
    </div>
   
          
</section>

<section v-else-if="notes.length == 0">
    <h2>There are no notes</h2>
</section>

</template>

<script>
import CardOptionsComponent from './CardOptionsComponent.vue';
import axios from 'axios';
 import global from '../global';
import Swal from 'sweetalert2';

export default {
    name: 'CardComponent',
    components: {
    CardOptionsComponent,
    },
    data() {
        return {
            notes: '',
            typeNotes: '',
            token: localStorage.getItem('token')
        }
    },
    mounted(){
        this.getNotes();
    },
    methods:{
    openOptions(id){
        document.getElementById('options_'+id).classList.toggle('active');
    },       
    getNotes(){
        let url;
        if(this.$route.path == "/trash"){
            url = global.url+'api/trash';
            this.typeNotes = "trash";
        }
         if (this.$route.path == "/home"){
            url = global.url+'api/note';
            this.typeNotes = "home";
        }
         if (this.$route.path == "/label/"+this.$route.params.id){
            this.getNotesByLabel();

        }
         if (this.$route.path == "/search/"+this.$route.params.text){
            url = global.url+'api/note-search/'+this.$route.params.text;
             this.typeNotes = "home";
        }

            let headers = {

              'Authorization' : 'Bearer '+this.token
            }
            axios.get(url,{headers: headers})
                 .then(response =>{
                    if(response.data){
                        this.notes = response.data;
                    }
                 })
                .catch(error => {

                  console.log(error);
                });
    },
    cardOptions(){
        document.getElementById('cardOptions').classList.toggle('active');
    },
    contentNote(html){
            const content = html;
            return content;
    },
     getNotesByLabel(){

        const url = global.url+'api/notes-by-label/'+this.$route.params.id;
        this.typeNotes = "home";


        let headers = {
        'Authorization' : 'Bearer '+this.token
        }

        axios.get(url,{headers: headers})
        .then(response =>{
            if(response.data){
                this.notes = response.data[0].notes;
            }
        })
       

    },
    trash(id){
        Swal.fire({
            title: 'To see this note you need to restore it',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Restore',
            denyButtonText: `Don't Restore`,
            }).then((result) => {
            if (result.isConfirmed) {
               this.restoreNote(id);
            } else if (result.isDenied) {
                Swal.fire('NOT RESTORED', '', 'info')
            }
            })
    },
    restoreNote(id){

        let headers = {
        'Authorization' : 'Bearer '+this.token
        }
        axios.get(global.url+'api/restore/'+id,{headers: headers})
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
    },
   
}
</script>

<style>
</style>