import { Link } from "react-router-dom";

function Hero() {
    return (
        <div className="max-w-[90%] h-[100dvh] flex flex-col justify-center gap-6 py-16 mx-auto md:text-left overflow-x-hidden">

            <h2 className="text-3xl sm:text-4xl md:text-8xl md:w-[700px] font-bold leading-tight">
                This is my first <span className="text-primary">MERN</span> project
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto md:mx-0">
                Express backend, MongoDB database, React frontend, Multer + upload functionality.
                Image + title upload, list fetching, delete and edit functionality, password protection (via JWT).
                Protected route: Upload page accessible only with the correct password.
            </p>
            <Link
                className="btn btn-primary w-[200px] md:mx-0"
                to="https://github.com/beridzezura14?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
            >
                VISIT MY GITHUB PAGE
            </Link>
        </div>
    );
}

export default Hero;



// <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>