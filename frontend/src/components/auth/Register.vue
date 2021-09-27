<template>

<!--        <v-container>-->
<!--        <h2 class="text-center" >Créez votre compte en un clic</h2>-->
<!--        <v-form v-model="valid" ref="form">-->
<!--        </v-form>-->
<!--        <v-btn dark @click="submitForm">S'inscrire</v-btn>-->
<!--          <br>-->
<!--          <p>Déjà un compte Groupo'App ? | <router-link to="/">Se connecter</router-link></p>-->
<!--        </v-container>-->

  <v-container>
    <v-card elevation="5" flat height="100%" max-width="800">
      <v-card-title class="justify-center" style="font-size:1.8rem">
        Créez votre compte Groupo'App en un clic
      </v-card-title>
      <v-img height="50" contain src="../../assets/logo.png"/>
      <v-card-text>
<!--        <v-form v-model="valid" ref="form">-->
<!--          <v-text-field  outlined v-model="userInfo.username" label="Identifiant" prepend-icon="far fa-user" :rules="usernameRules"/>-->
<!--          <v-text-field outlined v-model="userInfo.email" label="Email" type="email" prepend-icon="far fa-paper-plane" :rules="emailRules"/>-->
<!--          <v-text-field outlined v-model="userInfo.password" :type="showPassword ? 'text' : 'password'" label="Mot de passe" prepend-icon="fas fa-key" :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'" :rules="passwordRules" @click:append="showPassword = !showPassword"/>-->
<!--          <v-card-actions>-->
<!--            <v-layout row>-->
<!--              <v-flex justify-center>-->
<!--                <v-btn dark @click="submitForm()">S'inscrire</v-btn>-->
<!--              </v-flex>-->
<!--            </v-layout>-->
<!--          </v-card-actions>-->
<!--        </v-form>-->
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
              class="mr-4"
              @click="register()"
          >
            s'inscrire
          </v-btn>

          <v-btn
              color="error"
              class="mr-4"
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
        Déjà un compte Groupo'App ?  |
        <router-link to="/">Se connecter</router-link>
      </v-flex>
    </v-layout>
    <br>
    <UserInfo />


  </v-container>
</template>

<script>
import UserInfo from "@/components/layout/UserInfo";

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
    usernameRules: [
      v => !!v || 'Un nom d\'utilisateur est obligatoire',
      v => (v && v.length >= 8) || 'Le nom d\'utilisateur doit contenir au moins 8 caractères',
    ],
    emailRules: [
      v => !!v || 'Une adresse e-mail valide est obligatoire',
      v => /.+@.+\..+/.test(v) || 'Merci d\'entrer une adresse mail au format nom@domaine.hote',
    ],
    passwordRules: [
      v => (v && v.length >= 8) || 'Le mot de passe d\'une longueur comprise entre 8 et 100 caractères',
      v => /(?=.*[A-Za-z])/.test(v) || 'Le mot de passe doit contenir au moins une majuscule et une minuscule',
      v => /(?=.*\d{2})/.test(v) || 'Le mot de passe doit contenir au moins deux chiffres',
    ],
  }),

  methods: {
    register() {
      if (this.$refs.form.validate()) this.$store.dispatch("registerUser", this.userInfo);
    },
    reset () {
      this.$refs.form.reset()
    },
  },
}
</script>