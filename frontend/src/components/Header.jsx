import { useState } from "react";
import { Link } from "react-router-dom";

const menu = [
  { name: "home", to: "#" },
  { name: "about", to: "#" },
  { name: "product", to: "#" },
  { name: "contact", to: "#" },
];

function Header({ theme, toggleTheme }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="fixed w-full z-50 bg-base-100">
            <nav className="flex justify-between max-w-[90%] py-4 mx-auto items-center">
                <Link to="/">  
                    <h1 className="text-xl relative font-bold z-10">MERN <span className="text-primary">Stack</span>
                    </h1>
                </Link>
                <div className="z-10 flex items-center gap-3">
                <button onClick={toggleTheme}>
                    <ion-icon
                    name={theme === "light" ? "moon-outline" : "sunny-outline"}
                    size="large"
                    ></ion-icon>
                </button>

                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <ion-icon
                    name={isMenuOpen ? "close-outline" : "menu-outline"}
                    size="large"
                    ></ion-icon>
                </button>
                </div>
                <div
                className={`fixed top-0 right-0 h-full w-full bg-base-100 shadow-md transition-transform duration-300 ${
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
                >
                    <div className="max-w-[90%] h-full flex flex-col justify-end items-end gap-6 py-8 text-right">
                        {menu.map((item, i) => (
                        <a
                            key={i}
                            href={item.to}
                            className="text-5xl font-semibold hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.name.toUpperCase()}
                        </a>
                        ))}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
