import React, { useEffect, useState } from "react";
import searchBooks from "../../api/Api";
import { Test } from "../../types/types";

const DashBoard = () => {
  const [items, setItems] = useState<Array<Test>>();
  useEffect(() => {
    searchBooks().then((data) => {
      console.log(data);
      setItems(data);
    });
  }, []);

  return (
    <div>
      {items?.map((item) => (
        <div key={item.id}>
          <h2>{item.id}</h2>
        </div>
      ))}
    </div>
  );
};

export default DashBoard;
