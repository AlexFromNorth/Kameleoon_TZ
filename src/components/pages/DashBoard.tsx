import React, { useEffect, useRef, useState } from "react";

import { Site, Test } from "../../types/types";

import { searchItems, searchSites } from "../../api/Api";

const DashBoard = () => {
  const [items, setItems] = useState<Array<Test>>([]);
  const [itemSearch, setItemSearch] = useState<Array<Test>>(items);
  const [sites, setSites] = useState<Array<Site>>([]);
  const [input, setInput] = useState<string>("");

  const [test, setTest] = useState(0);

  useEffect(() => {
    searchSites().then((data) => {
      setSites(data);
    });
    searchItems().then((data) => {
      setItems(data);
    });
  }, []);

  useEffect(() => {
    setItemSearch(items);
  }, [items]);

  useEffect(() => {
    const result = items.filter((item) =>
      new RegExp(input.toUpperCase()).test(item.name.toUpperCase())
    );
    setItemSearch(result);
  }, [input]);

  const inputHandler = (e: any) => {
    setInput(e.target.value);
  };

  // sort functions
  const [sortField, setSortField] = useState(undefined) //type
  const [sortOrder, setSortOrder] = useState<boolean|undefined>(undefined) //ask/desk

  
  const statusOrder = ["ONLINE", "PAUSED", "STOPPED", "DRAFT"]

  const sortHandler = (field:keyof Test) => {

      setSortOrder(!sortOrder)

      itemSearch.sort((a, b) =>{ 
        const fieldA = a[field].toString(), fieldB = b[field].toString()
        if(field === 'siteId'){

          const urlA = sites.find(( { id } ) => id === a[field])?.url,
                urlB = sites.find(( { id } ) => id === b[field])?.url

          if(urlA == 'string' && urlB == 'string'){
            return sortOrder ? urlA?.localeCompare(urlB) : urlB?.localeCompare(urlA)
          }
        }

        if (field === 'status') {
          return sortOrder ? statusOrder.indexOf(fieldA) - statusOrder.indexOf(fieldB) : statusOrder.indexOf(fieldB) - statusOrder.indexOf(fieldA)
        }
        
        else {
          return sortOrder ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA)
        }
      });
    }



  // --------------
  // --------------
  // Render JSX
  // --------------
  // --------------

  return (
    <div className="container">
      <h3>Dashboard</h3>
      <div className="w100 search__input">
        <img src="" alt="search" />
        <input
          type="text"
          placeholder="What test are you looking for?"
          value={input}
          onChange={inputHandler}
        />
        <span>{itemSearch?.length} tests</span>
      </div>

      {/* render data from api */}
      {!sites || !items ? (
        /* download  */
        <>
          <h3>Download...</h3>
        </>
      ) : (
        <>
          <div className="gridTable">
            <span onClick={()=>{sortHandler('name')}}>NAME</span>
            <span onClick={()=>{sortHandler('type')}}>TYPE</span>
            <span onClick={()=>{sortHandler('status')}}>STATUS</span>
            <span onClick={()=>{sortHandler('siteId')}}>SITE</span>
          </div>

          {/* render items */}

          {itemSearch?.map((item: Test) => (
            // new RegExp(input.toUpperCase()).test(item.name.toUpperCase()) && (
            <div
              key={item.id}
              className={`gridTable tableItem color` + item.siteId}
            >
              <span>{item.name}</span>
              <span>{item.type}</span>
              <span
                className={
                  item.status === "ONLINE"
                    ? "green"
                    : item.status === "PAUSED"
                    ? "orange"
                    : item.status === "STOPPED"
                    ? "red"
                    : ""
                }
              >
                {item.status}
              </span>
              <span>{sites.find((site) => site.id === item.siteId)?.url}</span>
              <span
                className={
                  item.status === "DRAFT" ? "btn_dark btn" : "btn_green btn"
                }
              >
                {item.status === "DRAFT" ? "Finalize" : "Results"}
              </span>
            </div>
          ))}

          {/* render element if dont hame creteria */}

            <>
              <p>Your search did not match any results.</p>
              <button
                onClick={() => {
                  setInput("");
                }}
              >
                Reset
              </button>
            </>
          
        </>
      )}
    </div>
  );
};

export default DashBoard;
