import React, { useState } from "react";
import { useQuery } from "react-query";
import Person from "./Person";

const fetchPeople = async (page) => {
  const res = await fetch(`http://swapi.dev/api/people/?page=${page}`);
  return res.json();
};

const People = () => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(["people", page], () => fetchPeople(page));

  return (
    <div>
      <h2>People</h2>

      <button onClick={() => setPage(1)}>page 1</button>
      <button onClick={() => setPage(2)}>page 2</button>
      <button onClick={() => setPage(3)}>page 3</button>

      {status === "loading" && (
        <div>
          <h3 />
          <h3>Loading data</h3>
        </div>
      )}

      {status === "error" && (
        <div>
          <h3 />
          <h3>Error Fetching Data</h3>
        </div>
      )}

      {status === "success" && (
        <div>
          {data.results.map((person) => (
            <Person key={person.name} person={person} />
          ))}
        </div>
      )}
    </div>
  );
};

export default People;
