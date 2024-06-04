<script setup>

/*import router from './././main.js'*/
</script>

<template>
<body class="signInPage">
  <div class="background-image">
    <HeaderComponent/>
    <BackComponent />
    
  <div class="styled-div">
    <h1 class="response">Login</h1>
    <div class="textFieldObjekte">
      <p class="response">Login-ID</p>
      <input type="text" class="credentials response" v-model="username">
      <p>Passwort</p>
      <input type="password" class="credentials response" v-model="password">
    </div>
      <div class="buttonContainer">
      <button class="clickLogin" @click="login">Einloggen</button>
      <button class="clickLogin" id="buttonRegister" @click="register">Registrieren</button>
      <RouterLink to="/recipe" class="button link">Login</RouterLink>
    </div>
</div>
</div>
</body>
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
template{
  overflow: hidden
}
.styled-div{
    position: relative;
    top: 2rem;
    border-radius: 1rem;
    margin: auto;
    width: 30rem;
    height: 25rem;
    font-size: 30px;
    color: white;
    text-align: center;
    font-weight: bold;
    background-color: hsl(99, 58%, 69%, 0.85);
}
p.response{
  size: 2rem;
}


input.credentials {
    top: 50%;
    background-color: #FFFFF0;
    border: 2px solid hsl(99, 58%, 69%, 0.85);
    border-radius: 1rem;
    font-size: 30px;
    display: flex;
    margin: auto;
    padding: 0.8rem 2.5rem;
    width: 90%;
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
    border: 2px solid hsl(99, 58%, 69%, 0.85);
    font-size: 3rem;
    font-display: inherit;
    height: fit-content;
    width: fit-content;
    margin: auto;
    display: block;
    margin-bottom: 7%;
}
#buttonRegister{
    font-size: 20px;
    width: -10%;
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
    background-position: left top;
    background-repeat: no-repeat;
    height: 120rem;
    width: 100%;
    opacity: 85%;
    overflow: hidden
}
.signInPage{
  overflow: hidden; 
}
</style>
