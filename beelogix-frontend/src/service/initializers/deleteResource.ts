import { AxiosRequestConfig } from "axios";
import axiosInstance from "../axiosInstance";

export type DeleteResourceProps = {
  url: string;
  config?: AxiosRequestConfig;
};

export const deleteResource = (props: DeleteResourceProps) => {
  const { url, config = {} } = props;
  return axiosInstance.delete(url, config);
};
