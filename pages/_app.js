import Link from 'next/link';
import '../styles/globals.css';
import '../styles/theme.css';
import Image from 'next/image';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
    return (
        <container>
            <Component {...pageProps} />
            <footer>
                A project by Marc & Alison
                <script
                    data-name='BMC-Widget'
                    data-cfasync='false'
                    src='https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js'
                    data-id='dev.marc'
                    data-description='Support me on Buy me a coffee!'
                    data-message='If you enjoy the quiz, consider buying me a coffee!'
                    data-color='#40DCA5'
                    data-position='Right'
                    data-x_margin='18'
                    data-y_margin='18'
                ></script>
            </footer>
        </container>
    );
}

export default MyApp;
