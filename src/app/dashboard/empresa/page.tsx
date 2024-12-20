import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import CompanyTable from "./company-table";

// const invoices = [
//   {
//     id: 1,
//     nome: "Victor Mateus da Silva",
//     rSocial: "Victor",
//     cnpj: "5056548464684",
//     email: "victor@email.comd",
//     telefone: "87988353544",
//   },
//   {
//     id: 2,
//     nome: "Ana Clara Souza",
//     rSocial: "Ana Clara",
//     cnpj: "7854632109874",
//     email: "ana.clara@email.com",
//     telefone: "11987654321",
//   },
//   {
//     id: 3,
//     nome: "João Pedro Santos",
//     rSocial: "JP Tech",
//     cnpj: "1029384756102",
//     email: "joao.pedro@email.com",
//     telefone: "21987651234",
//   },
//   {
//     id: 4,
//     nome: "Mariana Oliveira",
//     rSocial: "Oliveira Consultoria",
//     cnpj: "5647382910563",
//     email: "mariana.oliveira@email.com",
//     telefone: "31981234567",
//   },
//   {
//     id: 5,
//     nome: "Lucas Almeida",
//     rSocial: "Almeida Soluções",
//     cnpj: "9876543210123",
//     email: "lucas.almeida@email.com",
//     telefone: "51976543210",
//   },
//   {
//     id: 6,
//     nome: "João Pedro Santos",
//     rSocial: "JP Tech",
//     cnpj: "1029384756102",
//     email: "joao.pedro@email.com",
//     telefone: "21987651234",
//   },
//   {
//     id: 7,
//     nome: "Mariana Oliveira",
//     rSocial: "Oliveira Consultoria",
//     cnpj: "5647382910563",
//     email: "mariana.oliveira@email.com",
//     telefone: "31981234567",
//   },
//   {
//     id: 8,
//     nome: "Lucas Almeida",
//     rSocial: "Almeida Soluções",
//     cnpj: "9876543210123",
//     email: "lucas.almeida@email.com",
//     telefone: "51976543210",
//   },
//   {
//     id: 9,
//     nome: "João Pedro Santos",
//     rSocial: "JP Tech",
//     cnpj: "1029384756102",
//     email: "joao.pedro@email.com",
//     telefone: "21987651234",
//   },
//   {
//     id: 10,
//     nome: "Mariana Oliveira",
//     rSocial: "Oliveira Consultoria",
//     cnpj: "5647382910563",
//     email: "mariana.oliveira@email.com",
//     telefone: "31981234567",
//   },
//   {
//     id: 11,
//     nome: "Lucas Almeida",
//     rSocial: "Almeida Soluções",
//     cnpj: "9876543210123",
//     email: "lucas.almeida@email.com",
//     telefone: "51976543210",
//   },
//   {
//     id: 12,
//     nome: "João Pedro Santos",
//     rSocial: "JP Tech",
//     cnpj: "1029384756102",
//     email: "joao.pedro@email.com",
//     telefone: "21987651234",
//   },
//   {
//     id: 13,
//     nome: "Mariana Oliveira",
//     rSocial: "Oliveira Consultoria",
//     cnpj: "5647382910563",
//     email: "mariana.oliveira@email.com",
//     telefone: "31981234567",
//   },
//   {
//     id: 14,
//     nome: "Lucas Almeida",
//     rSocial: "Almeida Soluções",
//     cnpj: "9876543210123",
//     email: "lucas.almeida@email.com",
//     telefone: "51976543210",
//   },
//   {
//     id: 15,
//     nome: "João Pedro Santos",
//     rSocial: "JP Tech",
//     cnpj: "1029384756102",
//     email: "joao.pedro@email.com",
//     telefone: "21987651234",
//   },
//   {
//     id: 16,
//     nome: "Mariana Oliveira",
//     rSocial: "Oliveira Consultoria",
//     cnpj: "5647382910563",
//     email: "mariana.oliveira@email.com",
//     telefone: "31981234567",
//   },
//   {
//     id: 17,
//     nome: "Lucas Almeida",
//     rSocial: "Almeida Soluções",
//     cnpj: "9876543210123",
//     email: "lucas.almeida@email.com",
//     telefone: "51976543210",
//   },
//   {
//     id: 18,
//     nome: "João Pedro Santos",
//     rSocial: "JP Tech",
//     cnpj: "1029384756102",
//     email: "joao.pedro@email.com",
//     telefone: "21987651234",
//   },
//   {
//     id: 19,
//     nome: "Mariana Oliveira",
//     rSocial: "Oliveira Consultoria",
//     cnpj: "5647382910563",
//     email: "mariana.oliveira@email.com",
//     telefone: "31981234567",
//   },
//   {
//     id: 20,
//     nome: "Lucas Almeida",
//     rSocial: "Almeida Soluções",
//     cnpj: "9876543210123",
//     email: "lucas.almeida@email.com",
//     telefone: "51976543210",
//   },
// ];

const Empresas = () => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <h1 className="font-semibold text-3xl pt-2">Empresas</h1>
      <Separator />
      <div className="flex gap-2 justify-end h-fit w-full">
        <div className="h-full w-full md:w-fit flex justify-center border border-gray-300 rounded-md ">
          <Input
            type="text"
            placeholder="Pesquisar"
            className="rounded-md rounded-tr-none rounded-br-none pl-2 "
          />
          <Button variant={"secondary"}>
            <Search />
          </Button>
        </div>
        <Link className="" href="/dashboard/empresa/cadastrar">
          <Button
            variant={"outline"}
            className="flex  items-center justify-center"
          >
            <Plus />
            <div className="hidden md:flex">Cadastrar</div>
          </Button>
        </Link>
      </div>

      <div className="flex overflow-hidden">
        <CompanyTable />
      </div>
    </div>
  );
};

export default Empresas;
