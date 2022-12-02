// https://api.covid19api.com/ ESTA ES LA API 
// https://api.covid19api.com/total/country/mx/status/confirmed
import axios from 'axios';
export const getDatosCovidMexico = async()=>{
  try{
    const data = await axios.get('https://api.covid19api.com/total/country/mx');
    if(data){
      const dataCovid = data.data.filter(data => data.Date >= "2022-11-00");
      dataCovid.map(datos=>{
        datos.Date = new Date(datos.Date);
        datos.Date = datos.Date.getDate() +"/"+ (datos.Date.getMonth() +1)+"/" +datos.Date.getFullYear()

    })
      return dataCovid;
    }
  }catch(err){
    return err;
  }
  
}

