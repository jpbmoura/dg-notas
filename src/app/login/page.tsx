"use client";

import { setCookie } from "nookies";
import googleLogo from "@/assets/images/google-logo.svg";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { authServices } from "@/services/auth-services";
import { useUserStore } from "@/store/user-store";
import { AxiosError } from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

interface LoginProps {
  email: string;
  password: string;
}
const Login = () => {
  const form = useForm();
  const [invalidLogin, setInvalidLogin] = React.useState(false);
  const [passwordVisibility, setPasswordVisibility] = React.useState(false);
  const { decodeToken } = useUserStore();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(data: LoginProps) {
    try {
      setLoading(true);
      const result = await authServices.userAuthenticate(data);

      setCookie(null, "token", result.token, {
        maxAge: 60 * 60 * 24 * 7, // 7 dias
        path: "/", // Disponível em toda a aplicação
        httpOnly: false, // O JavaScript pode acessar o cookie
      });

      decodeToken(result.token);
      router.push("/dashboard");
    } catch (error) {
      setLoading(false);
      if ((error as AxiosError)?.response?.status === 500) {
        setInvalidLogin(true);
      }
    }
  }

  return (
    <>
      <h1 className="font-semibold text-2xl dark:text-[#EDEBE1]">
        Bem-vindo de volta!
      </h1>
      <Button className="w-full" variant="google">
        <Image src={googleLogo} alt="google logo" className="size-[18px]" />
        Fazer Login com o Google
      </Button>
      <div className="flex flex-row justify-between items-center w-full">
        <Separator className="bg-[#8E95A2] dark:bg-[#8E95A2] shrink" />
        <p className="self-center px-[10px] dark:text-[#EDEBE1]">ou</p>
        <Separator className="bg-[#8E95A2] shrink dark:bg-[#8E95A2] " />
      </div>
      <h2 className="font-semibold text-2xl self-start dark:text-[#EDEBE1]">
        Login
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((e) => handleSubmit(e as LoginProps))} //erro aqui
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="E-mail"
                    {...field}
                    {...form.register("email", {
                      required: true,
                      onChange: () => setInvalidLogin(false),
                    })}
                  />
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
                  <Input
                    className="pr-10"
                    type={passwordVisibility ? "text" : "password"}
                    placeholder="Senha"
                    {...field}
                    passwordIcon={
                      passwordVisibility ? (
                        <EyeOff
                          className="absolute right-3 top-2 text-[#a8a8a8] size-6 md:size-5"
                          onClick={() => setPasswordVisibility(false)}
                        />
                      ) : (
                        <Eye
                          className="absolute right-3 top-2 text-[#a8a8a8] md:size-5"
                          onClick={() => setPasswordVisibility(true)}
                        />
                      )
                    }
                    {...form.register("password", {
                      required: true,
                      onChange: () => setInvalidLogin(false),
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {invalidLogin && (
            <div className="text-red-400 font-semibold te p-2 rounded-md flex justify-center">
              E-mail ou Senha inválida, tente novamente
            </div>
          )}

          <div className="flex flex-row justify-between">
            <span className="flex flex-row items-center gap-1 dark:text-[#EDEBE1]">
              <Checkbox />
              <span>Mantenha-me conectado</span>
            </span>

            <a href="" className="underline text-[#0075FF]">
              Recuperar senha
            </a>
          </div>

          <div className="flex flex-col w-full pt-4 gap-2 items-center">
            <Button
              variant="primary"
              type="submit"
              className="w-full font-semibold text-base"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Entrar"}
            </Button>
            <span className="dark:text-[#EDEBE1]">
              Ainda não possui conta?{" "}
              <Link className="underline text-[#0075FF]" href="/login/sign-up">
                Cadastre-se
              </Link>
            </span>
          </div>
        </form>
      </Form>
    </>
  );
};

export default Login;
