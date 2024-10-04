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
      try {
        const kakaoMaps = await loadMap();
        const map = new kakaoMaps.Map(
          document.getElementById("map") as HTMLElement,
          {
            center: new kakaoMaps.LatLng(37.5665, 126.978),
            level: 3,
          }
        );
        const places = new kakaoMaps.services.Places();

        const bounds = new kakaoMaps.LatLngBounds();
        places.keywordSearch(searchValue.value, (result, status) => {
          if (status === kakaoMaps.services.Status.OK) {
            result.forEach((place) => {
              const coords = new kakaoMaps.LatLng(
                Number(place.y),
                Number(place.x)
              );
              const marker = new kakaoMaps.Marker({
                map: map,
                position: coords,
              });
            });
          }
        });
      } catch (error) {
        throw new Error("맵 로딩 실패");
      }
    };

    return {
      searchValue,
      searchPlace,
    };
  },
});
</script>
