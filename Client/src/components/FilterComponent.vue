<template>
    <div class="container">
        <div class="filter_button_container">
          <div class="filter_button" id="filter"> 
            <i class="fa-solid fa-sliders"></i>
            <p>Zutaten filtern</p>
          </div>
        </div>
        <div class="filter_options" id="filter_options">
          <!-- es werden am ende 4-5 zutaten pro reihe sein, nur ein placeholder -->
          <a id="zutatid" class="zutat" href="/">Beispielzutat 1</a>
          <a id="zutatid" class="zutat" href="/">Beispielzutat 2</a>
          <a id="zutatid" class="zutat" href="/">Beispielzutat 3</a>
          <a id="zutatid" class="zutat" href="/">Beispielzutat 4</a>
          <a id="zutatid" class="zutat" href="/">Beispielzutat 5</a>

        </div>      
        
    </div>

</template>

<script>
document.addEventListener('DOMContentLoaded', function() {

const filter = document.getElementById('filter');

filter.addEventListener('click', show_filter_options);

function show_filter_options() {
    let x = document.getElementById("filter_options");

        if (x.style.display === "block") {
            x.style.display = "none";

        } 
        else {
            x.style.display = "block";
        }
    }

});
</script>

<style scoped>
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
  .filter_button:hover {
    background-color: rgb(210, 49, 49);
    cursor: pointer;
  }

  .filter_options {
    display: none;
  }

  .zutat {
  color: rgb(255, 255, 255);
  background-color: var(--color-darkgreen);
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  font-weight: bold;
  display: block;
}

.zutat:hover {
  background-color: var(--color-white);
  color: var(--color-darkgreen);
}

  @media screen and (max-width: 750px) {
    .filter_button_container {
        justify-content: center;
    }
  }



</style>
