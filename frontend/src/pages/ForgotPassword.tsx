/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { TypeInput } from "../components/inputs";
import { authService } from "../features/auth/auth.service";

import { FaRegUser } from "react-icons/fa6";

const ForgotSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório.")
    .email("Por favor, insira um email válido."),
});

type ForgotFormData = z.infer<typeof ForgotSchema>;

function ForgotPassword() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(ForgotSchema),
  });

  const handleRequest = async (data: ForgotFormData) => {
    setLoading(true);
    setApiMessage(null);

    try {
      const result = await authService.requestPasswordReset(data.email);

      // Mostra mensagem
      setApiMessage(result.message);

      // 🔥 REDIRECIONA PARA RESET
      setTimeout(() => {
        navigate("/reset-password", {
          state: { email: data.email },
        });
      }, 1000);

    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Erro ao solicitar redefinição de senha.";
      setApiMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-dark-1 p-4">
      <section className="w-full max-w-4xl flex flex-row bg-dark-2 rounded-lg shadow-lg overflow-hidden">

        <div className="hidden md:flex w-1/2 items-center justify-center p-12 bg-dark-3">
          <FaRegUser className="w-1/2 h-1/2 text-red-2" />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <form onSubmit={handleSubmit(handleRequest)} className="p-8 sm:p-12">

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-light-3">
                Recuperar Senha
              </h2>
              <p className="text-light-4 mt-2 text-red-3">
                Informe seu email para validar sua conta.
              </p>
            </div>

            {apiMessage && (
              <div className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-4 text-center">
                {apiMessage}
              </div>
            )}

            <TypeInput
              id="email"
              title="Email"
              type="email"
              placeholder="seuemail@exemplo.com"
              icon={<FaRegUser />}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-3 text-sm mt-[-10px] mb-3">
                {errors.email.message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-2 text-lg font-bold text-white rounded-lg p-3 mt-5 hover:bg-red-1 transition disabled:bg-gray-500"
            >
              {loading ? "Enviando..." : "Enviar solicitação"}
            </button>

            <div className="text-center mt-6">
              <Link
                to="/login"
                className="text-sm text-light-3 hover:text-red-2"
              >
                Voltar ao login
              </Link>
            </div>

          </form>
        </div>
      </section>
    </div>
  );
}

export default ForgotPassword;
