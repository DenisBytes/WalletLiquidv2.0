import LoginForm from "./ui/LoginForm"
import { Player } from "./ui/Player"
import Description from "./ui/Description"
import TunnelWithScrollingImage from "./ui/Intro"

export default function Page() {

    return (
        <>
            <div className="hidden lg:block w-full h-full bg-[#10043c]">
                <Player />
                <TunnelWithScrollingImage />
                <section className="min-h-[70vh]"></section>
                <Description />
                <section className="min-h-[100vh]"></section>
                <LoginForm />
                <section className="min-h-[30vh]"></section>
            </div>
            <div className="lg:hidden flex justify-start items-center w-full h-[100vh] bg-[#10043c]">
                <Player />
                <div>
                    <svg className="relative left-[-50%]" width="374" height="383" viewBox="0 0 374 383" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M81.3306 191.082C81.3306 204.937 84.0597 218.657 89.3619 231.458C94.6641 244.258 102.436 255.889 112.233 265.687C122.03 275.484 133.661 283.255 146.462 288.558C159.263 293.86 172.982 296.589 186.838 296.589" stroke="#FFCBF4" stroke-width="30.9179"></path><path d="M292.345 191.081C292.345 177.226 289.616 163.506 284.314 150.706C279.012 137.905 271.24 126.274 261.443 116.477C251.646 106.679 240.014 98.9077 227.214 93.6055C214.413 88.3032 200.693 85.5742 186.838 85.5742" stroke="#FFCBF4" stroke-width="30.9179"></path><path d="M121.307 204.668L78.9383 172.439L46.7098 214.808" stroke="#FFCBF4" stroke-width="30.9179"></path><path d="M252.359 177.509L294.728 209.737L326.956 167.369" stroke="#FFCBF4" stroke-width="30.9179"></path><rect x="164.023" y="144.348" width="46.3768" height="92.7536" fill="#FFCBF4"></rect></svg>
                    <h1 style={{ fontSize: "35px", lineHeight: 1}} className="font-[700] ml-4 text-[white]">FOR A BETTER <br /> EXPERIENCE <br /> PLEASE ROTATE <br /> YOUR DEVICE</h1>
                </div>
            </div>
        </>
    )
}