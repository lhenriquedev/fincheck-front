import { Logo } from "../components/Logo";
import { Outlet } from "react-router-dom";
import illustration from "../../assets/illustration.png";

export const AuthLayout = () => {
  return (
    <div className="flex w-full h-full">
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center flex-col gap-16">
        <Logo className="h-6 text-gray-500" />
        <div className="w-full max-w-[504px] px-8">
          <Outlet />
        </div>
      </div>
      <div className="w-1/2 h-full lg:flex justify-center items-center p-8 relative hidden">
        <img
          alt="illustration"
          className="max-w-[656px] rounded-[32px] w-full h-full object-cover max-h-[960px] select-none"
          src={illustration}
        />

        <div className="max-w-[656px] bottom-8 mx-8 bg-white absolute rounded-b-[32px] p-10 space-y-6">
          <Logo className="text-teal-900 h-8" />
          <p className="text-gray-700 font-medium text-xl">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck,
            e o melhor, totalmente de graça!
          </p>
        </div>
      </div>
    </div>
  );
};
