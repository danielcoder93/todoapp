import { useEffect } from "react";

export const useGetTodos = () => {
  useEffect(() => {
    fetch(`https://api-nodejs-todolist.herokuapp.com/task`, {
      headers: new Headers({
        Authorization:
          "Bearer npeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzNjNzdhZmNiYmU0NTAwMTc2MmI2MzciLCJpYXQiOjE2NjQ5MTM3MzN9.5EVTzF2SueiMcI7CsSugpyeaRjBVU4u8SkpLLknTRZU",
          "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
};
