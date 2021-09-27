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
            <v-img :src="avatar"></v-img>
          </v-avatar>
          <v-list-item color="rgba(0, 0, 0, .4)">
            <v-list-item-content>
              <v-list-item-title class="title">
                {{ user.username }}
              </v-list-item-title>
              <v-divider inset />
              <v-list-item-subtitle>
                <br>
                Adresse mail enregistrée :
                <br>
                {{ user.email }}
                <br>
                <br>
                Membre depuis le :
                <br>
                {{user.createdAt | formatDate}}
                <br>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: "Profile",
  data() {
    return {
      bio: "",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      file: "",
      imgPreview: "",
      dialog: false,
      valid: false,
    };
  },
  // methods: {
  //   selectFile() {
  //     this.file = this.$refs.file.files[0];
  //     this.imgPreview = URL.createObjectURL(this.file);
  //   },
  //   updateProfile() {
  //     const fd = new FormData();
  //     fd.append("bio", this.bio);
  //     fd.append("inputFile", this.file);
  //     axios
  //         .put(
  //             "http://localhost:3000/api/users/profile/" + this.$route.params.id,
  //             fd,
  //             {
  //               headers: {
  //                 Authorization: `Bearer ${$store.state.token}`,
  //               },
  //             }
  //         )
  //         .then(() => {
  //           this.$store.dispatch("setSnackbar", {
  //             text: "Votre profil a été modifié.",
  //           });
  //           this.$router.go();
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //   },
  //   deleteProfile() {
  //     this.dialog = false;
  //     axios
  //         .delete(
  //             "http://localhost:3000/api/users/profile/" + this.$route.params.id,
  //             {
  //               headers: {
  //                 Authorization: `Bearer ${$store.state.token}`,
  //               },
  //             }
  //         )
  //         .then(() => {
  //           window.localStorage.vuex = JSON.stringify({});
  //           this.$store.dispatch("setSnackbar", {
  //             text: "Votre profil a été supprimé. A bientôt !",
  //           });
  //           this.$store.dispatch("logout"), this.$router.push("/");
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //   },
  // },
  computed: {
      ...mapState([
          'user',
      ])
  },
};

</script>

