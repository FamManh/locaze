<script setup lang="ts">
import { RouterView } from 'vue-router'
import SideBar from './layouts/SideBar.vue'
</script>

<template>
  <div class="flex flex-col md:flex-row">
    <header>
      <SideBar/>
    </header>
    <RouterView class="flex-grow"/>
  </div>
</template>