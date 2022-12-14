import React, { useState, useCallback, useEffect } from "react";
import Button from "../../components/Button";
import style from "./UpdatePage.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { reqType } from "./UpdatePage.types";

const UpdatePage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<reqType>({
    userId: 0,
    title: "",
    body: "",
  });

  const baseURL = "https://jsonplaceholder.typicode.com/posts";

  const { id } = useParams();
  const navigate = useNavigate();

  const CollectInput = useCallback(
    (prop: string, value: string) => {
      setData({ ...data, [prop]: value });
      // console.log(data);
    },
    [data]
  );

  const SubmitForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      await axios
        .patch(`${baseURL}/${id}`, data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
          navigate("/");
        });

      // return console.log(data);
    },
    [data]
  );

  const fetchData = useCallback(
    (id?: string) => {
      axios
        .get(`${baseURL}/${id}`)
        .then((res) => {
          console.log("update this", res);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [data]
  );

  useEffect(() => {
    fetchData(id);
  }, []);
  return (
    <>
      <main>
        <h1>Create Data</h1>
        <form
          onSubmit={(e) => {
            SubmitForm(e);
          }}
        >
          <div className={style["input_hold"]}>
            <label htmlFor="title">
              Title <span className={style["red"]}>*</span>
            </label>
            <input
              type="text"
              id="title"
              defaultValue={data.title}
              placeholder="Enter new title here"
              onChange={(e) => {
                CollectInput("title", e.target.value);
              }}
              required
            />
          </div>

          <div className={style["input_hold"]}>
            <label htmlFor="body">
              Body <span className={style["red"]}>*</span>
            </label>
            <input
              type="text"
              id="body"
              defaultValue={data.body}
              onChange={(e) => {
                CollectInput("body", e.target.value);
              }}
              required
            />
          </div>

          <div className={style["input_hold"]}>
            <label htmlFor="userId">
              User ID <span className={style["red"]}>*</span>
            </label>
            <input
              type="number"
              id="userId"
              defaultValue={data.userId}
              onChange={(e) => {
                CollectInput("userId", e.target.value);
              }}
              required
            />
          </div>
          {loading ? (
            <Button text="">
              <ClipLoader />
            </Button>
          ) : (
            <Button text="Submit" />
          )}
        </form>
      </main>
    </>
  );
};

export default UpdatePage;
