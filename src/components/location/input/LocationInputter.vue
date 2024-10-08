<template>
  <div class="flex justify-center">
    <input
      @keypress="handleKeyPress"
      :type="locationStatic.inputType"
      :placeholder="locationStatic.inputPlaceholder"
      v-model="searchValue"
      class="w-[500px] h-10 rounded-2xl border-2 px-4 my-6 hover:border-main-color focus:outline-none focus:border-main-color"
    />
    <button
      @click="searchPlaceHandler"
      class="h-10 px-4 my-6 ml-4 bg-main-color text-white rounded-2xl"
    >
      Search
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { locationStatic } from "@/static/components/location/location.static";
import { searchPlace } from "@/modules/map/searchPlace";

/**
 * @yuxincxoi 24.10.01
 * * 장소, 주소 검색창
 */
export default defineComponent({
  data() {
    return {
      locationStatic,
    };
  },
  setup() {
    // enter를 이용해 검색할 수 있도록하는 이벤트
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        searchPlace(searchValue.value);
      }
    };

    // 검색어
    const searchValue = ref("");

    // 검색 이벤트
    const searchPlaceHandler = () => {
      searchPlace(searchValue.value);
    };

    return {
      searchValue,
      searchPlaceHandler,
      handleKeyPress,
    };
  },
});
</script>
