/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate, Link } from "react-router-dom";

import { TypeInput, PasswordInput } from "../components/inputs";
import { authService } from "../features/auth/auth.service";

import { FaLock } from "react-icons/fa6";

const ResetSchema = z.object({
  masterPassword: z.string().min(1, "Senha mestra é obrigatória"),
  newPassword: z.string().min(6, "A nova senha deve ter pelo menos 6 caracteres"),
});

type ResetFormData = z.infer<typeof ResetSchema>;

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  // email vindo do ForgotPassword
  const email = location.state?.email;

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>({
    resolver: zodResolver(ResetSchema),
  });

  const handleReset = async (data: ResetFormData) => {
    setLoading(true);
    setApiError(null);
    setSuccess(null);

    try {
      const loginResult = await authService.login({
        email,
        password: data.masterPassword,
      });

      if (!loginResult.forcePasswordReset || !loginResult.userId) {
        throw new Error("Senha mestra inválida.");
      }

      await authService.resetPassword({
        userId: loginResult.userId,
        newPassword: data.newPassword,
      });

      setSuccess("Senha alterada com sucesso! Você já pode fazer login.");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Erro ao redefinir senha.";
      setApiError(message);
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Acesso inválido. Volte para recuperação de senha.
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-dark-1 p-4">
      <section className="w-full max-w-4xl flex bg-dark-2 rounded-lg shadow-lg overflow-hidden">
        
        <div className="hidden md:flex w-1/2 items-center justify-center bg-dark-3">
          <FaLock className="w-1/2 h-1/2 text-red-2" />
        </div>

        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-light-3 mb-2">
            Redefinir Senha
          </h2>
          <p className="text-red-3 mb-6">
            Informe a senha mestra e defina uma nova senha.
          </p>

          {apiError && (
            <div className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-4 text-center">
              {apiError}
            </div>
          )}

          {success && (
            <div className="bg-green-500/20 text-green-300 p-3 rounded-lg mb-4 text-center">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit(handleReset)}>

            <PasswordInput
              id="masterPassword"
              title="Senha Mestra"
              placeholder="Senha mestra"
              {...register("masterPassword")}
            />
            {errors.masterPassword && (
              <p className="text-red-3 text-sm mb-3">
                {errors.masterPassword.message}
              </p>
            )}

            <PasswordInput
              id="newPassword"
              title="Nova Senha"
              placeholder="Nova senha"
              {...register("newPassword")}
            />
            {errors.newPassword && (
              <p className="text-red-3 text-sm mb-3">
                {errors.newPassword.message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-2 text-lg font-bold text-white rounded-lg p-3 mt-4 hover:bg-red-1 transition"
            >
              {loading ? "Alterando..." : "Alterar Senha"}
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

export default ResetPassword;
