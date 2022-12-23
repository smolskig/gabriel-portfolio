<script setup lang="ts">
</script>

<template>
    <div class="profile-container">
        <img src="../assets/profile.jpg" alt="profile-picture">
        <!-- <button class="download-cv-btn">Download CV</button> -->
    </div>
</template>

<style scoped>
.profile-container {
    position: relative;
    width: 300px;
    height: 470px;
    margin: 20px;
    background: var(--bg-color);

    z-index: 0;
}

.profile-container::before {
    content: "";
    position: absolute;
    top: -27px;
    left: -35px;

    height: 100%;
    width: 100%;

    border: 4px solid var(--border-color);
    background: var(--bg-color);


    z-index: -1;
}

.profile-container::after {
    content: "";
    position: absolute;
    bottom: -27px;
    right: -35px;

    height: 100%;
    width: 100%;
    box-sizing: border-box;
    border: 4px solid var(--border-color);
    background-image: url("../assets/circular-pattern.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: left 2px bottom 2px;
    z-index: -1;
}

.profile-container img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border: 4px solid var(--border-color);
    z-index: 2;
}
.download-cv-btn {
    position: absolute;
    bottom: 13px;
    right: 13px;
    height:44px;
    width: 144px;
    border: 4px solid var(--border-color);
    font-weight: bold;
    font-family: 'JetBrains Mono', monospace;
    font-size: 15px;
    transition: filter .1s ease-in-out;
}

.download-cv-btn:hover {
    filter: brightness(90%);
    cursor: pointer;
}
</style>
