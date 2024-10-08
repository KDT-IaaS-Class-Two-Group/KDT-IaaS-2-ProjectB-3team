import type { TUploadResponse } from "@/types/services/api.type";
import axios, { AxiosResponse } from "axios";

const API_URL = "http://localhost:5000/api/upload";

export const uploadImageToBackend = async (
  file: File
): Promise<AxiosResponse<TUploadResponse>> => {
  const formData = new FormData();
  formData.append("file", file);

  return await axios.post<TUploadResponse>(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 머신러닝 모델에 이미지를 업로드하는 함수
export const uploadImageToML = async (
  file: File
): Promise<AxiosResponse<TUploadResponse>> => {
  const formData = new FormData();
  formData.append("file", file); // "file"이라는 키로 파일을 추가

  return await axios.post<TUploadResponse>(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data", // multipart/form-data 헤더 설정
    },
  });
};
