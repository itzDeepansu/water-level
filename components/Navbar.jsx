import Link from "next/link";
import { Home,  User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="container mx-auto px-6 border border-gray-300 border-l-0 border-r-0">
      <div className="flex justify-center items-center h-12">
        <img src="/tankio.png" alt="logo" className="w-10 h-10" />
        <div>Tankio</div>
        {/* <div className="text-xl font-bold flex space-x-4">
          <Link
            href="/"
            className="flex items-center space-x-1 hover:text-blue-200"
          >
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link
            href="/stats"
            className="flex items-center space-x-1 hover:text-blue-200"
          >
            <BarChart2 size={20} />
            <span>Stats</span>
          </Link>
        </div>
        <button className="flex items-center space-x-1 hover:text-blue-200">
          <User size={20} />
          <span>User</span>
        </button> */}
      </div>
    </nav>
  );
}
