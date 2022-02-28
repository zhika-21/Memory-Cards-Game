import {useEffect, useState} from 'react'
import axios from 'axios';
import { nanoid } from 'nanoid';
import './App.css';

const URL = "https://api.unsplash.com/photos/?client_id="
const KEY = "J2KZ2YPIbY9to2EcVlDItfxH_lV4Z7zYGEIgcZm3LbQ"
// !!! Please change the KEY value 

function App() {
  const [photos, setPhotos] = useState([])
  const fetchingFromServer = async() => {
    
    try{
      // const req = await fetch(URL+KEY+"&page=2")
      // const data = await req.json()

      // const req2 = await fetch(URL+KEY+"&page=3")
      // const data2 = await req2.json()

      //!!! instead of above we used the code below

      const [page1, page2] = await 
      axios.all([axios.get(URL+KEY+"&page=9"), 
      axios.get(URL+KEY+"&page=8")]);

      let data = [
        ...page1.data, 
        ...page1.data, 
        ...page2.data.slice(0,2), 
        ...page2.data.slice(0,2)
      ];

      const shuffle = (arr)=> {
        for(let i=0; i<24; i++){
          let temp =Math.floor(Math.random()*24);
          let curr = arr[temp];
          arr[temp] = arr[i];
          arr[i] = curr;
        }
        return arr;
      }
      data = shuffle(data);
      // data = data.map((image)=>{
      //   return ({...image, unique:nanoid()})
      // })

      setPhotos(data)
      
    } catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchingFromServer()
  }, [])
  
  return (
    <div className="App">
      {photos.map((photo)=>{
        return(
          <div className='card' key={photo.unique}>
            <img src={photo.urls.thumb} alt={photo.alt_description}/>
          </div>
        )
      })}
    </div>
  );
}

export default App;

