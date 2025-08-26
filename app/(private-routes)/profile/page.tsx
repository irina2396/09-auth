import Link from 'next/link';
import css from './ProfilePage.module.css'
import { getServerMe } from '@/lib/api/serverApi';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Profile',
    description: 'Profile Page',
    openGraph: {
        title: 'Profile',
        description: 'Profile Page',
        url: '/profile',
        images: [{
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: 'Profile Page'
            }],
    }
}


export default async function ProfilePage() {
    const user = await getServerMe();
    return (
        <>
            <main className={css.mainContent}>
                <div className={css.profileCard}>
                    <div className={css.header}>
                        <h1 className={css.formTitle}>Profile Page</h1>
                        <Link href="/profile/edit" className={css.editProfileButton}>
                            Edit Profile
                        </Link>
                    </div>
                    <div className={css.avatarWrapper}>
                        <Image
                            src="https://ac.goit.global/fullstack/react/default-avatar.jpg"
                            alt="User Avatar"
                            width={120}
                            height={120}
                            className={css.avatar}
                            priority
                        />
                    </div>
                    <div className={css.profileInfo}>
                        <p>
                            Username: {user.username}
                        </p>
                        <p>
                            Email: {user.email}
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}