import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Create New Note',
    description: 'Create a new note',
    openGraph: {
        title: 'Create New Note',
        description: 'Create a new note',
        url: 'https://08-zustand-omega-gold.vercel.app/notes/action/create',
        images: [
            {
                url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
                width: 1200,
                height: 630,
                alt: 'Create Note'
            },
        ],
        type: 'article',
    }
}

const CreateNote = () => {
    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <NoteForm />
            </div>
        </main>

    );
}

export default CreateNote;