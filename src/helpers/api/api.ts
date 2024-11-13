/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

import { setupInterceptorsTo } from "./interceptors";

setupInterceptorsTo(axios);

export const get = <T = any>(
  url: any,
  responseType?: any,
  headers?: any
): Promise<T> =>
  axios({
    method: "get",
    headers,
    url,
    responseType,
  }) as any;

export const getWithParams = <T = any>(
  url: any,
  params?: any,
  headers?: any,
  responseType?: any
): Promise<T> =>
  axios({
    method: "get",
    params,
    headers,
    url,
    responseType,
  }) as any;

export const post = <T = any>(url: any, data: any, headers?: any): Promise<T> =>
  axios({
    method: "post",
    headers,
    url,
    data,
  }) as any;

export const postWithParams = <T = any>(
  url: any,
  params?: any,
  headers?: any,
  responseType?: any
): Promise<T> =>
  axios({
    method: "post",
    params,
    headers,
    url,
    responseType,
  }) as any;

export const put = <T = any>(url: any, data: any, headers?: any): Promise<T> =>
  axios({
    method: "put",
    headers,
    url,
    data,
  }) as any;

export const patch = <T = any>(
  url: any,
  data: any,
  headers?: any
): Promise<T> =>
  axios({
    method: "patch",
    headers,
    url,
    data,
  }) as any;

export const del = (url: any, data?: any, headers?: any): any =>
  axios({
    method: "delete",
    headers,
    data,
    url,
  });
