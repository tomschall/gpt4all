import { Injectable } from '@nestjs/common';
import { createCompletion, loadModel } from 'gpt4all';

@Injectable()
export class AppService {
  async getAnswer(): Promise<any> {
    const model = await loadModel('nous-hermes-llama2-13b.Q4_0.gguf', {
      modelPath:
        '/Users/thomas.schallert@fhnw.ch/Projects/gpt4all/gpt4all-nestjs/',
      verbose: true,
    });

    const response = await createCompletion(
      model,
      [
        {
          role: 'user',
          content: 'Was ist das Schönste auf der Welt?',
        },
      ],
      {
        verbose: true,
        nCtx: 10000,
        nPredict: 10000,
      },
    );

    return response;
  }

  async createQuestion(question: string): Promise<any> {
    if (!question) return false;

    const model = await loadModel('nous-hermes-llama2-13b.Q4_0.gguf', {
      modelPath:
        '/Users/thomas.schallert@fhnw.ch/Projects/gpt4all/gpt4all-nestjs/',
      verbose: true,
    });

    const response = await createCompletion(
      model,
      [
        {
          role: 'user',
          content: question,
        },
      ],
      {
        verbose: true,
        nCtx: 10000,
        nPredict: 10000,
      },
    );

    return response;
  }
}
