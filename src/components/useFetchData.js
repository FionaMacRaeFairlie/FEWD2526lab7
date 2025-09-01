import { useEffect, useState, useCallback } from "react";

const useFetchData = ({ url, settings }) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState([]);


  const fetchData = useCallback(() => {
    fetch(url, settings)
      .then((response) => response.json())
      .then((incomingData) => {
        console.log(incomingData)
        setData(incomingData);
        setStatus('fetched');
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

return { status, data };

};
export default useFetchData;
