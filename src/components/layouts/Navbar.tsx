import { Link } from "react-router";
import { ModeToggle } from "../ModeToogle";

const Navbar = () => {
  return (
    <nav className='max-w-7xl mx-auto h-16 flex justify-between items-center gap-3 px-5'>
      <div className='flex items-center'>
        <span className='font-bold ml-2'>Library Management</span>
      </div>
      <div className='space-x-5'>
        <Link to='/all-books'>All Books</Link>
        <Link to='/add-book'>Add Book</Link>
        <Link to='/borrow-summary'>Borrow Summary</Link>
      </div>
      <div className=''>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
