import { companyServices, ICompany } from "@/services/company-services";
import { create } from "zustand";

export interface Icompanies {
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
  cnae: string;
  taxOptions: string;
  specialTaxOptions?: string;
  garantee: string;
  sendEmail: boolean;
  email: string;
  phone: string;
}

interface CompanyStore {
  companies: ICompany[];
  totalPages: number;
  currentPage: number;
  setCompanies: (value: ICompany[]) => void;
  setTotalPages: (value: number) => void;
  setCurrentPage: (value: number) => void;
  refreshCompanies: (page: number, id: string) => void;
}

export const useCompanies = create<CompanyStore>()((set) => ({
  companies: [],
  totalPages: 1,
  currentPage: 1,
  setCompanies: (items) =>
    set(() => ({
      companies: items,
    })),
  setTotalPages: (value) =>
    set(() => ({
      totalPages: value,
    })),
  setCurrentPage: (value) =>
    set(() => ({
      currentPage: value,
    })),
  refreshCompanies: (page: number, id: string) =>
    companyServices.getAll(page, id).then((response) => {
      set(() => ({
        companies: response.companies,
        totalPages: response.totalPages,
        currentPage: response.currentPage,
      }));
    }),
  // set(() => ({
  //   companies: [],
  //   totalPages: 1,
  //   currentPage: 1,
  // })),
}));
