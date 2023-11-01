import { NumericFormat } from "react-number-format";

export const InputCurrency = () => {
  return (
    <NumericFormat
      thousandSeparator={"."}
      decimalSeparator=","
      defaultValue="0"
      className="w-full text-[32px] text-gray-800 font-bold tracking-[-0.5px] outline-none"
    />
  );
};
