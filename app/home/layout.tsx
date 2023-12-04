import NavBar from "../ui/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="hidden md:block">
            <NavBar />
            {children}
        </div>
    )
}