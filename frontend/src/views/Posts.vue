<template>
  <v-container>
    <div class="postContainer" v-for="post in posts" :key="post.id">
      <v-card
          tile
          class="mx-auto"
          max-width="800"
          elevation="3"
          height="100%"
      >
        <button v-if="user.userId === post.UserId" class="postUpdate" @click="updatePost(post.id)">
          <i class="fas fa-edit"></i></button>
        <button v-if="user.userId === post.UserId" class="postDelete" @click="deletePost(post.id)">
          <i class="fas fa-times-circle"></i></button>
        <v-card-title class="justify-center">{{ post.title }}</v-card-title>
        <v-card-subtitle>par {{ post.User.username }} le {{ post.createdAt | formatDateHour }}
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
        <div v-if="post.Comments.length !== 0" class="commentSection">
          <div class="sendComment">
          <v-avatar><v-img :src="user.avatar"/></v-avatar>
          <v-text-field
              class="sendCommentInput"
              v-model="content"
              placeholder="Envoyez votre commentaire"
              type="email"
          />
            <v-btn class="sendCommentBtn" :disabled="!(content.length !== 0)" @click="sendComment(post.id)">Poster le commentaire</v-btn>

          </div>
          <hr>
          <div v-for="comment in post.Comments" :key="comment.id" class="comment">
            {{ comment.content }} <span class="author">par {{ comment.User.username }}</span> à {{ comment.createdAt }}
          </div>
        </div>
        <br>
      </v-card>

      <div class="addComment">
        Ajouter votre commentaire :
        <v-form>
          <v-textarea
              solo
              class="commentContent"
              v-model="content"
              placeholder="Qu'en avez-vous pensé ?"
              label="Contenu du commentaire"
              type="text"
              prepend-inner-icon="far fa-paper-plane"/>

          <v-btn :disabled="!(content.length !== 0)" @click="sendComment(post.id)">Poster le commentaire</v-btn>
        </v-form>
      </div>
      <!--      </v-card>-->
    </div>


  </v-container>

</template>

<script>
import {mapState} from "vuex";
import axios from "axios";

export default {
  name: "Posts.vue",
  data() {
    return {
      content: "",
    }
  },
  methods: {
    deletePost(val) {
      const userId = this.$store.state.user.userId;
      const token = localStorage.getItem('token');

      axios
          .delete(`http://localhost:3000/api/post/${val}/${userId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
              })
          .then(res => {
            console.log(res)
            this.$store.dispatch('getAllPosts');
          })
          .catch(err => console.log(err));

    },
    sendComment(val) {
      const token = localStorage.getItem('token');

      const payload = {
        userId: this.$store.state.user.userId,
        content: this.content,
      }

      axios
          .post(`http://localhost:3000/api/post/${val}/comment/`, payload,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
              })
          .then(res => {
            console.log(res);
            this.$store.dispatch('getAllPosts');
            this.content = "";
          })
          .catch(err => console.log(err))
    },
    updatePost(val) {
      this.$router.push(`/post/${val}`);
    }

  },
  computed:
      mapState(['posts', 'user']),

  mounted() {
    this.$store.dispatch('getAllPosts');
  }
}

</script>

<style lang="css">
.postContainer {
  position: relative;
  margin: 20px auto;
}

.postDelete {
  opacity: 0.8;
  position: absolute;
  right: 10px;
  top: 35px;
  color: #333;
  transition: opacity 450ms ease-in-out;
}

.postUpdate {
  opacity: 0.8;
  position: absolute;
  right: 8px;
  top: 10px;
  color: #333;
}

.postDelete:hover {
  opacity: 1;
}

.postUpdate:hover {
  opacity: 1;
}

.postDelete:hover::before {
  content: "Supprimer ce post";
  font-size: 0.7rem;
  margin-right: 5px;
}

.postUpdate:hover::before {
  content: "Éditer ce post";
  font-size: 0.7rem;
  margin-right: 5px;
}

.addComment {
  max-width: 800px;
  margin: 10px auto;
}

.postContent {
  display: flex;

}

.postText {
  text-align: justify;
}

.postImage {
  border-radius: 10px;
}

.comment {
  width: 95%;
  min-height: 40px;
  background-color: #EEEE;
  margin: 5px auto;
  color: #ccc;
}

.comment::after {
  content: "";
  width: 100%;
  border-bottom: 2px solid black;
}

.sendComment {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.author {
  font-size: 0.7rem;
  color: #777777;
}
.sendCommentInput {
  font-size: 0.8rem;
  width: 75%;
}

.sendComment > button {
  width:20px;
}

.commentContent {

}

.sendCommentBtn {

}

hr {
  margin: 10px auto 10px auto;
  width: 80%;
  border: 0;
  z-index: 9999;
  height: 1px;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.10), rgba(0, 0, 0, 0.3), rgba(255, 255, 255, 0.10));
}

</style>