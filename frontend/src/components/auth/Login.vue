<template>
  <v-container>
    <v-card
        class="mx-auto"
        max-width="800"
        elevation="5"
        flat height="100%"
    >
      <v-card-title
          class="justify-center"
          style="font-size:1.8rem"
      >
        Bienvenue sur Groupo'App
      </v-card-title>
      <v-img
          height="50"
          contain src="../../assets/logo.png"
      />
      <v-card-text>
        <v-form
            v-model="valid"
            ref="form"
        >
          <v-text-field
              outlined
              v-model="user.email"
              label="Email"
              type="email"
              prepend-icon="far fa-paper-plane"
          />
          <v-text-field
              outlined
              v-model="user.password"
              :type="showPassword ? 'text' : 'password'" label="Mot de passe"
              prepend-icon="fas fa-key" :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
              @click:append="showPassword = !showPassword"/>
          <!--prepend-icon and @click:append setting behaviour of revealing password to user.
          Due to ternary block, icon and input type change if clicked or not -->
          <v-card-actions>
            <v-layout row>
              <v-flex justify-center>
                <v-btn
                    dark @click="login()"
                >
                  Se connecter
                </v-btn>
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
        <router-link to="/register">
          Créez un compte
        </router-link>
      </v-flex>
    </v-layout>
    <br>
    <UserInfo/>
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
    //local state
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
    //when clicked, form button launch this login func which dispatch proper action in the store
    login() {
      this.$store.dispatch("loginUser", this.user);
    }
  },
}
</script>

