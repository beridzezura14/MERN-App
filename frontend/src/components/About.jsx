import ab from "../assets/mern.webp"



function About() {
    return (
        <div>

            <div className="lg:flex gap-8 items-center">
                <img className="w-full lg:w-[48%] rounded-br-3xl" src={ab} alt="mern" />

                <div className="max-w-[90%] py-8 mx-auto ">
                    <h3 className="text-5xl">About <span className="text-primary">Us</span></h3>
                    <p className="pt-4 lg:w-[75%]">
                        MERN is a popular full-stack web development stack made up of MongoDB, Express.js, React, and Node.js. It allows developers to build modern, dynamic web applications using JavaScript for both frontend and backend. MongoDB is a NoSQL database, Express.js is a web framework for Node.js, React handles the user interface, and Node.js runs the server-side logic. MERN is known for its efficiency, scalability, and being fully JavaScript-based, which helps streamline development. It’s widely used for building everything from simple websites to large, production-ready applications.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About
