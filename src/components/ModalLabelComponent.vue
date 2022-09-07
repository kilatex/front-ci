<template>
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
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
                    <form @submit.prevent="addLabel()" class="form-labels home" id="alert-label-form">

                        <div class="input-container">
                            <span class="material-icons-outlined"><i class="fas fa-plus"></i></span>
                            <input type="text" v-model="newLabel" placeholder="Create new label..."
                                class="create-input">
                        </div>
                        <div v-if="labels.length >= 1">
                            <div v-for="label in labels" v-bind:key="label"
                                class="input-container alert-label-container">

                                <input type="text" name="id-labels[]" value="13" style="display:none;">
                                <input type="checkbox" id="del-13"  name="delete-labels[]"
                                    value="13" style="display:none;" class="delete-checkbox">
                                <input type="text" :id="'label_'+label.id" v-model="label.content">

                                <label class="icons">
                                    <span class="material-icons-outlined label-icon"><i class="fas fa-tag"></i></span>
                                    <label for="del-13" @click="deleteLabel(label.id)" class="material-icons delete-icon"><i
                                            class="fas fa-trash"></i></label>
                                </label>
                                <label for="label-13" class="material-icons-outlined icons edit"><i
                                        class="fas fa-edit"></i></label>
                            </div>
                        </div>

                        <div>
                            <input type="submit" value="Save" >
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
    name: 'ModalLabelComponent',
    data() {
        return {
            token: localStorage.getItem('token'),
            labels: '',
            newLabel: ''
        }
    },
    mounted() {
        this.getLabels();
    },
    methods: {
        getLabels() {
            let headers = {
                'Authorization': 'Bearer ' + this.token
            }
            axios.get(global.url + 'api/label', { headers: headers })
                .then(response => {
                    if (response.data) {
                        console.log(response);
                        this.labels = response.data
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        deleteLabel(id) {
         
            const token = localStorage.getItem('token');
            let headers = {
                'Authorization': 'Bearer ' + token
            }
            axios.delete(global.url + 'api/label/'+id, { headers: headers }).
                then(res => {
                    if (res.status == 200) {
                        this.getLabels();
                        Swal.fire({
                            icon: 'success',
                            title: 'Successfully Deleted',
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
        home(){
            this.$router.push('/home'); 
        }
    },
}
</script>