import instanceCheckerStaticMessage from "@/static/modules/check/instanceChecker.static";
import thrower from "../throw/thrower";

/**
 * @eonduck2 24.09.27
 * * 인스턴스화를 시도하는 클래스를 비교해, 직접 인스턴스가 불가능한 클래스는 에러 처리
 * @param { Function } target 비교할 인스턴스 타겟
 * @param { Function } className 클래스
 */
export default (target: Function, className: Function) => {
  if (target === className) {
    thrower(`${className} ${instanceCheckerStaticMessage}`);
  } else {
    return;
  }
};
