<template>
<!--    <v-card width="400" class="mx-auto mt-5 red lighten-5">-->
<!--      <v-card-title>Connexion</v-card-title>-->
<!--      <v-card-text>-->
<!--        <v-form ref="form">-->
<!--          <v-text-field v-model="userInfo.email" label="Email" prepend-icon="mdi-at"/>-->
<!--          <v-text-field v-model="userInfo.password" :type="showPassword ? 'text' : 'password'" label="Password" prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword"/>-->
<!--        </v-form>-->
<!--      </v-card-text>-->
<!--      <v-card-actions>-->
<!--        <v-spacer />-->
<!--        <v-btn color="#000000" dark>Connexion</v-btn>-->
<!--        <v-spacer />-->
<!--      </v-card-actions>-->
<!--    </v-card>-->
  <v-container fluid>
    <h2 class="text-center">Bienvenue sur Groupo'App</h2>
    <v-img height="30" contain src="../../assets/logo.png" />

    <h3 class="text-center" >Connectez-vous</h3>
      <v-form v-model="valid" ref="form">
        <v-text-field outlined v-model="userInfo.email" label="Email" type="email" prepend-icon="far fa-paper-plane" :rules="emailRules"/>
        <v-text-field outlined v-model="userInfo.password" :type="showPassword ? 'text' : 'password'" label="Mot de passe" prepend-icon="fas fa-key" :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'" :rules="passwordRules" @click:append="showPassword = !showPassword"/>
      </v-form>
    <p>Pas encore de compte Groupo'App ? | <router-link to="/register">Créez un compte</router-link></p>
  </v-container>
</template>

<script>
export default {
  name: "Login.vue",
  data () {
    return {
      valid: false,
      showPassword: false,
      userInfo: {
        username: "",
        email: "",
        password: "",
      }
    }
  }
}
</script>

<style scoped>

</style>