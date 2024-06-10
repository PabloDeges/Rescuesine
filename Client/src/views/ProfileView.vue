<script setup>
import CardComponent from '../components/CardComponentSmall.vue'

</script>

<script>
import { ref, onMounted } from 'vue'

const profile = ref();

export default {
  mounted() {
    const ident = this.$route.params.ident;
    console.log(ident);
  
    onMounted( fetch("http://127.0.0.1:3000/profile/"+ident)
  .then(response => {
    if (!response.ok) {
      throw new Error("Keine gueltige Antwort erhalten");
    }
    return response.json();
  })
  .then(data => {
    profile.value = data;
    console.log(profile)
    
  })
  .catch(error => {
    console.error("Fehler", error);
  }))
  }
}
</script>

<template>

    <div class="profile_container">
        <div class="username_box">
          <h1 v-if="profile" class="username">{{ profile.name }}</h1>
          <div class="user_desc_box">
            <div class="joindate_box">
              <img src="../assets/time_icon.png" alt="" class="user_icon"> 
              <p class="joindate">Beigetreten am 01.06.2024</p>
            </div>
          </div>
        </div>
        <div class="section">
            <h2 v-if="profile" class="section_title"> {{ profile.pub.length }} veröffentlichte Rezepte</h2>
            <div v-if="profile" class="recipe_card_list">
                <CardComponent class="card_component_profileview"
                v-for="r in profile.pub"
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
            <h2 v-if="profile" class="section_title">{{profile.saves.length }} Favorisierte Rezepte</h2>

            <div class="recipe_card_list">
                <CardComponent v-if="profile" class="card_component_profileview"
                v-for="r in profile.saves"
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

  }

</style>