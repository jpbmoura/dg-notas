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
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { companyServices, ICompany } from "@/services/company-services";
import { useUserStore } from "@/store/user-store";
import { AxiosError } from "axios";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const RegisterCompanyForm = () => {
  const { register, handleSubmit } = useForm<ICompany>();
  const { id } = useUserStore();
  const router = useRouter();
  const form = useForm();
  const [preview, setPreview] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<ICompany> = async (data) => {
    try {
      const transformedData = transformData(data);
      console.log(transformedData);
      console.log(id, "testee");

      await companyServices.createCommpany(transformedData, id);
      toast({
        variant: "default",
        tw: "bg-green-500",
        title: "Usuário criado com sucesso",
        description: "Faça login para acessar o sistema",
      });
      router.push("/dashboard/empresa");
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
      taxOption: Number(data.taxOption),
      specialTaxOption: Number(data.specialTaxOption),
      garantee: Number(data.garantee),
      sendEmail: data.sendEmail === "true",
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
                  {...register("socialName", {
                    required: true,
                  })}
                  className="w-full "
                  type="text"
                  placeholder="Razão social"
                />
                <Input
                  {...register("coreName", { required: true })}
                  type="text"
                  placeholder="Nome dantasia"
                />
                <Input
                  {...register("socialSecurityNumber", { required: true })}
                  type="text"
                  placeholder="CNPJ"
                />
              </div>
            </div>
            <Input
              {...register("socialCountyNumber", { required: true })}
              type="text"
              placeholder="Inscrição municipal"
            />
            <Input
              {...register("socialSecurityStateNumber", { required: true })}
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
            <FormField
              control={form.control}
              name="cnae"
              render={({ field }) => (
                <FormItem
                  {...register("CNAE", { required: true })}
                  className="pt-5"
                >
                  <FormLabel>CNAE</FormLabel>
                  <Select
                    {...register("CNAE")}
                    onValueChange={field.onChange}
                    onOpenChange={field.onBlur}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="6201-9">6201-9</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="taxOption"
              render={({ field }) => (
                <FormItem
                  {...register("taxOption", { required: true })}
                  className=" "
                >
                  <FormLabel>Regime de tributação</FormLabel>
                  <Select
                    {...register("taxOption")}
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
              name="specialTaxOption"
              render={({ field }) => (
                <FormItem {...register("specialTaxOption")} className="">
                  <FormLabel>Regime de tibutação especial</FormLabel>
                  <Select
                    {...register("specialTaxOption")}
                    onValueChange={field.onChange}
                    onOpenChange={field.onBlur}
                    defaultValue="0"
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
            <Input
              type="text"
              placeholder="CEP"
              {...register("zipcode", { required: true })}
            />
            <Input
              type="text"
              placeholder="Logradouro"
              {...register("address", { required: true })}
            />
            <Input
              type="text"
              placeholder="Número"
              {...register("addressNumber", { required: true })}
            />
            <Input
              type="text"
              placeholder="Complemento"
              {...register("addressComplement")}
            />
            <Input
              type="text"
              placeholder="Bairro"
              {...register("district", { required: true })}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem
                  {...register("state", { required: true })}
                  className=" "
                >
                  <FormLabel>Estado</FormLabel>
                  <Select
                    {...register("state")}
                    onValueChange={field.onChange}
                    onOpenChange={field.onBlur}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Pará">Pará</SelectItem>
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
                  {...register("city", { required: true })}
                  className=" "
                >
                  <FormLabel>Cidade</FormLabel>
                  <Select
                    {...register("city")}
                    onValueChange={field.onChange}
                    onOpenChange={field.onBlur}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Pará">Pará</SelectItem>
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
              })}
            />
            <Input
              type="number"
              placeholder="Telefone"
              {...register("phone", {
                required: true,
                pattern: /^[0-9]{10,11}$/,
              })}
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
        <div className="flex gap-2 justify-end">
          <Link className="underline " href="/dashboard/empresa">
            <Button variant={"outline"}>cancelar</Button>
          </Link>
          <Button variant={"primary"} type="submit">
            Cadastrar
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterCompanyForm;
