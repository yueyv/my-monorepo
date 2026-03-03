<template>
  <div class="flex flex-col items-center">
    <Menu>
      <MenuButton
        class="w-40 bg-blue-400 hover:bg-blue-600 h-10 border-0 rounded-md p-2 text-white font-bold transition-all duration-300 hover:scale-115 hover:shadow-lg hover:translate-y-2"
        >More</MenuButton
      >
      <MenuItems>
        <MenuItem v-slot="{ active }">
          <a :class="{ 'bg-blue-500': active }" href="/account-settings"> Account settings </a>
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <a :class="{ 'bg-blue-500': active }" href="/account-settings"> Documentation </a>
        </MenuItem>
        <MenuItem disabled>
          <span class="opacity-75">Invite a friend (coming soon!)</span>
        </MenuItem>
      </MenuItems>
    </Menu>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
</script>
