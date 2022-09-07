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
                    <form action="http://agile-meadow-39302.herokuapp.com/notes/37/add_label" class="form-labels" method="post">
                              <input type="hidden" name="_token" value="URfpO9CpxItVRUiMgdxNKm9Thx3kVtxgAF2dkRh6">                              <input type="hidden" name="_method" value="put">                              <div class="input-container">
                                   <span class="material-icons-outlined">&#xe145;</span>
                                   <input type="text" name="new_label" placeholder="Create new label..." class="create-input">
                              </div>

                                                                 <div class="input-container alert-label-container">
                                        <label for="label-18">
                                             <span class="material-icons-outlined">&#xe892;</span>
                                             sadgasdgasdgasdgasdg
                                        </label>
                                        
                                        <input type="checkbox" name="labels[]" id="label-18" value="18" >
                                   </div>
                                                                 <div class="input-container alert-label-container">
                                        <label for="label-14">
                                             <span class="material-icons-outlined">&#xe892;</span>
                                             asdgasdgasd
                                        </label>
                                        
                                        <input type="checkbox" name="labels[]" id="label-14" value="14"  checked >
                                   </div>
                                                                 <div class="input-container alert-label-container">
                                        <label for="label-16">
                                             <span class="material-icons-outlined">&#xe892;</span>
                                             dsfghsdagasdg
                                        </label>
                                        
                                        <input type="checkbox" name="labels[]" id="label-16" value="16"  checked >
                                   </div>
                                                                 <div class="input-container alert-label-container">
                                        <label for="label-21">
                                             <span class="material-icons-outlined">&#xe892;</span>
                                             1123123
                                        </label>
                                        
                                        <input type="checkbox" name="labels[]" id="label-21" value="21"  checked >
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
     
    },
}
</script>