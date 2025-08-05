import { Link } from "react-router";
import { ModeToggle } from "../ModeToggle";

const Navbar = () => {
  return (
      <nav className='max-w-7xl mx-auto h-16 flex justify-between items-center gap-3 px-5'>
        <div className='flex items-center'>
          <Link to='/' className='font-bold ml-2'>
            Library Management
          </Link>
        </div>
        <div className='space-x-5'>
          <Link to='/'>All Books</Link>
          <Link to='/create-book'>Add Book</Link>
          <Link to='/borrow-summary'>Borrow Summary</Link>
        </div>
        <div>
          <ModeToggle />
        </div>
      </nav>
  );
};

export default Navbar;
