"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect } from "react";
import { ActionPopover } from "./action-popover";
import { companyServices } from "@/services/company-services";
import { useUserStore } from "@/store/user-store";
import { useCompanies } from "@/store/company-store";

// interface Invoice {
//   id: number;
//   name: string;
//   companySocialName: string;
//   socialSecurityNumber: string;
//   email: string;
//   phone: string;
// }

const CompanyTable = () => {
  const { id } = useUserStore();
  const { companies, setCompanies } = useCompanies();

  useEffect(() => {
    if (!id) return;
    if (companies.length > 0) return;
    companyServices.getAll(1, id).then((response) => {
      setCompanies(response);
    });
  }, [id]);

  return (
    <Table className="overflow-hidden">
      <TableHeader className="dark:bg-woodsmoke-400 bg-[#f5f5f5]">
        <TableRow className="dark:border-woodsmoke-100">
          <TableHead className="text-center">NOME</TableHead>
          <TableHead className="text-center">RAZÃO SOCIAL</TableHead>
          <TableHead className="text-center">CNPJ</TableHead>
          <TableHead className="text-center">E-MAIL</TableHead>
          <TableHead className="text-center">TELEFONE</TableHead>
          <TableHead className="text-center">AÇÕES</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="dark:bg-woodsmoke-300 overflow-auto">
        {companies.map((invoice) => (
          <TableRow key={invoice.id} className="dark:border-woodsmoke-100">
            <TableCell className="text-center">{invoice.name}</TableCell>
            <TableCell className="text-center">
              {invoice.companySocialName}
            </TableCell>
            <TableCell className="text-center">
              {invoice.socialSecurityNumber}
            </TableCell>
            <TableCell className="text-center">{invoice.email}</TableCell>
            <TableCell className="text-center">{invoice.phone}</TableCell>
            <TableCell className="text-center">
              <ActionPopover />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="dark:border-woodsmoke-100">
        <TableRow className="">
          <TableCell colSpan={10}></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default CompanyTable;
