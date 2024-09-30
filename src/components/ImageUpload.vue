<template>
  <div
    class="upload-container relative bg-gray-40 p-6 rounded-lg shadow-md w-screen max-w-sm mx-auto flex flex-col items-center mt-96"
  >
    <h2 class="text-xl font-semibold mb-4 text-gray-800">이미지 업로드</h2>
    <input
      type="file"
      @change="handleFileChange"
      class="file-input mb-3 p-2 border border-gray-300 rounded-md w-full cursor-pointer"
      multiple
    />
    <div
      v-if="previewImages.length > 0"
      class="preview-container w-full h-40 mb-4 flex overflow-hidden items-center justify-center border-gray-300 rounded-md"
    >
      <img
        v-for="(image, index) in previewImages"
        :key="index"
        :src="image"
        alt="미리보기 이미지"
        class="w-1/3 h-full object-cover"
      />
    </div>
    <button
      @click="handleImageUpload"
      class="upload-button bg-green-600 text-white py-2 px-4 rounded-md mt-3 transition duration-300 hover:bg-green-700"
    >
      업로드
    </button>
    <p v-if="message" class="upload-message mt-4 text-sm text-red-500">
      {{ message }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import { handleFileChange, handleImageUpload } from "../utils/imageUtils";

export default defineComponent({
  setup() {
    const selectedFiles: Ref<File[]> = ref([]); // 타입 정의
    const previewImages: Ref<string[]> = ref([]); // 타입 정의
    const message: Ref<string> = ref("");

    return {
      previewImages,
      message,
      handleFileChange: (event: Event) =>
        handleFileChange(event, selectedFiles, previewImages, message),
      handleImageUpload: () => handleImageUpload(selectedFiles, message),
    };
  },
});
</script>
