"use client";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Logo from "@/assets/logo.png";
import { useUserReducer } from "@/store/reducers/userReducer/useUserReducer";

const formSchema = z.object({
  email: z.string().email({ message: "Informe um email válido" }),
  password: z
    .string()
    .min(4, { message: "A senha deve ter no mínimo de 4 caracteres" }),
});

export default function Home() {
  const { loadingAuth, signIn } = useUserReducer();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    await signIn(data);
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col items-center gap-8"
        >
          <Image
            src={Logo}
            alt="Logo"
            width={200}
            height={200}
            className="drop-shadow-3xl"
          />
          <h1 className="text-xl self-start font-bold">Login</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="E-mail"
                    className="h-12 w-80 text-base font-semibold"
                    {...field}
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
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="Senha"
                      className="h-12 w-80 text-base text-black font-semibold"
                      type={passwordIsVisible ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    size="icon"
                    className="absolute right-0 top-0 h-full border-none bg-white hover:bg-transparent"
                    onClick={() => setPasswordIsVisible(!passwordIsVisible)}
                  >
                    {passwordIsVisible ? (
                      <Eye size={18} color="#000" />
                    ) : (
                      <EyeOff size={18} color="#000" />
                    )}
                  </Button>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-mainGreen hover:bg-mainGreen/60 h-12 uppercase tracking-widest w-80 rounded-md text-sm text-white outline-none"
            disabled={loadingAuth}
          >
            Entrar
          </Button>
        </form>
      </Form>
    </div>
  );
}
