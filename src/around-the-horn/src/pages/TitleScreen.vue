<template>
    <div class="title-screen-container d-flex justify-center align-center">
      <h1 class="mt-8 text-h1 text-center">Around the Horn</h1>
      <v-form ref="form" v-model="formValid" class="align-center my-12">
        <v-text-field
          label="Team Name"
          v-model="teamName"
          required
          :rules="[v => !!v || 'Team name is required']"
          class="my-4"
        ></v-text-field>
        <v-text-field
          label="Team Initials (3 letters)"
          v-model="teamInitials"
          width="800"
          required
          maxlength="3"
          :rules="[v => !!v && /^[A-Z]{3}$/.test(v) || 'Enter exactly 3 uppercase letters']"
          class="my-4"
          @input="teamInitials = teamInitials.toUpperCase()"
        ></v-text-field>
        <v-btn
          class="align-center mt-4"
          size="x-large"
          block
          :disabled="!formValid"
          @click="goToGame"
        >
          New Game
        </v-btn>
      </v-form>
    </div>
  </template>
  
  <script>
  export default {
    name: "TitleScreen",
    data() {
      return {
        teamName: "",
        teamInitials: "",
        formValid: false,
      };
    },
    methods: {
      goToGame() {
        if (this.formValid) {
          this.$router.push({
            path: "/game",
            query: { teamName: this.teamName, teamInitials: this.teamInitials },
          });
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .title-screen-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  </style>