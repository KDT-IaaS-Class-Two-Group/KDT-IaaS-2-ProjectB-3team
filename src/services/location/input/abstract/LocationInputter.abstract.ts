import ILocationInputter from "@/interfaces/services/location/input/LocationInputter.interface";

// AbstractedLocationInputter는 ILocationInputter 인터페이스를 구현하는 추상 클래스
export default abstract class AbstractedLocationInputter
  implements ILocationInputter
{
  // 수동으로 입력된 위치 데이터를 저장할 추상 변수
  protected abstract manualInput: string;

  // 수동 입력 데이터를 가져오는 getter
  public get _manualInput(): string {
    return this.manualInput;
  }

  // 수동 입력 데이터를 설정하는 setter
  public set _manualInput(value: string) {
    this.manualInput = value;
  }

  // 수동 입력 데이터를 반환하는 메소드
  public getManualInput(): string {
    return this.manualInput;
  }

  // 수동 입력 데이터를 설정하는 메소드
  public setManualInput(value: string): void {
    this.manualInput = value;
  }

  // 주소를 입력받아 위치를 설정하는 추상 메소드, 하위 클래스에서 구현해야 함
  public abstract inputLocation(address: string): void;

  // 입력된 데이터를 지우는 추상 메소드, 하위 클래스에서 구현해야 함
  public abstract clearInput(): void;
}
