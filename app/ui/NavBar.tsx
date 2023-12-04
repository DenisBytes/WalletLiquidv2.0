import NavLinks from './NavLinks';
import ThemeSwitcher from './ThemeSwitcher';
import Providers from './Provider';
import { signOut } from '@/auth';

export default function NavBar () {

    return (
        <nav className="p-4 md:flex justify-between items-center px-9 bg-transparent hidden">
            {/* Left Section */}
            <div className="flex items-center space-x-2">
                    
                {/* Links */}
                <NavLinks  />
            </div>
            <form
                action={async () => {
                    'use server';
                    await signOut();
                }}
            >
                <button>
                    <div className="hidden md:block">Sign Out</div>
                </button>
            </form>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
                {/* Login Button */}
                <button className="nav-button py-3 px-6 r ounded font-sans font-semibold" style={{fontSize: "18px", borderRadius: "0.5rem"}}>Start Learning</button>
                {/*Toggle*/}
                <Providers>
                    <ThemeSwitcher  />
                </Providers>
            </div>
        </nav>
    );
};
