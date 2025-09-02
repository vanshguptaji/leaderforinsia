import { useState, useEffect } from 'react';
import { Link, Plus, X } from 'lucide-react';

export default function Navbar({ currentRoute, setRoute }) {
    const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
    const [isFocusAreasMenuOpen, setIsFocusAreasMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showTicker, setShowTicker] = useState(true);
    const [tickerPosition, setTickerPosition] = useState(0);

    useEffect(() => {
        if (!showTicker) return;

        setTickerPosition(window.innerWidth);

        const animationFrame = () => {
            const tickerElement = document.getElementById('ticker-text');
            if (!tickerElement) return;

            const tickerWidth = tickerElement.offsetWidth;
            const viewportWidth = window.innerWidth;

            setTickerPosition(prevPos => {
                if (prevPos < -tickerWidth) {
                    return viewportWidth;
                }
                return prevPos - 1;
            });

            if (showTicker) {
                requestAnimationFrame(animationFrame);
            }
        };

        const animation = requestAnimationFrame(animationFrame);

        return () => {
            cancelAnimationFrame(animation);
        };
    }, [showTicker]);

    const handleNavClick = (route) => {
        setRoute(route);
        setIsMobileMenuOpen(false);
        setIsAboutMenuOpen(false);
        setIsFocusAreasMenuOpen(false);
    };

    const vanillaSansClass = "font-['Vanilla_Sans','Vanilla','Inter','Helvetica_Neue',Helvetica,Arial,sans-serif]";

    return (
        <>
            {showTicker && (
                <div className={`fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white py-2 overflow-hidden h-[30px] ${vanillaSansClass}`}>
                    <div className="flex">
                        <div
                            id="ticker-text"
                            className="whitespace-nowrap font-light text-sm"
                            style={{ transform: `translateX(${tickerPosition}px)` }}
                        >
                            In just 8 days since our Business Shower, we've successfully closed the Follow-On Investment Round, disbursing a ₹1.34 Cr investment into Cloud tailor 🎉✨
                        </div>
                        <div
                            className="whitespace-nowrap font-medium"
                            style={{ transform: `translateX(${tickerPosition + window.innerWidth}px)` }}
                        >
                            Jungle Ventures launches First Cheque@Jungle
                        </div>
                    </div>
                    <button
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white p-2 px-4 cursor-pointer bg-gray-800"
                        onClick={() => setShowTicker(false)}
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            <nav className={`fixed left-0 right-0 z-40 bg-white shadow-sm ${showTicker ? 'top-[30px]' : 'top-0'} ${vanillaSansClass}`}>
                <div className="px-4 h-[91px] w-full flex flex-between font-semibold text-[16px] md:px-8 lg:px-16">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                            <button
                                onClick={() => handleNavClick('home')}
                                className="text-black w-[120px] text-2xl font-semibold mr-2 flex items-center space-x-2 "
                            >
                                <img src='/logo.png' alt="Logo" className="h-18 w-auto rounded-full" />
                                <p>Leadersforindia.org</p>
                            </button>
                        </div>

                        <div className="hidden md:flex items-center space-x-6 lg:space-x-10">
                            <div className="relative">
                                <button
                                    className="flex items-center text-gray-700 hover:text-gray-900"
                                    onClick={() => setIsAboutMenuOpen(!isAboutMenuOpen)}
                                >
                                    About <Plus className="ml-1 w-4 h-4" />
                                </button>
                                {isAboutMenuOpen && (
                                    <div className={`absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md py-2 min-w-40 ${vanillaSansClass}`}>
                                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Our Story</a>
                                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Philosophy</a>
                                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Process</a>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => handleNavClick('portfolio')}
                                className={`hover:text-gray-900 ${currentRoute === 'portfolio' ? 'text-purple-500 font-medium' : 'text-gray-700'}`}
                            >
                                Portfolio
                            </button>
                            <a href="#" className="text-gray-700 hover:text-gray-900">Investor</a>
                            <a href="#" className="text-gray-700 hover:text-gray-900">Companies</a>
                            <div className="relative">
                                <button
                                    className="flex items-center "
                                    onClick={() => setIsFocusAreasMenuOpen(!isFocusAreasMenuOpen)}
                                >
                                    Focus Areas <Plus className="ml-1 w-4 h-4" />
                                </button>
                                {isFocusAreasMenuOpen && (
                                    <div className={`absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md py-2 min-w-40 ${vanillaSansClass}`}>
                                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">AI & Machine Learning</a>
                                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Enterprise</a>
                                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Consumer</a>
                                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Health</a>
                                    </div>
                                )}
                            </div>
                            <a href="#" className="text-gray-700 hover:text-gray-900">Insights</a>
                        </div>
                        <button
                            className="md:hidden flex items-center"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                    {isMobileMenuOpen && (
                        <div className="mt-4 md:hidden">
                            <div className="flex flex-col space-y-4 py-2">
                                <div>
                                    <button
                                        className="flex items-center justify-between w-full text-gray-700 hover:text-gray-900"
                                        onClick={() => setIsAboutMenuOpen(!isAboutMenuOpen)}
                                    >
                                        <span>About</span>
                                        <Plus className="ml-1 w-4 h-4" />
                                    </button>
                                    {isAboutMenuOpen && (
                                        <div className="pl-4 mt-2 space-y-2">
                                            <a href="#" className="block text-gray-700 hover:text-gray-900">Our Story</a>
                                            <a href="#" className="block text-gray-700 hover:text-gray-900">Philosophy</a>
                                            <a href="#" className="block text-gray-700 hover:text-gray-900">Process</a>
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => handleNavClick('portfolio')}
                                    className={`text-left hover:text-gray-900 ${currentRoute === 'portfolio' ? 'text-purple-500 font-medium' : 'text-gray-700'}`}
                                >
                                    PortfoLIO
                                </button>
                                <Link>
                                <a href="#" className="text-gray-700 hover:text-gray-900">Investor</a>
                                </Link>
                                <a href="#" className="text-gray-700 hover:text-gray-900">Companies</a>
                                <div>
                                    <button
                                        className="flex items-center justify-between w-full text-purple-500 hover:text-purple-700"
                                        onClick={() => setIsFocusAreasMenuOpen(!isFocusAreasMenuOpen)}
                                    >
                                        <span>Focus Areas</span>
                                        <Plus className="ml-1 w-4 h-4" />
                                    </button>
                                    {isFocusAreasMenuOpen && (
                                        <div className="pl-4 mt-2 space-y-2">
                                            <a href="#" className="block text-gray-700 hover:text-gray-900">AI & Machine Learning</a>
                                            <a href="#" className="block text-gray-700 hover:text-gray-900">Enterprise</a>
                                            <a href="#" className="block text-gray-700 hover:text-gray-900">Consumer</a>
                                            <a href="#" className="block text-gray-700 hover:text-gray-900">Health</a>
                                        </div>
                                    )}
                                </div>
                                <a href="#" className="text-gray-700 hover:text-gray-900">Insights</a>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
            <div style={{ paddingTop: showTicker ? '72px' : '52px' }} />
        </>
    );
}