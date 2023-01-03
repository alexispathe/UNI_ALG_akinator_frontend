/***********CONFIGURACION PARA LA GRAFICA QUE SE VA A MOSTRAR*******/
export const opcionesGrafica = (text) => {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: text,
      },
    },
  };
  return options
}
// AQUI LLAMAMOS LOS DATOS PARA MOSTRARLO EN LA GRAFICA
export const datosConfirmadosCovidGrafica = (DataCovid, label, borderColor, backgroundColor) => {
  const casosCovid = {
    labels: DataCovid.map(data => data.Date),

    datasets: [
      {
        fill: true,
        label: label,
        data: DataCovid.map(data => data.Confirmed),
        borderColor: borderColor,
        backgroundColor: backgroundColor,
      }
    ]
  };
  return casosCovid;
}
export const datosMuertesCovidGrafica = (DataCovid, label, borderColor, backgroundColor) => {
  const casosCovid = {
    labels: DataCovid.map(data => data.Date),

    datasets: [
      {
        fill: true,
        label: label,
        data: DataCovid.map(data => data.Deaths),
        borderColor: borderColor,
        backgroundColor: backgroundColor,
      }
    ]
  };
  return casosCovid;
}