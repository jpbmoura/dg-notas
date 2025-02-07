"use-client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Icompanies, useCompanies } from "@/store/company-store";
import { Edit, Ellipsis, Trash } from "lucide-react";
import RegisterCompanyForm from "./cadastrar/register-form";
import { useEffect, useState } from "react";
import { companyServices, ICompany } from "@/services/company-services";
import { useUserStore } from "@/store/user-store";
import { toast } from "@/hooks/use-toast";

export function ActionPopover({ item }: { item: ICompany }) {
  const [currentitem, setCurrentItem] = useState<ICompany>();
  const { id } = useUserStore();
  const { refreshCompanies, currentPage } = useCompanies();

  const handledelete = (companyId: string | undefined) => {
    if (!companyId) return;
    companyServices.delete(companyId).then(() => {
      refreshCompanies(currentPage, id);
      toast({
        variant: "destructive",
        title: `Empresa ${currentitem?.socialSecurityNumber} Excluida!`,
      });
    });
  };

  useEffect(() => {
    if (!item) return;
    setCurrentItem(item);
  }, [item]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <Ellipsis />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit ">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Dialog>
              <DialogTrigger>
                <div className="hover:underline underline-offset-4 flex items-center">
                  <Edit className="h-4" /> Editar
                </div>
              </DialogTrigger>
              <DialogContent className=" max-h-screen md:m-0 md:w-screen  md:max-w-[1000px] ">
                <DialogHeader className="dark:text-woodsmoke-50">
                  <DialogTitle className="pb-2 ">
                    Informações da empresa
                  </DialogTitle>
                  <DialogDescription className="w-full max-h-[calc(100vh-70px)] overflow-auto">
                    <div className="teste">
                      {currentitem && (
                        <RegisterCompanyForm item={currentitem} />
                      )}
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <div
              className="cursor-pointer "
              onClick={() => {
                handledelete(currentitem?.id);
              }}
            >
              <span className="hover:underline underline-offset-4 flex items-center">
                {" "}
                <Trash className="h-4" /> Excluir
              </span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
