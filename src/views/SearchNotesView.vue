<template>
    <div>
  
      <div class="container">
        <HeaderHomeComponent :home="true" :user="user" ></HeaderHomeComponent>
  
      
      
  
          <card-component></card-component>
  
            <router-link to="/create" class="add-note-bttn" role="button"><i class="fas fa-plus"></i> </router-link>
        
      </div>
  
        <LateralMenuComponent></LateralMenuComponent>
    </div>
  </template>
  
  <script>
  
  import CardComponent from '@/components/CardComponent.vue';
  import HeaderHomeComponent from '@/components/HeaderHomeComponent.vue';
  import LateralMenuComponent from '@/components/LateralMenuComponent.vue';
  import auth from '../middlewares/auth';
  import axios from 'axios';
  import global from '../global';
  export default {
    name: 'SearchNotesView',
    data(){
      return{
        user: ''
      }
    },
    components:{
      CardComponent,
      HeaderHomeComponent,
      LateralMenuComponent,
  },
    mounted(){
      auth();
      this.getUserAuth();
    },
    methods:{
  
    
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
      
      }
    }
  </script>
  