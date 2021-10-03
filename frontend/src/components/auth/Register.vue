<template>
  <v-container>
    <v-card
        elevation="5"
        flat height="100%"
        class="mx-auto"
        max-width="800"
    >
      <v-card-title
          class="justify-center"
          style="font-size:1.8rem"
      >
        Créez votre compte Groupo'App en un clic
      </v-card-title>
      <v-img
          height="50"
          contain src="../../assets/logo.png"
      />
      <v-card-text>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
          <v-text-field
              v-model="userInfo.username"
              prepend-icon="far fa-user"
              :counter="8"
              :rules="usernameRules"
              label="Nom d'utilisateur"
              required
              outlined
          ></v-text-field>
          <v-text-field
              v-model="userInfo.email"
              prepend-icon="far fa-paper-plane"
              :rules="emailRules"
              label="E-mail"
              required
              outlined
          ></v-text-field>
          <!--:append-icon and @click:append setting behaviour of revealing password to user.
          Due to ternary block, icon and input type change if clicked or not -->
          <v-text-field
              v-model="userInfo.password"
              prepend-icon="fas fa-key"
              :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
              @click:append="showPassword = !showPassword"
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              label="Mot de passe"
              required
              outlined
          ></v-text-field>
          <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4 black_btn"
              @click="register()"
          >
            s'inscrire
          </v-btn>
          <v-btn
              color="error"
              class="mr-4 black_btn"
              @click="reset"
          >
            remettre à zéro
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <br>
    <v-layout>
      <v-flex justify-center>
        Déjà un compte Groupo'App ? |
        <router-link to="/">
          Se connecter
        </router-link>
      </v-flex>
    </v-layout>
    <br>
    <UserInfo/>
  </v-container>
</template>

<script>
import UserInfo from "@/components/layout/UserInfo";
import {mapState, mapActions} from "vuex";

export default {
  components: {
    UserInfo
  },
  data: () => ({
    valid: false,
    showPassword: false,
    userInfo: {
      username: null,
      email: null,
      password: null
    },
  }),
  computed:
    mapState([
      'emailRules',
      'passwordRules',
      'usernameRules']),

  methods: {
    ...mapActions([
      'registerUser']),

    register() {
      //registerUser method is dispatch from the store only if form.validate() is true
      if (this.$refs.form.validate()) this.registerUser(this.userInfo);
    },
    reset() {
      this.$refs.form.reset()
    },
  },
}
</script>

<style scoped>
.black_btn {
  color: rgba(0,0,0,0.9) !important;
}
</style>