"use client";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { companyServices, ICompany } from "@/services/company-services";
import { useUserStore } from "@/store/user-store";
import { AxiosError } from "axios";
import { Circle, CircleCheck, Download, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCompanies } from "@/store/company-store";
import { MultiSelect } from "@/components/ui/multi-select";
import { Toaster } from "@/components/ui/toaster";

const RegisterCompanyForm = ({ item }: { item?: ICompany }) => {
  const { register, handleSubmit } = useForm<ICompany>();
  const { id } = useUserStore();
  const router = useRouter();
  const form = useForm();
  const [preview, setPreview] = useState("");
  const [editable, setEditable] = useState(false);
  const { refreshCompanies, currentPage } = useCompanies();
  const cnae = [
    {
      value: "2062",
      label: "2062 - SOCIEDADE EMPRESÁRIA LIMITADA",
      icon: Circle,
    },
    {
      value: "8599604",
      label:
        "8599604 - TREINAMENTO EM DESENVOLVIMENTO PROFISSIONAL E GERENCIAL",
      icon: Circle,
    },
    {
      value: "4761001",
      label: "4761001 - COMÉRCIO VAREJISTA DE LIVROS",
      icon: Circle,
    },
    { value: "5811500", label: "5811500 - EDIÇÃO DE LIVROS", icon: Circle },
    {
      value: "6202300",
      label:
        "6202300 - DESENVOLVIMENTO E LICENCIAMENTO DE PROGRAMAS DE COMPUTADOR CUSTOMIZÁVEIS",
      icon: Circle,
    },
    {
      value: "6203100",
      label:
        "6203100 - DESENVOLVIMENTO E LICENCIAMENTO DE PROGRAMAS DE COMPUTADOR NÃO-CUSTOMIZÁVEIS",
      icon: Circle,
    },
    {
      value: "6209100",
      label:
        "6209100 - SUPORTE TÉCNICO, MANUTENÇÃO E OUTROS SERVIÇOS EM TECNOLOGIA DA INFORMAÇÃO",
      icon: Circle,
    },
    {
      value: "6319400",
      label:
        "6319400 - PORTAIS, PROVEDORES DE CONTEÚDO E OUTROS SERVIÇOS DE INFORMAÇÃO NA INTERNET",
      icon: Circle,
    },
    {
      value: "6463800",
      label: "6463800 - OUTRAS SOCIEDADES DE PARTICIPAÇÃO, EXCETO HOLDINGS",
      icon: Circle,
    },
    {
      value: "7020400",
      label:
        "7020400 - ATIVIDADES DE CONSULTORIA EM GESTÃO EMPRESARIAL, EXCETO CONSULTORIA TÉCNICA ESPECÍFICA",
      icon: Circle,
    },
    { value: "7319002", label: "7319002 - PROMOÇÃO DE VENDAS", icon: Circle },
    { value: "7319003", label: "7319003 - MARKETING DIRETO", icon: Circle },
    {
      value: "7319004",
      label: "7319004 - CONSULTORIA EM PUBLICIDADE",
      icon: Circle,
    },
    {
      value: "8219999",
      label:
        "8219999 - PREPARAÇÃO DE DOCUMENTOS E SERVIÇOS ESPECIALIZADOS DE APOIO ADMINISTRATIVO NÃO ESPECIFICADOS ANTERIORMENTE",
      icon: Circle,
    },
    {
      value: "8531700",
      label: "8531700 - EDUCAÇÃO SUPERIOR - GRADUAÇÃO",
      icon: Circle,
    },
    {
      value: "8532500",
      label: "8532500 - EDUCAÇÃO SUPERIOR - GRADUAÇÃO E PÓS-GRADUAÇÃO",
      icon: Circle,
    },
    {
      value: "8533300",
      label: "8533300 - EDUCAÇÃO SUPERIOR - PÓS-GRADUAÇÃO E EXTENSÃO",
      icon: Circle,
    },
    {
      value: "8542200",
      label: "8542200 - EDUCAÇÃO PROFISSIONAL DE NÍVEL TECNOLÓGICO",
      icon: Circle,
    },
  ];
  const [selectedCnae, setSelectedCnae] = useState<string[]>([]);

  const togleEdit = () => {
    if (item && item.id) {
      setEditable(!editable);
    }
  };

  useEffect(() => {
    if (item) {
      const values: string[] = [];
      item.cnae?.map((cnae) => {
        values.push(cnae);
      });
      console.log("entrei");
      setSelectedCnae(values);
    } else {
      setSelectedCnae([cnae[1].value]);
    }
  }, [item]);

  const verifyEdit = () => {
    if (item) {
      return !editable;
    } else {
      return false;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<ICompany> = async (data) => {
    try {
      const transformedData = transformData(data);
      console.log(transformedData);
      console.log(id, "testee");

      if (item && item.id) {
        await companyServices.updateCompany(transformedData, item.id);

        toast({
          variant: "default",
          action: (
            <div className="w-full gap-2 flex items-center">
              <CircleCheck className=" text-green-500" />
              <span className="">Empresa atualizada com sucesso!</span>
            </div>
          ),
        });
      } else {
        await companyServices.createCommpany(transformedData, id);
        toast({
          variant: "default",
          action: (
            <div className="w-full gap-2 flex items-center">
              <CircleCheck className=" text-green-500" />
              <span className="">Empresa criada com sucesso!</span>
            </div>
          ),
        });
      }
      refreshCompanies(currentPage, id);
      router.push("/empresa");
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 400) {
        toast({
          variant: "destructive",
          title: "Erro ao criar Empresa",
          description: "Dados inválidos",
        });
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformData = (data: any) => {
    return {
      ...data,

      sendEmail: data.sendEmail === "true",
      cnae: selectedCnae,
    };
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const file = files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  return (
    <Form {...form}>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col">
        <div className="flex-grow flex flex-col md:flex-row gap-4 pb-4">
          <div className="flex flex-col gap-4 md:flex-1">
            <div className="flex  gap-4">
              <div className="relative flex items-center justify-center h-full w-36 border border-dashed rounded-md hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-woodsmoke-100">
                <input
                  // {...register("logo")}
                  id="picture"
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center justify-center text-center">
                  {preview ? (
                    <Image
                      src={preview}
                      width={144}
                      height={144}
                      alt="Preview"
                      className="h-full w-full object-cover rounded-md"
                    />
                  ) : (
                    <>
                      <Download className="dark:text-woodsmoke-50" />
                      <span className="text-sm text-gray-500 py-2 font-bold dark:text-woodsmoke-50">
                        LOGOTIPO
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="w-full gap-4 flex flex-col">
                <Input
                  {...register("companySocialName", {
                    required: true,
                    value: item ? item?.companySocialName : "",
                  })}
                  disabled={verifyEdit()}
                  className="w-full"
                  type="text"
                  placeholder={"Razão social"}
                />

                <Input
                  {...register("name", {
                    required: true,
                    value: item ? item?.name : "",
                  })}
                  disabled={verifyEdit()}
                  type="text"
                  placeholder="Nome dantasia"
                />
                <Input
                  {...register("socialSecurityNumber", {
                    required: true,
                    value: item ? item?.socialSecurityNumber : "",
                  })}
                  disabled={verifyEdit()}
                  type="text"
                  placeholder="CNPJ"
                />
              </div>
            </div>
            <Input
              {...register("securityCountyNumber", {
                required: true,
                value: item ? item.securityCountyNumber : "",
              })}
              disabled={verifyEdit()}
              type="text"
              placeholder="Inscrição municipal"
            />
            <Input
              {...register("securityStateNumber", {
                required: true,
                value: item ? item?.securityStateNumber : "",
              })}
              disabled={verifyEdit()}
              type="text"
              placeholder="Inscrição estadual"
            />
            <div className="flex gap-4 flex-col lg:flex-row">
              <FormField
                control={form.control}
                name="isento"
                render={({ field }) => (
                  <FormItem
                    // {...register("isento")}
                    className=" flex-1"
                  >
                    <FormLabel>Isento</FormLabel>
                    <Select
                      disabled
                      // {...register("isento")}
                      onValueChange={field.onChange}
                      onOpenChange={field.onBlur}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>isento</SelectLabel>
                          <SelectItem value="true">Sim</SelectItem>
                          <SelectItem value="false">Não</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="simplesNacional"
                render={({ field }) => (
                  <FormItem
                    // {...register("simplesNacional")}
                    className=" flex-1"
                  >
                    <FormLabel>Optante do Simples Nacional?</FormLabel>
                    <Select
                      disabled
                      // {...register("simplesNacional")}
                      onValueChange={field.onChange}
                      onOpenChange={field.onBlur}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>isento</SelectLabel>
                          <SelectItem value="true">Sim</SelectItem>
                          <SelectItem value="false">Não</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <MultiSelect
              options={cnae}
              label="CNAE"
              disabled={item && !editable}
              onValueChange={setSelectedCnae}
              value={selectedCnae}
              defaultValue={selectedCnae}
              placeholder="Selecionar CNAE..."
            />

            <FormField
              control={form.control}
              name="taxOptions"
              render={({ field }) => (
                <FormItem
                  {...register("taxOptions", {
                    required: true,
                  })}
                  className=" "
                >
                  <FormLabel>Regime de tributação</FormLabel>
                  <Select
                    {...register("taxOptions")}
                    disabled={verifyEdit()}
                    defaultValue={item ? item.taxOptions : ""}
                    onValueChange={field.onChange}
                    onOpenChange={field.onBlur}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="1">Lucro Presumido</SelectItem>
                        <SelectItem value="2">Simples Nacional</SelectItem>
                        <SelectItem value="3">Lucro Real</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialTaxOptions"
              render={({ field }) => (
                <FormItem {...register("specialTaxOptions")} className="">
                  <FormLabel>Regime de tibutação especial</FormLabel>
                  <Select
                    {...register("specialTaxOptions")}
                    onValueChange={field.onChange}
                    onOpenChange={field.onBlur}
                    disabled={verifyEdit()}
                    defaultValue={
                      item && item.specialTaxOptions
                        ? item.specialTaxOptions.toString()
                        : "0"
                    }
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="0">Nenhum</SelectItem>
                        <SelectItem value="1">REPES</SelectItem>
                        <SelectItem value="2">REIDI</SelectItem>
                        <SelectItem value="3">REPORTO</SelectItem>
                        <SelectItem value="4">RECAP</SelectItem>
                        <SelectItem value="5">REPETRO</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-4 md:flex-1">
            <FormField
              name="zipcode"
              render={() => (
                <Input
                  type="text"
                  placeholder="CEP"
                  {...register("zipcode", {
                    required: true,
                    value: "18.044-390",
                  })}
                  disabled
                />
              )}
            />
            <FormField
              name="Logradouro"
              render={() => (
                <Input
                  type="text"
                  placeholder="Logradouro"
                  {...register("address", {
                    required: true,
                    value: "Avenida Sorocaba",
                  })}
                  disabled
                />
              )}
            />
            <FormField
              name="addressNumber"
              render={() => (
                <Input
                  type="text"
                  placeholder="Número"
                  {...register("addressNumber", {
                    required: true,
                    value: "500",
                  })}
                  disabled
                />
              )}
            />
            <FormField
              name="addressComplement"
              render={() => (
                <Input
                  type="text"
                  placeholder="Complemento"
                  {...register("addressComplement", { value: "Sala 01" })}
                  disabled
                />
              )}
            />
            <FormField
              name="district"
              render={() => (
                <Input
                  type="text"
                  placeholder="Bairro"
                  {...register("district", {
                    required: true,
                    value: "Jardim das Magnolias",
                  })}
                  disabled
                />
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem
                  {...register("state", { required: true, value: "São Paulo" })}
                  className=" "
                >
                  <FormLabel>Estado</FormLabel>
                  <Select
                    disabled
                    {...register("state")}
                    onValueChange={field.onChange}
                    onOpenChange={field.onBlur}
                    value="São Paulo"
                  >
                    <SelectTrigger className="">
                      {/* <SelectValue placeholder="Selecione uma opção..." /> */}
                      <SelectValue placeholder="São Paulo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Pará">Pará</SelectItem>
                        <SelectItem value="São Paulo">São Paulo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem
                  {...register("city", { required: true, value: "Sorocaba" })}
                  className=" "
                >
                  <FormLabel>Cidade</FormLabel>
                  <Select
                    disabled
                    {...register("city")}
                    onValueChange={field.onChange}
                    onOpenChange={field.onBlur}
                    value="Sorocaba"
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Sorocaba" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Pará">Pará</SelectItem>
                        <SelectItem value="Sorocaba">Sorocaba</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {/* <Input
              type="text"
              placeholder="Cidade"
              {...register("city", { required: true })}
            /> */}
            <Input
              type="email"
              placeholder="E-mail"
              {...register("email", {
                required: true,
                value: item ? item?.email : "",
              })}
              disabled={verifyEdit()}
            />
            <Input
              type="number"
              placeholder="Telefone"
              {...register("phone", {
                required: true,
                pattern: /^[0-9]{10,11}$/,
                value: item ? item?.phone : "",
              })}
              disabled={verifyEdit()}
            />
            <div className="flex gap-4 flex-col lg:flex-row ">
              <FormField
                control={form.control}
                name="garantee"
                render={({ field }) => (
                  <FormItem
                    {...register("garantee", { required: true })}
                    className="flex-1"
                  >
                    <FormLabel>Garantia</FormLabel>
                    <Select
                      {...register("garantee")}
                      onValueChange={field.onChange}
                      onOpenChange={field.onBlur}
                      disabled={verifyEdit()}
                      defaultValue={item ? item.garantee.toString() : ""}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Selecione uma opção..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Array.from({ length: 30 }, (_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sendEmail"
                render={({ field }) => (
                  <FormItem
                    {...register("sendEmail", { required: true })}
                    className=" flex-1"
                  >
                    <FormLabel>Enviar notas por e-mail</FormLabel>
                    <Select
                      {...register("sendEmail")}
                      onValueChange={field.onChange}
                      onOpenChange={field.onBlur}
                      disabled={verifyEdit()}
                      defaultValue={item ? item.sendEmail.toString() : ""}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Selecione uma opção..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="true">Sim</SelectItem>{" "}
                          <SelectItem value="false">Não</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        {item && !editable ? (
          <div className="flex gap-2 justify-center md:justify-end ">
            <Button variant={"primary"} onClick={togleEdit}>
              <Edit />
              Editar informações
            </Button>
          </div>
        ) : (
          <div className="flex gap-2 justify-end">
            {!item && (
              <Link className="underline " href="/empresa">
                <Button variant={"outline"}>cancelar</Button>
              </Link>
            )}

            <Button variant={"primary"} type="submit">
              {!item ? "Cadastrar" : "Atualizar"}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default RegisterCompanyForm;
