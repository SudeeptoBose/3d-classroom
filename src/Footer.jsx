const Footer = () => {
    return (
      <div className="fixed p-4 space-y-2 text-white
                      lg:top-0 lg:right-0 lg:text-right
                      top-0 left-0 text-left">
        <a
          className="block opacity-75 hover:opacity-100 transition-opacity duration-300"
          target="_blank"
          rel="noopener noreferrer"
          href="https://sudeepto-bose-portfolio.vercel.app/"
        >
          Developed By @SudeeptoBose
        </a>
        <a
          className="block opacity-75 hover:opacity-100 transition-opacity duration-300"
          target="_blank"
          rel="noopener noreferrer"
          href="https://sketchfab.com/rixael"
        >
          Model By @rixael
        </a>
      </div>
    );
  };
  
  export default Footer;