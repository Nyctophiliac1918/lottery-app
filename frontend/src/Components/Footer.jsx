const Footer = () => (
    <footer className="text-center text-white" style={{backgroundColor: "#f1f1f1"}}>
    <div className="container pt-6">
        <section className="mb-6">
        <a
            target="_blank" rel="noopener noreferrer"
            className="btn btn-link btn-floating btn-lg text-dark m-1"
            href="https://www.facebook.com/karan.saraswat.50/"
            role="button"
            data-mdb-ripple-color="dark"
            ><i className="fab fa-facebook-f"></i>
        </a>

        {/* <a
            target="_blank" rel="noopener noreferrer"
            className="btn btn-link btn-floating btn-lg text-dark m-1"
            href="https://twitter.com/KaranSaraswat2"
            role="button"
            data-mdb-ripple-color="dark"
            ><i className="fab fa-twitter"></i>
        </a> */}

        <a
            className="btn btn-link btn-floating btn-lg text-dark m-1"
            href="mailto:karansaraswat.che18@itbhu.ac.in"
            role="button"
            data-mdb-ripple-color="dark"
            ><i className="fab fa-google"></i>
        </a>

        <a
            target="_blank" rel="noopener noreferrer"
            className="btn btn-link btn-floating btn-lg text-dark m-1"
            href="https://www.instagram.com/karansaraswat1918/"
            role="button"
            data-mdb-ripple-color="dark"
            ><i className="fab fa-instagram"></i>
        </a>

        <a
            target="_blank" rel="noopener noreferrer"
            className="btn btn-link btn-floating btn-lg text-dark m-1"
            href="https://www.linkedin.com/in/karan-saraswat-k1918s/"
            role="button"
            data-mdb-ripple-color="dark"
            ><i className="fab fa-linkedin"></i>
        </a>

        <a
            target="_blank" rel="noopener noreferrer"
            className="btn btn-link btn-floating btn-lg text-dark m-1"
            href="https://github.com/Nyctophiliac1918"
            role="button"
            data-mdb-ripple-color="dark"
            ><i className="fab fa-github"></i>
        </a>
        </section>
    </div>

    <div className="text-center text-white p-2" style={{backgroundColor: 'rgb(31, 30, 30)'}}>
        © {new Date().getFullYear()} Copyright : 
        <a className="text-white" href="https://profile-karan-saraswat.netlify.app/"> Karan Saraswat</a>
    </div>
    </footer>
);

export default Footer;
