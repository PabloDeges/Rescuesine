<template>
    <div class="login_card">
        <button @click="hideLoginWindow( )">X</button> 
        <h1 class="login_text">LOGIN</h1>
        <input type="text" id="username" placeholder="username" class="input_field">
        <input type="password" id="password" placeholder="passwort" class="input_field">
        <button @click="login()" class="login_button">Einloggen</button>
        <button @click="register()" class="login_button">Registrieren</button>
    </div>
</template>

<style>

.login_text {
    font-weight: bold;
    color: white;
}
    .input_field {
        padding: 1rem;
        border-radius: 1rem;
        border: 2px solid var(--color-darkgreen);
        margin-bottom: 1rem;
        width: 16rem;
    }


    .login_card {
        padding: 5rem;
        background-color: var(--color-lightgreen);
        border-radius: 1rem;
        border: 2px solid white;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .login_button {
        padding: 0.8rem;
        background-color: var(--color-darkgreen);
        border-radius: 0.8rem;
        border: 2px solid white;
        cursor: pointer;
        color: white;
        font-weight: bold;
        margin-bottom: 0.5rem;
        padding-left: 1rem;
        padding-right: 1rem;
        width: 8rem;
    }
    .login_button:hover {

        border: 2px solid var(--color-darkgreen);
        color: var(--color-darkgreen);
        background-color: white;

    }

    .register_button {
        background-color: white;
        border: 1px solid black;
        border-radius: 0.5rem;
    }


</style>

<script setup>


async function login() {

    let un = document.getElementById("username");
    let pw = document.getElementById("password");

    fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: un.value, password: pw.value })
})
.then(response => response.json())
.then(data => {if(data.token){
    document.cookie = 'resc_user_token=' + data.token; location.reload();}
    else {
        alert("Login Error")
    }}
    )
.catch(error => console.error(error));

    

    
}

function register() {

    let un = document.getElementById("username");
    let pw = document.getElementById("password");


    fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: un.value , password: pw.value })
})
.then(response => response.json())
.then(data => {if(data.token){
    document.cookie = 'resc_user_token=' + data.token; location.reload();}
    else {
        alert("Register Error")
    }})
.catch(error => console.error(error));



}

</script>