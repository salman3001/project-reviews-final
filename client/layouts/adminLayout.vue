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
    <AdminNavDropdown
      title="Admin User"
      :list="[
        {
          name: 'Admin User',
          link: '/admin/admin-users',
        },
        { name: 'Roles', link: 'admin/roles' },
      ]"
    />
    <AdminNavDropdown
      title="Help Center"
      :list="[
        {
          name: 'Knowledge Base',
          link: '',
        },
        { name: ' Content', link: '' },
        { name: 'Categories', link: '' },
      ]"
    />
    <AdminNavDropdown
      title="Blogs"
      :list="[
        {
          name: 'Blog Posts',
          link: '',
        },
        { name: 'Blog Categories', link: '' },
      ]"
    />
  </nav>
  <div class="px-6 sm:px-10">
    <slot />
  </div>
  <footer class="footer"></footer>
</template>
