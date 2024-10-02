<template>
  <div class="flex justify-center">
    <input
      :type="locationStatic.inputType"
      :placeholder="locationStatic.inputPlaceholder"
      v-model="searchValue"
      class="w-[500px] h-10 rounded-2xl border-2 px-4 my-6 hover:border-main-color focus:outline-none focus:border-main-color"
    />
  </div>
</template>

<script lang="ts">
/**
 * @yuxincxoi 24.10.01
 * * 장소, 주소 검색창
 */
import { defineComponent, ref } from "vue";
import { locationStatic } from "@/static/components/location/location.static";

export default defineComponent({
  data() {
    return {
      locationStatic,
    };
  },
  setup() {
    const searchValue = ref("");

    return {
      searchValue,
    };
  },
});
</script>
