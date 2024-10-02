<template>
  <div>
    <div id="map" class="bg-black w-[70%] h-[600px] rounded-3xl mx-auto"></div>
  </div>
</template>

<script>
/**
 * @yuxincxoi 24.10.01
 * * 지도 : 사용자 및 야생 동물의 위치, 피해 예상 지역 등을 표시
 */
import { loadMap } from "@/modules/map/loadMap";
import { defineComponent } from "vue";
export default defineComponent({
  name: "MapDisplayer",
  // 컴포넌트가 마운트될 때 카카오맵 API 동적으로 로드
  mounted() {
    loadMap();
  },
});
</script>
