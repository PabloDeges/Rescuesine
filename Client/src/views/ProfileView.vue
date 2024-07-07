<script setup>
import { ref, onMounted } from 'vue'
import CardComponent from '../components/CardComponentSmall.vue'

import { useRouter } from 'vue-router'

const router = useRouter()

let fav_recipes = ref([])
let own_recipes = ref([])
let username = ref()
let joindate = ref()


function logout() {
  document.cookie = "resc_user_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  router.push("/");
}


function fetchProfileRecipes() {
  fetch("http://127.0.0.1:3000/profile/" , {
    headers: {
            'Authorization': `Bearer ${document.cookie.split("=")[1]}`
        },})
  .then(response => {
    if (!response.ok) {
      throw new Error("Keine gueltige Antwort erhalten");
    }
    return response.json();
  })
  .then(data => {
    username.value = data["name"];
    joindate.value = data["joinDate"]
    own_recipes.value = data["pub"];
    fav_recipes.value = data["saves"];

  })
  .catch(error => {
    console.error("Fehler", error);
  })
}

onMounted( () => fetchProfileRecipes());



</script>


<template>

    <div class="profile_container">
      <button @click="logout()" class="logout_button">Ausloggen</button>
        <div class="username_box">
          <h1 class="username">{{ username }}</h1>
          <div class="user_desc_box">
            <div class="joindate_box">
              <img src="../assets/time_icon.png" alt="" class="user_icon"> 
              <p class="joindate">Beigetreten am {{ joindate}}</p>
            </div>
          </div>
        </div>
        <div class="section">
            <h2 v-if="own_recipes.length == 1" class="section_title"> {{ own_recipes.length }} veröffentlichtes Rezept</h2>
            <h2 v-else class="section_title"> {{ own_recipes.length }} veröffentlichte Rezepte</h2>
            <div v-if="own_recipes" class="recipe_card_list">
                <CardComponent class="card_component_profileview"
                v-for="r in own_recipes"
                :_id = "r._id"
                :recipe_title="r.name"
                :recipe_author="r.creatorname"
                :recipe_price="r.pricecategory"
                :recipe_time="r.preparationtime"
                :recipe_image="r.picture"
                />
            </div>
        </div>
        <div class="section lastsection">
          <h2 v-if="fav_recipes.length == 1" class="section_title"> {{ fav_recipes.length }} favorisiertes Rezept</h2>
            <h2 v-else class="section_title"> {{ fav_recipes.length }} favorisierte Rezepte</h2>

            <div class="recipe_card_list">
                <CardComponent class="card_component_profileview"
                v-for="r in fav_recipes"
                :_id = "r._id"
                :recipe_title="r.name"
                :recipe_author="r.creatorname"
                :recipe_price="r.pricecategory"
                :recipe_time="r.preparationtime"
                :recipe_image="r.picture"
                />
            </div>

        </div>
        
    </div>

</template>

<style scoped>

.logout_button {
  background-color: var(--color-red);
  color: white;
  border-radius: 0.5rem;
  padding: 0.5rem;
  width: 6rem;
  border: 2px solid var(--color-red);
  font-weight: bold;
  font-size: 0.8rem;
  margin-bottom: 1.5rem;

}
.logout_button:hover {
  color: var(--color-red);
  background-color: white;
  border-color: var(--color-red);

}

.lastsection {
  margin-bottom: 4rem;
}

.section_title {
  background-color: var(--color-red);
  color: white;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.username_box {
    background-color: var(--color-darkgreen);
    border-radius: 1rem;
    color: white;
    text-align: center;
    padding: 1rem ;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 30rem;

}
.username {
  font-size: 2.5rem;
  font-weight: bold;
}

.user_desc_box {
  background-color: white;
  border: 1px solid black;
  padding: 0.5rem 0.5rem;
  height: 3rem;
  width: 80%;

}
.user_icon {
  width: 1.2rem;
}
.joindate {
  color: black;
  font-size: 1rem;
  margin-left: 0.5rem;

}
.joindate_box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;

}

.profile_container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 2rem;
}

.section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 2rem;
}

  .recipe_card_list {
    
    width: 80vw;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

  }
    .card_component_profileview {
      margin: 1rem 0rem;
      max-width: calc(30% - 3vw);
      height: 30vh;
      
      
      /* min-width: 18rem; */
    }
  
  @media screen and (max-width: 750px) {
    .card_component_profileview {
      min-width: 80vw;
      min-height: 35vh;
    }
    .username_box {
      width: 100vw;
      border-radius: 0;
    }

    .profile_container {
    margin-top: 0;
}
.logout_button {
  margin-top: 1.5rem;
  width: 35%;
  height: 3rem;

}

  }

</style>