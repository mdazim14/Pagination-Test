import './App.css';
import { Pagination } from 'react-bootstrap';
import fakeData from './jsonData';
import { useEffect, useState } from 'react';

function App() {

  const ItemsNumber = 5;

  const [allItems, setAllItems] = useState([])
  // console.log("all data after set", allItems)
  const [actvieEl, setActiveEl] = useState(1);
  const [newItems, setNewItems] = useState([])


  const dataLength = allItems.length;
  let pageCount = Math.ceil(dataLength / ItemsNumber);
  // console.log("page count", pageCount)

  useEffect(() => {
    const data = fakeData?.data;
    setAllItems(data)
    // console.log("all data", data)
    
    const newArray = data.slice(0,ItemsNumber);
    setNewItems(newArray);

  }, [])

  let active = actvieEl;
  let items = [];
  for (let number = 1; number <= pageCount; number++) {
    items.push(
      <Pagination.Item onClick={()=>{pageClick(number)}} key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }

  const pageClick = (value)=>{
    console.log('pageClicked',value)
    setActiveEl(value)
    
    const lastIndex = (value*ItemsNumber);
    console.log('last',lastIndex);

    const firstIndex =  lastIndex-ItemsNumber;
    console.log('first',firstIndex);

    const newArray = allItems.slice(firstIndex,lastIndex);
    setNewItems(newArray);
  
  }

  return (
    <div>
      <h1 className="text-center">New Pagination AZIM</h1>
      <div className="border d-flex justify-content-center mt-5 mb-5">
        <Pagination>{items}</Pagination>
      </div>

      <div className="border container mt-5">
        {
          // eslint-disable-next-line array-callback-return
          newItems.map((item => {
            return (
              <div className="border p-5 mt-5">

                <h2>{item.id}. {item.title}</h2>
                <p>{item.desc}</p>
                <h5>{item.age}</h5>
              </div>
            )
          }))
        }
      </div>
    </div>
  );
}

export default App;
