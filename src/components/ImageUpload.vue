<template>
  <div
    class="upload-container relative bg-gray-40 p-6 rounded-lg shadow-md w-screen max-w-3xl mx-auto flex flex-col items-center mt-96"
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
      class="preview-container max-w-3xl mb-4 flex overflow-hidden items-center justify-center border-gray-300 rounded-md relative"
    >
      <img
        v-for="(image, index) in previewImages"
        :key="index"
        :src="image"
        alt="미리보기 이미지"
        class="w-1/3 h-full object-cover"
        @click="selectImage(index)"
      />
    </div>

    <canvas
      v-if="selectedImage"
      :width="canvasWidth"
      :height="canvasHeight"
      class="cropCanvasClass border border-gray-300 mb-4 max-w-2xl"
    ></canvas>

    <button
      v-if="selectedImage"
      @click="cropImage"
      class="crop-button bg-blue-600 text-white py-2 px-4 rounded-md mt-3 transition duration-300 hover:bg-blue-700"
    >
      이미지 편집하기
    </button>

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
    const selectedFiles: Ref<File[]> = ref([]);
    const previewImages: Ref<string[]> = ref([]);
    const selectedImage: Ref<string | null> = ref(null);
    const message: Ref<string> = ref("");
    const canvasWidth = 800;
    const canvasHeight = 600;

    const selectImage = async (index: number) => {
      if (previewImages.value[index]) {
        selectedImage.value = previewImages.value[index];
        console.log("Selected Image:", selectedImage.value);
        await loadImageToCanvas(selectedImage.value);
      }
    };

    const loadImageToCanvas = async (imageSrc: string) => {
      const cropCanvas = document.querySelector(
        ".cropCanvasClass"
      ) as HTMLCanvasElement; // HTMLCanvasElement로 타입 단언
      if (cropCanvas) {
        cropCanvas.width = canvasWidth;
        cropCanvas.height = canvasHeight;
        const ctx = cropCanvas.getContext("2d");

        if (ctx) {
          const img = new Image();
          img.src = imageSrc;

          img.onload = () => {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
          };
        }
      }
    };

    const cropImage = () => {
      const cropCanvas = document.querySelector(
        ".cropCanvasClass"
      ) as HTMLCanvasElement; // HTMLCanvasElement로 타입 단언
      if (cropCanvas) {
        const ctx = cropCanvas.getContext("2d");
        if (ctx) {
          const croppedImage = cropCanvas.toDataURL();
          previewImages.value = [croppedImage];
          selectedImage.value = null;
        } else {
          message.value = "캔버스의 컨텍스트를 가져오는 데 실패했습니다.";
        }
      } else {
        message.value = "캔버스가 초기화되지 않았습니다.";
      }
    };

    return {
      previewImages,
      selectedImage,
      message,
      handleFileChange: (event: Event) =>
        handleFileChange(event, selectedFiles, previewImages, message),
      handleImageUpload: () => handleImageUpload(selectedFiles, message),
      selectImage,
      cropImage,
      canvasWidth,
      canvasHeight,
    };
  },
});
</script>
