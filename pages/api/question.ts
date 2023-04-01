// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextApiRequestQuery } from 'next/dist/server/api-utils';

export interface Answer {
    answer: string;
    correct: boolean;
    id: number;
}

export interface Question {
    questionNumber: number;
    question: string;
    answers: Answer[];
    gptAnswer: number;
}

type DailyQuestion = Map<string, Question[]>;

const questions: DailyQuestion = new Map([
    [
        '2023-04-01',
        [
            {
                questionNumber: 1,
                question: 'What is the capital of France?',
                answers: [
                    {
                        answer: 'Paris',
                        correct: true,
                        id: 1,
                    },
                    {
                        answer: 'London',
                        correct: false,
                        id: 2,
                    },
                    {
                        answer: 'Berlin',
                        correct: false,
                        id: 3,
                    },
                    {
                        answer: 'Rome',
                        correct: false,
                        id: 4,
                    },
                ],
                gptAnswer: 1,
            },
            {
                questionNumber: 2,
                question: 'What is the capital of Germany?',
                answers: [
                    {
                        answer: 'Paris',
                        correct: false,
                        id: 1,
                    },
                    {
                        answer: 'London',
                        correct: false,
                        id: 2,
                    },
                    {
                        answer: 'Berlin',
                        correct: true,
                        id: 3,
                    },
                    {
                        answer: 'Rome',
                        correct: false,
                        id: 4,
                    },
                ],
                gptAnswer: 3,
            },
        ],
    ],
]);

export default (req: NextApiRequestQuery, res: NextApiResponse) => {
    const questionNumber = req.query['questionNumber'] as number;

    if (questionNumber === undefined || questionNumber === null) {
        res.statusCode = 400;
        res.json({ error: `Invalid question number` });
        return;
    }

    // Get the current date in the string format YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    const daysQuestions = questions.get(today);

    if (daysQuestions === undefined) {
        res.statusCode = 404;
        res.json({ error: `No questions found for today` });
        return;
    }

    if (questionNumber > daysQuestions.length) {
        res.statusCode = 200;
        res.json({ end: true });
        return;
    }

    const question = daysQuestions[questionNumber - 1];

    if (question === undefined) {
        res.statusCode = 404;
        res.json({ error: `No question found for number ${questionNumber}` });
        return;
    }

    res.statusCode = 200;
    res.json({ question: question });
};
