/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"; // Importa o useState
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { TypeInput, PasswordInput } from "../components/Inputs";
import { authService } from "../features/auth/auth.service";

import { FaRegUser } from "react-icons/fa6";

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório.")
    .email("Por favor, insira um email válido."),
  password: z.string().min(1, "Senha é obrigatória."),
});

type LoginFormData = z.infer<typeof LoginSchema>;

function Login() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const errorType = searchParams.get('error');

  // Configurar o react-hook-form com o resolver do Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    setLoading(true);
    setApiError(null);

    try {
      const result = await authService.login(data);

      // Caso senha coringa foi usada
      if (result.forcePasswordReset) {
        navigate("/reset-password", {
          state: {
            userId: result.userId,
            email: result.email,
          },
        });
        return;
      }

      // Login normal
      if (result.token) {
        localStorage.setItem("authToken", result.token);
      }
      navigate("/guara-adm");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during login.";
      setApiError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="hero"
      className="w-full min-h-screen flex flex-col items-center justify-center bg-dark-1 p-4"
    >
      <section className="w-full max-w-4xl flex flex-row bg-dark-2 rounded-lg shadow-lg overflow-hidden">
        {/* Coluna do Ícone (visível em telas médias e maiores) */}
        <div className="hidden md:flex w-1/2 items-center justify-center p-12 bg-dark-3">
          <FaRegUser className="w-1/2 h-1/2 text-red-2" />
        </div>

        {errorType === 'expired' && (
          <div className="bg-yellow-600/20 border border-yellow-600 text-yellow-100 p-3 rounded mb-4 text-center">
            Sua sessão expirou por inatividade. Por favor, faça login novamente.
          </div>
        )}
        {/* Coluna do Formulário */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <form onSubmit={handleSubmit(handleLogin)} className="p-8 sm:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-light-3">
                Acessar Painel
              </h2>
              <p className="text-red-3 mt-2">
                Faça login para gerenciar os projetos.
              </p>
            </div>

            {/* Exibição de erro da API */}
            {apiError && (
              <div className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-4 text-center">
                {apiError}
              </div>
            )}

            {/* Campo de Email */}
            <TypeInput
              id="email"
              title="Username"
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

            {/* Campo de Senha com botão de visualização */}
            <PasswordInput
              id="password"
              title="Senha"
              placeholder="********"
              {...register("password")}
            />

            {/* Botão de Submissão */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-2 text-lg font-bold text-white text-center rounded-lg p-3 mt-5 cursor-pointer transition-transform duration-200 hover:bg-red-1 hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>

            <div className="text-center mt-6">
              <Link
                to="/forgot-password"
                className="text-sm text-light-3 hover:text-red-2 transition-colors"
              >
                Esqueceu a senha?
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;
