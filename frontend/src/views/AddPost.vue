<template>
  <v-container>
    <v-card>
      <v-card-title>
        Ajouter un post
      </v-card-title>
      <v-card-subtitle>
        Racontez votre histoire et partagez-là avec l'ensemble des collaborateurs
      </v-card-subtitle>
      <v-form>
        <v-text-field
            outlined
            class="required"
            v-model="title"
            placeholder="Un super titre..."
            label="Titre du post"
            type="text"
            prepend-icon="far fa-paper-plane"
            counter="100"
        />
        <v-textarea
            outlined
            class="required"
            v-model="content"
            placeholder="Une super histoire..."
            label="Contenu du post"
            type="text"
            prepend-icon="far fa-paper-plane"
        >
        </v-textarea>
        <input
            type="file"
            ref="file"
            name="file"
            id="file"
            @change="fileHandler" />

        <v-btn :disabled="!(title.length !== 0 && content.length !== 0)" @click="sendPost()">Créer un post</v-btn>
      </v-form>
      <br>
    </v-card>
    <UserInfo/>
  </v-container>
</template>

<script>
import UserInfo from "@/components/layout/UserInfo";

export default {
  name: "AddPost.vue",
  components: {
    UserInfo
  },
  data() {
    return {
      title: "",
      content: "",
      file: "",
      valid: false,
    }
  },
  methods: {
    sendPost() {
      const user = this.$store.getters.getUser;
      const fd = new FormData();

      if (this.file) {
        fd.append('title', this.title);
        fd.append('content', this.content);
        fd.append('image', this.file);
        fd.append('userId', user.userId);
      } else {
        fd.append('title', this.title);
        fd.append('content', this.content);
        fd.append('userId', user.userId);
      }
        this.$store.dispatch('createPost', fd)

    },
    fileHandler() {
      this.file = this.$refs.file.files[0];
    },
  },
}
</script>

<style lang="css">
.required label::after {
  content: "*";
  color: red;
}
</style>