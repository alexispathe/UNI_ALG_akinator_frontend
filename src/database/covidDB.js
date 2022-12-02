// https://api.covid19api.com/ ESTA ES LA API 
// https://api.covid19api.com/total/country/mx/status/confirmed
import axios from 'axios';
export const getDatosCovidMexico = async()=>{
  try{
    const data = await axios.get('https://api.covid19api.com/total/country/mx');
    if(data){
      const dataCovid = data.data.filter(data => data.Date >= "2022-11-00T00:00:00Z");
      return dataCovid;
      
    }
    
  }catch(err){
    return err;
  }
  
}
// const x = getDatosCovidMexico();
// console.log(x)
export const DataCovid = [
    {
      Country: "MX",
      Confirmed: 812341,
      Date: "2022-11-22T00:00:00Z"
    },
    {
      Country: "MX",
      Confirmed: 811391,
      Date: "2022-11-23T00:00:00Z"
    },
    {
      Country: "MX",
      Confirmed: 816345,
      Date: "2022-11-24T00:00:00Z"
    },
    {
      Country: "MX",
      Confirmed: 812191,
      Date: "2022-11-25T00:00:00Z"
    },
    {
      Country: "MX",
      Confirmed: 812441,
      Date: "2022-11-26T00:00:00Z"
    },
    {
      Country: "MX",
      Confirmed: 812341,
      Date: "2022-11-27T00:00:00Z"
    },
    {
      Country: "MX",
      Confirmed: 872341,
      Date: "2022-11-28T00:00:00Z"
    },
  ];