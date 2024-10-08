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

          // 인포윈도우 내용 - 장소명, 장소 카테고리, 주소
          const iwContent = `
          <div class="m-2 px-1 w-48">
            <div class="text-lg font-semibold">${place.place_name}</div>
            <div class="text-slate-400 text-sm">${place.category_name.slice(
              place.category_name.lastIndexOf(" ") + 1
            )}</div>
            <div class="text-sm">${place.road_address_name}</div>
          </div>
        `;
          const iwRemovable = true; // 인포윈도우 닫기 버튼 생성

          // 인포윈도우 생성
          const InfoWindow = new kakaoMaps.InfoWindow({
            content: iwContent,
            removable: iwRemovable,
          });

          // 마커를 클릭했을 때 인포윈도우 생성
          kakaoMaps.event.addListener(marker, "click", () => {
            InfoWindow.open(map, marker);
          });

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
