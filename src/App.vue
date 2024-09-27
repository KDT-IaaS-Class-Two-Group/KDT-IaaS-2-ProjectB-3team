<template>
  <div id="app">
    <ImageUpload />
    <!-- 이미지 업로드 컴포넌트 추가 -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ImageUpload from "./components/ImageUpload.vue";

export default defineComponent({
  name: "App",
  components: {
    ImageUpload,
  },
});
</script>
