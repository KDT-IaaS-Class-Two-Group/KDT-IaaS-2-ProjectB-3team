<template>
  <div
    class="upload-container bg-gray-40 p-6 rounded-lg shadow-md max-w-sm max-h-52 mx-auto flex flex-col items-center mt-96"
  >
    <h2 class="text-xl font-semibold mb-4 text-gray-800">이미지 업로드</h2>
    <input
      type="file"
      @change="onFileChange"
      class="file-input mb-3 p-2 border border-gray-300 rounded-md w-full cursor-pointer"
    />
    <div class="flex gap-5">
      <button
        @click="uploadImage"
        class="upload-button bg-green-600 text-white py-2 px-4 rounded-md mt-3 transition duration-300 hover:bg-green-700"
      >
        업로드
      </button>

      <button
        @click="openReportModal"
        class="report-button bg-blue-600 text-white py-2 px-4 rounded-md mt-3 transition duration-300 hover:bg-blue-700"
      >
        이미지 제보
      </button>
    </div>

    <p v-if="message" class="upload-message mt-4 text-sm text-red-500">
      {{ message }}
    </p>

    <!-- 모달 구현 -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 shadow-lg w-2/3 text-center">
        <h3 class="text-lg font-semibold mb-4">
          제보하신 동물은 ‘고라니’입니다. 제보하시겠습니까?
        </h3>

        <!-- LocationComponent 추가 -->
        <LocationComponent />

        <div class="flex justify-center gap-4 mt-4">
          <button
            @click="confirmReport"
            class="bg-green-600 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-green-700"
          >
            제보하기
          </button>
          <button
            @click="closeReportModal"
            class="bg-red-600 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-red-700"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { uploadImageToBackend } from "../services/api";
import LocationComponent from "./location/LocationComponent.vue"; // LocationComponent 가져오기

export default defineComponent({
  components: {
    LocationComponent, // LocationComponent 등록
  },
  data() {
    return {
      selectedFile: null as File | null, // 파일 타입 명시
      message: "" as string, // 문자열 타입 명시
      isModalOpen: false, // 모달 가시성 상태
    };
  },

  methods: {
    onFileChange(event: Event) {
      const target = event.target as HTMLInputElement;
      this.selectedFile = target.files ? target.files[0] : null; // 파일 선택 처리
    },
    async uploadImage() {
      if (!this.selectedFile) {
        this.message = "이미지를 선택해주세요.";
        return;
      }
      try {
        const response = await uploadImageToBackend(this.selectedFile);
        this.message = response.data.message; // 백엔드에서 반환된 메시지 처리
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        this.message = "이미지 업로드에 실패했습니다.";
      }
    },
    openReportModal() {
      // 이미지 제보 모달 열기
      if (!this.selectedFile) {
        this.message = "제보할 이미지를 선택해주세요.";
        return;
      }
      this.isModalOpen = true; // 모달 표시
    },
    closeReportModal() {
      this.isModalOpen = false; // 모달 닫기
    },
    confirmReport() {
      if (!this.selectedFile) {
        this.message = "제보할 이미지를 선택해주세요.";
        return;
      }

      // 제보 처리 로직 (API 호출 등)
      this.message = "이미지가 성공적으로 제보되었습니다!";
      this.isModalOpen = false; // 모달 닫기
      // 추가로 제보 로직을 여기에 추가
    },
  },
});
</script>
