'use client'
import { useAuthStore } from '@/lib/store/authStore';
import css from './AuthNavigation.module.css'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/api/clientApi';

export default function AuthNavigation() {
    const router = useRouter();
    const { isAuthenticated, user } = useAuthStore();
    const clearIsAuthenticated = useAuthStore(
        (state)=>state.clearIsAuthenticated,
    )
    const handleLogout = async () => { 
        try {
            await logout();
            clearIsAuthenticated();
            router.push('/sign-in');
        } catch (error) {
            console.error(error)
        }
    };
    return (
        <>
            {isAuthenticated ? (
                <>
            <li className={css.navigationItem}>
                <Link href="/profile" prefetch={false} className={css.navigationLink}>
                    Profile
                </Link>
            </li>
    
            <li className={css.navigationItem}>
                        <p className={css.userEmail}>{user?.email ?? 'User email'}</p>
                <button onClick={handleLogout} className={css.logoutButton}>
                    Logout
                </button>
                    </li>
                    </>
            ) : (
                 <>
            <li className={css.navigationItem}>
                <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
                    Login
                </Link>
            </li>
    
            <li className={css.navigationItem}>
                <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
                    Sign up
                </Link>
                    </li>
                    </>
            )}
        </>
    );
}