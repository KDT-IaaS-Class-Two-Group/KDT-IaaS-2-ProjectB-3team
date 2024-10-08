/**
 * 주어진 메시지를 사용하여 Error 객체를 생성하고 던지는 함수.
 *
 * @param { string } message - 생성할 Error 객체에 포함될 메시지.
 * @throws { Error } 전달받은 메시지를 포함하는 새로운 Error 객체를 던짐.
 */
export default (message: string) => {
  throw new Error(message); // 전달받은 메시지를 포함한 새로운 Error 객체를 생성하고 던짐
};
