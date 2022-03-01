import { useEffect, useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import "./App.css";

const URL = "https://api.unsplash.com/photos/?client_id=";
const KEY = "VduzBSnLRhIoADD49QT7f2MprxoTXC7HnSAuNcCTBCM";

function App() {
  const [photos, setPhotos] = useState([]);
  const [selected, setSelected] = useState(null)

  const fechingFromServer = async () => {
    try {
      const [page1, page2] = await axios.all([
        axios.get(URL + KEY + "&page=2"),
        axios.get(URL + KEY + "&page=3"),
      ]);

      let data = [
        ...page1.data,
        ...page1.data,
        ...page2.data.slice(0, 2),
        ...page2.data.slice(0, 2),
      ];

      data = data.map((image) => {
        return { ...image, unique: nanoid() };
      });
      const shuffle = (arr) =>{
        for(let i = 0 ; i < arr.length ; i++){

          const randomIndex = Math.floor(Math.random() * arr.length) 

          const temp = arr[randomIndex]
          arr[randomIndex] = arr[i]
          arr[i] = temp

        }

        return arr
      }
      setPhotos(shuffle(data));
    } catch (err) {
      console.log(err);
    }
  };

  const handlerClick = (index) =>{

    let newPhotos = [...photos]
    console.log(typeof newPhotos[index].showThisPhoto)

    newPhotos[index].showThisPhoto = true
    
    console.log(typeof newPhotos[index].showThisPhoto)

    setPhotos(newPhotos)
    //remember is something was clicked before
    if(selected ===null){
      setSelected(index)
      return
    }else{
      if(newPhotos[index].unique === newPhotos[selected].unique){
        console.log("the same photo was clicked")
        return
      }else{
        if (newPhotos[index].id !== newPhotos[selected].id){
          console.log("they are different")

          setTimeout(()=>{


            newPhotos[index].showThisPhoto = false
            newPhotos[selected].showThisPhoto=false
            setSelected(null)
            setPhotos(null)
            setPhotos(newPhotos)
          },500)
        }else{
          setSelected(null)

        }
      }


    }

  }
  const handleReset=()=>{
    setPhotos([])
    setSelected(null)
  }
  useEffect(() => {
    fechingFromServer();
  }, []);

  return (
    <div className="App">
      {photos.map((photo,index) => {
        return (
          <div className="card" key={photo.unique} onClick={()=> handlerClick(index)}>
            <img src={photo.urls.thumb} alt={photo.alt_description} className={photo.showThisPhoto? "show" :"notShow"} />
          </div>
        );
      })}
      <button type="reset" onClick={handleReset}>Button</button>
    </div>
  );
}

export default App;

