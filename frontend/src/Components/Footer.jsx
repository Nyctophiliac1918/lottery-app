import React from "react";

const Footer = () => (
    <footer class="text-center text-white" style={{backgroundColor: "#f1f1f1"}}>
    <div class="container pt-6">
        <section class="mb-6">
        <a
            class="btn btn-link btn-floating btn-lg text-dark m-1"
            href="https://www.facebook.com/karan.saraswat.50/"
            role="button"
            data-mdb-ripple-color="dark"
            ><i class="fab fa-facebook-f"></i>
        </a>

        <a
            class="btn btn-link btn-floating btn-lg text-dark m-1"
            href="https://twitter.com/KaranSaraswat2"
            role="button"
            data-mdb-ripple-color="dark"
            ><i class="fab fa-twitter"></i>
        </a>

        <a
            class="btn btn-link btn-floating btn-lg text-dark m-1"
            href="mailto:karansaraswat.che18@itbhu.ac.in"
            role="button"
            data-mdb-ripple-color="dark"
            ><i class="fab fa-google"></i>
        </a>

        <a
            class="btn btn-link btn-floating btn-lg text-dark m-1"
            href="https://www.instagram.com/karansaraswat1918/"
            role="button"
            data-mdb-ripple-color="dark"
            ><i class="fab fa-instagram"></i>
        </a>

        <a
            class="btn btn-link btn-floating btn-lg text-dark m-1"
            href="https://www.linkedin.com/in/karan-saraswat-a0527417b/"
            role="button"
            data-mdb-ripple-color="dark"
            ><i class="fab fa-linkedin"></i>
        </a>

        <a
            class="btn btn-link btn-floating btn-lg text-dark m-1"
            href="https://github.com/Nyctophiliac1918"
            role="button"
            data-mdb-ripple-color="dark"
            ><i class="fab fa-github"></i>
        </a>
        </section>
    </div>

    <div class="text-center text-white p-2" style={{backgroundColor: 'rgb(31, 30, 30)'}}>
        © {new Date().getFullYear()} Copyright : 
        <a class="text-white" href="https://profile-karan-saraswat.netlify.app/"> Karan Saraswat</a>
    </div>
    </footer>
);

export default Footer;
