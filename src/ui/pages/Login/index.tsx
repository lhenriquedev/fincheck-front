import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "react-router-dom";
import { useLoginController } from "./useLoginController";

export const Login = () => {
  const { handleSubmit, register, errors, isPending } = useLoginController();

  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold -tracking-[1px]">
          Entre em sua conta
        </h1>
        <p className="space-x-2 text-gray-900">
          <span className="text-gray-700 tracking-[-0.5px]">
            Novo por aqui?
          </span>
          <Link
            to="/register"
            className="text-teal-900 font-medium tracking-[-0.5px]"
          >
            Crie uma conta
          </Link>
        </p>
      </header>

      <form className="mt-[60px] flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          type="password"
          placeholder="Senha"
          {...register("password")}
          error={errors.password?.message}
        />

        <Button type="submit" className="mt-2" isLoading={isPending}>
          Entrar
        </Button>
      </form>
    </>
  );
};
