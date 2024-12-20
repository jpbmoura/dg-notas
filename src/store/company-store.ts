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

interface CompanyStore {
  companies: Icompanies[];
  setCompanies: (value: Icompanies[]) => void;
}

export const useCompanies = create<CompanyStore>()((set) => ({
  companies: [],
  setCompanies: (items) =>
    set(() => ({
      companies: items,
    })),
}));
