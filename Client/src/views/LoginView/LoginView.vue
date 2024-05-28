<script setup>

import BackComponent from '../../components/BackButtonComponent.vue'
/*import router from './././main.js'*/

</script>

<template>
    <HeaderComponent/>
    <BackComponent />
    <div class="background-image">
  <div class="styled-div">
    <h1>Login</h1>
    <div class="credentials">
      <input type="text" v-model="username" placeholder="Login-ID">
      <input type="password" v-model="password" placeholder="Passwort">
    </div>
    <button class="clickLogin" @click="login">Einloggen</button>
    <button class="clickLogin" @click="register">Registrieren</button>
  </div>
</div>
</template>


<script>
  import './loginView.css';
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      // Login Logik hier rein
      if (this.username === "admin" && this.password === "passwort") {
        alert("Login erfolgreich");
        router.push
      } else {
        alert("Falsche Benutzerdaten");
      }
    },
    register(){
      //Logik fuer Registrierung hier rein
      alert("Bald kann man sich hier registrieren")
    }
  }
};
</script>
