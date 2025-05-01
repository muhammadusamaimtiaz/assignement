import { AnyObject } from "yup";
import axiosInstance from "../axiosInstance";
import { AxiosRequestConfig } from "axios";

export type CreateResourceProps = {
  url: string;
  data: AnyObject;
  config?: AxiosRequestConfig;
};

export const createResource = (props: CreateResourceProps) => {
  const { data, url, config = {} } = props;
  return axiosInstance.post(url, data, config);
};
