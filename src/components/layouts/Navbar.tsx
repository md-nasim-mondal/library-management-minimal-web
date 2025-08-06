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
    <nav className='max-w-7xl mx-auto h-16 flex justify-between items-center gap-3 px-6 relative'>
      {/* Logo */}
      <div className='flex items-center'>
        <Link to='/' className='font-bold ml-2 text-2xl flex items-center'>
          <span className='mr-2'>
            <svg
              stroke='currentColor'
              fill='currentColor'
              stroke-width='0'
              viewBox='0 0 512 512'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='M352 96c0-53.02-42.98-96-96-96s-96 42.98-96 96 42.98 96 96 96 96-42.98 96-96zM233.59 241.1c-59.33-36.32-155.43-46.3-203.79-49.05C13.55 191.13 0 203.51 0 219.14v222.8c0 14.33 11.59 26.28 26.49 27.05 43.66 2.29 131.99 10.68 193.04 41.43 9.37 4.72 20.48-1.71 20.48-11.87V252.56c-.01-4.67-2.32-8.95-6.42-11.46zm248.61-49.05c-48.35 2.74-144.46 12.73-203.78 49.05-4.1 2.51-6.41 6.96-6.41 11.63v245.79c0 10.19 11.14 16.63 20.54 11.9 61.04-30.72 149.32-39.11 192.97-41.4 14.9-.78 26.49-12.73 26.49-27.06V219.14c-.01-15.63-13.56-28.01-29.81-27.09z'></path>
            </svg>
          </span>
          <span className='inline'>The Bookery</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className='hidden md:flex space-x-5'>
        {routes.map((route) => (
          <Link
            key={route.path}
            to={route.path}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              isActive(route.path)
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent hover:text-accent-foreground"
            }`}>
            {route.name}
          </Link>
        ))}
      </div>

      {/* Theme Toggle (Desktop) */}
      <div className='hidden md:block'>
        <ModeToggle />
      </div>

      {/* Mobile Menu Button */}
      <div className='md:hidden flex items-center gap-2'>
        <ModeToggle />
        <Button
          variant='ghost'
          size='icon'
          ref={buttonRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className='md:hidden'>
          {isMenuOpen ? (
            <X className='h-5 w-5' />
          ) : (
            <Menu className='h-5 w-5' />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className='md:hidden absolute top-16 left-0 right-0 bg-background shadow-lg z-50 p-4 space-y-2 border-t animate-in fade-in-50 slide-in-from-top-2'>
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(route.path)
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}>
              {route.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
