import instanceChecker from "@/modules/check/instanceChecker";
import AbstractedLocationInputter from "../abstract/LocationInputter.abstract";

// ImplementedLocationInputter는 AbstractedLocationInputter를 구체적으로 구현한 클래스
export default class ImplementedLocationInputter extends AbstractedLocationInputter {
  // 수동 입력 데이터를 저장하는 protected 변수
  protected manualInput: string;

  // 생성자: 초기 입력값을 받아 수동 입력 데이터를 초기화
  constructor(initialInput = "") {
    super(); // 상위 클래스의 생성자 호출

    // 인스턴스가 올바른지 확인하는 함수 호출 (instanceChecker는 클래스 인스턴스 유효성 검사에 사용)
    instanceChecker(new.target, ImplementedLocationInputter);

    // 초기 입력값 설정
    this.manualInput = initialInput;
  }

  // 주소를 입력받아 수동 입력 데이터를 설정하는 메소드
  public inputLocation(address: string): void {
    this.manualInput = address;
  }

  // 수동 입력 데이터를 초기화(빈 문자열로 설정)하는 메소드
  public clearInput(): void {
    this.manualInput = "";
  }
}
