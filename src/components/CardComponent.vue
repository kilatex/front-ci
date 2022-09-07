<template>

<section v-if="notes.length >= 1" class="notes-section row" id="notes-section">
    <div   v-for="note in notes" v-bind:key="note" class="card-container my-2 col-sm-4 ">

        <div>

            <div class="card" :style="{background: note.color}">
       
                    <router-link :to="'/note/'+note.id">
                        <h3>{{note.title}}</h3>
                      <div class="content">
                            {{note.string}}
                      </div>
                      
                    </router-link>
               
                 
                 <div class="tags-container">
                </div>
       
                 
                 <div class="icons">
                       
                      <a href="http://agile-meadow-39302.herokuapp.com/notes/22">
                           <span class="material-icons-outlined"><i class="fas fa-arrow-right"></i></span>
                      </a>
                      <div class="options">
                           <button @click="openOptions(note.id)" class="material-icons-outlined dropdown-menu-bttn"><i class="fas fa-ellipsis-v"></i></button>
                        </div>
                    </div>
                </div>
                <card-options-component :typeNotes="typeNotes" :note_id="note.id" :id="'options_'+note.id"></card-options-component>
       
       
        </div>
    </div>
   
          
</section>

</template>

<script>
import CardOptionsComponent from './CardOptionsComponent.vue';
import axios from 'axios';
 import global from '../global';

export default {
    name: 'CardComponent',
    components: {
    CardOptionsComponent,
    },
    data() {
        return {
            notes: '',
            typeNotes: ''
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
        else{
            url = global.url+'api/note';
            this.typeNotes = "home";
        }
      const token = localStorage.getItem('token');
            let headers = {

              'Authorization' : 'Bearer '+token
            }
            axios.get(url,{headers: headers})
                 .then(response =>{
                    if(response.data){
                        console.log(response);
                        this.notes = response.data
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
    }

    
    },
   
}
</script>

<style>
</style>