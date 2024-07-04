<template>            
    <div class="header">
            <RouterLink to="/" class="header_backtohome">
                <img src="../assets/logo.png" class="logo-img" alt="">
            </RouterLink>

            
            <h1 class="appname">RESCUESINE</h1>
            <autocomplete :search="search" class="search_bar_header" placeholder="Rezepte durchsuchen" autoSelect=True submitOnEnter=True @submit="onSubmit"></autocomplete>
            <div class="buttons">      

                <div class="button_container">
                    <RouterLink to="/recipe/create" class="button button_wide link">Rezept erstellen</RouterLink>
                </div>

                <div id="profile_btn" class="button_container">
                    <RouterLink v-if="cookieSet" to="/profile" class="button link">Profil</RouterLink>
                    <button v-else class="button link no_styling" @click="toggleLogin" >Login</button>
                </div>

                
                
                    
            </div>
        
        <div class="hamburger_container" >
            <img src="../assets/recipe_book_closed.png" class="logo_as_hamburger" alt="" id="hamburger">

        </div>
    </div>
    <div id="mobile_links">
        <RouterLink to="/" class="mobile_link">Home</RouterLink>
        <RouterLink to="/recipe/create" class="mobile_link">Rezept erstellen</RouterLink>
        <RouterLink v-if="cookieSet" to="/profile" class="mobile_link">Profil</RouterLink>
        <button v-else class="mobile_link mobile_login_btn" @click="toggleLogin" >Login</button>

    </div>      

    <LoginComponent class="login_window" id="login_id"></LoginComponent>

</template>

<script setup>


import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'

import LoginComponent from '../components/LoginComponent.vue'


function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

let cookieSet = getCookie("resc_user_token")

function toggleLogin() {
    let x = document.getElementById("login_id");

    if (x.style.display === "flex") {
      x.style.display = "none";

    }
    else {
      x.style.display = "flex";
    }
}


const router = useRouter()

//get recipes from backend
// durch fetch all recipes ersetzen oder async probieren
// man braucht titel zum autofillen und id um bei klick das richtige rezept zu öffnen
let recipes = [];
let recipesWithIds = []

function fetchRecipes() { 
fetch("http://127.0.0.1:3000/recipe/all")
.then(response => {
    if (!response.ok) {
    throw new Error("Keine gueltige Antwort erhalten");
    }
    return response.json();
})
.then(data => {
    recipesWithIds = data;
    for(let d in data) {
    recipes.push(data[d].name);
    }
})
.catch(error => {
    console.error("Fehler ", error);
})
}

onMounted( () => fetchRecipes() );




function search(input) {
  if (input.length < 1) { return [] }
  return recipes.filter(recipe => {
    return recipe.toLowerCase()
      .startsWith(input.toLowerCase())
  })
};  

function getIdByName(name) {
  const item = recipesWithIds.find(item => item.name === name);
  return item ? item._id : null; 
}

function onSubmit(result) {
    
    let selectedRecipe = result;
    let selectedRecipeID = getIdByName(selectedRecipe)

    router.push('/recipe/'+ selectedRecipeID)

};




</script>

<script>


