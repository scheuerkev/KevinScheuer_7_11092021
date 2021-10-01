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
        <v-card-subtitle>par {{post.User.username}} le {{ post.createdAt | formatDateHour }}
          <v-avatar size="70">
            <v-img :src="post.User.avatar"/>
          </v-avatar>
        </v-card-subtitle>
        <v-row>
          <v-col>
            <v-card-text class="postText">{{ post.content }}</v-card-text>
            <v-img v-if="post.image !== null" class="postImage" :src="post.image"/>
          </v-col>
        </v-row>
      </v-card>

      <div class="addComment">
        Éditer le post
        <v-form>
          <v-text-field
            solo
            v-model="user.username"
            :rules="usernameRules"
            label="Nom d'utilisateur"
            type="text"
            prepend-icon="fas fa-user-edit" />
          <v-textarea
              solo
              v-model="content"
              placeholder="Qu'en avez-vous pensé ?"
              label="Contenu du commentaire"
              type="text"
              prepend-icon="far fa-paper-plane"/>
          <input
              type="file"
              ref="file"
              name="file"
              id="file"
              @change="fileHandler">Mettre à jour l'image>


          <v-btn @click="updatePost()">Mettre à jour le post</v-btn>
        </v-form>
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
      title:"",
      content:"",
      file:"",
    }
  },
  computed:
      mapState(['post', 'user']),
  mounted() {
        this.$store.dispatch('getPost', this.$route.params.id);
  },
}

</script>

<style scoped>

</style>