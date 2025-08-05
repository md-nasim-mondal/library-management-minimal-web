const Footer = () => {
  return (
    <footer className='py-6 border-t bg-secondary text-secondary-foreground'>
      <div className='container mx-auto px-4 text-center'>
        <p>
          © {new Date().getFullYear()} Library Management System. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
