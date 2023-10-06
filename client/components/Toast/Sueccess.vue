<script setup lang="ts">
defineProps<{
    message: string
}>()
</script>
        
<template>
    <div class="flex gap-4 w-full h-full bg-green-500 bg-opacity-20 text-black py-2.5 px-4">
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 1024 1024">
                <path fill="#22c55e"
                    d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896zm-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z" />
            </svg>
        </span>
        <p class="text-xs font-semibold whitespace-normal pt-0.5">{{ message }}
        </p>
    </div>
</template>