import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [userdata, setuserData] = useState([]);
  const [index, setIndex] = useState(1);

  const getData = async () => {
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${index}&limit=50`,
    );
    console.log(response.data);
    setuserData(response.data);
  };
  useEffect(() => {
    getData();
  }, [index]);

  let printData = (
    <h1 className="font-bold text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      Loading....
    </h1>
  );
  if (userdata.length > 0) {
    printData = userdata.map((elem, index) => {
      return (
        <div key={index}>
          <a href={elem.url} target="_blank">
            <div className="h-40 w-44 overflow-hidden bg-white rounded-xl">
              <img
                className="h-full w-full object-cover"
                src={elem.download_url}
                alt=""
              />
            </div>
          </a>
          <h1 className="text-lg font-bold">{elem.author}</h1>
        </div>
      );
    });
  }

  return (
    <>
      <div className="bg-black overflow-auto h-full text-white">
        <div className="flex flex-wrap gap-3">{printData}</div>
        <div className="flex justify-center gap-6 items-center p-4">
          <button
            onClick={() => {
              if (index > 1) {
                setIndex(index - 1);
                setuserData([]);
              }
            }}
            className="bg-amber-400 text-black cursor-pointer active:scale-95  rounded px-4 py-2 font-semibold"
          >
            Prev
          </button>
          <button
            onClick={() => {
              setIndex(index + 1);
              setuserData([]);
            }}
            className="bg-amber-400 text-black cursor-pointer active:scale-95  rounded px-4 py-2 font-semibold"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
