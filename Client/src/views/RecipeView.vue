<script setup>
import RecipeComponent from '@/components/RecipeComponent.vue';

</script>

<template>
    <RecipeComponent></RecipeComponent>
    <div class="RecipeDetails">
        <div class="ingredientContainer">
            <h2 class="ingredients">Zutaten</h2>
                <div class="ingredientList">
                    <p>400g Hackfleisch <br>2TL Salz<br>2TL Pfeffer<br>Bratfett</p>
                </div>
                <h2 class="preperation">Zubereitung</h2>
                <p>1. Wasser mit Salz aufsetzen, derweil Kartoffeln schälen und in kleine Stücke schneiden. 
Die Kartoffeln nun ins Wasser geben und weich kochen. Die Butter hinzu geben und mit einem         Stampfer vermengen und zerstampfen, mit Salz und Pfeffer abschmecken.</p>
                    <p>2. Eine Pfanne mit Butter erhitzen und gefrorene Fischstäbchen hinzugeben. 
So lange braten bis die Fischstäbchen goldbraun angebraten sind. Optional mit Salz und Zitrone verfeinern.</p>
                        <p>3. Den gefrorenen Rahmspinat im Topf auf mittlerer Hitze erwärmen und einige Minuten köcheln lassen. Mit Pfeffer abschmecken.</p>
        </div>
    </div>
</template>
<style>
.ingredientContainer h2{
    text-align: center;
    font-weight: bold;
    font-size: 200%;
    padding-top: 20px
}
.ingredientContainer p{
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
</style>