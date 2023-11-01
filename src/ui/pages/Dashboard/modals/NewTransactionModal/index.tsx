import { Button } from "../../../../components/Button"
import { DatePickerInput } from "../../../../components/DatePickerInput"
import { Input } from "../../../../components/Input"
import { InputCurrency } from "../../../../components/InputCurrency"
import { Modal } from "../../../../components/Modal"
import { Select } from "../../../../components/Select"
import { useNewTransactionModalController } from "./useNewTransactionModalController"

export const NewTransactionModal = () => {
  const { closeNewTransactionModal, isNewTransactionModalOpen, newTransactionType } =
    useNewTransactionModalController()

  const isExpense = newTransactionType === "EXPENSE"

  return (
    <Modal
      title={isExpense ? "Nova Despesa" : "Nova Receita"}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}>
      <form>
        <div>
          <span className='text-gray-600 tracking-[-0.5px] text-xs'>
            Valor {isExpense ? "da despesa" : "da receita"}
          </span>
          <div className='flex items-center gap-2'>
            <span className='text-gray-600 tracking-[-0.5px] text-lg'>R$</span>
            <InputCurrency />
          </div>
        </div>

        <div className='flex flex-col gap-4 mt-10'>
          <Input
            type='text'
            name='name'
            placeholder={isExpense ? "Nome da despesa" : "Nome da receita"}
          />
          <Select
            placeholder='Categoria'
            options={[
              { label: "Investimento", value: "INVESTMENT" },
              { label: "Conta Corrente", value: "CHECKING" },
              { label: "Dinheiro Físico", value: "CASHING" },
            ]}
          />

          <Select
            placeholder={isExpense ? "Pagar com" : "Receber com"}
            options={[
              { label: "Investimento", value: "INVESTMENT" },
              { label: "Conta Corrente", value: "CHECKING" },
              { label: "Dinheiro Físico", value: "CASHING" },
            ]}
          />

          <DatePickerInput />
        </div>

        <Button
          type='submit'
          className='w-full mt-6'>
          Criar
        </Button>
      </form>
    </Modal>
  )
}
