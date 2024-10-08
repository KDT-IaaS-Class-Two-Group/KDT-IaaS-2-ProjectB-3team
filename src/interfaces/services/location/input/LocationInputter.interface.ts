import { TClearInput } from "@/types/utils/clear/ClearInput.type";

export default interface ILocationInputter extends TClearInput {
  _manualInput: string;

  inputLocation(address: string): void;
}
