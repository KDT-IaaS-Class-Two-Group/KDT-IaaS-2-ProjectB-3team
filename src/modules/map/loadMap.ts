import { initMap } from "./initMap";

/**
 * @yuxincxoi 24.10.02
 * * 카카오맵 API 동적으로 로드
 */
export const loadMap = () => {
  const mapScript = document.createElement("script");

  // todo : API url 환경변수 설정
  mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.VUE_APP_API_KEY}&autoload=false&libraries=services,clusterer,drawing`;

  // 지도 로드된 후 생성
  mapScript.onload = () => {
    window.kakao.maps.load(() => {
      initMap();
    });
  };

  document.head.appendChild(mapScript);
};
