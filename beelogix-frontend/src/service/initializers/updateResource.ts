import { AxiosRequestConfig } from "axios";
import { AnyObject } from "yup";
import axiosInstance from "../axiosInstance";

export type UpdateResourceProps = {
  url: string;
  data: AnyObject;
  config?: AxiosRequestConfig;
};

export const updateResource = (props: UpdateResourceProps) => {
  const { data, url, config = {} } = props;
  return axiosInstance.put(url, data, config);
};
