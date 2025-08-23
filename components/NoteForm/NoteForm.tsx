'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './NoteForm.module.css'
import { createNote } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useNoteStore } from '@/lib/store/noteStore';

export default function NoteForm() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { draft, setDraft, clearDraft } = useNoteStore();

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        setDraft({
            ...draft,
            [event.target.name]: event.target.value,
        });
    };

    const { mutate } = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            clearDraft();
            router.back();
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        mutate({
            title: draft.title,
            content: draft.content,
            tag: draft.tag as "Todo" | "Work" | "Personal" | "Meeting" | "Shopping",
        });
    };
    

    const handleCancel = () => router.back();


    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.formGroup}>
                <label htmlFor="title">Title</label>
                    <input id="title" name="title" type="text" className={css.input} value={draft?.title} onChange={handleChange} required/>
            </div>

            <div className={css.formGroup}>
                <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        rows={8}
                        className={css.textarea}
                        value={draft?.content}
                        onChange={handleChange}
                        required
                    />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="tag">Tag</label>
                    <select id="tag" name="tag" className={css.select} value={draft?.tag} onChange={handleChange}>
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </select>
            </div>

            <div className={css.actions}>
                <button type="button" onClick={handleCancel} className={css.cancelButton} >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={css.submitButton}
                >
                    Create note
                </button>
            </div>
        </form>
    );
};