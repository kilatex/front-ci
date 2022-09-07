<template>
    <div class="menu" id="menu">
      <div class="overlay" id="overlay"></div>

      <div class="menu-container">

        <span class="material-icons-outlined bttn-close" id="bttn-close"><i class="fas fa-times"></i> </span>

        <ul class="options">
          <div class="general">

            <li>
              <router-link active-class="active-link" to="/home">
                <span class="material-icons-outlined icons"><i class="fas fa-lightbulb"></i></span>
                Notes
            </router-link>
            </li>


            <li class="">
                <router-link to="/trash" active-class="active-link">
                <span class="material-icons-outlined icons"><i class="fas fa-trash"></i></span>
                Trash
                </router-link>
            </li>
          </div>

          <div class="labels">
            <h3 class="title">Labels</h3>
            <span v-if="labels.length >= 1">
              <li  v-for="label in labels" v-bind:key="label">

                
                  <a :href="'/label/'+label.id"><span class="material-icons-outlined icons"><i class="fas fa-tag"></i></span>
                    {{label.content}} </a>
              </li>

            </span>

            <li class="edit_label-bttn"  data-toggle="modal" data-target="#exampleModalCenter" >
              <button>
                <span class="material-icons-outlined icons"><i class="fas fa-tag"></i></span>
                Edit labels
              </button>
            </li>

            <li class="edit_label-bttn"   data-toggle="modal" data-target="#exampleModalCenter" >
              <button>
                <span class="material-icons-outlined icons"><i class="fas fa-tag"></i></span>
                Create new label
              </button>
            </li>
          </div>
        </ul>

      </div>
      <ModalLabelComponent></ModalLabelComponent>
    </div>
</template>

<script>
import axios from 'axios';
import ModalLabelComponent from './ModalLabelComponent.vue';
import global from '../global'

    export default{
        components:{
          ModalLabelComponent
        },
        name: 'LateralMenuComponent',
        data() {
          return {
            labels: '',
            token: localStorage.getItem('token'),
          }
        },
        mounted() {
          this.getLabels();
        },
        methods: {
           getLabels() {
            let headers = {
                'Authorization': 'Bearer ' +this.token
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
        },
    }
</script>

<style>
  .active-link{
    font-weight: bold;
    width: 100%;
    background-color: rgba(233, 184, 21, 0.411);
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 5px;
  }
</style>