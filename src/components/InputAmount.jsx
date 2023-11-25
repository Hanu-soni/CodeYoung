
import { useContext } from "react"
import { CurrencyContext } from "../context/CurrencyContext"

const InputAmount = () => {
  const { firstAmount, setFirstAmount} = useContext(CurrencyContext);

  return (
    <div className="col-6 col-md">
      <input
        className="form-control text-dark border border-dark fw-bold"
        type="number"
        value={firstAmount}
        onChange={e => setFirstAmount(e.target.value)}
        placeholder="Enter your Amount"
        fullWidth
        
      />
    </div>
  )
}

export default InputAmount