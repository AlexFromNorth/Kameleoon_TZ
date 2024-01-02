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

  const sortHandler = (field:keyof Test) => {

    if(sortOrder !=true){
      setSortOrder(true)
      itemSearch.sort((a, b) =>{ 
        // const [field]
        const fieldName = a[field], fieldName2 = b[field]
        if(typeof fieldName == 'string' && typeof fieldName2 == 'string' ){
            return fieldName.localeCompare(fieldName2)
        } else if(typeof fieldName == 'number' && typeof fieldName2 == 'number') {
            return fieldName - fieldName2;
        }
        return 0
    });
    }
    else{
      setSortOrder(false)
      // itemSearch.sort((a, b) => b[field as keyof Test].localeCompare(a[field as keyof Test]));
    }

  }



  // const [sortName, setSortName] = useState<boolean|undefined>(undefined)
  // const sortNameHandler = () => {
  //   if(sortName != true ){
  //     setSortName(true)
  //     itemSearch.sort((a, b) => a.name.localeCompare(b.name));
  //   }
  //   else{
  //     setSortName(false)
  //     itemSearch.sort((a, b) => b.name.localeCompare(a.name));
  //   }
  // }

  // console.log(itemSearch)

  // const [sortType, setSortType] = useState<boolean|undefined>(undefined)
  // const sortTypeHandler = () => {
  //   console.clear()
  //   itemSearch.forEach(el=>console.log(el.type))

  //   if(sortType != true ){
  //     setSortType(true)
  //     itemSearch.sort((a, b) => a.name.localeCompare(b.name));
  //   }
  //   else{
  //     setSortType(false)
  //     itemSearch.sort((a, b) => b.name.localeCompare(a.name));
  //   }
  // }

  // const [sortStatus, setSortStatus] = useState<boolean|undefined>(undefined)
  // const sortStatusHandler = () => {
  //   if(sortStatus != true ){
  //     setSortStatus(true)
  //     itemSearch.sort((a, b) => a.name.localeCompare(b.name));
  //   }
  //   else{
  //     setSortStatus(false)
  //     itemSearch.sort((a, b) => b.name.localeCompare(a.name));
  //   }
  // }

  // const [sortSite, setSortSite] = useState<boolean|undefined>(undefined)
  // const sortSiteHandler = () => {
  //   if(sortSite != true ){
  //     setSortSite(true)
  //     itemSearch.sort((a, b) => a.name.localeCompare(b.name));
  //   }
  //   else{
  //     setSortSite(false)
  //     itemSearch.sort((a, b) => b.name.localeCompare(a.name));
  //   }
  // }


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
            {/* <span onClick={sortTypeHandler}>TYPE</span> */}
            {/* <span onClick={sortStatusHandler}>STATUS</span> */}
            {/* <span onClick={sortSiteHandler}>SITE</span> */}
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
