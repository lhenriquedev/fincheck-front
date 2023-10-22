import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "react-router-dom";
import { useRegisterController } from "./useRegisterController";

export const Register = () => {
  const { handleSubmit, register, errors, isPending } = useRegisterController();

  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold -tracking-[1px]">Crie sua conta</h1>
        <p className="space-x-2 text-gray-900">
          <span className="text-gray-700 tracking-[-0.5px]">
            Já possui uma conta?
          </span>
          <Link
            to="/login"
            className="text-teal-900 font-medium tracking-[-0.5px]"
          >
            Fazer Login
          </Link>
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-4">
        <Input
          placeholder="Nome"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          type="email"
          placeholder="Email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          type="password"
          placeholder="Senha"
          error={errors.password?.message}
          {...register("password")}
        />
        <Button type="submit" isLoading={isPending}>
          Criar conta
        </Button>
      </form>
    </>
  );
};
