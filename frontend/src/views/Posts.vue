<template>
  <v-container>
    <!--<div v-for="post in posts" :key="post.id">{{ post.title }}</div>-->

      <div class="postContainer" v-for="post in posts" :key="post.id">
        <v-card

            flat
            hover
            class="blue-grey lighten-5 mx-auto"
            max-width="800"
            elevation="5"
            height="100%"
        >
          <v-card-title class="justify-center">{{ post.title }}</v-card-title>
          <v-card-subtitle>par {{ post.User.username }} le {{ post.createdAt | formatDateHour }}
            <v-avatar size="70">
              <v-img :src="post.User.avatar" />
            </v-avatar>
          </v-card-subtitle>
          <v-row>
          <v-col md8 sm12>
          <v-card-text class="postText ">{{ post.content }}</v-card-text>
          </v-col>
           <v-col>
            <v-img class="postImage xs12" src="https://via.placeholder.com/250" />
           </v-col>
          </v-row>
          <v-divider />
          <div v-if="post.Comments.length !== 0" class="commentSection">
            <h4>Commentaires :</h4>
          <div v-for="comment in post.Comments" :key="comment.id" class="comment lighten-5">
            {{comment.content}} <span class="author">par {{comment.User.username}}</span> à {{comment.createdAt}}
          </div>
          </div>
        </v-card>

      </div>




  </v-container>

</template>

<script>
import {mapState} from "vuex";
import moment from "moment";

export default {
  name: "Posts.vue",
  state () {
    return {

    }
  },
  computed:
    mapState(['posts']),

  getTime(val) {
    const dateNow = moment.now();
    const value = moment(val);
    return dateNow.diff(value, 'days');
  },
  methods: {

  },
  mounted() {
    this.$store.dispatch('getAllPosts');
  }
}

</script>

<style lang="css">
.postContainer {

  margin : 20px auto;
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

.comment{
  width: 60%;
  min-height: 40px;
  background-color: #bbbbbb;
  margin: 5px auto;
  border-radius: 4px;
  color: #666;
}

.author {
  font-size: 0.7rem;
  color: #777777;
}
</style>