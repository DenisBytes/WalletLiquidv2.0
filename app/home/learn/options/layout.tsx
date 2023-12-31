import OptionSideNav from "@/app/ui/learn/options/OptionSideNav";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="hidden md:flex justify-between w-full">
            <OptionSideNav />
            {children}
        </div>
    )
}