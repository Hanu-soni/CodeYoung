import useAxios from "../hooks/useAxios"

const SelectCountry = (props) => {
  const { value, setValue, label } = props;
  const [data, loaded, error] = useAxios("https://restcountries.com/v3.1/all");


  if(loaded) {
    return (
        <div className="rounded" 
        style={{ height: '60px', backgroundColor: '#e0e0e0' }}>
        </div>
    )
  }
  if(error) {
    return "Something went wrong!"
  }

  const dataFilter = data.filter(item => "currencies" in item);
  const dataCountries = dataFilter.map(item => {
    return `${item.flag} ${Object.keys(item.currencies)[0]} - ${item.name.common}`
  });
  console.log(dataCountries)

  return (
    <div className="col-3 col-md input">
       <div className="row">
            <div className="col-3">
                <span className="fw-bold fs-5">{label}</span>  
            </div>
            <div className="col-9 ">
		<select value={value} onChange={(event) => {
          setValue(event.target.value);
          
        }} className="form-select">
        <option value="" disabled>Select an option</option>
        {dataCountries.map((option,index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
        </select>    
            </div>
       </div>
    </div>
  )
}

export default SelectCountry