// remove or change when login functionality is added => if logged in -> show profile, if not show login
document.addEventListener('DOMContentLoaded', function() {
    
    window.addEventListener("resize", checkForMobileButtonsStillVisible);

    const hamburger = document.getElementById('hamburger');
    const mobile_links = document.getElementById("mobile_links");
   
    hamburger.addEventListener('click', toggle_mobile_links);
    mobile_links.addEventListener('click', toggle_mobile_links);

    // const button1 = document.getElementById('login_btn');
    // const button2 = document.getElementById('profile_btn');
   
    // button1.addEventListener('click', toggleButtons);
    // button2.addEventListener('click', toggleButtons);  

    // function toggleButtons() {
    //     if (button1.classList.contains('hidden')) {
    //         button1.classList.remove('hidden');
    //         button2.classList.add('hidden');
    //     } else {
    //         button1.classList.add('hidden');
    //         button2.classList.remove('hidden');
    //     }
    // }



    function checkForMobileButtonsStillVisible() {
        let x = document.getElementById("mobile_links");
        if(window.innerWidth >= 750) {
            x.style.display = "none";
        }
    }   


    function toggle_mobile_links() {
    
        let hamburger = document.getElementById("hamburger");
        let x = document.getElementById("mobile_links");
            if (x.style.display === "block") {
                x.style.display = "none";
                hamburger.src = "src/assets/recipe_book_closed.png";
            } 
            else {
                x.style.display = "block";
                hamburger.src = "src/assets/recipe_book_opened.png";
            }
        }
});


</script>


<style scoped>  


.login_window {
    position: fixed;
    z-index: 999;
  left: 0; 
  right: 0; 
  top: 25vh;
  margin-left: auto; 
  margin-right: auto; 
  width: 25rem; /* Need a specific value to work */
  display: none;
}

.no_styling {
    color: white;
    background-color: var(--color-darkgreen);
    border: none;
    font-family: "Josefin Sans", sans-serif;
}

.link {
    text-decoration: none;
    color: white;
}


.header {
    display: flex;
    align-items: center;
    justify-content:space-between;
    background-color: var(--color-lightgreen);
    width:100%;
    height:6rem;
}

.logo-img {
    width: 6rem;
    height: 6rem;
    background-color: var(--color-white);


}
.logo-img:hover {
    background-color: var(--color-darkgreen);
}
.appname {
    font-weight: bold;
    font-size: 2vw;
    color: white;
    width: 15%;

}



.search_bar_header {
    height: 3.5rem;
    width: 40%;
    color: var(--color-grey);


}


.button {
    font-weight: bold;
    font-size: 1.1vw;
    white-space: nowrap;
    overflow: hidden;
}

.button_container {
    color: var(--color-white);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-darkgreen);
    padding: 0.8rem 0.8rem;
    border-radius: 1rem;
    max-width: 80%;
    min-width: 2rem;
    margin-left: 1vw;
    white-space: nowrap;
    overflow: hidden;
    border-style:solid;
    border: 2px solid var(--color-darkgreen);
    height: 100%;
}

.button_container:hover {
    border: 2px solid var(--color-white);
    cursor: pointer;
}
.buttons {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 50%;
    width: 25%;
    padding-right: 3%;
}


.mobile_link {
  color: rgb(255, 255, 255);
  background-color: var(--color-darkgreen);
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  font-weight: bold;
  display: block;
}

.hamburger_container, #mobile_links {
    display: none;
    
}


.hidden {
    display: none;
}

.header_backtohome {
    padding: 0;
    margin: 0;
    text-decoration: none;
    height: 100%;
}



/* RESPOSIVE STUFF */
@media screen and (max-width: 750px) {

    .appname, .logo-img, .button, .buttons{
        visibility: hidden;
        display: none;
        width: 0;
        height: 0;
    }
    .search_bar_header {
        margin-left: 5%;
        margin-right: 5%;
        width: 90%;
    } 
    .hamburger_container {
        height: 6rem;
        width: 8rem;
        visibility: visible;
        display: block;
        background-color: var(--color-white);
        margin-left: auto;
        padding: 0;
    }
    .hamburger_container:hover {
        background-color: var(--color-darkgreen);
    }
    .logo_as_hamburger {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    .mobile_link:hover {
        background-color: var(--color-lightgreen);
        color: white;
    }
    .header {
        width: 100%;
    }
    .mobile_login_btn {

        border: none;
        font-family: "Josefin Sans", sans-serif;
        display: block;
        width: 100%;
        text-align: start;
        padding-top: 1.2rem;
        padding-bottom: 1.2rem;

}


}

    
</style>


