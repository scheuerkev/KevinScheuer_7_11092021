<template>
    <v-footer padless>
      <v-card flat tile width="100%" class="blue-grey darken-4 text-center">
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} | <strong>Groupomania</strong>
        </v-card-text>
      </v-card>
    </v-footer>
</template>

<script>
export default {
  name: "Footer.vue"
}
</script>

<style scoped>

</style>