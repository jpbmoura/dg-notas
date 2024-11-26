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
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface RegisterEnterpriseFormProps {
  logo: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  inscricaoMunicipal: string;
  inscricaoEstadual: string;
  isento: string;
  simplesNacional: string;
  cnae: string;
  regimeDeTributacao: string;
  regimeDeTributacaoEspecial: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  email: string;
  telefone: string;
  garantia: string;
  notasPorEmail: string;
}

const RegisterEnterpriseForm = () => {
  const { register, handleSubmit } = useForm<RegisterEnterpriseFormProps>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<RegisterEnterpriseFormProps> = (data) =>
    console.log(data);

  const form = useForm();
  const [preview, setPreview] = useState("");

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
      <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col">
        <div className="flex-grow flex flex-col md:flex-row gap-4 pb-4">
          <div className="flex flex-col gap-4 md:flex-1">
            <div className="flex  gap-4">
              <div className="relative flex items-center justify-center h-full w-36 border border-dashed rounded-md hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-woodsmoke-100">
                <input
                  {...register("logo")}
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
                  {...register("razaoSocial")}
                  className="w-full"
                  type="text"
                  placeholder="Razão social"
                />
                <Input
                  {...register("nomeFantasia")}
                  type="text"
                  placeholder="Nome dantasia"
                />
                <Input {...register("cnpj")} type="text" placeholder="CNPJ" />
              </div>
            </div>
            <Input
              {...register("inscricaoMunicipal")}
              type="text"
              placeholder="Inscrição municipal"
            />
            <Input
              {...register("inscricaoEstadual")}
              type="text"
              placeholder="Inscrição estadual"
            />
            <div className="flex gap-4 flex-col lg:flex-row">
              <FormField
                control={form.control}
                name="isento"
                render={({ field }) => (
                  <FormItem {...register("isento")} className=" flex-1">
                    <FormLabel>Isento</FormLabel>
                    <Select
                      {...register("isento")}
                      onValueChange={field.onChange}
                      onOpenChange={field.onBlur}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Selecione uma opção..." />
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
                    {...register("simplesNacional")}
                    className=" flex-1"
                  >
                    <FormLabel>Optante do Simples Nacional?</FormLabel>
                    <Select
                      {...register("simplesNacional")}
                      onValueChange={field.onChange}
                      onOpenChange={field.onBlur}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Selecione uma opção..." />
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
                <FormItem {...register("cnae")} className="">
                  <FormLabel>CNAE</FormLabel>
                  <Select
                    {...register("cnae")}
                    onValueChange={field.onChange}
                    onOpenChange={field.onBlur}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="fruits">Fruits</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="regimeDeTributacao"
              render={({ field }) => (
                <FormItem {...register("regimeDeTributacao")} className=" ">
                  <FormLabel>Regime de tributação</FormLabel>
                  <Select
                    {...register("regimeDeTributacao")}
                    onValueChange={field.onChange}
                    onOpenChange={field.onBlur}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="fruits">Fruits</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="regimeDeTributacaoEspecial"
              render={({ field }) => (
                <FormItem
                  {...register("regimeDeTributacaoEspecial")}
                  className=""
                >
                  <FormLabel>Regime de tibutação especial</FormLabel>
                  <Select
                    {...register("regimeDeTributacaoEspecial")}
                    onValueChange={field.onChange}
                    onOpenChange={field.onBlur}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="fruits">Fruits</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-4 md:flex-1">
            <Input type="text" placeholder="CEP" {...register("cep")} />
            <Input
              type="text"
              placeholder="Logradouro"
              {...register("logradouro")}
            />
            <Input type="text" placeholder="Número" {...register("numero")} />
            <Input
              type="text"
              placeholder="Complemento"
              {...register("complemento")}
            />
            <Input type="text" placeholder="Bairro" {...register("bairro")} />
            <Input type="text" placeholder="Cidade" {...register("cidade")} />
            <FormField
              control={form.control}
              name="estado"
              render={({ field }) => (
                <FormItem {...register("estado")} className=" ">
                  <FormLabel>Estado</FormLabel>
                  <Select
                    {...register("estado")}
                    onValueChange={field.onChange}
                    onOpenChange={field.onBlur}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="fruits">Fruits</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Input type="text" placeholder="E-mail" {...register("email")} />
            <Input
              type="text"
              placeholder="Telefone"
              {...register("telefone")}
            />
            <div className="flex gap-4 flex-col lg:flex-row">
              <FormField
                control={form.control}
                name="garantia"
                render={({ field }) => (
                  <FormItem {...register("garantia")} className="flex-1">
                    <FormLabel>Garantia</FormLabel>
                    <Select
                      {...register("garantia")}
                      onValueChange={field.onChange}
                      onOpenChange={field.onBlur}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Selecione uma opção..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="fruits">Fruits</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notasPorEmail"
                render={({ field }) => (
                  <FormItem {...register("notasPorEmail")} className=" flex-1">
                    <FormLabel>Enviar notas por e-mail</FormLabel>
                    <Select
                      {...register("notasPorEmail")}
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

export default RegisterEnterpriseForm;
