<template>
    <div class="card">
        
        <div class="img_and_title">
            <router-link :to="'/recipe/'+ _id">
                <img :src="recipe_image" alt="" class="recipe_image">
            </router-link>
            <h2 class="recipe_title">{{ recipe_title }}</h2>
        </div>
        
        <div class="metadata_box">
            <div class="author_box metadata">
                <img src="../assets/user_icon.png" alt="" class="icon_author icon">
                <p class="author meta_text">{{ recipe_author }}</p>
            </div>
            <div class="price_box metadata">
                <img src="../assets/price_icon.png" alt="" class="icon_price icon">
                <p class="price meta_text"> &lt; {{ recipe_price }}€</p>
            </div>
            <div class="time_box metadata">
                <img src="../assets/time_icon.png" alt="" class="icon_time icon">
                <p class="time meta_text"> &lt; {{ recipe_time }}m</p>
            </div>
        </div>
    </div>

    
</template>


<script setup>
    defineProps(['_id', 'recipe_title', 'recipe_image', 'recipe_author', 'recipe_price', 'recipe_time'])
</script>

<style scoped>  

    .card {
        padding: 1.5rem;
        padding-bottom: 1rem;
        background-color: white;
        border: 1px solid black;
        border-radius: 1rem;
        width: 35vw;
        height: 25vw;
        min-height: 12rem;
        min-width: 18rem;
    }
    .card:hover {
        cursor: pointer;
    }

    .recipe_image {
        width: 100%;
        height: 85%;
        object-fit: cover;
    }

    .recipe_title {
        font-weight: bold;
        font-size: 1.5vw;
    }
    .img_and_title {
        width: 100%;
        height: 90%;
    }

    .metadata_box {
        height: 10%;
        width: 100%;
        display: flex;
        align-items:center;
        
    }

    .icon {
        max-height: 60%;
        max-width: 60%;
        margin-right: 0.5rem;
    }
    .icon_time {
        max-height: 50%;
        max-width: 50%;
        object-fit:contain;
    }

    .metadata {
        display: flex;
        align-items: center;
        justify-content:flex-start;
        height: 100%;
        width: 100%;

    }

    .author_box {
        width: 60%;
        height: 100%;
    }
    .price_box {
        width: 20%;
        height: 100%;
    }
    .time_box {
        width: 20%;
        height: 100%;
    }

    .meta_text {
        color: var(--color-grey);
        font-size: 1.2vw;
    }

    @media screen and (max-width: 750px) {

        .recipe_title {
            font-size: 2.8vw;
        }

        .meta_text {
        font-size: 2vw;
    }

        .card {
            height: 50vw;
        }



    }
    

</style>


