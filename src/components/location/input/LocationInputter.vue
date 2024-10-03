<template>
  <div class="flex justify-center">
    <input
      :type="locationStatic.inputType"
      :placeholder="locationStatic.inputPlaceholder"
      v-model="searchValue"
      class="w-[500px] h-10 rounded-2xl border-2 px-4 my-6 hover:border-main-color focus:outline-none focus:border-main-color"
    />
    <button
      @click="searchPlace"
      class="h-10 px-4 my-6 ml-4 bg-main-color text-white rounded-2xl"
    >
      Search
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { locationStatic } from "@/static/components/location/location.static";
import { loadMap } from "@/modules/map/loadMap";

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
    const searchValue = ref("");

    const searchPlace = async () => {
      const map = await loadMap();
      const places = new map.services.Places();

      places.keywordSearch(searchValue.value, (result, status) => {
        if (status === map.services.Status.OK) {
          console.log(result);
        }
      });
    };

    return {
      searchValue,
      searchPlace,
    };
  },
});
</script>
