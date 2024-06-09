
<template>

  <div class="container center">
    <div class="login_card center">
      <!-- <h1 class="login_title">LOGIN</h1> -->
      <div class="username input_combo center">
        <label for="input_username" class="label">Username</label>
        <input type="text" name="input_username" class="login_input username">
      </div>
      <div class="password input_combo center">
        <label for="input_password" class="label">Passwort</label>
        <input type="password" name="input_password" class="login_input password">
      </div>
      <button class="login_button" @click="tryLogin()">Login</button>
      <a href="/" class="register_link">Noch kein Konto? Registriere dich hier</a>

    </div>

  </div>

</template>

<style scoped>


  .center {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
  }

  .login_card {
    margin-top: 15vh;
    background-color: var(--color-lightgreen);
    padding: 2rem 4rem;
    border-radius: 1rem;
    width: 30rem;
    height: 30rem;
    color: white;

  }

  .login_title {
    font-weight: bold;
    margin-bottom: 2rem;
    font-size: 2.5rem;
  }

  .label {
    font-weight: bold;
    font-size: 1.5rem;
  }
  
  .login_button {
    background-color: var(--color-darkgreen);
    border-radius: 1rem;
    border: 2px solid white;
    color: white;
    font-weight: bold;
    font-size: 1.4rem;
    padding: 0.5rem 1rem;
    width: 50%;
    cursor: pointer;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  .login_button:hover {
    background-color: white;
    color: var(--color-darkgreen);
    border-color: var(--color-darkgreen);
  }

  .login_input {
    width: 100%;
    padding: 1rem;
    border-radius: 1rem;
    border: 2px solid white;
    font-weight: bold;
    font-size: 0.8rem;
  }
  .register_link {
    color: rgb(42, 126, 47);
    background-color: transparent;
  }

  .register_link:hover {
    color: white;
  }

  .input_combo {
    width: 80%;
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 750px) {

    .container {
      background-color: var(--color-lightgreen);
      height: 90vh
    }
    .login_button {
      margin-top: 4rem;
    }
    .register_link {
      margin-bottom: 40vh;
    }
    .login_card {
      width: 100%;
    }
    
  }


</style>

<script setup>

  function tryLogin() {
    alert("Nutzername und Passwort stimmen nicht überein!");
  }

</script>




