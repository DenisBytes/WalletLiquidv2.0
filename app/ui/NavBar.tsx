import NavLinks from './NavLinks';
import ThemeSwitcher from './ThemeSwitcher';
import Providers from './Provider';
import { signOut } from '@/auth';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid';

export default async function NavBar () {
    return (
        <nav className="p-4 md:flex justify-between items-center px-9 bg-transaparent bg-opacity-75 backdrop-filter backdrop-blur-lg fixed w-full z-10 hidden" style={{position: "sticky", top: 0}}>
            {/* Left Section */}
            <div className="flex items-center space-x-2">
                    
                {/* Links */}
                <NavLinks  />
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
                {/* Login Button */}
                <button className="nav-button py-3 px-6 font-sans font-semibold rounded" style={{fontSize: "18px"}}>Profile</button>
                <form
                    action={async () => {
                        'use server';
                        await signOut();
                    }}
                >
                    <button className='flex items-center text-white bg-red-600 py-2 px-4 rounded'>
                        <ArrowRightOnRectangleIcon className='w-8' />
                    </button>
                </form>
                {/*Toggle*/}
                <Providers>
                    <ThemeSwitcher  />
                </Providers>
            </div>
        </nav>
    );
};
