<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    @click.self="closeModal"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
      <button
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        @click="closeModal"
      >
        X
      </button>
      <slot></slot>
      <!-- 모달 내용 삽입 -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("update:visible", false);
    },
  },
});
</script>
