
import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(100),
      height: theme.spacing(20),
    },
  },

  typo:{
    width: '100%',
    maxWidth: 500,
    marginTop:'15%',
    textAlign: 'center',
    
  }


}));


export default function GlobalData() {
 

    const classes = useStyles();
    const [data,setData] = useState({})
    const [load,setLoad] = useState(false)
    var today = new Date()

   const date =  today.getDate()  + '/' + (today.getMonth() + 1) + '/' +today.getFullYear();

    const fetchGlobal = async()=>{

    try{
 const url = "https://api.covid19api.com/world/total";
 const response = await fetch(url);
 const newData = await response.json();
 if (response.status === 200 && newData){
    setData(newData);
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

useEffect(() => {
  
    fetchGlobal() ;
  
}, [])

if (load===true){
    return (
        <div className={classes.root}>
          <Paper elevation={3} style={{fontWeight:"80%" , fontSize:30}} >
        Global Data
        of Today
        <h1>{date}</h1>      
        </Paper>
    
        <Paper elevation={3} style={{fontWeight:"80%" , fontSize:30}}>
        Active Cases
        <Typography className={classes.typo} style={{color:"blue"}}  variant="h4" gutterBottom>
           {<NumberFormat value={data.TotalConfirmed} displayType={'text'} thousandSeparator={true} prefix={'😟'} /> }
          </Typography>
        </Paper>
        
        <Paper elevation={3} style={{fontWeight:"80%" , fontSize:30}}>
        Recovered Cases     
        <Typography className={classes.typo} style={{color:"green"}}  variant="h4" gutterBottom>
        {<NumberFormat value={data.TotalRecovered} displayType={'text'} thousandSeparator={true} prefix={'❤️'} /> }

          </Typography>
        </Paper>
        
        <Paper elevation={3} style={{fontWeight:"80%" , fontSize:30}}>
       Total Deaths      
       <Typography style={{color:"red"}} className={classes.typo}  variant="h4" gutterBottom>
       {<NumberFormat value={data.TotalDeaths} displayType={'text'} thousandSeparator={true} prefix={'😢'} /> }

          </Typography>
        </Paper>
        
        </div>
      );

}
else{
    return (
<h1 style={{backgroundColor:"aliceblue",textAlign:'center'}}>Loading....</h1>
    );
}
  
}