import Head from 'next/head';
import Lottie from 'react-lottie';
import styles from '../styles/Home.module.css';
import * as animationData from '../public/robot.json';
import Link from 'next/link';

const LottieAnimation = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData.default,
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
    return (
        <div className={styles.container}>
            <Head>
                <title>Are You Smarter Than GPT?</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className={styles.main}>
                <LottieAnimation />
                <h1
                    className={[
                        styles.title,
                        {
                            marginBottom: 24,
                        },
                    ]}
                >
                    Are you smarter than GPT?
                </h1>

                <Link href='quiz'>
                    <div className={'button'} onClick={() => {}}>
                        Prove It!
                    </div>
                </Link>
            </main>

            <footer className={styles.footer}>
                A project by Marc and Alison
            </footer>
        </div>
    );
}
