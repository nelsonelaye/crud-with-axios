import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface props {
  url: string;
  method: "put" | "post" | "patch" | "delete" | "get";
  body?: any;
  headers?: any;
}

function useAxios({ url, method, body, headers }: props) {
  const [response, setResponse] = useState();
  const [error, setError] = useState(Error);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    await axios[method](url, JSON.parse(headers), JSON.parse(body))
      .then((res: AxiosResponse) => {
        setResponse(res.data);
      })
      .catch((err: Error) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, [url, method, body, headers]);

  return { response, error, loading };
}

export default useAxios;
