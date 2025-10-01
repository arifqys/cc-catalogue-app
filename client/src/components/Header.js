import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1>Katalog Kartu Kredit</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
