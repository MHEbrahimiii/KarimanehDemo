import FundBalanceChart from "./charts/FundBalanceChart"
import { MonthlyBalance } from "@/mock/tables"

type Props = {
  data: MonthlyBalance[]
}

export default function PerformanceTab({ data }: Props) {
  return (
    <div className="bg-white rounded-2xl p-6">
      <h2 className="mb-4 font-bold">نمودار موجودی صندوق</h2>
      <FundBalanceChart data={data} />
    </div>
  )
}
