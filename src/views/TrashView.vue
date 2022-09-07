<template>
    <div>

    <div class="container">
      <HeaderHomeComponent :trash="true" :user="user" ></HeaderHomeComponent>

    
    

        <card-component  ></card-component>

          <router-link to="/create" class="add-note-bttn" role="button"><i class="fas fa-plus"></i> </router-link>
      
    </div>

      <LateralMenuComponent ></LateralMenuComponent>

    </div>
</template>

<script>
import Swal from 'sweetalert2'
import CardComponent from '@/components/CardComponent.vue';
import HeaderHomeComponent from '@/components/HeaderHomeComponent.vue';
import LateralMenuComponent from '@/components/LateralMenuComponent.vue';
import auth from '../middlewares/auth';
import axios from 'axios';
import global from '../global';
export default {
  name: 'HomeView',
  data(){
    return{
      user: '',
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

      editLabel(){
           Swal.fire({
                      title: '<strong>Edit Labels:</strong>',
                      html: `
                           <form action="#" class="form-labels home" method="post" id="alert-label-form">
                               
                                <div class="input-container">
                                     <span class="material-icons-outlined"><i class="fas fa-plus"></i></span>
                                     <input type="text" name="new_label" placeholder="Create new label..." class="create-input">
                                </div>
  
                                    <div class="input-container alert-label-container"> 
                                          <input type="text" name="id-labels[]" value="13" style="display:none;">
                                          <input type="checkbox" id="del-13" name="delete-labels[]" value="13" style="display:none;" class="delete-checkbox">  
                                          <input type="text" name="labels[]" id="label-13" value="asdasd">
  
                                          <label class="icons">
                                               <span class="material-icons-outlined label-icon"><i class="fas fa-tag"></i></span>
                                               <label for="del-13" class="material-icons delete-icon"><i class="fas fa-trash"></i></label>
                                          </label>
                                          <label for="label-13" class="material-icons-outlined icons edit"><i class="fas fa-edit"></i></label>
                                     </div>
                                                                 
                                <div>
                                     <input type="submit" value="Save">
                                </div>
                           </form>
                      `,
                      showCloseButton: true,
                      showConfirmButton: false,
                      customClass: {
                           title: 'alert-title'
                      },
                 })
      },
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