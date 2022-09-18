<template>
    <div class="modal fade" id="addLabelComponent" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Create or Edit Label</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">X</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="addLabels()" class="form-labels" >
                         <div class="input-container">
                                   <span class="material-icons-outlined"><i class="fas fa-plus"></i></span>
                                   <input type="text" name="new_label" id="newLabel" v-model="newLabel" placeholder="Create new label..." class="create-input">
                              </div>
                                <div v-if="labels.length >= 1">

                                    <div v-for="label in labels" v-bind:key="label" class="input-container alert-label-container">
                                            <label :for="'label_'+label.id">
                                                 <span class="material-icons-outlined"><i class="fas fa-tag"></i></span>
                                                 {{label.content}}
                                            </label>
                                            
                                            <input name="labeltoSet" :value="label.id" type="radio" :id="'label_'+label.id"  >
                                    </div>
                                </div>
                              
                              <div>
                                   <input type="submit" value="Save">
                              </div>
                         </form>
                </div>

            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import global from '../global'
export default {
    name: 'AddLabelComponent',
    data() {
        return {
            token: localStorage.getItem('token'),
            labels: '',
            newLabel: '',
            labelsToSet: []
        }
    },
    mounted() {
        this.getLabels();
        document.getElementById('newLabel').addEventListener('click',()=>{
           const isChecked = document.querySelector('input[name="labeltoSet"]:checked');
           if(isChecked){
                isChecked.checked = null;
           }
        });
    },
    methods: {
        getLabels() {
            let headers = {
                'Authorization': 'Bearer ' + this.token
            }
            axios.get(global.url + 'api/label', { headers: headers })
                .then(response => {
                    if (response.data) {
                        this.labels = response.data
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        addLabels() {
            if(this.newLabel.trim() != ""){
                this.createLabels();
            }else if(this.newLabel.trim() == ""){
                this.setLabels();
            }
        },
        setLabels(){
            let headers = {
                'Authorization': 'Bearer ' + this.token
            }
            const id = this.$route.params.id;
            const label_id = document.querySelector('input[name="labeltoSet"]:checked').value;
            const form = new FormData();
            form.append('label_id', label_id);
    
           axios.post(global.url+'api/set-label/'+id, form, { headers: headers } )
                .then((res) =>{
                    if(res.data.code==200){

                        Swal.fire({
                                icon: 'success',
                                title: 'Successfully Added',
                            })
                            this.emitNewLabels();

                    }else{

                        Swal.fire({
                                icon: 'error',
                                title: 'This label already exists',
                            })
                    }
                })
                .catch(error => {
                    console.log(error);
                });

        },
        createLabels(){
            const form = new FormData();
           form.append('content', this.newLabel);
            const token = localStorage.getItem('token');
            let headers = {
                'Authorization': 'Bearer ' + token
            }

            axios.post(global.url + 'api/label-create', form, { headers: headers }).

                then(res => {
                    console.log(res);
                    if (res.data.code == 200) {
                        this.getLabels();
                        Swal.fire({
                            icon: 'success',
                            title: 'Successfully Created',
                        })
                        this.emitNewLabels();
                    }
                    else if(res.data.code == 400){
                        Swal.fire({
                    icon: 'error',
                    title: 'Error to create',
                    text: 'Label already exists',
                        })
                    }
                }).
                catch(error => {
               
                    console.log(error);
                });
        },
     
        emitNewLabels(){
            this.$emit('emitNewLabels', true);
        }
     
    },
}
</script>