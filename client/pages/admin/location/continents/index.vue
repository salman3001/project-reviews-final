<script setup lang="ts">
import useModalStore from "~/store/useModalStore";

definePageMeta({
  layout: "admin-layout",
});

const modal = useModalStore();

const { $listen, $unlisten } = useNuxtApp();

const page = ref(1);
const search = ref("");

const { result, pending, refresh } = await useGet("/address/continents", {
  page,
  search,
});

const reload = () => {
  refresh();
};

onMounted(() => {
  $listen("record:created", reload);
  $listen("record:updated", reload);
  $listen("record:deleted", reload);
});

onUnmounted(() => {
  $unlisten("record:created", reload);
  $unlisten("record:updated", reload);
  $unlisten("record:deleted", reload);
});
</script>
<template>
  <section class="my-8">
    <h1 class="text-3xl font-bold">Continents</h1>
    <div class="flex flex-wrap gap-4 justify-between mt-8">
      <div>
        <AdminSearchInput
          @search="
            (v) => {
              page = 1;
              search = v;
            }
          "
        />
      </div>
      <button
        class="btn btn-primary btn-sm"
        @click="modal.togel('addContinent')"
      >
        + Add Continent
      </button>
    </div>
    <div class="overflow-x-scroll scrollbar-hide pb-16 mt-8 border rounded-xl">
      <table class="table table-zebra mt-6 p x-4">
        <thead>
          <tr>
            <th>SNo.</th>
            <th>Name</th>
            <th class="w-16">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-if="result"
            v-for="(continent, i) in result.data"
            :key="continent?.id"
          >
            <td>
              {{
                (result.meta.current_page - 1) * result.meta.per_page + (i + 1)
              }}
            </td>
            <td class="flex items-center gap-2">
              <div class="flex-1 min-w-[20rem]">
                {{ continent?.name }}
              </div>
            </td>
            <td>
              <div class="dropdown dropdown-bottom">
                <label
                  tabindex="0"
                  class="btn btn-primary font-normal text-white btn-sm normal-case w-max gap-1"
                >
                  Options
                </label>
                <ul
                  class="p-1 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-32 border-t-4 border-black"
                >
                  <li>
                    <button
                      class="text-sm p-1"
                      @click="
                        modal.togel('editContinent', {
                          id: continent?.id,
                        })
                      "
                    >
                      Edit
                    </button>
                  </li>
                  <li>
                    <button
                      class="text-sm text-start p-1"
                      @click="
                        modal.togel('delete', {
                          apiUrl: '/address/continents/' + continent?.id,
                          tostMessage: 'Continent deleted',
                          modalTitle: 'Delete Continent',
                        })
                      "
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-4 flex justify-end">
      <ClientOnly>
        <Pagination
          v-if="!pending"
          :meta="result.meta"
          @pageChange="
            (p) => {
              page = p;
            }
          "
        />
      </ClientOnly>
    </div>
  </section>
</template>
