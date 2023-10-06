<script setup lang="ts">

onMounted(() => {
  useToastListner()
})

onUnmounted(() => {
  useToastUnListner()
})

</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ClientOnly>
      <Modal />
    </ClientOnly>
  </div>
</template>
