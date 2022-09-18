<template>
    <div>
        <CreateNoteHeader :noteToUpload="noteJson"></CreateNoteHeader>
        <div class="container  ">

            <input type="text" name="title" v-model="noteJson.title" placeholder="Title" class="title-input" id="title-input">
            <div class="editor-container">
                <quill-editor id="editor" ></quill-editor>
            </div>
            <div v-if="labels" class="label-container">
                    <h3>Labels:</h3>
                    <span  v-for="label in labels" v-bind:key="label" >
                        <button class="label">{{label.label.content}}</button>
                    </span>
                    <button class="material-icons-outlined add-bttn" id="add-bttn" data-toggle="modal" data-target="#addLabelComponent"> <i class="fas fa-plus"></i></button>
            </div>

        </div>
        <AddLabelComponent @emitNewLabels="newLabels"></AddLabelComponent>
    </div>
</template>

<script>

import '@vueup/vue-quill/dist/vue-quill.snow.css';
import axios from 'axios';
import { QuillEditor } from '@vueup/vue-quill'; 
// import Swal from 'sweetalert2';
import AddLabelComponent from '../components/AddLabelComponent.vue';
import CreateNoteHeader from '@/components/CreateNoteHeader.vue';
import global from '../global';


export default {
    name: 'CreateNoteView',

    data() {
        return {
            noteJson: {
                color: '#f3f3f3',
                html : '',
                string: '',
                title: '',
            },
            noteId: '',
            labels: '',
            idNote : this.$route.params.id
        }
    },
    components: {
    QuillEditor,
    AddLabelComponent,
    CreateNoteHeader
    },
    mounted(){
        this.getNote();
        this.getLabelsNote();
    },

    methods: {
        getNote(){
            if(this.$route.params.id){

                const token = localStorage.getItem('token');
                let headers = {
                  'Authorization' : 'Bearer '+token
                }
                axios.get(global.url+'api/note/'+this.idNote,{headers: headers})
                     .then(response =>{
                        if(response.data){
                            this.noteJson.html = document.querySelector('#editor .ql-editor').innerHTML = response.data.html;
                            this.noteJson.title =  response.data.title;
                            this.noteId = response.data.id
                            this.changeColor(response.data.color);
                        }
                     })
                    .catch(error => {
                      console.log(error);
                    }); 
            }
        },

        getLabelsNote(){
            
            const token = localStorage.getItem('token');
                let headers = {
                  'Authorization' : 'Bearer '+token
                }
                axios.get(global.url+'api/labels-by-note/'+this.idNote,{headers: headers})
                     .then(response =>{
                        if(response.data.labelsNote){
                            this.labels = response.data.labelsNote;
                        }
                     })
                    .catch(error => {
                      console.log(error);
                    }); 
        },

        newLabels(){
            this.getLabelsNote();
        },
        
        changeColor(color){            
            this.noteJson.color = color;
            document.getElementById('body').style.backgroundColor = this.noteJson.color;
        },


    }
}
</script>
