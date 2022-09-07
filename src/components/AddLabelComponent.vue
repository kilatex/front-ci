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
                    <form @submit.prevent="setLabels()" class="form-labels" >
                         <div class="input-container">
                                   <span class="material-icons-outlined"><i class="fas fa-plus"></i></span>
                                   <input type="text" name="new_label" placeholder="Create new label..." class="create-input">
                              </div>
                                <div v-if="labels.length >= 1">

                                    <div v-for="label in labels" v-bind:key="label" class="input-container alert-label-container">
                                            <label :for="'label_'+label.id">
                                                 <span class="material-icons-outlined"><i class="fas fa-tag"></i></span>
                                                 {{label.content}}
                                            </label>
                                            
                                            <input type="checkbox" name="labels[]" :id="'label_'+label.id"  >
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
    },
    methods: {
        getLabelsChecked(){
            this.labels.forEach(label => {
            var isChecked = document.getElementById('label_'+label.id);
            if(isChecked.checked){
                this.labelsToSet.push(label.id);
            }
            });
        },
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
        addLabel() {
            const form = new FormData();
           form.append('content', this.newLabel);
            const token = localStorage.getItem('token');
            let headers = {
                'Authorization': 'Bearer ' + token
            }

            axios.post(global.url + 'api/label-create', form, { headers: headers }).

                then(res => {
                    if (res.status == 200) {
                        this.getLabels();
                        Swal.fire({
                            icon: 'success',
                            title: 'Successfully Created',
                        })
                    }
                    else if (res.data.code == 400) {
                        this.message = res.data.message
                    }
                }).
                catch(error => {
                    console.log(error);
                });
        },
        setLabels(){
            let headers = {
                'Authorization': 'Bearer ' + this.token
            }
            const id = this.$route.params.id;
           this.getLabelsChecked();
           let json = JSON.stringify(this.labelsToSet);
           let params = 'json='+json;
           axios.post(global.url+'api/set-label/'+id, params, { headers: headers } )
                .then(() =>{
                    Swal.fire({
                            icon: 'success',
                            title: 'Successfully Added',
                        })
                })
                .catch(error => {
                    console.log(error);
                });


        }
     
    },
}
</script>