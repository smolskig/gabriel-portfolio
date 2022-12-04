<script setup lang="ts">
import { reactive } from "vue";
import ProfilePicture from "./components/ProfilePicture.vue"
import Window from "./components/Window.vue"


export interface WindowItem {
  id: string;
  title: string;
  contentType?: string;
  projectUrl?: string;
  type?: string;
  content?: any[];
  initialPositionClass: string;
  width?: number;
  height?: number;
  zIndex: number;
}

const personalInfo: WindowItem = reactive({
  id: "personal-window",
  title: "Personal Info",
  contentType: "list",
  content: [
    {
      id: "about-me",
      content: `<p>Hey! my name is Gabriel Smolski da Rosa, I’m 21 Years old.</p>
                <p>born and living in Brazil, more specifically on the south of the country in a city called Campo Bom in the State of Rio Grande do Sul</p>
                <p>I love technology, mainly the frontend part of it, and the games industry as well.</p>
                <p>I am a drummer, passionate about music and art in general.</p>
               `,
      contentType: "textFile",
      title: "About_me.txt",
      initialPositionClass: "text-window-style",
    },
  ],
  initialPositionClass: "personal-window-style",
  zIndex: 0
})

const windowsList: WindowItem[] = reactive([
  {
    id: "tech",
    title: "Technologies",
    contentType: "grid",
    content: [
      {
        id: "vue",
        title: "Vue",
        contentType: "list",
        content: [
          {
            title: "cat_facts.git",
            contentType: "project",
            projectUrl: "https://github.com/smolskig/cat-fact",
            initialPositionClass: "open-window-style",
          },
        ],
        initialPositionClass: "open-window-style",
        zIndex: 0
      },
      {
        id: "react",
        title: "React",
        contentType: "list",
        content: [
          {
            title: "marvel_games_ecommerce.git",
            contentType: "project",
            projectUrl: "https://github.com/smolskig/marvel-game-ecommerce"
          },
          {
            title: "microfrontend_webpack5.git",
            contentType: "project",
            projectUrl: "https://github.com/smolskig/micro-frontend-webpack5.git"
          },
          {
            title: "react_antd_boilerplate.git",
            contentType: "project",
            projectUrl: "https://github.com/smolskig/react-antd-boilerplate"
          },
          {
            title: "react_boilerplate.git",
            contentType: "project",
            projectUrl: "https://github.com/smolskig/React-boilerplate"
          },
        ],
        initialPositionClass: "open-window-style",
        zIndex: 0
      },
      {
        id: "node",
        title: "Node",
        contentType: "list",
        content: [
          {
            title: "d&d_spells_api.git",
            contentType: "project",
            projectUrl: "https://github.com/smolskig/api-magias-dnd"
          },
          {
            title: "discord_spells_bot.git",
            contentType: "project",
            projectUrl: "https://github.com/smolskig/discord-spells-bot"
          },
          {
            title: "email_api.git",
            contentType: "project",
            projectUrl: "https://github.com/smolskig/email-api"
          },
          {
            title: "micro_frontend_nginx.git",
            contentType: "project",
            projectUrl: "https://github.com/smolskig/micro-frontend-nginx"
          },
        ],
        initialPositionClass: "open-window-style",
        zIndex: 0
      },
      {
        id: "css",
        title: "CSS",
        contentType: "list",
        content: [
          {
            title: "nft_preview_card_css.git",
            contentType: "project",
            projectUrl: "https://github.com/smolskig/nft-preview-card-component"
          },
        ],
        initialPositionClass: "open-window-style",
        zIndex: 0
      },

    ],
    initialPositionClass: "tech-window-style",
    zIndex: 0
  },
])

let openedWindow: any = reactive({ file: null, text: null })

const openNewWindow = (windowItem: WindowItem): void => {
  windowItem.contentType === "textFile" ?
    openedWindow.text = windowItem
    :
    openedWindow.file = windowItem
}

const onWindowClick = (id: string) => {
  personalInfo.zIndex = personalInfo.id === id ? personalInfo.zIndex = 1 : personalInfo.zIndex = 0
  windowsList.forEach((item) => {
    item.id === id ? item.zIndex = 1 : item.zIndex = 0
  })
}

const getWindowClass = (windowItem: WindowItem) => {
  return (windowItem.zIndex ? 'index-1' : 'index-0') + ` ${windowItem.initialPositionClass || 'open-window-style'}`
}
</script>

<template>
  <div class="content-wrapper">
    <div class="container">
      <div class="main-grid">
        <div class="grid-col">
          <ProfilePicture></ProfilePicture>

        </div>
        <div class="grid-col">
          <div class="page-title">
            <h1>Gabriel Smolski</h1>
            <h4>Frontend Developer</h4>
          </div>
          <Window v-for="windowItem in windowsList" :windowParams="windowItem" class="position-absolute"
            :class="getWindowClass(windowItem)" @mousedown="onWindowClick(windowItem.id)" :openWindow="openNewWindow" />

          <Window class="position-absolute" :windowParams="personalInfo" :class="getWindowClass(personalInfo)"
            @mousedown="onWindowClick(personalInfo.id)" :openWindow="openNewWindow" />


        </div>
        <div class="grid-col">
          <Window v-if="openedWindow.file" :windowParams="openedWindow.file" class="position-absolute"
            :class="(getWindowClass(openedWindow.file))" @mousedown="onWindowClick(openedWindow.file.id)"
            :openWindow="openNewWindow" />
          <Window v-if="openedWindow.text" :windowParams="openedWindow.text" class="position-absolute"
            :class="getWindowClass(openedWindow.text)" @mousedown="onWindowClick(openedWindow.text.id)"
            :openWindow="openNewWindow" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.personal-window-style {
  top: 350px;
  left: 0;
  min-width: 450px;
}

.tech-window-style {
  top: 130px;
  left: 0;
  min-width: 450px;
}

.favorite-window-style {
  top: 350px;
  left: 0;
  min-width: 450px;
}

.open-window-style {
  top: 130px;
  left: -40px;
  min-width: 450px;
}

.text-window-style {
  top: 350px;
  left: -40px;
  min-width: 450px;
  min-height: 385px;
}

.index-1 {
  z-index: 1;
}

.index-0 {
  z-index: 0;
}

.position-absolute {
  position: absolute;
}

.content-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1440px;
  height: 100%;
  padding: 0 20px;
}

.main-grid {
  display: flex;
  gap: 60px;
  margin-top: 100px;
  height: 100%;
}

.grid-col {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  height: 100%;
}

.page-title {
  display: flex;
  flex-direction: column;
  text-align: start;
  margin-bottom: 50px;
  width: 100%;
}

.page-title h1 {
  font-size: 50px;
}

.page-title h4 {
  font-size: 20px
}
</style>
