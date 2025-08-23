"use client";

import css from './NotePreview.module.css'
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

type Props = {
  id: string;
};

export default function NotePreviewClient({ id }: Props) {
    const router = useRouter();
  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
    
    const handleClose = () => {
        router.back();
    }

  if (isLoading) {
    return (
      <Loading/>
    );
    };

  if (error || !note) {
    return (
        <p>Failed to load note</p>
    )
    };

    return (
        <Modal onClose={handleClose}>
            <div className={css.container}>
                <button className={css.backBtn} onClick={handleClose}>Back</button>
                <h2>{note.title}</h2>
                <p className={css.tag}>{note.tag}</p>
                <p className={css.content}>{note.content}</p>
            </div>
        </Modal>
    );
}
