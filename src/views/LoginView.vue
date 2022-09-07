<template>
   
     <div class="container">
          
     <div class="card-form-container">
          <div class="form">
               <h1>Note App </h1>
               <h2>Sign In:</h2>
               
               <form  @submit.prevent="login()">
                    <input type="hidden" name="_token" value="u0esqjjxb0bazlZns1YEgXKQFjuWTjVXPKzLzDb8">
                    <div class="input-container">
                         <label for="email">Email:</label>
                         <span class="material-icons icon"><i class="fas fa-envelope"></i></span>
                         <input type="email" name="email"  v-model="email"  id="email" >
                    </div>

                    <div class="input-container">
                         <label for="password">Password:</label>
                         <span class="material-icons icon"><i class="fas fa-lock"></i></span>
                         <input type="password"  v-model="password" name="password" id="password" >

                         <div class="show-password">
                              <input type="checkbox" id="show-password">
                              <label for="show-password">Show password</label>
                         </div>
                    </div>

                    <div class="input-container sumbit">
                         <input type="submit" value="Login">
                            <router-link to="/register" class="create-account">Create Account</router-link>
                    </div>
               </form>
          </div>
          
     </div>
     </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import global from  '../global';
export default {
  name: 'LoginView',
  data(){
        return{
        email: '',
        password: '',
        }
  
     },
  methods:{
     login(){
          

          const form = new FormData();
          form.append('email', this.email);
          form.append('password', this.password);
          
          axios.post(global.url+'api/auth/login',form).
          then(res => {
          if(res.status == 200){
               localStorage.setItem('token', res.data.access_token);
               this.$router.push('/home'); 
          }
          else if(res.data.code == 400){
               this.message = res.data.message
          }
          }).
          catch(error => {
          console.log(error);
          }); 
          
     }
  }
}
</script>

<style>
</style>
