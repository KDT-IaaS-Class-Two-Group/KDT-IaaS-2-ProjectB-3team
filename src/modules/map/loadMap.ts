import { initMap } from "./initMap";

export const loadMap = () => {
  const mapScript = document.createElement("script");

  // todo : API url 환경변수 설정
  mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.VUE_APP_API_KEY}&autoload=false&libraries=services,clusterer,drawing`;

  mapScript.onload = () => {
    window.kakao.maps.load(() => {
      initMap();
    });
  };

  document.head.appendChild(mapScript);
};
