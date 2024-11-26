import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { ActionPopover } from "./action-popover";

interface Invoice {
  id: number;
  nome: string;
  rSocial: string;
  cnpj: string;
  email: string;
  telefone: string;
}

interface EnterpriseTableProps {
  invoices: Invoice[];
}

const EnterpriseTable: React.FC<EnterpriseTableProps> = ({ invoices }) => {
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
        {invoices.map((invoice) => (
          <TableRow key={invoice.id} className="dark:border-woodsmoke-100">
            <TableCell className="text-center">{invoice.nome}</TableCell>
            <TableCell className="text-center">{invoice.rSocial}</TableCell>
            <TableCell className="text-center">{invoice.cnpj}</TableCell>
            <TableCell className="text-center">{invoice.email}</TableCell>
            <TableCell className="text-center">{invoice.telefone}</TableCell>
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

export default EnterpriseTable;
