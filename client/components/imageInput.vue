<script setup lang="ts">
defineProps<{
  name: string,
  error?: string
  url?: string
}>()

const inputref = ref(null) as unknown as globalThis.Ref<HTMLInputElement>
const previewImageRef = ref(null) as unknown as globalThis.Ref<HTMLImageElement>


function previewSelectedImage() {
  const file = (inputref.value.files as any)[0];
  if (file && ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(file.type)) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e: any) {
      previewImageRef.value.src = e.target.result as string;
    }
  }
}

</script>

<template>
  <div>
    <div
      class="w-52 h-52 bg-base-200 rounded-lg overflow-hidden flex flex-col justify-center items-center border border-base-300">
      <label for="imageInput" class="cursor-pointer">
        <img ref="previewImageRef" alt="Preview" style="max-width: 200px; max-height: 200px;" :src="url
          ?? '~/assets/images/sample-dp.png'">
      </label>
      <div class="hidden">
        <FormKit type="file" ref="inputref" id="imageInput" :name="name" class="hidden" accept=".jpg,.jpeg,.png,.webp"
          @change="previewSelectedImage" />
      </div>
      <p class="pt-2 text-base-400">Upload Image</p>
      <br>
    </div>
    <span class="text-red-500">{{ error }}</span>
  </div>
</template>
