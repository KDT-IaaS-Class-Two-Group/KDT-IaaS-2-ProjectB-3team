export const loadMap = () => {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      resolve(window.kakao.maps);
      return;
    }

    const mapScript = document.createElement("script");
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.VUE_APP_API_KEY}&autoload=false&libraries=services,clusterer,drawing`;

    mapScript.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          resolve(window.kakao.maps);
        });
      } else {
        reject(new Error("Kakao Maps API failed to load correctly"));
      }
    };

    mapScript.onerror = () => {
      reject(new Error("Failed to load Kakao Maps API"));
    };

    document.head.appendChild(mapScript);
  });
};
