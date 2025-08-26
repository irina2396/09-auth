import Link from 'next/link';
import css from './NoteList.module.css'
import { type Note } from '../../types/note'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../lib/api/clientApi';


interface NoteListProps {
    notes: Note[]
}

export default function NoteList({ notes, }: NoteListProps) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });

    const handleDelete = (id: string) => {
        mutation.mutate(id);
    };
    if (!notes.length) return null;

    return (
        <ul className={css.list}>
            {notes.map((note) => (
              <li key={note.id} className={css.listItem}>
                    <h2 className={css.title}>{note.title}</h2>
                    <p className={css.content}>{note.content}</p>
                <div className={css.footer}>
                  <span className={css.tag}>{note.tag}</span>
                  <Link href={`/notes/${note.id}`} className={css.link}>
                    View details
                  </Link>
                <button onClick={() => handleDelete(note.id)} disabled={mutation.isPending} className={css.button}>Delete</button>
                </div>
            </li>
        ))}
        </ul>
    )
}