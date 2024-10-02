export default interface IResult {
  id: string; // 고유 ID
  place_name: string; // 장소 이름
  category_name: string; // 카테고리
  phone: string; // 전화번호
  address_name: string; // 지번 주소
  road_address_name: string; // 도로명 주소
  x: number; // 경도
  y: number; // 위도
}
