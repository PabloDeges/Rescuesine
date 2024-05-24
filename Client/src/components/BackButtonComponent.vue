<template>
    <div class="backbutton_container">
        <RouterLink to="/" class="backbutton">zurück zur Startseite</RouterLink>
    </div>
</template>

<style>
    .backbutton {
        text-decoration: underline;
        color: var(--color-darkgreen);
        font-weight: bold;
    }

    .backbutton_container {
        margin-bottom: 0.5rem;
        
    }
</style>