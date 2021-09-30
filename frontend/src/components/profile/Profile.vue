<template>
  <v-container>
    <v-card
        class="mx-auto"
        max-width="800"
        elevation="5"
        flat
    >
      <v-card-title class="justify-center">
        Bonjour {{ user.username }}, voici votre profil Groupo'App
      </v-card-title>
      <v-row no-gutters>
        <v-col>
          <v-avatar size="100">
            <v-img v-if="avatar" :src="avatar"></v-img>
          </v-avatar>
          <v-list-item color="rgba(0, 0, 0, .4)">
            <v-list-item-content>
              <v-list-item-title class="title">
                {{ user.username }}
              </v-list-item-title>
              <v-divider inset/>
              <v-list-item-subtitle>
                <br>
                Adresse mail enregistrée :
                <br>
                {{ user.email }}
                <br>
                <br>
                Membre depuis le :
                <br>
                {{ user.createdAt | formatDate }}
                <br>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-card>
    <br>
    <v-card
        class="mx-auto"
        max-width="800"
        elevation="5"
        flat
    >
      <v-card-title class="justify-center">
        Mettre à jour vos informations
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col>
              <v-text-field
                  outlined
                  v-model="user.email"
                  :rules="emailRules"
                  label="Email"
                  type="email"
                  prepend-icon="far fa-paper-plane"
              />
            </v-col>

            <br/>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                  outlined
                  v-model="user.username"
                  :rules="usernameRules"
                  label="Nom d'utilisateur"
                  type="text"
                  prepend-icon="fas fa-user-edit"
              />
            </v-col>
            <br/>
          </v-row>
          <v-row>
            <v-col>
              <input
                  type="file"
                  ref="file"
                  name="file"
                  id="file"
                  @change="fileHandler" />
            </v-col>
            <br/>
          </v-row>
          <v-btn align-self="auto" color="primary" @click="updateProfile()">Mettre à jour</v-btn>
        </v-form>
        <br>
      </v-card-text>
      <UserInfo />
      <br>
    </v-card>
    <br>
    <v-card
        class="mx-auto"
        max-width="800"
        elevation="5"
        flat
    >
      <v-card-title class="justify-center">
        Supprimer le compte
      </v-card-title>
      <v-card-text>
        Attention, cette action est <strong>irréversible</strong>. Vous devrez recréer un compte et vous perdrez
        tous les contenus que vous avez créé sur l'application.
        <br>
      </v-card-text>
      <v-row>
        <v-col>
          <v-switch class="justify-center"
                    v-model="valid"
                    label="J'ai compris et je veux supprimer mon compte"
          ></v-switch>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="error" :disabled="!valid" @click="deleteAccount()">Supprimer mon compte</v-btn>
        </v-col>
      </v-row>
      <br>
    </v-card>
  </v-container>
</template>

<script>
import {mapState} from 'vuex';
import UserInfo from "@/components/layout/UserInfo";

export default {
  name: "Profile",
  components: {
    UserInfo,
  },
  data() {
    return {
      file: "",
      dialog: false,
      checkbox: false,
      valid: false,
    };
  },
  methods: {
    updateProfile() {
      const fd = new FormData();

      if (this.file) {
        fd.append('email', this.$store.state.user.email);
        fd.append('username', this.$store.state.user.username);
        fd.append('avatar', this.file);
      } else {
        fd.append('email', this.$store.state.user.email);
        fd.append('username', this.$store.state.user.username);
      }
      this.$store.dispatch('updateProfile', fd);
    },
    deleteAccount() {
      this.$store.dispatch('deleteAccount');
    },
    fileHandler() {
      this.file = this.$refs.file.files[0];
    },
  },
  computed: {
    ...mapState([
      'user',
    ]),
    avatar() {
      const defaultImage = "https://www.w3schools.com/howto/img_avatar.png";
      if (this.$store.state.user.avatar === null) return defaultImage;
      return this.$store.state.user.avatar;
    },
    emailRules() {
      return this.$store.state.emailRules;
    },
    usernameRules() {
      return this.$store.state.usernameRules;
    },
  },
};

</script>

<style lang="css">
.v-card > *:first-child:not(.v-btn):not(.v-chip):not(.v-avatar) {
  word-break: break-word;
}
</style>
