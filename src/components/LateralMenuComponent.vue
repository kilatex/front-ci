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

            <li>
              <a href="http://agile-meadow-39302.herokuapp.com/labels/13">
                <span class="material-icons-outlined icons"><i class="fas fa-tag"></i></span>
                asdasd
              </a>
            </li>

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
import Swal from 'sweetalert2';
import ModalLabelComponent from './ModalLabelComponent.vue';
    export default{
        components:{
          ModalLabelComponent
        },
        name: 'LateralMenuComponent',
        methods: {
          editLabel(){
           Swal.fire({
                      title: '<strong>Edit Labels:</strong>',
                      html: `
                           <form  class="form-labels home" id="alert-label-form">
                               
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
                                     <input onclick="addLabel()" type="submit" value="Save">
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
        addLabel(){
          alert('messi');
        }
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