import { Separator } from "@/components/ui/separator";

import RegisterCompanyForm from "./register-form";

const RegisterCompany = () => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <h1 className="font-semibold text-3xl pt-2">Cadastro de Empresa</h1>
      <Separator />
      <div className="flex flex-grow flex-col pt-2">
        <RegisterCompanyForm />
      </div>
    </div>
  );
};

export default RegisterCompany;
