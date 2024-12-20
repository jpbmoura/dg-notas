/* eslint-disable @typescript-eslint/no-explicit-any */
import { parseCookies } from "nookies";
import { post, get } from "../helpers/api/api";

export interface ICompany {
  id?: string;
  coreName: string;
  socialName: string;
  socialSecurityNumber: string;
  zipcode: string;
  address: string;
  addressNumber: string;
  addressComplement: string;
  district: string;
  city: string;
  state: string;
  socialCountyNumber: string;
  socialSecurityStateNumber: string;
  CNAE: string;
  taxOption: number;
  specialTaxOption?: number;
  garantee: number;
  sendEmail: boolean;
  email: string;
  phone: string;
}

class CompanyServices {
  public createCommpany = async (data: ICompany, id: string): Promise<any> => {
    try {
      const token = parseCookies().token;
      const response = await post(
        `https://dgnotas-dev.up.railway.app/company/create/${id}`,
        data,
        {
          Authorization: "Bearer " + token,
        }
      ).then((response: any) => {
        return response;
      });

      return response;
    } catch (error) {
      throw error;
    }
  };
  public getAll = async (page: number, id: string): Promise<any> => {
    try {
      const token = parseCookies().token;

      const response = await get(
        `https://dgnotas-dev.up.railway.app/company/find/all/${id}?page=${page}`,
        null,
        {
          Authorization: "Bearer " + token,
        }
      ).then((response: any) => {
        console.log(response, "response");

        return response.companies;
      });

      return response;
    } catch (error) {
      throw error;
    }
  };
}

export const companyServices = new CompanyServices();
