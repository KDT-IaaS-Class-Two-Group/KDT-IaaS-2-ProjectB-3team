import { uploadImageToBackend } from "@/services/api";
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

  const promises = selectedFiles.value.map((file) =>
    uploadImageToBackend(file)
  );

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
