<script setup lang="ts">
import { ref } from 'vue';
import SearchInput from 'components/forms/SearchInput.vue';
import BrandLogo from 'components/BrandLogo.vue';
import NotificationMenu from 'components/NotificationMenu.vue';
import ProfileMenu from 'components/ProfileMenu.vue';
import NavMenu from 'components/NavMenu.vue';
import BaseModal from 'components/modal/BaseModal.vue';

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-white text-black">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <BrandLogo />
        </q-toolbar-title>
        <div class="row q-gutter-sm">
          <div class="gt-sm">
            <SearchInput />
          </div>
          <NotificationMenu />
          <ProfileMenu />
        </div>
      </q-toolbar>
      <q-toolbar
        class="bg-white text-black"
        style="border: 1px solid rgba(0, 0, 0, 0.106)"
      >
        <div>
          <NavMenu title="Admin Users">
            <q-item clickable v-close-popup>
              <q-item-section>
                <router-link
                  :to="{ name: 'admin.adminUsers.index' }"
                  class="text-black"
                  style="text-decoration: none"
                  >Admin Users</router-link
                >
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>
                <router-link
                  :to="{ name: 'admin.roles.index' }"
                  class="text-black"
                  style="text-decoration: none"
                  >Roles</router-link
                >
              </q-item-section>
            </q-item>
          </NavMenu>
          <NavMenu title="Help Center">
            <q-item style="padding: 0">
              <q-item-section style="padding: 0">
                <q-btn
                  class="text-black"
                  label="Knowledgebase"
                  unelevated
                  icon-right="chevron_right"
                  style="width: 100%; text-transform: none"
                >
                  <q-menu
                    anchor="center right"
                    style="border-radius: 14px; border-top: 4px solid black"
                  >
                    <q-list style="min-width: 100px" dense>
                      <q-item clickable v-close-popup>
                        <q-item-section>
                          <router-link
                            :to="{
                              name: 'admin.knowlegebase.content.index',
                            }"
                            class="text-black"
                            style="text-decoration: none"
                            >Content</router-link
                          >
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>
                          <router-link
                            :to="{
                              name: 'admin.knowlegebase.category.index',
                            }"
                            class="text-black"
                            style="text-decoration: none"
                            >Categories</router-link
                          >
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>
                <router-link
                  :to="{
                    name: 'admin.supportTicket.index',
                  }"
                  class="text-black"
                  style="text-decoration: none"
                  >Support ticket</router-link
                >
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>
                <router-link
                  :to="{
                    name: 'admin.contactMessage.index',
                  }"
                  class="text-black"
                  style="text-decoration: none"
                  >Contact Messages</router-link
                >
              </q-item-section>
            </q-item>
          </NavMenu>
          <NavMenu title="Blogs">
            <q-item clickable v-close-popup>
              <q-item-section>
                <router-link
                  :to="{
                    name: 'admin.blogs.index',
                  }"
                  class="text-black"
                  style="text-decoration: none"
                  >Blog Posts</router-link
                >
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>
                <router-link
                  :to="{
                    name: 'admin.blogs.category.index',
                  }"
                  class="text-black"
                  style="text-decoration: none"
                  >Contact Messages</router-link
                >
              </q-item-section>
            </q-item>
          </NavMenu>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      :behavior="'mobile'"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <BaseModal />
  </q-layout>
</template>
