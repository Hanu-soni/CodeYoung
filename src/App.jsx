import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import InputAmout from './components/InputAmount'
import SelectCountry from './components/SelectCountry'
import { CurrencyContext } from './context/CurrencyContext'
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';

function App() {
  const { fromCurrency, setFromCurrency, toCurrency, setToCurrency, firstAmount, } = useContext(CurrencyContext);
  const [resultCurrency, setResultCurrency] = useState([]);
  const codeFromCurrency = fromCurrency.split(" ")[1];
  console.log(codeFromCurrency)
  console.log(toCurrency);
  const codeToCurrency = toCurrency.map((item)=>item.item.split(' ')[1])
  console.log(codeToCurrency);


  useEffect(() => {
    if (firstAmount) {
      toCurrency.map((item,index)=>{
        axios("https://api.freecurrencyapi.com/v1/latest", {
        params: {
          apikey: 'fca_live_AuPT4lNjX3ZqffqLLiFH3FA6bUFlqM94E9ZHbNtv',
          base_currency: codeFromCurrency,
          currencies: codeToCurrency.map((item)=>{return item})
        }
      })
        .then(response => setResultCurrency([...resultCurrency,response.data.data[codeToCurrency[index]]]))
        .catch(error => console.log(error))
      })
    }
  }, [firstAmount, fromCurrency, toCurrency])



  return (
    <div>
      <div class="container-md bg-white text-primary" style={{ marginTop: "10%", minHeight: "20rem" }}>
        <div className='d-flex h1 justify-content-center mt-4' >Welcome to Currency Convertor</div>
        <div className='d-flex justify-content-center align-items-center gap-2 ownclass' style={{ marginTop: "10%" }}>
          <InputAmout />
          <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From" />
          {toCurrency.map(item=>(

        <SelectCountry arr={toCurrency} key={item.index} value={item.item} setValue={setToCurrency} label="To" />
  
          )
            
            
                       
            //[...array,arr[index]]
           
          )}
          
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
      <div className='d-flex justify-content-center align-items-center mt-4'>
        <GoogleOAuthProvider clientId="692560150997-jit4omrppv36cgp1i9i41ld9q54hh15i.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
          


        </GoogleOAuthProvider>
      </div>
    </div>

  )
  //  function getauth() {
  //   try {
  //     const authorizationEndpoint = "https://accounts.google.com/o/oauth2/v2/auth/";



  //     //https://www.youtube.com/watch?v=rTIwdDxdDDA  
  //     //watch this video
  //     const parameters = {
  //       redirect_uri: 'http://localhost:3000',
  //       client_id: '897015988430-giu98h1vbvh6hfhmdg7lur489res1hho.apps.googleusercontent.com',
  //       access_type: "offline",
  //       response_type: "code",
  //       prompt: "consent",
  //       scope: [
  //         "https://www.googleapis.com/auth/userinfo.profile",
  //       ].join(" "),
  //     }

  //     let authorizationUrl = `${authorizationEndpoint}?`;
  //     Object.keys(parameters).forEach((element) => {
  //       authorizationUrl += `${element}=${parameters[element]}&`;
  //     })

  //     authorizationUrl = authorizationUrl.slice(0, -1);
  //     console.log(authorizationUrl);

  //     // Open the URL in the current window
  //     window.location.href = authorizationUrl;

  //   } catch (error) {
  //     console.log(error.message);
  //     throw error;
  //   }
  // }

}

export default App
