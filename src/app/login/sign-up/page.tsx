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
import { useForm } from "react-hook-form";
import Link from "next/link";

const SignUp = () => {
  const form = useForm();

  return (
    <>
      <h1 className="font-semibold text-4xl">Bem-vindo!</h1>
      <Button className="w-full" variant="outline">
        <Image src={googleLogo} alt="google logo" className="size-[18px]" />
        Cadastre-se com o Google
      </Button>
      <div className="flex flex-row justify-between items-center w-full">
        <Separator className="bg-[#8E95A2] shrink" />
        <p className="self-center px-[10px]">ou</p>
        <Separator className="bg-[#8E95A2] shrink" />
      </div>
      <h2 className="font-semibold text-2xl self-start">Cadastre-se</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((e) => console.log(e))}
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

          <div className="flex flex-col w-full pt-8 gap-2 items-center">
            <Button
              variant="primary"
              type="submit"
              className="w-full font-semibold text-base"
            >
              Cadastrar
            </Button>
            <span>
              Já possui uma conta?{" "}
              <Link className="underline text-[#0075FF]" href="/login">
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
