import { Ref } from "vue";
import { uploadImageToBackend } from "../services/api";

export function handleFileChange(
  event: Event,
  selectedFile: Ref<File | null>,
  previewImage: Ref<string | null>,
  message: Ref<string>
) {
  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;

  if (file && file.type.startsWith("image/")) {
    selectedFile.value = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      previewImage.value = reader.result as string;
    };
  } else {
    selectedFile.value = null;
    previewImage.value = null;
    message.value = "이미지 파일만 업로드 가능합니다.";
  }
}

export async function handleImageUpload(
  selectedFile: Ref<File | null>,
  message: Ref<string>
) {
  if (!selectedFile.value) {
    message.value = "이미지를 선택해주세요.";
    return;
  }

  try {
    const response = await uploadImageToBackend(selectedFile.value);
    message.value = response.data.message;
  } catch (error) {
    console.error("이미지 업로드 실패:", error);
    message.value = "이미지 업로드에 실패했습니다.";
  }
}
