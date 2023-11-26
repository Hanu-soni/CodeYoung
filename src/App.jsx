import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import InputAmout from './components/InputAmount';
import SelectCountry from './components/SelectCountry';
import { CurrencyContext } from './context/CurrencyContext';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function App() {
  const { fromCurrency, setFromCurrency, toCurrency, setToCurrency, firstAmount } = useContext(CurrencyContext);
  const [final, setFinal] = useState([]);

  const codeFromCurrency = fromCurrency.split(" ")[1];
  const codeToCurrency = toCurrency.map((item) => item.item.split(' ')[1]);

  useEffect(() => {
    const fetchData = async () => {
      if (firstAmount) {
        const promises = codeToCurrency.map((item) => {
          return axios.get("https://api.freecurrencyapi.com/v1/latest", {
            params: {
              apikey: 'fca_live_AuPT4lNjX3ZqffqLLiFH3FA6bUFlqM94E9ZHbNtv',
              base_currency: codeFromCurrency,
              currencies: item,
            },
          });
        });
  
        try {
          const responses = await Promise.all(promises);
          const data = responses.map((response) => response.data.data);
          setFinal(data);
        } catch (error) {
          if (error.response && error.response.status === 429) {
            console.log("Too many requests. Please wait and try again later.");
          } else {
            console.log(error.message);
          }
        }
      }
    };
  
    fetchData();
  }, [firstAmount, fromCurrency, toCurrency, codeToCurrency, codeFromCurrency]);
  

  return (
    <div>
      <div className="container-md bg-white text-primary" style={{ marginTop: "10%", minHeight: "20rem" }}>
        <div className='d-flex h1 justify-content-center mt-4' >Welcome to Currency Converter</div>
        <div className='d-flex justify-content-center align-items-center gap-2 ownclass' style={{ marginTop: "10%" }}>
          <InputAmout />
          <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From" />
          {toCurrency.map((item, index) => (
            <SelectCountry arr={toCurrency} key={index} indexing={index} value={item.item} setValue={setToCurrency} label="To" />
          ))}
        </div>

        {firstAmount && final.length > 0 ? (
          <div style={{ textAlign: 'left', marginTop: '1rem' }}>
            <p>
              {firstAmount} {fromCurrency} =
            </p>
            <h5 style={{ marginTop: '5px', fontWeight: 'bold' }}>
              {final.map((item, index) => (
                <span key={index}>{item.INR*firstAmount}</span>
                // Replace 'INR' with the property you want to display
              ))}
            </h5>
          </div>
        ) : null}
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
  );
}

export default App;

