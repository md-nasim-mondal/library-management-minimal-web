import { Link, useLocation } from "react-router";
import { ModeToggle } from "../theme/ModeToggle";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const routes = [
    { path: "/", name: "All Books" },
    { path: "/create-book", name: "Add Book" },
    { path: "/borrow-summary", name: "Borrow Summary" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="max-w-7xl mx-auto h-16 flex justify-between items-center gap-3 px-6 ">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="font-bold ml-2 text-2xl flex items-center">
          <span className="mr-2">📚</span>
          <span className="hidden sm:inline">The Bookery</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-5">
        {routes.map((route) => (
          <Link
            key={route.path}
            to={route.path}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              isActive(route.path)
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {route.name}
          </Link>
        ))}
      </div>

      {/* Theme Toggle (Desktop) */}
      <div className="hidden md:block">
        <ModeToggle />
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-2">
        <ModeToggle />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background shadow-lg z-50 p-4 space-y-2 border-t max-w-[96%] mx-auto">
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(route.path)
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {route.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;