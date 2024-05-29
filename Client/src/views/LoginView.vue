<script setup>

/*import router from './././main.js'*/

</script>

<template>
  <div class="background-image">
    <HeaderComponent/>
    <BackComponent />
  <div class="styled-div">
    <h1>Login</h1>
    <div class="textFieldObjekte">
      <p>Login-ID</p>
      <input type="text" class="credentials" v-model="username">
      <p>Passwort</p>
      <input type="password" class="credentials" v-model="password">
    </div>
      <div class="buttonContainer">
      <button class="clickLogin" @click="login">Einloggen</button>
      <button class="clickLogin" id="buttonRegister" @click="register">Registrieren</button>
    </div>
</div>
</div>
</template>


<script>
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

<style>
.styled-div{
    position: relative;
    top: 5%;
    border-radius: 1rem;
    margin: auto;
    width: 45vw;
    height: 32.5vw;
    font-size: 30px;
    color: white;
    text-align: center;
    font-weight: bold;
    background-color: hsl(99, 58%, 69%, 0.85);
}


input.credentials {
    top: 50%;
    background-color: #FFFFF0;
    border: #FFFFF0;
    border-radius: 1rem;
    font-size: 30px;
    display: flex;
    margin: auto;
    padding: 0.8rem 2.5rem;
    margin-bottom: 6%;
}
.credentials:hover {
    border: 2px solid var(--color-white);
    cursor: pointer;
}

div.styled-div{
    padding: 0.8rem 2.5rem;
    height: auto;

}
p.textFieldObjekte{
    font-size: 80%;
}
.clickLogin {
    background-color: var(--color-darkgreen);
    padding: 0.8rem 2.5rem;
    border-radius: 1rem;
    color: var(--color-white);
    font-weight: bold;
    border: var(--color-darkgreen);
    font-size: 40px;
    height: fit-content;
    width: fit-content;
    top: 5vw;
    margin: auto;
    display: block;
    margin-bottom: 7%;
}
#buttonRegister{
    font-size: 20px;
}
.clickLogin:hover {
    border: 2px solid var(--color-white);
    cursor: pointer;
}
.buttonContainer{
    padding: 2.8rem 1.8rem;
    margin: 1vw;
}
.background-image{
    background-image: url('../assets/hintergrundbild_Login.jpg');
    background-size: cover;
    background-position: center;
    /*background-repeat: no-repeat;*/
    height: 92.7vw;
    opacity: 85%;
}
</style>
