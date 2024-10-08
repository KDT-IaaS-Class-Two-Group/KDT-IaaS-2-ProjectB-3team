import ImplementedLocationInputter from "./implemented/LocationInputter.implement";

// LocationInputter 클래스는 ImplementedLocationInputter의 기능을 상속받아 캡슐화된 형태로 제공
// 기본적으로 상위 클래스의 모든 기능을 그대로 사용하며, 확장을 위한 기본 구조를 제공
export default class LocationInputter extends ImplementedLocationInputter {
  // 생성자: 상위 클래스(ImplementedLocationInputter)의 생성자를 호출
  // 추후 필요할 경우 여기서 추가 로직을 작성할 수 있음
  constructor() {
    super(); // ImplementedLocationInputter의 생성자를 호출하여 기본 상태 초기화
  }
}
