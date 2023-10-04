<script setup lang="ts">
const show = ref(false)
const target = ref(null)

onClickOutside(target, (event) => {
    show.value = !show.value
})


defineProps<{
    list: { name: string, link: string }[],
    title: string
}>()


</script>

<template>
    <div class="">
        <label class="btn btn-ghost  text-black btn-sm  m-1 relative" @click="show = !show">
            {{ title }}
        </label>
        <ul class=" shadow menu z-[1] bg-base-100 rounded-box w-48 border-t-4 border-black top-24 absolute animate-fade animate-once "
            v-if="show" ref="target">
            <li v-for="(li, i) in list">
                <NuxtLink :key="i" :href="li.link" class="text-sm" @click="show = !show">{{ li.name }}</NuxtLink>
            </li>

        </ul>
    </div>
</template>