import { Separator } from "@/components/ui/separator";

import RegisterEnterpriseForm from "./register-form";

const CadastroEmpresa = () => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <h1 className="font-semibold text-3xl pt-2">Cadastro de Empresa</h1>
      <Separator />
      <div className="flex flex-grow flex-col pt-2">
        <RegisterEnterpriseForm />
      </div>
    </div>
  );
};

export default CadastroEmpresa;
