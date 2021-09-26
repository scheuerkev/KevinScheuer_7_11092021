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
  <v-container>
    <v-card elevation="5" flat height="100%">
      <v-card-title class="justify-center" style="font-size:1.8rem">
        Bienvenue sur Groupo'App
      </v-card-title>
      <v-img height="50" contain src="../../assets/logo.png"/>
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-text-field outlined v-model="user.email" label="Email" type="email" prepend-icon="far fa-paper-plane"/>
          <v-text-field outlined v-model="user.password" :type="showPassword ? 'text' : 'password'" label="Mot de passe"
                        prepend-icon="fas fa-key" :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                        @click:append="showPassword = !showPassword"/>
          <v-card-actions>
            <v-layout row>
              <v-flex justify-center>
            <v-btn dark @click="login()">Se connecter</v-btn>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
    <br>
    <v-layout>
      <v-flex justify-center>
    Pas encore de compte Groupo'App ? |
      <router-link to="/register">Créez un compte</router-link>
      </v-flex>
    </v-layout>
    <br>
      <UserInfo />


  </v-container>
</template>

<script>

import UserInfo from "@/components/layout/UserInfo";

export default {
  name: "Login.vue",
  components: {
    UserInfo
  },
  data() {
    return {
      valid: false,
      showPassword: false,
      user: {
        email: "",
        password: "",
      }
    }
  },
  methods: {
    login() {
      this.$store.dispatch("loginUser", this.user);
    }
  },
}
</script>

<style scoped>

</style>

