import axiosInstance from "../axiosInstance";
import { AxiosRequestConfig } from "axios";

export type GetAllResourcesProps = {
  url: string;
  config?: AxiosRequestConfig;
};

export const getAllResources = async <T>(
  props: GetAllResourcesProps
): Promise<T[]> => {
  const { config = {}, url } = props;
  return (await axiosInstance.get(url, config))?.data;
};
