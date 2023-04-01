import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import style from '../styles/Quiz.module.css';
import { Question } from './api/question';

const QuestionPage = () => {
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
    const [question, setQuestion] = useState<Question | undefined>(undefined);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [quizOver, setQuizOver] = useState(false);
    const [userScore, setUserScore] = useState(0);
    const [gptScore, setGptScore] = useState(0);
    const [questionOnScreen, setQuestionOnScreen] = useState(false);
    const typingRef = useRef(null);

    useEffect(() => {
        const fetchQuestion = async () => {
            const response = await fetch(
                `/api/question?questionNumber=${currentQuestionNumber}`
            );
            if (response.ok) {
                const data = await response.json();

                if (data.end !== undefined) {
                    setQuizOver(true);

                    if (userScore >= gptScore) {
                        const existingWinStreak =
                            localStorage.getItem('winStreak');
                        localStorage.setItem(
                            'winStreak',
                            existingWinStreak === null
                                ? '1'
                                : (parseInt(existingWinStreak) + 1).toString()
                        );
                    }
                } else {
                    setQuestion(data.question);
                }
            } else {
                alert('Something went wrong');
            }
        };
        fetchQuestion();
    }, [currentQuestionNumber]);

    const handleAnswerSelect = (answerId: number) => {
        setSelectedAnswer(answerId);
        const rightAnswer = question.answers.find(
            (answer) => answer.correct === true
        );

        if (answerId === rightAnswer.id) {
            setUserScore((prev) => prev + 1);
        }

        if (rightAnswer.id === question.gptAnswer) {
            setGptScore((prev) => prev + 1);
        }
    };

    const handleNextClick = () => {
        setSelectedAnswer(null);
        setCurrentQuestionNumber(currentQuestionNumber + 1);
    };
    if (!question) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Head>
                <title>Are You Smarter Than GPT?</title>
            </Head>
            <main className={style.main}>
                {quizOver ? (
                    <div
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        <h1>Quiz Over!</h1>
                        <p>
                            Your final score is {userScore} vs GPT's {gptScore}
                        </p>
                        {userScore >= gptScore ? (
                            <>
                                {userScore === gptScore ? (
                                    <p>You tied GPT4!</p>
                                ) : (
                                    <p>You beat GPT4!</p>
                                )}
                            </>
                        ) : (
                            <p>You are not smarter than GPT!</p>
                        )}
                        <h3
                            style={{
                                marginTop: '2rem',
                            }}
                        >
                            Come back tomorrow for another battle
                        </h3>
                    </div>
                ) : (
                    <>
                        <h1>Question #{question.questionNumber}</h1>
                        <h3>{question.question}</h3>
                        {question === undefined ? (
                            <div>Loading...</div>
                        ) : (
                            <AnimatePresence>
                                <div className={style.grid}>
                                    {setQuestionOnScreen &&
                                        question.answers.map((answer) => (
                                            <motion.button
                                                key={answer.id}
                                                onClick={() =>
                                                    handleAnswerSelect(
                                                        answer.id
                                                    )
                                                }
                                                // If the answer is selected, give it the class of correct Answer or incorrect answer based on the answer.correct property
                                                // All buttons should have a style.button class
                                                className={`${
                                                    style.answerButton
                                                } ${
                                                    selectedAnswer !== null
                                                        ? answer.correct
                                                            ? style.correctAnswer
                                                            : style.incorrectAnswer
                                                        : ''
                                                }`}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                disabled={
                                                    selectedAnswer !== null
                                                }
                                                transition={{
                                                    type: 'tween',
                                                    delay: 0.25 * answer.id,
                                                }}
                                            >
                                                {answer.answer}
                                            </motion.button>
                                        ))}
                                </div>
                            </AnimatePresence>
                        )}
                        <div className={style.scoreGrid}>
                            <div>
                                <h2>You</h2>
                                <h4>{userScore}</h4>
                            </div>
                            <div>
                                <h2>GPT4</h2>
                                <h4>{gptScore}</h4>
                            </div>
                        </div>
                        <>
                            <motion.button
                                className={style.nextButton}
                                onClick={handleNextClick}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                disabled={selectedAnswer === null}
                                transition={{
                                    type: 'tween',
                                    delay: 1.25,
                                }}
                            >
                                Next
                            </motion.button>
                        </>
                    </>
                )}
            </main>
        </>
    );
};

export default QuestionPage;
