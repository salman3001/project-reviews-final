<template>
  <nav class=" flex justify-between items-center px-6 sm:px-10 h-16 border-b">
    <div>
      <Brand />
    </div>
    <div class="flex gap-6 items-center">
      <AdminProfileMenu />
      <AdminNotificationMenu />
    </div>
  </nav>
  <nav class=" flex items-center px-6 sm:px-10 h-10 border-b">
    <div class="dropdown  dropdown-bottom">
      <label tabindex="0" class="btn btn-ghost  text-black btn-sm  m-1">
        Admin user
      </label>
      <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-48 border-t-4 border-black">
        <li><a class="text-sm">Users</a></li>
        <li><a class="text-sm">Roles & Permissions</a></li>
      </ul>
    </div>
    <div class="dropdown  dropdown-bottom ">
      <label tabindex="0" class="btn btn-ghost text-black btn-sm  m-1">
        Help Center
      </label>
      <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-48 border-t-4 border-black">
        <li>
          <a href="#" class="text-sm">
            knowledge Base
          </a>
        </li>
        <li>
          <a href="#" class="text-sm">
            Content
          </a>
        </li>
        <li>
          <a href="#" class="text-sm">
            Categories
          </a>
        </li>
        <li><a href="#" class="text-sm">Support Tickets</a></li>
        <li><a href="#" class="text-sm">Contact Messages</a></li>
      </ul>
    </div>
    <div class="dropdown  dropdown-bottom ">
      <label tabindex="0" class="btn btn-ghost text-black btn-sm  m-1 ">
        Blogs
      </label>
      <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-32 border-t-4 border-black">
        <li>
          <a href="#" class="text-sm">
            Blog Posts
          </a>
        </li>
        <li>
          <a href="#" class="text-sm">
            Categories
          </a>
        </li>
      </ul>
    </div>
  </nav>
  <div class="px-6 sm:px-10">
    <slot />
  </div>
  <footer class="footer">
  </footer>
</template>