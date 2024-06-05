<script setup>
import { updateRecipesOnMainPage } from '../manageMainPageRecipes';
import { ref, onMounted } from 'vue';

window.addEventListener('load', function () {

  const filter = document.getElementById('filter');

  filter.addEventListener('click', show_filter_options);

  function show_filter_options() {
    let x = document.getElementById("filter_form_id");

    if (x.style.display === "flex") {
      x.style.display = "none";

    }
    else {
      x.style.display = "flex";
    }
  }

});

  let ingredient_list = [];

  function fetchIngredients() {
    fetch("http://127.0.0.1:3000/ingredient")
    .then(response => {
      if (!response.ok) {
        throw new Error("Keine gueltige Antwort erhalten");
      }
      return response.json();
    })
    .then(data => {
      for(let d in data) {
        ingredient_list.push(data[d].name);
      }
    })
    .catch(error => {
      console.error("Fehler", error);
    })
  }
  
  const selectedIngredients = ref([]);
  onMounted(() => fetchIngredients());

  function enableButton() {
    let x = document.getElementById('submit_button_id');
    x.classList.remove('disabled_button');
  }

  function disableButton() {
    let x = document.getElementById('submit_button_id');
    x.classList.add('disabled_button');
  }


  function search(input) {
    if (input.length < 1) { return [] }
    return ingredient_list.filter(ing => {
      return ing.toLowerCase()
        .startsWith(input.toLowerCase())
    })
  };  

function onSubmit(result) {

  enableButton();

  let ingredient = result;
  if (ingredient && !selectedIngredients.value.includes(ingredient)) {
    selectedIngredients.value.push(ingredient);
  }

   
};
    function removeIngredient(index) {
      selectedIngredients.value.splice(index, 1);
      if(selectedIngredients.value.length == 0) {
        disableButton();
      }
    };

    function submitForm() {
      // Send the selectedIngredients array to the backend
      fetch("http://127.0.0.1:3000/recipe/filtered", {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(selectedIngredients.value)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Keine gueltige Antwort erhalten");
        }
        return response.json();
      })
      .then(data => {
        updateRecipesOnMainPage(data);
      })
      .catch(error => {
        console.error("Fehler", error);
      })
    };

    

</script>

<template>
  <div class="container">
    <div class="filter_button_container">
      <div class="filter_button" id="filter">
        <i class="fa-solid fa-sliders"></i>
        <p>Zutaten filtern</p>
      </div>
    </div>
  </div>
  <div class="filter_form" id="filter_form_id">
    <div class="filter_form_center">
      <div class="selected-ingredients">
        <span v-for="(ingredient, index) in selectedIngredients" :key="index" class="ingredient-tag">
          {{ ingredient }}
          <span class="remove-ingredient" @click="removeIngredient(index)">x</span>
        </span>
      </div>

      <div class="center">
        <div class="ingredient-search"> 
          <autocomplete :search="search" class="search_bar_filters" placeholder="Zutat suchen" autoSelect=True submitOnEnter=True id="filter_autocomplete_bar" @submit="onSubmit"></autocomplete>
      </div>


      <button @click="submitForm" class="disabled_button submit_button" id="submit_button_id">Rezepte Filtern</button>
    </div>
      </div>
  </div>
</template>


<style scoped>


#filter_form_id {
  display: none;
  align-items: center;
  justify-content: center;
}

.filter_button_container {
  height: 5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0 4rem;
}

.filter_button {
  width: 11rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-red);
  padding: 1rem 1.5rem;
  color: white;
  font-weight: bold;
  border-radius: 1rem;
  text-align: center;

}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.filter_button:hover {
  background-color: rgb(210, 49, 49);
  cursor: pointer;
}

.selected-ingredients {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

}

.ingredient-tag {
  color: white;
  display: inline-block;
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--color-red);
  border-radius: 1rem;

}

.remove-ingredient {
  margin-left: 1rem;
  cursor: pointer;
  color: white;
}

.ingredient-search {
  margin-bottom: 1rem;

}
.search_bar_filters {
  width: 40vw;
  min-width: 20rem;
}



.submit_button {
  color: white;
  font-weight: bold;
  border: 2px solid transparent;
  background-color: var(--color-darkgreen);
  padding: 0.8rem 1rem;
  border-radius: 1rem;
  margin: 1rem 0;
}
.submit_button:hover {
  color: var(--color-darkgreen);
  font-weight: bold;
  background-color: white;
  border: 2px solid var(--color-darkgreen);
}

.disabled_button {
  background-color: grey;
  color: white;
  border: 1px solid grey;
}

.disabled_button:hover {
  background-color: grey;
  color: white;
  border: 1px solid grey;
}



@media screen and (max-width: 750px) {
  .filter_button_container {
    justify-content: center;
  }


}




</style>




