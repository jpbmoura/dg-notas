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
  CNAE: string;
  taxOptions: string;
  specialTaxOptions?: number;
  garantee: number;
  sendEmail: boolean;
  email: string;
  phone: string;
}

interface CompanyStore {
  companies: Icompanies[];
  totalPages: number;
  currentPage: number;
  setCompanies: (value: Icompanies[]) => void;
  setTotalPages: (value: number) => void;
  setCurrentPage: (value: number) => void;
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
}));
