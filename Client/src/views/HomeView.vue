<script setup>
import CardComponent from '../components/CardComponent.vue'
import FilterComponent from '../components/FilterComponent.vue'
import { onMounted } from 'vue';
import { getRecipesOnMainPage, updateRecipesOnMainPage } from "../manageMainPageRecipes"

function fetchMainPageRecipes() {
  fetch("http://127.0.0.1:3000/recipe")
  .then(response => {
    if (!response.ok) {
      throw new Error("Keine gueltige Antwort erhalten");
    }
    return response.json();
  })
  .then(data => {
    updateRecipesOnMainPage(data);
    console.log(data);
  })
  .catch(error => {
    console.error("Fehler", error);
  })
}

onMounted( () => fetchMainPageRecipes() );

const recipes = getRecipesOnMainPage();

</script>

<template>
    <FilterComponent />
    <div class="recipe_card_list">
    <CardComponent class="card_component"
        v-for="r in recipes"
        :_id = "r._id"
        :recipe_image="r.picture"
        :recipe_title="r.name"
        :recipe_author="r.creatorname"
        :recipe_price="r.pricecategory"
        :recipe_time="r.preparationtime"
    />
    </div>
</template>

<style scoped>

  .recipe_card_list {
    
    width: 80vw;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

  }
    .card_component {
      margin: 1rem 0rem;
      max-width: calc(50% - 3vw);
      
      /* min-width: 18rem; */
    }
  
  @media screen and (max-width: 750px) {
    .card_component {
      min-width: 80vw;
      min-height: 35vh;
    }
  }


</style>
