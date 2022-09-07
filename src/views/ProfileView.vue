<template>
    <div>
       
          <header class="header-note">
          <div class="container">
            <router-link to="/home" class="material-icons-outlined icons" ><i class="fas fa-arrow-left"></i></router-link>
          <h2 class="profile-title">Settings:</h2>
          </div>
     </header>

     <div class="container">
          <form @submit.prevent="updateUser()" class="profile-form" method="POST" enctype="multipart/form-data">
           <div class="input-container-image">
               <label class="profile-image" for="file">
                    <figure v-if="!user.image">
                         <img src="../assets/img/profile.png" alt="Undisplayable image" id="picture">
                    </figure>
                    <figure v-else>
                         <img :src="url+'api/auth/get-avatar/'+user.image" alt="Undisplayable image" id="picture">
                    </figure>

                    <span class="material-icons-outlined icons edit"><i class="fas fa-pencil-alt"></i></span>
               </label>
               <input type="file"  ref="file" name="image_profile" @change="fileChange()" id="file" accept="image/*">
          </div>

          <div class="input-container">
               <label for="name">Name:</label>
               <span class="material-icons-round icon"><i class="fas fa-user-circle"></i></span> 
               <input type="text" name="name" id="name" v-model="user.fullname">
          </div>

          <div class="input-container">
               <label for="email">Email:</label>
               <span class="material-icons icon"><i class="fas fa-envelope"></i></span>
               <input type="text" name="email" id="email" v-model="user.email">
          </div>

          <div class="input-container">
               <label for="current-password">[Optional] Current Password:</label>
               <span class="material-icons icon"><i class="fas fa-lock"></i></span>
               <input type="password" name="current-password" id="current-password" v-model="user.oldPassword">
          </div>

          <div class="input-container">
               <label for="new-password">[Optional] New Password:</label>
               <span class="material-icons icon"><i class="fas fa-lock"></i></span>
               <input type="password" name="new-password" id="new-password"  v-model="user.newPassword">
          </div>

          <div class="input-container">
               <input type="submit" value="Save">
          </div>
     </form>
     </div>
    </div>
</template>

<script>
import auth from '../middlewares/auth';
import axios from 'axios';
import global from '../global';
import Swal from 'sweetalert2';

export default {
    name: 'ProfileView',
    data(){
     return {
          user:'',
          url: global.url
     }
    },
    mounted(){
     auth();
    this.getUserAuth();


    },
    methods: {
     getUserAuth(){

          const token = localStorage.getItem('token');
               let headers = {
               'Authorization' : 'Bearer '+token
               }
               axios.get(global.url+'api/auth/me',{headers: headers})

                    .then(response =>{
                    if(response.data){
                         this.user = response.data
                    }
                    })
                    
                    .catch(error => {
                    console.log(error);
               });

     },
     updateUser(){
          
        const form = new FormData();
          form.append("image", this.user.image);
          if(this.user.oldPassword){

               form.append('oldPassword', this.user.oldPassword);
          }
          form.append('newPassword', this.user.newPassword);
          form.append('fullname', this.user.fullname);
          form.append('email', this.user.email);
        //  form.append('e', this.color);
        
           const token = localStorage.getItem('token');
           let headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization' : 'Bearer '+token
           }

           if(this.user.oldPassword == undefined && this.user.newPassword){
               Swal.fire({
                        icon: 'error',
                        title: 'Update User Failed',
                        text: 'Old Password Invalid'
           });
          }

           else if(this.user.newPassword == undefined && this.user.oldPassword){
               Swal.fire({
                        icon: 'error',
                        title: 'Update User Failed',
                        text: 'New Password Invalid'
               });
           }
           else{

                axios.post(global.url+'api/auth/update',form,{headers: headers}).
                then(res => {
                   console.log(res)
                if(res.status == 201){
                   Swal.fire({
                            icon: 'success',
                            title: 'Successfully UPDATED',
                            })
                }
                else if(res.data.code == 400){
                    console.log(res);
                   Swal.fire({
                            icon: 'error',
                            title: 'Update User Failed',
                            })     
                   }
                }).
                catch(error => {
                    console.log(error);
                   Swal.fire({
                            icon: 'error',
                            title: 'Update User Failed',
                            text: error.response.data.message,
                   })  
                }); 
           }
     },
     fileChange(){
        this.user.image =  this.$refs.file.files[0];    
          let reader= new FileReader();
          reader.onload = e => document.getElementById("picture").setAttribute('src', e.target.result);
          reader.readAsDataURL(this.user.image);

      },
    }
}
</script>