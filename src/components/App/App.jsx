import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import { mockOrder } from "../../lib/mock-order";
import { mockData } from "../../lib/mock-data";
import { useEffect, useState, useCallback } from "react";
import Main from "../Main/Main";
import { fetchRequest } from "../../api/index";
import { ingredientType } from "../../types/types";

export default function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const dataRequest = useCallback(async () => {
    const res = await fetchRequest("/ingredients");
    if (res && res.data) {
      setData([...data, ...res.data]);
    } else {
      setError(true);
    }
  }, []);

  useEffect(() => {
    dataRequest();
  }, [dataRequest]);

  return (
    <div className="App">
      {error ? (
        <div className="error-App">
          <p className="text text_type_main-large">
            Произошла ошибка, при получении данных
          </p>
        </div>
      ) : (
        <>
          <AppHeader />
          <Main items={data} orders={data} />
        </>
      )}
    </div>
  );
}
