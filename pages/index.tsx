import Head from 'next/head';
import Lottie from 'react-lottie';
import styles from '../styles/Home.module.css';
import * as animationData from '../public/robot.json';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const LottieAnimation = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div>
            <Lottie
                options={defaultOptions}
                height={200}
                width={200}
                style={{
                    marginBottom: 24,
                }}
            />
        </div>
    );
};

export default function Home() {
    const [winStreak, setWinStreak] = useState<string | undefined>(undefined);

    useEffect(() => {
        const existing = localStorage.getItem('winStreak');
        if (existing) {
            setWinStreak(existing);
        }
    }, []);

    return (
        <>
            <Head>
                <title>Are You Smarter Than GPT?</title>
                <meta
                    name='description'
                    content='A daily quiz to see if you are smarter than the current GPT model from OpenAI.'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main className={styles.main}>
                <LottieAnimation />
                <h1 className={styles.title}>Are you smarter than GPT?</h1>

                <Link href='quiz'>
                    <div className={'button'}>Prove It!</div>
                </Link>

                <p className={styles.description}>
                    A free daily quiz to see if you are smarter than the current
                    GPT model from OpenAI.
                </p>
                {winStreak && (
                    <p className={styles.description}>
                        Win Streak: {winStreak}
                    </p>
                )}
            </main>
        </>
    );
}
