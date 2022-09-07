<template>

    <div class="header-container">
     
        <header class="header">
            <button class="sidebar-button" id="sidebarButton">

                <span class="material-icons-outlined"><i class="fas fa-bars"></i></span>
            </button>
            <div v-if="trash == true">
                <button @click="emptyTrash" >Empty Trash Now</button>
            </div>
            <form v-if="home == true" @submit.prevent="search()" class="input-search">
                <input type="text" v-model="noteToSearch" name="search" id="note-name" placeholder="Search your notes"
                    style="font-family:Arial, FontAwesome"  required>
                <button type="submit">
                    <span class="material-icons-outlined"><i class="fas fa-arrow-right"></i></span>
                </button>
            </form>

            <div class="right-component">
                <div class="profile-image" id="profileImage">
                         <img v-if="!user.image" src="../assets/img/profile.png" alt="Undisplayable image" class="dropdown-user-img">
                    
                         <img v-else :src="url+'api/auth/get-avatar/'+user.image" alt="Undisplayable image" class="dropdown-user-img" >
                </div>
            </div>
        </header>

        <div class="dropdown" id="profileInfo">
            <div class="user-data">
                <routerLink to="/profile" class="user-image">
                    <img v-if="!user.image" src="../assets/img/profile.png" alt="Undisplayable image" >
                    <img v-else :src="url+'api/auth/get-avatar/'+user.image" alt="Undisplayable image"  >

                    <button class="material-icons-outlined icon-camera"><i class="fas fa-pencil-alt"></i></button>
                </routerLink>

                <h2 class="username">{{user.fullname}}</h2>
                <span class="email">{{user.email}}</span>
            </div>

            <div class="user-options">
                <router-link to="/profile"><span class="material-icons-round"><i class="fas fa-user-circle"></i></span>
                    Profile</router-link>

                <a href="#" @click="logout()"><span class="material-icons-outlined"><i
                            class="fas fa-sign-out-alt"></i></span> Log out</a>
            </div>

            <span id="profileClose" class="material-icons-outlined close-bttn"><i class="fas fa-times"></i></span>
        </div>

    </div>

</template>


<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import global from '../global';
    export default{
        name: 'HeaderHomeComponent',
        props: ['user','trash','home'],
        data(){
            return {
                url : global.url,
                noteToSearch: ''
            }
        },
        methods:{
            logout(){
            axios.post(global.url+'api/auth/logout').then(
                () => {
                    localStorage.removeItem('token')
                    this.$router.push({ name: 'login'})
                }   
            )
            },
            homeR(){
            this.$router.push('/home'); 
            },
            emptyTrash(){
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                    if (result.isConfirmed) {
                        const token = localStorage.getItem('token');
                        let headers = {
                        'Authorization' : 'Bearer '+token
                        }
                        axios.delete(global.url+'api/delete-all',{headers: headers})
                            .then(response =>{
                                    console.log(response);
                                    this.homeR();
                                    Swal.fire(
                                    'Deleted!',
                                    'Your notes have been deleted.',
                                    'success'
                                    )
                                
                            })
                            .catch(error => {
                            console.log(error);
                            });
                     
                }
            })  
            },
            search(){
                window.location.href = '/search/'+this.noteToSearch;
            }
        },
        mounted(){
            const menu = document.getElementById('menu');
            const profileInfo = document.getElementById('profileInfo');
            document.getElementById('sidebarButton').addEventListener('click',()=>{
            menu.classList.add('active');
            });


            document.getElementById('overlay').addEventListener('click',()=>{
            menu.classList.remove('active');
            });

            document.getElementById('bttn-close').addEventListener('click',()=>{
            menu.classList.remove('active');
            });

            document.getElementById('profileImage').addEventListener('click', ()=>{
            profileInfo.classList.toggle('active');
            });
            document.getElementById('profileClose').addEventListener('click', ()=>{
            profileInfo.classList.remove('active');
            });

        },
     

    }
</script>