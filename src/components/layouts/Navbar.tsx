import { Link, useLocation } from "react-router";
import { ModeToggle } from "../theme/ModeToggle";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const routes = [
    { path: "/", name: "All Books" },
    { path: "/create-book", name: "Add Book" },
    { path: "/borrow-summary", name: "Borrow Summary" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="max-w-7xl mx-auto h-16 flex justify-between items-center gap-3 px-6 relative">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="font-bold ml-2 text-2xl flex items-center">
          <span className="mr-2">📚</span>
          <span className="inline">The Bookery</span>
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
          ref={buttonRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden absolute top-16 left-0 right-0 bg-background shadow-lg z-50 p-4 space-y-2 border-t animate-in fade-in-50 slide-in-from-top-2"
        >
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