import React from 'react';
import useSWR, { Fetcher } from 'swr';

interface Data {
  llmodel: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: {
    index: number;
    message: { content: string; role: string; index: number };
  }[];
}

const fetcher: Fetcher<Data, string> = (...args) =>
  fetch(...args).then((res) => res.json());

const Gpt4all: React.FC = () => {
  const { data, error, isValidating } = useSWR(
    'http://localhost:3000/',
    fetcher,
  );

  if (error) return <div className="failed">failed to load</div>;
  if (isValidating) return <div className="Loading">Loading...</div>;

  console.log('data', data);

  return (
    <div>
      {data &&
        data.choices &&
        data.choices.map((choice, index) => (
          <span key={index}>{choice.message.content}</span>
        ))}
    </div>
  );
};

export default Gpt4all;
