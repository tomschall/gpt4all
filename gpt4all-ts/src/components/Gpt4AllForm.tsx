import React, { MouseEvent, useEffect, useState } from 'react';
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

  const handleSubmit = (
    e: React.ChangeEvent<HTMLTextAreaElement> | MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setQuestion(formValue);
    setFormValue('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormValue(e.target.value);
  };

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        setQuestion(formValue);
        setFormValue('');
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [setQuestion, formValue]);

  if (error) return <div className="failed">failed to load</div>;
  if (isValidating)
    return (
      <div className="loading">
        <p>
          <img src="/public/spinner.gif" width="50"></img>
        </p>
        <p>Wait a moment, fetching an answer...</p>
      </div>
    );

  return (
    <div>
      <form>
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
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
        <br />
        <br />
      </form>
      {data
        ? data.choices &&
          data.choices.map(
            (choice: { message: { content: string } }, index: number) => (
              <span key={index}>{choice.message.content}</span>
            ),
          )
        : 'No question? No answer!'}
    </div>
  );
};

export default Gpt4all;
