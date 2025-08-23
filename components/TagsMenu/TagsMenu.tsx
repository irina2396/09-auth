'use client'

import { useState } from "react";
import css from './TagsMenu.module.css'
import Link from "next/link";


const categories = ['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];


const TagsMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toogle = () => setIsOpen(!isOpen);

    return (
        <div className={css.menuContainer}>
            <button onClick={toogle} className={css.menuButton}>
                Notes ▾
            </button>
            {isOpen && (
                <ul className={css.menuList}>
                    {categories.map(category => (
                        <li key={category} className={css.menuItem}>
                            <Link href={`/notes/filter/${category}`} className={css.menuLink} onClick={toogle}>
                            {category === 'All' ? 'All notes' : category}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>

    );
}

export default TagsMenu;