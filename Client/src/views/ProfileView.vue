<script setup>
import { ref } from 'vue'
import CardComponent from '../components/CardComponentSmall.vue'
import FilterComponent from '../components/FilterComponent.vue'

let json_data = {
  data: [{"recipe_title" : "Fischstäbchen mit Kartoffelpüree",
  "recipe_author" : "manfred_kocht33",
  "recipe_price" : "10",
  "recipe_time" : "120"},

  {"recipe_title" : "Butter Chicken mit Knoblauchnaan",
  "recipe_author" : "liselotte1990",
  "recipe_price" : "20",
  "recipe_time" : "40"},

]
}

const recipes = ref([
  {recipe_title: json_data.data[0].recipe_title, recipe_author: json_data.data[0].recipe_author, recipe_price: json_data.data[0].recipe_price, recipe_time: json_data.data[0].recipe_time },
  {recipe_title: json_data.data[1].recipe_title, recipe_author: json_data.data[1].recipe_author, recipe_price: json_data.data[1].recipe_price, recipe_time: json_data.data[1].recipe_time },
  {recipe_title: json_data.data[0].recipe_title, recipe_author: json_data.data[0].recipe_author, recipe_price: json_data.data[0].recipe_price, recipe_time: json_data.data[0].recipe_time },
  {recipe_title: json_data.data[1].recipe_title, recipe_author: json_data.data[1].recipe_author, recipe_price: json_data.data[1].recipe_price, recipe_time: json_data.data[1].recipe_time },
  {recipe_title: json_data.data[0].recipe_title, recipe_author: json_data.data[0].recipe_author, recipe_price: json_data.data[0].recipe_price, recipe_time: json_data.data[0].recipe_time },
  {recipe_title: json_data.data[1].recipe_title, recipe_author: json_data.data[1].recipe_author, recipe_price: json_data.data[1].recipe_price, recipe_time: json_data.data[1].recipe_time },
  {recipe_title: json_data.data[0].recipe_title, recipe_author: json_data.data[0].recipe_author, recipe_price: json_data.data[0].recipe_price, recipe_time: json_data.data[0].recipe_time },
  {recipe_title: json_data.data[1].recipe_title, recipe_author: json_data.data[1].recipe_author, recipe_price: json_data.data[1].recipe_price, recipe_time: json_data.data[1].recipe_time },

])

// ersetzen durch api calls wenn ready
</script>


<template>

    <div class="profile_container">
        <h1 class="username">Profil von: PeterKocht_23</h1>
        <div class="section">
            <h2> 8 veröffentlichte Rezepte</h2>

            <div class="recipe_card_list">
                <CardComponent class="card_component_profileview"
                v-for="r in recipes"
                :recipe_title="r.recipe_title"
                :recipe_author="r.recipe_author"
                :recipe_price="r.recipe_price"
                :recipe_time="r.recipe_time"
                />
            </div>
        </div>
        <div class="section">
            <h2> 22 favorisierte Rezepte</h2>

            <div class="recipe_card_list">
                <CardComponent class="card_component_profileview"
                v-for="r in recipes"
                :recipe_title="r.recipe_title"
                :recipe_author="r.recipe_author"
                :recipe_price="r.recipe_price"
                :recipe_time="r.recipe_time"
                />
            </div>

        </div>
        
    </div>

</template>

<style scoped>

.username {
    background-color: var(--color-darkgreen);
    padding: 0.2rem 1.5rem;
    border-radius: 1rem;
    color: white;
    text-align: center;

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
  }

</style>