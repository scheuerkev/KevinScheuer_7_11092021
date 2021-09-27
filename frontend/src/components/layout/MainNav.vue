<template>
  <v-app-bar app color="blue-grey darken-4" dark>
      <v-toolbar-title>
        <router-link to="/" class="text-decoration-none white--text">
        <v-img src="../../assets/icon-left-font-monochrome-white.png" max-width="130" alt="Retour à l'accueil" />
        </router-link>
      </v-toolbar-title>
    <v-spacer />
    <v-spacer />
    <v-spacer />
    <v-tooltip v-if="user">
      <template v-slot:activator="{ on, attrs }">
        <v-btn to="/posts" icon v-bind="attrs" v-on="on" aria-label="Aller à la page de tous les posts">
          <v-icon>fas fa-inbox</v-icon>
        </v-btn>
      </template>
      <span>Tous les messages</span>
    </v-tooltip>
    <v-spacer></v-spacer>
    <v-tooltip v-if="user">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" aria-label="Voir mon profil" @click="showProfile()">
          <v-icon>fas fa-user-circle</v-icon>
        </v-btn>
      </template>
      <span>Mon profil</span>
    </v-tooltip>
    <v-spacer></v-spacer>
    <v-tooltip v-if="user">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" aria-label="Se déconnecter" @click="logout()">
          <v-icon>fas fa-sign-out-alt</v-icon>
        </v-btn>
      </template>
      <span>Déconnexion</span>
    </v-tooltip>
  </v-app-bar>
</template>
<script>

export default {
  name: "MainNav.vue",
  computed: {
    user() {
      return this.$store.state.isLoggedIn;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      window.location.reload();
    },
    showProfile() {
      this.$router.push(`/profile/${this.$store.state.user.userId}`);
    }
  },
}
</script>

<style scoped>

</style>