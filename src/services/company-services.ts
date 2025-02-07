/* eslint-disable @typescript-eslint/no-explicit-any */
import { parseCookies } from "nookies";
import { post, get, patch, del } from "../helpers/api/api";

export interface ICompany {
  id?: string;
  name: string;
  companySocialName: string;
  socialSecurityNumber: string;
  zipcode: string;
  address: string;
  addressNumber: string;
  addressComplement: string;
  district: string;
  city: string;
  state: string;
  securityCountyNumber: string;
  securityStateNumber: string;
  cnae?: string[];
  taxOptions: string;
  specialTaxOptions?: string;
  garantee: string;
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

        return response;
      });

      return response;
    } catch (error) {
      throw error;
    }
  };
  public updateCompany = async (data: ICompany, id: string): Promise<any> => {
    try {
      const token = parseCookies().token;

      const response = await patch(
        `https://dgnotas-dev.up.railway.app/company/update/${id}`,
        data,
        {
          Authorization: "Bearer " + token,
        }
      ).then((response: any) => {
        console.log(response, "response");

        return response;
      });

      return response;
    } catch (error) {
      throw error;
    }
  };
  public delete = async (id: string): Promise<any> => {
    try {
      const token = parseCookies().token;

      const response = await del(
        `https://dgnotas-dev.up.railway.app/company/company/delete/${id}`,
        null,
        {
          Authorization: "Bearer " + token,
        }
      ).then((response: any) => {
        console.log(response, "response");

        return response;
      });

      return response;
    } catch (error) {
      throw error;
    }
  };
}

export const companyServices = new CompanyServices();
