import { uploadImageToBackend, uploadImageToML } from "@/services/api";
import { Ref } from "vue";

export function handleFileChange(
  event: Event,
  selectedFiles: Ref<File[]>,
  previewImages: Ref<string[]>,
  message: Ref<string>
) {
  const target = event.target as HTMLInputElement;
  const files = target.files ? Array.from(target.files) : [];

  // 이미지 미리보기 초기화
  previewImages.value = [];
  selectedFiles.value = [];

  files.forEach((file) => {
    if (file.type.startsWith("image/")) {
      selectedFiles.value.push(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          previewImages.value.push(reader.result as string);
        }
      };
    } else {
      message.value = "이미지 파일만 업로드 가능합니다.";
    }
  });
}

export async function handleImageUpload(
  selectedFiles: Ref<File[]>,
  message: Ref<string>
) {
  if (selectedFiles.value.length === 0) {
    message.value = "이미지를 선택해주세요.";
    return;
  }

  // 여기에 uploadImageToBackend와 uploadImageToML를 모두 사용
  const promises = selectedFiles.value.map((file) => {
    // 원하는 대로 두 개의 함수 중 하나를 선택하세요.
    return uploadImageToML(file); // 머신러닝 모델에 업로드
    // 또는
    return uploadImageToBackend(file); // 일반 백엔드에 업로드
  });

  try {
    const responses = await Promise.all(promises);
    message.value = responses
      .map((response) => response.data.message)
      .join(", ");
  } catch (error) {
    console.error("이미지 업로드 실패:", error);
    message.value = "이미지 업로드에 실패했습니다.";
  }
}
