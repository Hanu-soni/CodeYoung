import { Box, Container, Grid, Link, Typography } from '@mui/material'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import InputAmout from './components/InputAmount'
import SelectCountry from './components/SelectCountry'
import { CurrencyContext } from './context/CurrencyContext'

function App() {
  const { fromCurrency,setFromCurrency,toCurrency,setToCurrency,firstAmount,} = useContext(CurrencyContext);
  const [resultCurrency, setResultCurrency] = useState(0);
  const codeFromCurrency = fromCurrency.split(" ")[1];
  const codeToCurrency = toCurrency.split(" ")[1];
  

  useEffect(() => {
    if(firstAmount) {
      axios("https://api.freecurrencyapi.com/v1/latest", {
        params: {
          apikey:'fca_live_AuPT4lNjX3ZqffqLLiFH3FA6bUFlqM94E9ZHbNtv',
          base_currency: codeFromCurrency,
          currencies: codeToCurrency
        }
      })
        .then(response => setResultCurrency(response.data.data[codeToCurrency]))
        .catch(error => console.log(error))
    }
  }, [firstAmount, fromCurrency, toCurrency])

  const boxStyles = {
    background: "#fdfdfd",
    marginTop: "10%",
    textAlign: "center",
    color: "#222",
    minHeight: "20rem",
    borderRadius: 2,
    padding: "4rem 2rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position: "relative"
  }

  return (
    <div class="container-md bg-white text-primary" style={{marginTop:"10%",minHeight:"20rem"}}>
      <div className='d-flex h1 justify-content-center mt-4' >Welcome to Currency Convertor</div>
      <div className='d-flex justify-content-center align-items-center gap-2' style={{marginTop:"10%"}}>
        <InputAmout />
        <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From" />
        
        <SelectCountry value={toCurrency} setValue={setToCurrency} label="To" />
      </div>

      {firstAmount ? (
        <Box style={{ textAlign: "left", marginTop: "1rem"}}>
          <Typography>{firstAmount} {fromCurrency} =</Typography>
          <Typography variant='h5' style={{ marginTop: "5px", fontWeight: "bold"}}>{resultCurrency*firstAmount} {toCurrency}</Typography>
        </Box>
      ) : ""}
      </div>
    
  )
}

export default App
