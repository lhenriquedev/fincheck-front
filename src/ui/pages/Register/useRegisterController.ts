import { SignupParams } from "../../../app/services/authService/signup";
import { authService } from "../../../app/services/authService";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../app/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, "Campo nome é obrigatório"),
  email: z
    .string()
    .email("Informe um e-mail válido")
    .min(1, "Campo email é obrigatório"),
  password: z.string().min(8, "Senha deve conter pelo menos 8 caracteres"),
});

type FormData = z.infer<typeof schema>;

export const useRegisterController = () => {
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data);
    },
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);
      signin(accessToken);
    } catch (error) {
      toast.error("Ocorreu um erro ao cadastrar usuário");
    }
  });

  return {
    handleSubmit,
    register,
    errors,
    isPending,
  };
};
