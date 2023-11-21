import axios from 'axios'
import {useEffect, useState } from 'react'
import InputAmout from './components/InputAmount'
import SelectCountry from './components/SelectCountry'

function App() {
  const [fromCurrency, setFromCurrency] = useState("🇺🇸 USD - United States");
  const [toCurrency, setToCurrency] = useState("🇦🇺 AUD - Australia");
  const firstAmount=localStorage.getItem('firstamt')

  const [resultCurrency, setResultCurrency] = useState(0);
  const [resultObject,setresultObject]=useState({
    from:"",
    to:"",
    val:""
  })
  const codeFromCurrency = fromCurrency.split(" ")[1];
  const codeToCurrency = toCurrency.split(" ")[1];
  

  useEffect(() => {
    if(firstAmount) {
      console.log("hello")
      axios("https://api.freecurrencyapi.com/v1/latest", {
        params: {
          apikey:'fca_live_AuPT4lNjX3ZqffqLLiFH3FA6bUFlqM94E9ZHbNtv',
          base_currency: codeFromCurrency,
          currencies: codeToCurrency
        }
      })
        .then(response => 
          {setResultCurrency(response.data.data[codeToCurrency]);
            })
        .catch(error => console.log(error))
    }

  }, [firstAmount, fromCurrency, toCurrency])



  return (
    <div>
      

        <div class="container-md bg-white text-primary" style={{marginTop:"10%",minHeight:"20rem"}}>
      <div className='d-flex h1 justify-content-center mt-4' >Welcome to Currency Convertor</div>
      <div className='d-flex justify-content-center align-items-center gap-2 ownclass' style={{marginTop:"10%"}}>
        <InputAmout />
        <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From" />
        
        <SelectCountry value={toCurrency} setValue={setToCurrency} label="To" />
      </div>
      
      {firstAmount ? (
        <div style={{ textAlign: 'left', marginTop: '1rem' }}>
        <p>
          {firstAmount} {fromCurrency} =
        </p>
        <h5 style={{ marginTop: '5px', fontWeight: 'bold' }}>
          {resultCurrency * firstAmount} {toCurrency}
        </h5>
      </div>
      ) : ""}
      </div>
        <div className='d-flex justify-content-center align-item-center'>
        <button className='btn btn-danger mt-4 ms-4' onClick={()=>{
          if(!firstAmount){
            alert("enter the amt first")
          }
         
          else{
            setresultObject({from:fromCurrency,to:toCurrency,val:resultCurrency})
            if(localStorage.getItem('results').length===0){
              localStorage.setItem('results',[{resultObject}]);
            }
            const parsed=JSON.parse(localStorage.getItem('results'));
            parsed.push({resultObject})
            localStorage.setItem('results',JSON.stringify(parsed))
          }
          
        }}>Result</button>
        </div>
        
    </div>
    
  )
}

export default App
