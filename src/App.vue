<template>
  <div id="app">
    <ImageUpload />
    <!-- 이미지 업로드 컴포넌트 추가 -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import ImageUpload from "./components/ImageUpload.vue";

export default defineComponent({
  name: "App",
  components: {
    ImageUpload,
  },
  setup() {
    onMounted(async () => {
      try {
        const response = await fetch("http://localhost:5000/api/ml", {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("Data fetched successfully:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });
  },
});
</script>

