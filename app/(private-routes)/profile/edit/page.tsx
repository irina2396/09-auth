'use client'
import { useEffect, useState } from 'react';
import css from './EditProfilePage.module.css'
import { useRouter } from 'next/navigation';
import { getMe, getMeUpdata } from '@/lib/api/clientApi';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';

export default function EditProfilePage() {
    const [username, setUsername] = useState('');
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);
    const router = useRouter();
    
    const handleCancel = () => {
        router.back();
    }

    useEffect(() =>{
        getMe()
        .then((user) =>{
            setUsername(user.username ?? "")
        })
        
    }, [])

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const updatedUser = await getMeUpdata({ username });
        setUser(updatedUser);
        router.push("/profile");
    };

    return (
        <>
            <main className={css.mainContent}>
                <div className={css.profileCard}>
                    <h1 className={css.formTitle}>Edit Profile</h1>

                    <Image src="https://ac.goit.global/fullstack/react/default-avatar.jpg"
                        alt="User Avatar"
                        width={120}
                        height={120}
                        className={css.avatar}
                        priority
                    />

                    <form onSubmit={handleSaveUser} className={css.profileInfo}>
                        <div className={css.usernameWrapper}>
                            <label htmlFor="username">Username:</label>
                            <input value={username} onChange={handleChangeName} id="username"
                                type="text"
                                className={css.input}
                            />
                        </div>

                        <p>Email: { user?.email}</p>

                        <div className={css.actions}>
                            <button type="submit" className={css.saveButton}>
                                Save
                            </button>
                            <button onClick={handleCancel} type="button" className={css.cancelButton}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}