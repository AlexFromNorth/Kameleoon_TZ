import React, { useEffect, useState } from "react";

import { Site, Test } from "../../types/types";

import { searchItems, searchSites } from "../../api/Api";

const DashBoard = () => {

  const [items, setItems] = useState<Array<Test>>();
  const [sites, setSites] = useState<Array<Site>>([]);
  const [input, setInput] = useState<string | undefined>('');


  useEffect(() => {
    searchSites().then((data) => {
      setSites(data);
    });
    searchItems().then((data) => {
      setItems(data);
    });
    console.log('rerender')
  }, []);

  return (
    <div className="container">
      <h3>Dashboard</h3>
      <div className="w100 search__input">
        <img src="" alt="search" />
        <input type="text" placeholder="What test are you looking for?" value={input} onChange={(e)=>setInput(e.target.value)}/>
        <span>{items?.length} tests</span>
      </div>

      {/* render data from api */}
      {!sites || !items  ? 

        /* download  */
        <>
          <h3>Download...</h3>
        </> :   

        // render items
        <>
        <div  className="gridTable">
            <span>NAME</span>
            <span>TYPE</span>
            <span>STATUS</span>
            <span>SITE</span>
          </div>
          {items?.map((item: Test) => (
            <div key={item.id} className={`gridTable tableItem ` + `color` + item.siteId } >
              <span>{item.name}</span>
              <span>{item.type}</span>
              <span className={item.status === 'ONLINE' ? 'green' : item.status === 'PAUSED' ? 'orange' : item.status === 'STOPPED' ? 'red' : ''  }>{item.status}</span>
              <span>{sites.find((site) => site.id === item.siteId)?.url}</span>
              <span className={item.status === "DRAFT" ? "btn_dark btn" : "btn_green btn"  }>{item.status === "DRAFT" ? "Finalize" : "Results"}</span>
            </div>
          ))}
        </>
      }



    </div>
  );
};

export default DashBoard;
