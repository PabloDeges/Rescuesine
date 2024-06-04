<script setup>
import RecipeComponent from '@/components/RecipeComponent.vue';

</script>

<template>
    <RecipeComponent></RecipeComponent>
    <div class="RecipeDetails">
        <div class="descContainerWrapper">
            <div class="descContainer">
            <h2 class="ingredients">Zutaten</h2>
                <div class="ingredientList">
                    <p>400g Hackfleisch <br>2TL Salz<br>2TL Pfeffer<br>Bratfett</p>
                </div>
                <h2 class="zubereitung_titel">Zubereitung</h2>
                    <p class="preparation"> blablablablablablablablal bablablablabalbalbalababblablablabla lbablablablabla 1. Den gefrorenen Rahmspinat im Topf auf mittlerer Hitze erwärmen und einige Minuten köcheln lassen. Mit Pfeffer abschmecken.</p>
        </div>
        </div>
    </div>
</template>
<style>

.descContainerWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;


}

.descContainer {
    width: 70%;
}

.descContainer h2{
    text-align: center;
    font-weight: bold;
    font-size: 200%;
    padding-top: 20px
}
.descContainer p{
    text-align: center;
    font-size: 140%
}

.recipeShortInformation{
    height: 40%;
    margin: auto;
}
.textInformationRecipe{
    size: 20%;
    padding-right: 4%;
}
.recipeIconInfos{
    padding-left: 4%
}

.preparation {
    margin-bottom: 6rem;
    /* width: 60%; */
}
</style>