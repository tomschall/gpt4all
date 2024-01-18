import axios from 'axios';

export const createQuestion = async ({
  url,
  question,
}: {
  url: string;
  question: string;
}) => {
  try {
    const response = await axios.post(url, { question });

    if (!response) {
      throw new Error('Something was not okay');
    }

    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Could not create question',
    );
  }
};
