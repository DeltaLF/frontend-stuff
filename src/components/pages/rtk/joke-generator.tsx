import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useGetRandomJokeQuery } from '../../../redux/apis/joke/jokeApi';

function JokeGenerator() {
  const [isSkipped, setIsSkipped] = useState<boolean>(true);
  // skip for prevent fetch data onmount
  const properties = useGetRandomJokeQuery(undefined, { skip: isSkipped });
  const { data, error, isLoading, refetch } = properties;

  return (
    <div className="joke-generator">
      {isLoading && <h1>Loading</h1>}
      <Button
        onClick={() => {
          if (isSkipped) {
            setIsSkipped(false);
          } else {
            refetch();
          }
        }}
      >
        <>
          {data?.joke}
          Fetch Joke
        </>
      </Button>
    </div>
  );
}

export default JokeGenerator;
