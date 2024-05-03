import React, { useState } from 'react';
import './menu.css';

function Menu() {
    const [activeSubmenu, setActiveSubmenu] = useState('');

    const handleSubmenuClick = (submenu) => {
        setActiveSubmenu(submenu === activeSubmenu ? '' : submenu);
    };

    return (

        <aside className="aside-menu">
            <a href='/dashboard'>
                <h1>Student<span>Beds</span></h1>
            </a>
            
            <ul className="menu">
                {/* Menu Student */}
                <li>
                    <div onClick={() => handleSubmenuClick('student')} className="menu-title">Student</div>
                    {activeSubmenu === 'student' && (
                        <ul className="submenu">
                            <li>
                                <a href='/student/add'>Add</a>
                            </li>
                            <li>
                                <a href='/student/edit'>Edit</a>
                            </li>
                            <li>
                                <a href='/student/delete'>Delete</a>
                            </li>
                        </ul>
                    )}
                </li>

                {/* Menu Rooms */}
                <li>
                    <div onClick={() => handleSubmenuClick('rooms')} className="menu-title">Rooms</div>
                    {activeSubmenu === 'rooms' && (
                        <ul className="submenu">
                            <li>
                                <a href='/rooms/add'>Add</a>
                            </li>
                            <li>
                                <a href='/rooms/edit'>Edit</a>
                            </li>
                            <li>
                                <a href='/rooms/delete'>Delete</a>
                            </li>
                        </ul>
                    )}
                </li>
                {/* Menu Booking */}
                <li>
                    <div onClick={() => handleSubmenuClick('booking')} className="menu-title">Booking</div>
                    {activeSubmenu === 'booking' && (
                        <ul className="submenu">
                            <li>
                                <a href='/booking/add'>Add</a>
                            </li>
                            <li>
                                <a href='/booking/edit'>Edit</a>
                            </li>
                            <li>
                                <a href='/booking/delete'>Delete</a>
                            </li>
                        </ul>
                    )}
                </li>
                {/* Menu Uni */}
                <li>
                    <div onClick={() => handleSubmenuClick('uni')} className="menu-title">Uni</div>
                    {activeSubmenu === 'uni' && (
                        <ul className="submenu">
                            <li>
                                <a href='/university/add'>Add</a>
                            </li>
                            <li>
                                <a href='/university/edit'>Edit</a>
                            </li>
                            <li>
                                <a href='/university/delete'>Delete</a>
                            </li>
                        </ul>
                    )}
                </li>

                {/* Menu District */}
                <li>
                    <div onClick={() => handleSubmenuClick('district')} className="menu-title">District</div>
                    {activeSubmenu === 'district' && (
                        <ul className="submenu">
                            <li>
                                <a href='/district/add'>Add</a>
                            </li>
                            <li>
                                <a href='/district/edit'>Edit</a>
                            </li>
                            <li>
                                <a href='/district/delete'>Delete</a>
                            </li>
                        </ul>
                    )}
                </li>
                 {/* Menu Staff */}
                 <li>
                    <div onClick={() => handleSubmenuClick('staff')} className="menu-title">Staff</div>
                    {activeSubmenu === 'staff' && (
                        <ul className="submenu">
                            <li>
                                <a href='/staff/add'>Add</a>
                            </li>
                            <li>
                                <a href='/staff/edit'>Edit</a>
                            </li>
                            <li>
                                <a href='/staff/delete'>Delete</a>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </aside>
        
    );
}

export default Menu;
