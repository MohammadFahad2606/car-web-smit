import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [cardata, setcardata] = useState([]);
  const [input, setinput] = useState("");
  const [catagry, setcatagry] = useState([]);
  const [filter, setfilter] = useState([]);
  const [found, setfound] = useState(false);
  console.log(input);

  const getData = async () => {
    try {
      const data = await axios.get("https://freetestapi.com/api/v1/cars");
      const res = data?.data;
      setcardata(res);
      setfilter(res);
      // console.log(cardata);
      const categories = [...new Set(res.map((item) => item.make))];
      setcatagry(categories);
    } catch (error) {
      console.log(error);
    }
  };
  const handleValue = (cat) => {
    if (cat === "All") {
      console.log(cat);
      setfilter(cardata);
    } else {
      const filterdData = cardata.filter((item) => item.make === cat);

      setfilter(filterdData);
    }
  };
  const handleSearchBtn = () => {
    const filterSearch = filter.filter(
      (item) =>
        item.year.toString().includes(input.toLowerCase()) ||
        item.price.toString().includes(input.toLowerCase()) ||
        item.make.toLowerCase().includes(input.toLowerCase()) ||
        item.model.toLowerCase().includes(input.toLowerCase())
    );

    // const filterSearch = filter.filter((item) =>
    //   item.make.toLowerCase().includes(input)
    // );
    setfilter(filterSearch);
  };
  const handleSearch = (value) => {
    setinput(value);
    if (value === "") {
      setfilter(cardata);
    }
  };

  const EnterSearch = (e) => {
    if (e.key == "Enter") {
      handleSearchBtn();
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <h1 className="header">Carvoy</h1>
      <div className="searchbar">
        <div className="search">
          <input
          onKeyDown={EnterSearch}
          onChange={(e) => handleSearch(e.target.value)}
          value={input}
          placeholder="Search Car"
          type="text"
          name=""
          id=""
        />
        <button onClick={handleSearchBtn}>Search</button>
        </div>
        <select onChange={(e) => handleValue(e.target.value)}>
          <option value="All">All</option>
          {catagry.map((item, index) => {
            // console.log(item)
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>

      <div className="cardwapper">
        {filter.map((item) => {
          // console.log(item);
          const { year, transmission, price, id, model, make, image } = item;
          return (
            <div className="card" key={id}>
              <img src={image} />
              <h2>{make}</h2>
              <h4>Model:{model}</h4>
              <h6>Price:{price} $</h6>
              <h6>Year :{year}</h6>
              <h6>Transmission:{transmission}</h6>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
