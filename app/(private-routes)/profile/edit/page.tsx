'use client'
import { useEffect, useState } from 'react';
import css from './EditProfilePage.module.css'
import { useRouter } from 'next/navigation';
import { getMe } from '@/lib/api/clientApi';
import Image from 'next/image';

export default function EditProfilePage() {
    const [username, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const router = useRouter();
    const handleCancel = () => {
        router.push('/profile')
    }

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        await getMe()
    }

    useEffect(() =>{
        getMe()
        .then((value) =>{
            setUserEmail(value.email)
        })
        
    }, [])

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

                    <form className={css.profileInfo}>
                        <div className={css.usernameWrapper}>
                            <label htmlFor="username">Username:</label>
                            <input value={username} onChange={handleChangeName} id="username"
                                type="text"
                                className={css.input}
                            />
                        </div>

                        <p>Email: { userEmail}</p>

                        <div className={css.actions}>
                            <button onSubmit={()=>handleSubmit} type="submit" className={css.saveButton}>
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