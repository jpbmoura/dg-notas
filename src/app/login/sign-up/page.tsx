"use client";

import googleLogo from "@/assets/images/google-logo.svg";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { FieldValues, useForm } from "react-hook-form";
import Link from "next/link";
import { authServices } from "@/services/auth-services";

const SignUp = () => {
  const form = useForm();

  const handleCreateUser = (data: FieldValues) => {
    authServices.createUser(data);
  };

  return (
    <>
      <h1 className="font-semibold text-2xl dark:text-[#EDEBE1]">Bem-vindo!</h1>
      <Button className="w-full" variant="google">
        <Image src={googleLogo} alt="google logo" className="size-[18px]" />
        Cadastre-se com o Google
      </Button>
      <div className="flex flex-row justify-between items-center w-full">
        <Separator className="bg-[#8E95A2] shrink dark:bg-[#8E95A2]" />
        <p className="self-center px-[10px] dark:text-[#EDEBE1]">ou</p>
        <Separator className="bg-[#8E95A2] shrink dark:bg-[#8E95A2]" />
      </div>
      <h2 className="font-semibold text-2xl self-start dark:text-[#EDEBE1]">
        Cadastre-se
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((e) => handleCreateUser(e))} // Add handleCreateUser function
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="E-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password-verify"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirme sua senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col w-full pt-4 gap-2 items-center">
            <Button
              variant="primary"
              type="submit"
              className="w-full font-semibold text-base"
            >
              Cadastrar
            </Button>
            <span className="dark:text-[#EDEBE1]">
              Já possui uma conta?{" "}
              <Link className="underline text-azure-radiance-600" href="/login">
                Faça login
              </Link>
            </span>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SignUp;
