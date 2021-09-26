<template>
  <v-alert
      border="bottom"
      :color="userInfo.color"
      dense
      icon="fas fa-user-circle"
      type="success"
      v-show="userInfo.show"
  >{{ userInfo.message }}</v-alert>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: "UserInfo",
  computed: {
    ...mapState(['userInfo']),
  },
}
</script>

<style scoped>

</style>