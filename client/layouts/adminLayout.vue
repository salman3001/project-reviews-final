<script setup lang="ts">
definePageMeta({
  middleware: "admin-auth",
});
</script>

<template>
  <nav class="flex justify-between items-center px-6 sm:px-10 h-16 border-b">
    <div>
      <Brand />
    </div>
    <div class="flex gap-6 items-center">
      <AdminNotificationMenu />
      <AdminProfileMenu />
    </div>
  </nav>
  <nav class="flex items-center px-6 sm:px-10 h-10 border-b">
    <AdminNavDropdown>
      <template #button="{ togel }">
        <label class="btn btn-ghost text-black btn-sm m-1 relative" @click="togel">Admin Users</label>
      </template>
      <template #default="{ togel }">
        <li>
          <NuxtLink href="/admin/admin-users" class="text-sm" @click="togel">Admin User</NuxtLink>
        </li>
        <li>
          <NuxtLink href="/admin/roles" class="text-sm" @click="togel">Roles</NuxtLink>
        </li>
      </template>

    </AdminNavDropdown>
    <AdminNavDropdown>
      <template #button="{ togel }">
        <label class="btn btn-ghost text-black btn-sm m-1 relative" @click="togel">Help center</label>
      </template>
      <template #default="{ togel }">
        <li>
          <AdminNavDropdown position="right">
            <template #button="{ togel }">
              <NuxtLink href="" class="text-sm" @mouseover="togel">Knowledge Base</NuxtLink>
            </template>
        <li>
          <NuxtLink href="/admin/help-center/content" class="text-sm" @click="togel">Content</NuxtLink>
        </li>
        <li>
          <NuxtLink href="/admin/help-center/support-ticket" class="text-sm" @click="togel">Categories</NuxtLink>
        </li>
    </AdminNavDropdown>
    </li>
    <li>
      <NuxtLink href="/admin/help-center/contact-message" class="text-sm" @click="togel">Contact Message</NuxtLink>
    </li>
    <li>
      <NuxtLink href="/admin/roles" class="text-sm" @click="togel">Support Tickets</NuxtLink>
    </li>

    </template>
    </AdminNavDropdown>
    <AdminNavDropdown>
      <template #button="{ togel }">
        <label class="btn btn-ghost text-black btn-sm m-1 relative" @click="togel">Blogs</label>
      </template>
      <template #default="{ togel }">
        <li>
          <NuxtLink href="/admin/blogs/blog-posts" class="text-sm" @click="togel">Blog Posts</NuxtLink>
        </li>
        <li>
          <NuxtLink href="/admin/blogs/categories" class="text-sm" @click="togel">Blog Categories</NuxtLink>
        </li>
      </template>
    </AdminNavDropdown>
    <AdminNavDropdown title="Location" :list="[
      {
        name: 'Continents',
        link: '/admin/location/continents',
      },
      {
        name: 'Countries',
        link: '/admin/location/countries',
      },
      {
        name: 'States',
        link: '/admin/location/States',
      },
      {
        name: 'Cities',
        link: '/admin/location/Cities',
      },
      {
        name: 'Streets',
        link: '/admin/location/Streets',
      },
    ]">
      <template #button="{ togel }">
        <label class="btn btn-ghost text-black btn-sm m-1 relative" @click="togel">Location</label>
      </template>
      <template #default="{ togel }">
        <li>
          <NuxtLink href="/admin/location/continents" class="text-sm" @click="togel">Continents</NuxtLink>
        </li>
        <li>
          <NuxtLink href="/admin/location/countries" class="text-sm" @click="togel">Countries</NuxtLink>
        </li>
        <li>
          <NuxtLink href="/admin/location/states" class="text-sm" @click="togel">States</NuxtLink>
        </li>
        <li>
          <NuxtLink href="/admin/blogs/cities" class="text-sm" @click="togel">Cities</NuxtLink>
        </li>
        <li>
          <NuxtLink href="/admin/blogs/streets" class="text-sm" @click="togel">Streets</NuxtLink>
        </li>
      </template>
    </AdminNavDropdown>
  </nav>
  <div class="px-6 sm:px-10">
    <slot />
  </div>
  <footer class="footer"></footer>
</template>
