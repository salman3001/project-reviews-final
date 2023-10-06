<script setup lang="ts">
import { FormKitContext } from "@formkit/core";

const props = defineProps<{ context: FormKitContext["props"]['context'] }>()

const previewImageRef = ref(null) as unknown as globalThis.Ref<HTMLImageElement>

function previewSelectedImage(e) {

  const file = (e.target.files as any)[0];
  if (file && ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(file.type)) {
    props?.context?.node.input(e?.target?.files[0])
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
        <img ref="previewImageRef" alt="Preview" style="max-width: 200px; max-height: 200px;" :src="props?.context?.url as string
          ?? '~/assets/images/sample-dp.png'">
      </label>
      <div class="hidden">
        <input name="image" id="imageInput" ref="inputref" type="file" class="hidden" accept=".jpg,.jpeg,.png,.webp"
          @input="(e) => {
            previewSelectedImage(e)
          }" />
      </div>
      <p class="pt-2 text-base-400">Upload Image</p>
      <br>
    </div>
  </div>
</template>
