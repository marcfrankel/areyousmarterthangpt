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
        <>
            <Head>
                <title>Are You Smarter Than GPT?</title>
                <meta
                    name='description'
                    content='A daily quiz to see if you are smarter than the current GPT model from OpenAI.'
                />
                <link rel='icon' href='/favicon.ico' />
                <script
                    data-name='BMC-Widget'
                    data-cfasync='false'
                    src='https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js'
                    data-id='dev.marc'
                    data-description='Support me on Buy me a coffee!'
                    data-message='Thanks for enjoying the quiz!'
                    data-color='#40DCA5'
                    data-position='Right'
                    data-x_margin='18'
                    data-y_margin='18'
                ></script>
            </Head>
            <main className={styles.main}>
                <LottieAnimation />
                <h1 className={styles.title}>Are you smarter than GPT?</h1>

                <Link href='quiz'>
                    <div className={'button'} onClick={() => {}}>
                        Prove It!
                    </div>
                </Link>
            </main>
        </>
    );
}
