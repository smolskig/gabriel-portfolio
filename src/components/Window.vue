<script setup lang="ts">
import { Ref, ref, defineProps } from 'vue'
import { WindowItem } from "../App.vue"

import textFileIcon from "../assets/file_text_icon.png"
import projectFileIcon from "../assets/file_icon.png"
import folderIcon from "../assets/folder_icon.png"

const props = defineProps(["windowParams", "openWindow"])
const collapsed: Ref<boolean> = ref(false)

const toggleCollapse = () => {
    collapsed.value = !collapsed.value
}

const openItem = (listItem: WindowItem) => {
    if (listItem.contentType === "project") {
        return window.open(listItem.projectUrl, "_blank")?.focus()
    }

    return props.openWindow(listItem)
}

const iconsMap: any = {
    "project": projectFileIcon,
    "grid": folderIcon,
    "textFile": textFileIcon
}

</script>

<template>
    <div class="window-container" :class="{ 'window-collapsed': collapsed }" v-drag="{ handle: `#${windowParams.id}` }">
        <div class="topbar">
            <div class="action-btn-wrapper" :id="windowParams.id">
                <div class="action-btn"></div>
                <div class="action-btn"></div>
            </div>
            <span class="window-title" :id="windowParams.id">{{ windowParams.title || 'Window' }}</span>
            <div class="collapse-window-btn" @click="toggleCollapse"></div>
        </div>

        <div class="content">
            <ul v-if="windowParams.contentType == 'list'" class="list-content">
                <li v-for="listItem in windowParams.content" :key="listItem.id" @click="openItem(listItem)">
                    <img :src="iconsMap[listItem.contentType]" alt="list-item-icon">
                    {{ listItem.title }}
                </li>
            </ul>

            <div v-if="windowParams.contentType == 'grid'">
                <div class="grid-container">
                    <div v-for="item in windowParams.content" :key="item.id" class="grid-item" @click="openItem(item)">
                        <img :src="iconsMap[item.contentType] || iconsMap[windowParams.contentType]"
                            alt="grid-item-icon" />
                        <span>{{ item.title }}</span>
                    </div>
                </div>
            </div>

            <div v-if="windowParams.contentType == 'textFile'" v-html="windowParams.content" class="text-content">
            </div>
        </div>

    </div>
</template>

<style scoped>
.window-container {
    display: flex;
    flex-direction: column;
    min-width: 350px;
    min-height: 200px;
    width: fit-content;
    height: 200px;

    border: 4px solid black;
    z-index: 10;
    box-sizing: border-box;

    background: var(--bg-color);
    resize: both;
    overflow: auto;
}

.window-container::-webkit-resizer {
    background-color: transparent;
}

.window-container .topbar {
    position: absolute;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    align-items: center;
    gap: 10px;
    padding: 0 10px;
    width: 100%;
    height: 30px;
    border-bottom: 4px solid var(--border-color);
    box-sizing: border-box;
}

.window-container .content {
    position: relative;
    overflow: auto;
    margin-top: 30px;
    padding: 15px 20px 0 20px;
    height: 100%;
    width: 100%;
}

.action-btn-wrapper {
    display: flex;
    gap: 5px;
}

.action-btn {
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background-color: var(--border-color);
}

.collapse-window-btn {
    display: flex;
    justify-content: center;
    justify-self: flex-end;
    align-items: center;
    height: 100%;
    width: 10px;
}

.collapse-window-btn::after {
    content: "";
    height: 4px;
    width: 10px;
    background-color: var(--border-color);
}

.collapse-window-btn:hover {
    cursor: pointer;
}

.close-window-btn {
    cursor: pointer;
}

.window-collapsed {
    height: 34px !important;
    min-height: 0 !important;
    transition: height .1s ease-in-out;
    overflow: hidden;
    resize: none;
}

.window-collapsed .content {
    display: none;
}

/*GRID Layout*/
.grid-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
}

.grid-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    cursor: pointer;
}

.grid-item img {
    display: flex;
    width: 35px;
}

.grid-item span {
    max-width: 80px;
    word-break: break-all;
    text-align: center;
}

/*LIST Layout */
.list-content {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.list-content li {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 15px;
    cursor: pointer;
}

.list-content li img {
    width: 24px;

}

/*Text file layout */
.text-content {
    position: absolute;
    left:20px;
    right: 20px;
    height: 100%;
    margin-top: -18px;
}
</style>