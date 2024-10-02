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
import { defineComponent } from "vue";
export default defineComponent({
  name: "MapDisplayer",
  // 컴포넌트가 마운트될 때 카카오맵 API 동적으로 로드
  mounted() {
    const mapScript = document.createElement("script");

    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.VUE_APP_API_KEY}&autoload=false&libraries=services,clusterer,drawing`;

    mapScript.onload = () => {
      window.kakao.maps.load(() => {
        this.initMap();
      });
    };

    document.head.appendChild(mapScript);
  },
  methods: {
    // 지도 초기화
    initMap() {
      try {
        if (!window.kakao || !window.kakao.maps) {
          throw new Error("Kakao Maps API가 로드되지 않았습니다.");
        }

        // 지도 옵션
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978), // 좌표 : 서울
          level: 3, // 지도 확대 레벨
        };

        const container = document.getElementById("map");

        // 지도 생성
        const map = new window.kakao.maps.Map(container, options);
      } catch (error) {
        throw new Error(`지도 초기화 중 오류 발생: ${error.message}`);
      }
    },
  },
});
</script>
