<template>
    <div class="container">
            
        <div class="card-form-container">
            <div class="form">
                <h1>Note App </h1>
                <h2>Create your account:</h2>
                
                <form @submit.prevent="register()">
                        <div class="input-container">
                            <label for="name">Full Name:</label>
                            <span class="material-icons icon"><i class="fas fa-user-circle"></i></span>
                            <input type="text" v-model="fullname" name="fullname" id="fullname"  required>
                        </div>
                        
                        <div class="input-container">
                            <label for="email">Email:</label>
                            <span class="material-icons icon"><i class="fas fa-envelope"></i></span>
                            <input type="email" v-model="email" name="email" id="email"  required>
                        </div>

                        <div class="input-container">
                            <label for="password">Password:</label>
                            <span class="material-icons icon"><i class="fas fa-lock"></i></span>
                            <input type="password" v-model="password" name="password" id="password" required>

                            <div class="show-password">
                                <input type="checkbox" id="show-password">
                                <label for="show-password">Show password</label>
                            </div>
                        </div>

                        <div class="input-container">
                            <label for="confirm-password">Confirm Password:</label>
                            <span class="material-icons icon"><i class="fas fa-lock"></i></span>
                            <input type="password" v-model="passwordConfirm" name="confirm_password" id="confirm-password" required>

                            <div class="show-password">
                                <input type="checkbox" id="show-confirm-password">
                                <label for="show-confirm-password">Show password</label>
                            </div>
                        </div>

                        <div class="input-container sumbit">
                            <input type="submit" value="Sign up">
                            <a href="http://agile-meadow-39302.herokuapp.com/login" class="create-account">Sign in instead</a>
                        </div>
                </form>
            </div>
            
        </div>
        

    </div>
</template>


<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default{
    name: 'RegisterView',
    data(){
        return{
        fullname: '',
        email: '',
        password: '',
        passwordConfirm: ''
        }
  
    },
    methods:{
        register(){
      
    
            if(this.password == this.passwordConfirm){

                const form = new FormData();
                form.append('fullname', this.fullname);
                form.append('email', this.email);
                form.append('password', this.password);

       
                axios.post('http://127.0.0.1:8000/api/auth/register',form).
                then(res => {
                    console.log(res.status);
                    if(res.status == 201){
                        Swal.fire({
                        icon: 'success',
                        title: 'Successfully Registered',
                        text: 'Now, login!',
                        })
                        this.$router.push({ name: 'login'}) 
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
}
</script>