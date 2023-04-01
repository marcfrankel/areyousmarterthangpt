import Link from 'next/link';
import '../styles/globals.css';
import '../styles/theme.css';
import Image from 'next/image';

function MyApp({ Component, pageProps }) {
    return (
        <container>
            <Component {...pageProps} />
            <footer>A project by Marc and Alison </footer>
        </container>
    );
}

export default MyApp;
