import { useState, useEffect, useCallback } from "react";
import style from "./LandingPage.module.scss";
import "./LandingPage.module.scss";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { BounceLoader, ClipLoader } from "react-spinners";
import { responseType } from "./LandingPage.types";
import useAxios from "../../hooks/useAxios";

const LandingPage = () => {
  const [data, setData] = useState(Array<responseType>);
  const [loading, setLoading] = useState(false);

  const baseURL = "https://jsonplaceholder.typicode.com/posts";

  // const { response, error, loading } = useAxios({
  //   method: "get",
  //   url: baseURL,
  // });

  let th = [
    { name: "ID" },
    { name: "userID" },
    { name: "Title" },
    { name: "Body" },
    { name: "" },
    { name: "" },
  ];

  const fetchData = useCallback(async () => {
    setLoading(true);
    await axios
      .get(baseURL)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [data]);

  const DeleteData = async (id: number) => {
    setLoading(true);

    await axios
      .delete(`${baseURL}/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    // if (response !== null) {
    //   setData(response);
    // }
  }, []);
  return (
    <main>
      <h1>CRUD app</h1>
      {loading ? (
        <div className={style["loader"]}>
          <BounceLoader size="50px" />
          <div style={{ marginTop: "20px" }}>loading data...</div>
        </div>
      ) : (
        <>
          <Link to="/create">
            <Button text="Create Data" />
          </Link>
          <table>
            <thead>
              <tr>
                {th?.map((item, index) => (
                  <th key={index}>{item.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map((prop) => (
                <tr key={prop.id}>
                  <td>{prop.id}</td>
                  <td>{prop.userId}</td>
                  <td>{prop.title}</td>
                  <td>{prop.body}</td>
                  <td>
                    {" "}
                    <Link to={`/update/${prop.id}`}>
                      <Button text="update" />
                    </Link>
                  </td>
                  <td>
                    <Button
                      text="Delete"
                      onClick={() => {
                        DeleteData(prop.id);
                      }}
                    />
                  </td>
                </tr>
              ))}
              {/* <td>1</td>
          <td>1</td>
          <td>Another title</td>
          <td>Another body</td>
          <td>
            {" "}
            <Button text="update" />
          </td>
          <td>
            <Button text="Delete" />
          </td> */}
            </tbody>
          </table>
        </>
      )}
    </main>
  );
};

export default LandingPage;
