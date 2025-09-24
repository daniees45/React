
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../css/styles.css';
export default function Header() {
    const [active, setActive] = useState(false);
    const navItem = [
        { id: 'add', label: 'Add Contact', link: '/' },
        { id: 'view', label: 'View Contact', link: '/view' }
    ];
    
    return (
        <header className="header">

            <div className="header-container">
                <h2 className="logo">Contact Book</h2>
                <nav className='nav'>

                    {navItem.map(item => (
                        <Link to={item.link}>
                            <button className={`nav-button ${active === item.id ? 'active' : ''}`}
                                onClick={() => setActive(item.id)}>{item.label}</button>
                        </Link>
                    )

                    )

                    }


                </nav>
            </div>

        </header>
    );
}