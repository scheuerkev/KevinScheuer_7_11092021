<template>
  <v-container>
    <div
        class="postContainer"
        v-for="post in posts"
        :key="post.id"
    >
      <v-card
          tile
          class="mx-auto"
          max-width="800"
          elevation="3"
          height="100%"
      >
        <button v-if="user.userId === post.UserId || user.isAdmin"
            class="postDelete"
            @click="deleteThisPost(post.id, user.userId)"
        >
          <i class="fas fa-times-circle"></i>
        </button>
        <button
            v-if="user.userId === post.UserId"
            class="postUpdate"
            @click="updatePost(post.id)"
        >
          <i class="fas fa-edit"></i>
        </button>
        <v-card-title class="justify-center">
          {{ post.title }}
        </v-card-title>
        <v-avatar size="60">
          <v-img :src="post.User.avatar"/>
        </v-avatar>
        <v-card-subtitle>
          par {{ post.User.username }} le {{ post.createdAt | formatDateHour }}
        </v-card-subtitle>
        <v-row>
          <v-col>
            <v-card-text class="postText">
              {{ post.content }}
            </v-card-text>
            <v-img
                v-if="post.image !== null"
                class="postImage"
                :src="post.image"
            />
          </v-col>
        </v-row>
      </v-card>
      <div class="sendComment">
        <v-avatar size="30">
          <v-img :src="user.image"/>
        </v-avatar>
        <v-text-field
            class="sendCommentInput"
            v-model="content"
            placeholder="Envoyez votre commentaire"
            type="email"
        />
      </div>
      <v-btn
          class="sendCommentBtn"
          :disabled="!(content.length !== 0)"
          @keyup.enter="createThisComment(post.id, content, user.userId)"
          @click="createThisComment(post.id, content, user.userId)"
      >
        Poster le commentaire
      </v-btn>
      <hr>
      <div
          v-if="post.Comments"
          class="commentSection"
      >
        <div
            v-for="comment in post.Comments"
            :key="comment.id"
            class="comment"
        >
          <span class="author">
            <v-avatar size="30">
              <v-img :src="comment.User.avatar"/>
            </v-avatar>
          par {{ comment.User.username }}
          </span>
          <i
              v-if="comment.User.id === user.userId || user.isAdmin"
              @click="deleteThisComment(comment.id, user.userId)"
              class="deleteComment fas fa-times"
          ></i>
          <span class="content">
            {{ comment.content }}
          </span>
        </div>
      </div>
    </div>
    <br>
  </v-container>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Posts.vue",
  data() {
    return {
      content: "",
    }
  },
  methods: {
    deleteThisPost(postId, userId) {
      this.$store.dispatch('deletePost', {postId, userId});
    },
    createThisComment(postId, content, userId) {
      this.$store.dispatch('createComment', {postId, content, userId});
      this.content = "";
    },
    updatePost(val) {
      this.$router.push(`/post/${val}`);
    },
    deleteThisComment(commentId, userId) {
      this.$store.dispatch('deleteComment', {commentId, userId});
    }

  },
  computed:
      mapState([
        'posts',
        'user'
      ]),

  mounted() {
    this.$store.dispatch('getAllPosts');
  }
}

</script>

<style lang="css">
.v-card__title {
  word-break: break-word;
  padding: 16px 30px;
}

.postContainer {
  position: relative;
  margin: 20px auto;
}

.postDelete {
  opacity: 0.8;
  position: absolute;
  right: 10px;
  top: 10px;
  color: #333;
  transition: opacity 450ms ease-in-out;
}

.postUpdate {
  opacity: 0.8;
  position: absolute;
  right: 8px;
  top: 35px;
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
  max-width: 500px;
  margin: 0 auto;
  object-fit: contain;

}

.comment {
  width: 95%;
  max-width: 600px;
  min-height: 70px;
  padding: 5px 5px;
  background-color: #EEEE;
  margin: 5px auto;
  border-radius: 2px;
  border: 1px solid #ccc;
  color: #ccc;
  position: relative;
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
  position: absolute;
  left: 5px;
}

.sendCommentInput {
  font-size: 0.8rem;
  width: 75%;
}

.sendComment > button {
  width: 20px;
}

.content {
  display: block;
  font-size: 0.9rem;
  color: #333;
  margin-top: 40px;
  text-align: left;
}

.deleteComment {
  position: absolute;
  right: 5px;
  top: 3px;
}

.deleteComment:hover {
  cursor: pointer;
}

.sendCommentBtn {

}

hr {
  margin: 10px auto 10px auto;
  width: 80%;
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.10), rgba(0, 0, 0, 0.3), rgba(255, 255, 255, 0.10));
}

</style>