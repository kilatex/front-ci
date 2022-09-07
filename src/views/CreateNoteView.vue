<template>
    <div>
        <header class="header-note">
            <div class="container">


                <button @click="home()" class="material-icons-outlined icons"><i class="fas fa-arrow-left"></i>
                </button>

                <form  @submit.prevent="note()" id="note-form">
                    <div class="options">
                        <button class=" button-icon" type="submit"><span class="material-icons-outlined"><i class="fas fa-save"></i></span>
                            Save</button>
                        <button @click="colorsOption()" class="material-icons-outlined icons dropdown-menu-colors"
                            type="button"><i class="fas fa-palette"></i></button>
                        <button class="material-icons-outlined icons dropdown-menu-options"
                            type="button"><i class="fas fa-ellipsis-v"></i></button>
                    </div>

                    <div id="colorsOption" class="dropdown-colors  dropdown-editor">
                        <input @click="changeColor('#f3f3f3')" type="radio" name="background-color" id="#f3f3f3">
                        <label for="#f3f3f3" class="color-label material-icons-outlined active"
                            style="background: #f3f3f3;" data-color="#f3f3f3"><i class="fas fa-tint-slash"></i></label>
                        <input type="radio"  @click="changeColor('#f28b82')" id="#f28b82"  name="background-color" >
                        <label for="#f28b82" class="color-label" style="background: #f28b82;"
                            data-color="#f28b82"></label>
                        <input type="radio" @click="changeColor('#fbbc04')" id="#fbbc04" name="background-color">
                        <label for="#fbbc04" class="color-label" style="background: #fbbc04;"
                            data-color="#fbbc04"></label>
                        <input type="radio"   @click="changeColor('#fff475')" name="background-color" id="#fff475">
                        <label for="#fff475" class="color-label" style="background: #fff475;"
                            data-color="#fff475"></label>
                        <input type="radio"  @click="changeColor('#ccff90')" name="background-color" id="#ccff90" >
                        <label for="#ccff90" class="color-label" style="background: #ccff90;"
                            data-color="#ccff90"></label>
                        <input type="radio"  @click="changeColor('#97ffeb')" name="background-color" id="#97ffeb">
                        <label for="#97ffeb" class="color-label" style="background: #97ffeb;"
                            data-color="#97ffeb"></label>
                        <input type="radio" @click="changeColor('#cbf0f8')" name="background-color" id="#cbf0f8" >
                        <label for="#cbf0f8" class="color-label" style="background: #cbf0f8;"
                            data-color="#cbf0f8"></label>
                        <input type="radio"  @click="changeColor('#aecbfa')" name="background-color" id="#aecbfa" >
                        <label for="#aecbfa" class="color-label" style="background: #aecbfa;"
                            data-color="#aecbfa"></label>
                        <input type="radio" @click="changeColor('#d7aefb')"  name="background-color" id="#d7aefb" >
                        <label for="#d7aefb" class="color-label" style="background: #d7aefb;"
                            data-color="#d7aefb"></label>
                        <input type="radio" @click="changeColor('#fdcfe8')" name="background-color" id="#fdcfe8">
                        <label for="#fdcfe8" class="color-label" style="background: #fdcfe8;"
                            data-color="#fdcfe8"></label>
                        <input type="radio"  @click="changeColor('#e6c998')" name="background-color" id="#e6c998" >
                        <label for="#e6c998" class="color-label" style="background: #e6c998;"
                            data-color="#e6c998"></label>
                        <input type="radio"  @click="changeColor('#e8eaed')" name="background-color" id="#e8eaed">
                        <label for="#e8eaed"  class="color-label" style="background: #e8eaed;"
                            data-color="#e8eaed"></label>
                    </div>
                </form>

            </div>
        </header>
        <div class="container  ">

            <input type="text" name="title" v-model="title" placeholder="Title" class="title-input" id="title-input">
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
        <AddLabelComponent></AddLabelComponent>
    </div>
</template>

<script>

import '@vueup/vue-quill/dist/vue-quill.snow.css';
import axios from 'axios';
import { QuillEditor } from '@vueup/vue-quill'; 
import global from '../global';
import Swal from 'sweetalert2';
import AddLabelComponent from '../components/AddLabelComponent.vue';

export default {
    name: 'CreateNoteView',

    data() {
        return {
            title: '',
            html:'',
            string:'',
            color: '#f3f3f3',
            messi: '',
            noteId: '',
            labels: '',
            idNote : this.$route.params.id
        }
    },
    components: {
        QuillEditor,
        AddLabelComponent
    },
    mounted(){
        this.getNote();
        this.getLabelsNote();
    },
    methods: {
        createNote(){
            this.html = document.querySelector('#editor .ql-editor').innerHTML;
        this.string = document.querySelector('#editor .ql-editor').textContent;

          const form = new FormData();


          form.append('html', this.html);
          form.append('title', this.title);
          form.append('string', this.string);
          form.append('color', this.color);
        
           const token = localStorage.getItem('token');
           let headers = {
            'Authorization' : 'Bearer '+token
           }



            axios.post(global.url+'api/note',form,{headers: headers}).

            then(res => {
            if(res.status == 200){
                this.home();
                Swal.fire({
                        icon: 'success',
                        title: 'Successfully Created',
                        })
            }
            else if(res.data.code == 400){
                this.message = res.data.message
            }
            }).
            catch(error => {
            console.log(error);
            }); 
        },
        note(){
            if(this.$route.params.id){
                this.updateNote();
            }
            else{
                this.createNote();
            }
        },
        changeColor(color){
            this.color = color;
            document.getElementById('body').style.backgroundColor = this.color;
        },
        home(){
            document.getElementById('body').style.backgroundColor = '#f3f3f3';
            this.$router.push('/home'); 
        },
        colorsOption(){
            document.querySelector('#colorsOption').classList.toggle('active');
        },
        getNote(){
            if(this.$route.params.id){

                const token = localStorage.getItem('token');
                let headers = {
                  'Authorization' : 'Bearer '+token
                }
                axios.get(global.url+'api/note/'+this.idNote,{headers: headers})
                     .then(response =>{
                        if(response.data){
                            this.html = document.querySelector('#editor .ql-editor').innerHTML = response.data.html;
                            this.title =  response.data.title;
                            this.noteId = response.data.id
                            this.changeColor(response.data.color);
                        }
                     })
                    .catch(error => {
                      console.log(error);
                    }); 
            }
        },
        updateNote(){
        this.html = document.querySelector('#editor .ql-editor').innerHTML;
        this.string = document.querySelector('#editor .ql-editor').textContent;
        const id = this.$route.params.id;
        const form = new FormData();

          form.append('html', this.html);
          form.append('title', this.title);
          form.append('string', this.string);
          form.append('color', this.color);
        
           const token = localStorage.getItem('token');
           let headers = {
            'Authorization' : 'Bearer '+token
           }



            axios.post(global.url+'api/note/'+id,form,{headers: headers}).

            then(res => {
            if(res.status == 200){
                this.home();
                Swal.fire({
                        icon: 'success',
                        title: 'Successfully UPDATED',
                        })
            }
            else if(res.data.code == 400){
                this.message = res.data.message
            }
            }).
            catch(error => {
            console.log(error);
            }); 
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
        }
    }
}
</script>
