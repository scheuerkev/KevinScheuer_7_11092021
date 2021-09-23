<template>

        <v-container>
        <h2 class="text-center" >Créez votre compte en un clic</h2>
        <v-form v-model="valid" ref="form">
          <v-text-field  outlined v-model="userInfo.username" label="Identifiant" prepend-icon="far fa-user" :rules="usernameRules"/>
          <v-text-field outlined v-model="userInfo.email" label="Email" type="email" prepend-icon="far fa-paper-plane" :rules="emailRules"/>
          <v-text-field outlined v-model="userInfo.password" :type="showPassword ? 'text' : 'password'" label="Mot de passe" prepend-icon="fas fa-key" :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'" :rules="passwordRules" @click:append="showPassword = !showPassword"/>
        </v-form>
        <v-btn dark @click="submitForm"> S'inscrire</v-btn>
          <br>
          <p>Déjà un compte Groupo'App ? | <router-link to="/">Se connecter</router-link></p>
        </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      valid: false,
      showPassword: false,
      userInfo: {
        username: "",
        email: "",
        password: "",
      },
      usernameRules: [
        (v) =>
            (v && v.length >= 5) ||
            "Le nom d'utilisateur doit comprendre entre 5 et 30 caractères et peut contenir des tirets/espaces/apostrophes.",
      ],
      passwordRules: [
        (v) =>
            (v && v.length >= 6) ||
            "Doit contenir entre 8 et 20 caractères avec un caractère alphabétique, un caractère spécial et un chiffre.",
        (v) =>
            /(?=.*[A-Za-z])/.test(v) ||
            "Doit contenir un caractère alphabétique en majuscule ou minuscule.",
        (v) => /(?=.*\d)/.test(v) || "Doit contenir un chiffre.",
        (v) =>
            /(?=.*[$@$!%*#?&])/.test(v) || "Doit contenir un caractère spécial.",
      ],
      emailRules: [
        (v) =>
            /^[a-zA-Z0-9_.-]+[@]{1}[a-zA-Z0-9]+[.]{1}[a-zA-Z]{2,10}$/.test(v) ||
            "Le format de l'email doit être de type name@domaine.com",
      ],
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        axios
            .post("http://localhost:3000/api/users/register", this.userInfo)
            .then((response) => {
              console.log('Register OK! ', response);
              this.$store.dispatch("setSnackbar", {
                showing: true,
                text: `BRAVO ! Votre compte est créé !`,
              });
              this.$router.push("/");
            })
            .catch(() => {
              this.$store.dispatch("setSnackbar", {
                color: "error",
                showing: true,
                text: `L'adresse email est déjà prise`,
              });
            });
      }
    },
  },
};
</script>