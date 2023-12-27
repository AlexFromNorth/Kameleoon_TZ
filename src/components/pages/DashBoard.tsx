import React, { useEffect, useState } from "react";
import { Site, Test } from "../../types/types";
import { searchItems, searchSites } from "../../api/Api";

const DashBoard = () => {
  const [items, setItems] = useState<Array<Test>>();
  const [sites, setSites] = useState<Array<Site>>([]);
  useEffect(() => {
    searchSites().then((data) => {
      setSites(data);
    });
    searchItems().then((data) => {
      setItems(data);
    });
  }, []);

  return (
    <div className="container">
      <h3>Dashboard</h3>
      <div>
        <img src="" alt="search" />
        <input type="text" placeholder="What test are you looking for?" />
        <p>{items?.length} tests</p>
      </div>
      {sites && (
        <>
          {items?.map((item:Test) => (
            <div key={item.id} className="gridTable tableItem">
              <span>{item.name}</span>
              <span>{item.type}</span>
              <span>{item.status}</span>
              <span>{sites.find((site)=>site.id === item.siteId)?.url}</span>
              <span>{ item.status==='DRAFT' ? 'Finalize': 'Results'}</span>
            </div>
          ))}
        </>
      )}

    </div>
  );
};

export default DashBoard;
