import Link from 'next/link';
import css from './SidebarNotes.module.css'

const SidebarNotes = () => {
    const categories = ['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];
    return (
        <div>
            <ul className={css.menuList}>
                {categories.map((cat) => (
                    <li key={cat} className={css.menuItem}>
                        <Link href={`/notes/filter/${cat}`} className={css.menuLink}>
                            {cat}
                        </Link>
                    </li> 
                ))}
            </ul>

        </div>
    );
}

export default SidebarNotes;