<template>
  <v-alert
      class="alertUser"
      border="bottom"
      :color="userInfo.color"
      dense
      icon="fas fa-user-circle"
      type="success"
      v-show="userInfo.show"
  >
    {{ userInfo.message }}
    <i @click="closeAlert()"
       class="close fas fa-times"
    ></i>
  </v-alert>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: "UserInfo",
  state () {
    return {
      show: false
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    closeAlert(){
      this.$store.commit('SET_USER_INFO', {
        show: false,
      })
    }
  }
}
</script>

<style scoped>
 .alertUser {
   width: 80%;
   max-width: 400px;
   margin: auto;
   position: relative;
 }

 .close {
   opacity: 0.85;
   position: absolute;
   top:1px;
   right: 5px;
 }

 .close:hover{
   cursor: pointer;
 }
</style>