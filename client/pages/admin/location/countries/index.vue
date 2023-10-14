<script setup lang="ts">
import useModalStore from "~/store/useModalStore";

definePageMeta({
  layout: "admin-layout",
});

const modal = useModalStore();

const { $listen, $unlisten } = useNuxtApp();

const page = ref(1);
const search = ref("");
const continentId = ref(null);

const {
  result: records,
  pending,
  refresh,
} = await useGet("/address/countries", {
  page,
  search,
  continentId
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
    <h1 class="text-3xl font-bold">Countries</h1>
    <div class="flex flex-wrap gap-4 justify-between mt-8">
      <div>
        <AdminSearchInput @search="(v) => {
          page = 1;
          search = v;
        }
          " />
      </div>
      <div class="flex flex-wrap-reverse gap-4">
        <select class="select select-bordered select-sm" onchange="" name="isActive" v-model="continentId"
          @change="page = 1">
          <option :value="null">Continent</option>
          <option v-for="c in records?.continents" :key="c.id" :value="c.id">{{ c.name }}</option>
          <option value="0">Inactive</option>
        </select>
        <button class="btn btn-primary btn-sm" @click="modal.togel('addCountry')">
          + Add Country
        </button>
      </div>
    </div>
    <div class="overflow-x-scroll scrollbar-hide pb-16 mt-8 border rounded-xl">
      <table class="table table-zebra mt-6 p x-4">
        <thead>
          <tr>
            <th>SNo.</th>
            <th>Name</th>
            <th>Continent</th>
            <th class="w-16">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="records" v-for="(record, i) in records.countries.data" :key="record?.id">
            <td>
              {{
                (records.countries.meta.current_page - 1) * records.countries.meta.per_page +
                (i + 1)
              }}
            </td>
            <td class="flex items-center gap-2">
              <div class="flex-1 min-w-[20rem]">
                {{ record?.name }}
              </div>
            </td>
            <td class="">
              <div class="flex-1 min-w-[20rem]">
                {{ record?.continent?.name }}
              </div>
            </td>
            <td>
              <div class="dropdown dropdown-bottom">
                <label tabindex="0" class="btn btn-primary font-normal text-white btn-sm normal-case w-max gap-1">
                  Options
                </label>
                <ul class="p-1 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-32 border-t-4 border-black">
                  <li>
                    <button class="text-sm p-1" @click="
                      modal.togel('editCountry', {
                        id: record?.id,
                      })
                      ">
                      Edit
                    </button>
                  </li>
                  <li>
                    <button class="text-sm text-start p-1" @click="
                      modal.togel('delete', {
                        apiUrl: '/address/countries/' + record?.id,
                        tostMessage: 'Country deleted',
                        modalTitle: 'Delete Country',
                      })
                      ">
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
        <Pagination v-if="!pending" :meta="records.countries.meta" @pageChange="(p) => {
          page = p;
        }
          " />
      </ClientOnly>
    </div>
  </section>
</template>
