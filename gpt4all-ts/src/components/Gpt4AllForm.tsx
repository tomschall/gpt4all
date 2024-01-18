import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { createQuestion } from '../services/createQuestion';

const Gpt4all: React.FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [formValue, setFormValue] = useState<string>('');
  const { data, error, isValidating } = useSWR(
    { url: 'http://localhost:3000/', question },
    createQuestion,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const handleSubmit = () => {
    setQuestion(formValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormValue(e.target.value);
  };

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        setQuestion(formValue);
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [setQuestion, formValue]);

  if (error) return <div className="failed">failed to load</div>;
  if (isValidating) return <div className="Loading">Loading...</div>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question">What is your question?</label>
          <br />
          <br />
          <textarea
            rows={10}
            cols={100}
            name="question"
            id="question"
            value={formValue}
            required
            maxLength={10000}
            onChange={handleChange}
          />
          <br />
        </div>
        <br />
        <button type="submit">Submit</button>
        <br />
        <br />
      </form>
      {data &&
        data.choices &&
        data.choices.map(
          (choice: { message: { content: string } }, index: number) => (
            <span key={index}>{choice.message.content}</span>
          ),
        )}
    </div>
  );
};

export default Gpt4all;
