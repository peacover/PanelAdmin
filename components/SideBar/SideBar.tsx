import { cookieName } from "@/constants";

const SideBar = () => {
    const handleLogout = () => {
        localStorage.removeItem(cookieName);
        window.location.reload();
    }
    return (
        <div>
        <h1>SideBar</h1>
        
        <button type="submit" className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-primary/90 h-10 px-4 py-2 w-full bg-blue-500 text-white">
            Logout
        </button>
        </div>
    );
}
export default SideBar;