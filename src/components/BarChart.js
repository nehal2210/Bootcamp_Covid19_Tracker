import React,{useState,useEffect} from 'react';
import { Bar } from 'react-chartjs-2';


const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const VerticalBar = () => {


  const [country,setCountry]  = useState([])
    const [load,setLoad] = useState(false)

  const data = {
    labels:['Total Cases','Total Deaths','Total Recovered','New Cases','New Deaths','New Recovered'],
    datasets: [
      {
        label:"Cases",
        data: country,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
 


  const fetchCountry = async()=>{

    try{
 const url = "https://api.covid19api.com/summary";
 const response = await fetch(url);
 const newData = await response.json();
 if (response.status === 200 && newData){
   
  const pak = newData["Countries"].filter((item)=>(item['Country']==='Pakistan'))[0]
  console.log(pak)
   setCountry([pak['TotalConfirmed']/10,pak['TotalDeaths'],pak['TotalRecovered']/10,pak['NewConfirmed'],pak['NewDeaths'],pak['NewRecovered']])

    setLoad(true);
 }
 else{
    setLoad(false);
 }
}
catch(err){
    console.log("error : ",err)
    setLoad(false)
}

}

useEffect(()=>{
  fetchCountry();
},[])


  return (<>
    <div className='header'>
      <h1 className='title'>PAKISTAN</h1>

    </div>
    {load?<Bar data={data} options={options} />:<h1 style={{backgroundColor:"aliceblue",textAlign:'center'}}>Loading....</h1>}
    
  </>)
};

export default VerticalBar;