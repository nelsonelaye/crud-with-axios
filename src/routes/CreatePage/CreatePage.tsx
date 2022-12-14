import React, { useState, useCallback } from "react";
import Button from "../../components/Button";
import style from "./CreatePage.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePage = () => {
  const baseURL = "https://jsonplaceholder.typicode.com/posts";

  const [data, setData] = useState({
    userId: "",
    title: "",
    body: "",
  });

  const navigate = useNavigate();

  const CollectInput = useCallback(
    (prop: string, value: string) => {
      setData({ ...data, [prop]: value });
      console.log(data);
    },
    [data]
  );

  const SubmitForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      await axios
        .post(baseURL, JSON.stringify(data))
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      // return console.log(data);
    },
    [data]
  );
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
              type="text"
              id="userId"
              onChange={(e) => {
                CollectInput("userId", e.target.value);
              }}
              required
            />
          </div>

          <Button text="Submit" />
        </form>
      </main>
    </>
  );
};

export default CreatePage;
