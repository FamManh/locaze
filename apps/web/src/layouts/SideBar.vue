
<script setup lang="ts">
import logo from "../assets/logo.svg"

import AvatarDefaultURL from '../assets/images/Avatar.png'

import dashboardIcon from '../assets/icons/dashboard.svg'
import eventTypesIcon from '../assets/icons/event_types.svg'
import bookingsIcon from '../assets/icons/bookings.svg'
import availabilityIcon from '../assets/icons/availability.svg'
import appsIcon from '../assets/icons/apps.svg'
import settingsIcon from '../assets/icons/settings.svg'
import menuIcon from '../assets/icons/menu.svg'
import AccountSettingsIcon from '../assets/icons/account_settings.svg'
import { ref } from 'vue'

const isShowMenu = ref(false)

const toggleMenu = () => {
  isShowMenu.value = !isShowMenu.value
}

</script>

<template>
  <nav
    class="flex flex-row md:flex-col justify-between items-center md:items-start gap-2 p-4 md:h-screen md:min-w-[223px] shadow-md">
    <span class="md:hidden cursor-pointer" @click="toggleMenu">
      <img :src="menuIcon" alt="Menu Icon" />
    </span>
    <div>
      <router-link to="/" class="text-primary-500">
        <div class="w-32 relative"><img :src="logo" alt="logo" /></div>
      </router-link>
    </div>
    <ul class="hidden md:block flex-grow">
      <li>
        <router-link to="/" class="flex items-center space-x-2 text-neutral-500 py-2">
          <span class="min-w-[20px]"><img :src="dashboardIcon" alt="Dashboard Icon" /></span>
          <span>Dashboard</span>
        </router-link>
      </li>
      <li>
        <router-link to="/event-types" class="flex items-center space-x-2 text-neutral-500 py-2">
          <span class="min-w-[20px]"><img :src="eventTypesIcon" alt="Dashboard Icon" /></span>
          <span>Event types</span>
        </router-link>
      </li>
      <li>
        <router-link to="/bookings" class="flex items-center space-x-2 text-neutral-500 py-2">
          <span class="min-w-[20px]"><img :src="bookingsIcon" alt="Dashboard Icon" /></span>
          <span>Bookings</span>
        </router-link>
      </li>
      <li>
        <router-link to="/availability" class="flex items-center space-x-2 text-neutral-500 py-2">
          <span class="min-w-[20px]"><img :src="availabilityIcon" alt="Dashboard Icon" /></span>
          <span>Availability</span>
        </router-link>
      </li>
      <li>
        <router-link to="/apps" class="flex items-center space-x-2 text-neutral-500 py-2">
          <span class="min-w-[20px]"><img :src="appsIcon" alt="Dashboard Icon" /></span>
          <span>Apps</span>
        </router-link>
      </li>
      <li>
        <router-link to="/settings" class="flex items-center space-x-2 text-neutral-500 py-2">
          <span class="min-w-[20px]"><img :src="settingsIcon" alt="Dashboard Icon" /></span>
          <span>Settings</span>
        </router-link>
      </li>
    </ul>
    <div class="flex gap-2 items-center md:w-full">
      <div class="rounded-full">
        <img :src="AvatarDefaultURL" alt="Avatar" />
      </div>
      <div class="flex-grow hidden md:block">
        <div class="text-sm text-primary-500 font-semibold">
          Alex Fisher
        </div>
        <div class="text-xs font-normal text-primary-100">
          locaze.site/alex
        </div>
      </div>
      <div class="hidden md:block">
        <img :src="AccountSettingsIcon" alt="Account Settings" />
      </div>
    </div>
  </nav>
</template>

<style lang="css" scoped></style>