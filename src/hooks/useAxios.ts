import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface props {
  url: string;
  method: "put" | "post" | "patch" | "delete" | "get";
  body?: any;
  headers?: any;
}

type responseType = {
  title: string;
  body: string;
  userId: number;
  id: number;
};

function useAxios({ url, method, body, headers }: props) {
  const [response, setResponse] = useState(Array<responseType>);
  const [error, setError] = useState(Error);
  const [loadingState, setLoadingState] = useState(false);
  const fetchData = async () => {
    await axios[method](url, headers, body)
      .then((res) => {
        // console.log(res);

        setResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setLoadingState(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, [url, method, body, headers]);

  return { response, error, loadingState };
}

export default useAxios;
