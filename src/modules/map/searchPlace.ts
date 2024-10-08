import { loadMap } from "@/modules/map/loadMap";

/**
 * @yuxincxoi 24.10.03
 * * 장소 검색 기능
 * @param searchValue - 검색어
 */
export const searchPlace = async (searchValue: string) => {
  try {
    const kakaoMaps = await loadMap();
    // 지도 설정
    const map = new kakaoMaps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: new kakaoMaps.LatLng(37.5665, 126.978), // 좌표 : 서울
        level: 3, // 지도 확대 레벨
      }
    );
    const places = new kakaoMaps.services.Places();

    // 지도 표시 범위 관리하는 객체 생성
    const bounds = new kakaoMaps.LatLngBounds();
    // 검색어로 장소 검색
    places.keywordSearch(searchValue, (result, status) => {
      if (status === kakaoMaps.services.Status.OK) {
        result.forEach((place) => {
          // 장소의 좌표 생성
          const coords = new kakaoMaps.LatLng(Number(place.y), Number(place.x));
          // 장소에 마커 생성
          const marker = new kakaoMaps.Marker({
            map: map, // 마커를 표시할 지도
            position: coords, // 마커의 좌표
            clickable: true, // 마커를 클릭 시 지도의 클릭이벤트 발생하지 않도록 설정
          });

          kakaoMaps.event.addListener(marker, "click", () =>
            console.log(place.x, place.y, place.place_name)
          );

          // 장소를 지도에 표시하도록 범위 확장
          bounds.extend(coords);
        });
        // 지도 표시 범위 재설정
        map.setBounds(bounds);
      } else {
        throw new Error("검색 결과가 없습니다.");
      }
    });
  } catch (error) {
    throw new Error("맵 로딩 실패");
  }
};
