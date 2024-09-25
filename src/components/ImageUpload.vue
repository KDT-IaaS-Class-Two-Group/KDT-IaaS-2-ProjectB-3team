<template>
  <div class="upload-container">
    <h2>이미지 업로드</h2>
    <input type="file" @change="onFileChange" class="file-input" />
    <button @click="uploadImage" class="upload-button">업로드</button>
    <p v-if="message" class="upload-message">{{ message }}</p>
    <!-- 이미지 미리보기 -->
    <img v-if="previewUrl" :src="previewUrl" class="image-preview" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { uploadImageToBackend } from "../services/api";

export default defineComponent({
  data() {
    return {
      selectedFile: null as File | null,
      previewUrl: "" as string,
      message: "" as string,
    };
  },
  methods: {
    onFileChange(event: Event) {
      const target = event.target as HTMLInputElement;
      this.selectedFile = target.files ? target.files[0] : null;

      if (this.selectedFile) {
        this.previewUrl = URL.createObjectURL(this.selectedFile);
      } else {
        this.previewUrl = "";
      }
    },
    async uploadImage() {
      if (!this.selectedFile) {
        this.message = "이미지를 선택해주세요.";
        return;
      }
      try {
        const response = await uploadImageToBackend(this.selectedFile);
        this.message = response.data.message;
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        this.message = "이미지 업로드에 실패했습니다.";
      }
    },
  },
});
</script>

<style scoped>
.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 15px;
  color: #333;
}

.file-input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
}

.upload-button {
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.upload-button:hover {
  background-color: #218838;
}

.upload-message {
  margin-top: 15px;
  font-size: 0.9em;
  color: #d9534f;
}

.image-preview {
  margin-top: 15px;
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
}
</style>
