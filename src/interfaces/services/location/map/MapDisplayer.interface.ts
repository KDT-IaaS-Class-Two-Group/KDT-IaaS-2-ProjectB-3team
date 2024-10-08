/**
 *
 * NOTE: 지도 API의 타입을 강하게 잡아둬야함
 *
 * IMPORTANT: API의 자체적 타입 지원 있는지 파악
 */
export default interface IMapDisplayer {
  // !!
  // map: ?????
  // !!

  displayLocationOnMap(location: string): void;

  clearMap(): void;
}
