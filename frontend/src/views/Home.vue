<template>
<!--  //<v-container align="center" class="mx-auto mt-5">-->
<!--    <v-img class="mb-5" contain height="200" src="../assets/icon-above-font.png" />-->
<!--    <v-row align="center" justify="center">-->
<!--      <v-btn class="blue-grey accent-1" dark elevation="1" plain small to="/register">Créer un compte</v-btn>-->
<!--    </v-row>-->

    <Login />
<!--  </v-container>-->
</template>

<script>
import Login from "@/components/auth/Login.vue";

export default {
  name: 'Home',
  components: {
    Login,
  }
}
</script>
