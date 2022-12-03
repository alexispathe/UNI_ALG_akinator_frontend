// https://api.covid19api.com/ ESTA ES LA API 
// https://api.covid19api.com/total/country/mx/status/confirmed
import axios from 'axios';
export const getDatosCovidMexico = async () => {
  try {
    const data = await axios.get('https://api.covid19api.com/total/country/mx');
    if (data) {
      const dataCovid = data.data.filter(data => data.Date >= "2022-11-01");
      //   dataCovid.map(datos=>{
      //     console.log(datos.Date);
      //     datos.Date = new Date(datos.Date);

      //     datos.Date = datos.Date.getDate() +"/"+ (datos.Date.getMonth() )+"/" +datos.Date.getFullYear()

      // })
      return dataCovid;
    }
  } catch (err) {
    return err;
  }

}

export const getNombresPais = async () => {
  try {
    const data = await axios.get('https://api.covid19api.com/countries');
    if (data) {
      return data;
    }
  } catch (err) {
    return err;
  }

}


