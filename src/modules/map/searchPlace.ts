import { loadMap } from "@/modules/map/loadMap";

/**
 * @yuxincxoi 24.10.03
 * * 장소 검색 기능
 * @param searchValue - 검색어
 */
export const searchPlace = async (searchValue: string) => {
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
    places.keywordSearch(searchValue, (result, status) => {
      if (status === kakaoMaps.services.Status.OK) {
        result.forEach((place) => {
          const coords = new kakaoMaps.LatLng(Number(place.y), Number(place.x));
          const marker = new kakaoMaps.Marker({
            map: map,
            position: coords,
          });
          bounds.extend(coords);
        });
        map.setBounds(bounds);
      } else {
        throw new Error("검색 결과가 없습니다.");
      }
    });
  } catch (error) {
    throw new Error("맵 로딩 실패");
  }
};
