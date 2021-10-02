<template>
  <v-container>
    <div class="postContainer">
      <v-card
          tile
          class="mx-auto"
          max-width="800"
          elevation="3"
          height="100%"
      >

        <v-card-title class="justify-center">{{ post.title }}</v-card-title>
        <v-card-subtitle>par {{ post.User.username }} le {{ post.createdAt | formatDateHour }}
          <v-avatar size="70">
            <v-img :src="post.User.avatar"/>
          </v-avatar>
        </v-card-subtitle>
        <v-row>
          <v-col>
            <v-card-text class="postText">{{ post.content }}</v-card-text>
            <v-img v-if="post.image !== null" class="postImage modify" :src="post.image"/>
          </v-col>
        </v-row>
      </v-card>
      <br>
      <div class="addComment">
        Éditer le post
        <v-row>
          <v-col>
            <v-form>
              <v-text-field
                  solo
                  v-model="title"
                  placeholder="Titre du post"
                  :rules="contentRules"
                  label="Modifiez le titre"
                  type="text"
                  prepend-icon="fas fa-heading"/>
              <v-textarea
                  solo
                  v-model="content"
                  placeholder="Qu'en avez-vous pensé ?"
                  label="Contenu du commentaire"
                  type="text"
                  prepend-icon="far fa-keyboard"/>
              <label for="file">Mettre à jour l'image : </label>
              <input
                  type="file"
                  ref="file"
                  name="file"
                  id="file"
                  @change="fileHandler">
              <br>
            </v-form>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn @click="updatePost()">Mettre à jour le post</v-btn>
          </v-col>
        </v-row>

      </div>

    </div>
  </v-container>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Post.vue",
  data() {
    return {
      title: "",
      content: "",
      file: "",
    }
  },
  computed:
      mapState([
        'post',
        'user',
        'contentRules'
      ]),

  methods: {
    fileHandler() {
      this.file = this.$refs.file.files[0];
    }
  },
  mounted() {
    this.$store.dispatch('getPost', this.$route.params.id);
  },
}

</script>

<style scoped>
.v-card > *:first-child:not(.v-btn):not(.v-chip):not(.v-avatar) {
  word-break: break-word;
}

.modify {
  position: relative;
}


</style>