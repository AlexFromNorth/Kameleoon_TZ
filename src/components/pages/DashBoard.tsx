import React, { useEffect, useState } from "react";

import Search from "../../assets/Search.svg";

import { Site, Test } from "../../types/types";

import { searchItems, searchSites } from "../../api/Api";
import { Link } from "react-router-dom";

const DashBoard = () => {
  const [items, setItems] = useState<Array<Test>>([]);
  const [itemSearch, setItemSearch] = useState<Array<Test>>(items);
  const [sites, setSites] = useState<Array<Site>>([]);
  const [input, setInput] = useState<string>("");

  const re = /https?:\/\/(www\.)?/gm;

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
  const [sortOrder, setSortOrder] = useState<boolean | undefined>(undefined); //ask/desk

  const statusOrder = ["ONLINE", "PAUSED", "STOPPED", "DRAFT"];

  const sortHandler = (field: keyof Test) => {
    setSortOrder(!sortOrder);

    itemSearch.sort((a, b) => {
      const fieldA = a[field].toString(),
        fieldB = b[field].toString();
      // Sort sites
      if (field === "siteId") {
        const urlA = sites
            .find(({ id }) => id === a[field])
            ?.url.replace(re, ""),
          urlB = sites.find(({ id }) => id === b[field])?.url.replace(re, "");

        if (urlA == "string" && urlB == "string") {
          return sortOrder
            ? urlA?.localeCompare(urlB)
            : urlB?.localeCompare(urlA);
        }
      }
      // Sort status
      if (field === "status") {
        return sortOrder
          ? statusOrder.indexOf(fieldA) - statusOrder.indexOf(fieldB)
          : statusOrder.indexOf(fieldB) - statusOrder.indexOf(fieldA);
      }
      // Other sorts
      else {
        return sortOrder
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }
    });
  };

  // --------------
  // --------------
  // Render JSX
  // --------------
  // --------------

  return (
    <div className="container">
      <h3>Dashboard</h3>
      <div className="w100 search__input">
        <img src={Search} alt="search" />
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
        /* Refresh this page  */
        <>
          <h3>Refresh this page...</h3>
        </>
      ) : sites && items && itemSearch.length != 0 ? (
        <>
          <div className="gridTable">
            <span
              onClick={() => {
                sortHandler("name");
              }}
            >
              NAME
            </span>
            <span
              onClick={() => {
                sortHandler("type");
              }}
            >
              TYPE
            </span>
            <span
              onClick={() => {
                sortHandler("status");
              }}
            >
              STATUS
            </span>
            <span
              onClick={() => {
                sortHandler("siteId");
              }}
            >
              SITE
            </span>
          </div>

          {/* Render items */}

          {itemSearch?.map((item: Test) => (
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
              <span>
                {sites
                  .find((site) => site.id === item.siteId)
                  ?.url.replace(re, "")}
              </span>
              <Link
                to={
                  item.status === "DRAFT"
                    ? `finalize/${item.siteId}`
                    : `results/${item.siteId}`
                }
                className={
                  item.status === "DRAFT" ? "btn_dark btn" : "btn_green btn"
                }
              >
                {item.status === "DRAFT" ? "Finalize" : "Results"}
              </Link>
            </div>
          ))}
        </>
      ) : (
        // Render element if dont hame creteria
        <div className="center">
          <p>Your search did not match any results.</p>
          <button
            className="btn_green btn"
            onClick={() => {
              setInput("");
            }}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
