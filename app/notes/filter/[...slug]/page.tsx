import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] === 'All' ? undefined : slug?.[0];
  return {
    title: tag ? `Notes ${tag} | NoteHub` : 'All Notes | Notehub',
    description: `${tag}`,
    openGraph: {
        title: tag ? `Notes ${tag} | NoteHub` : 'All Notes | Notehub',
        description: `${tag}`,
        url: `https://08-zustand-omega-gold.vercel.app/notes/${tag ?? ""}`,
        images: [
            {
                url: `https://ac.goit.global/fullstack/react/notehub-og-meta.jpg`,
                width: 1200,
                height: 630,
                alt: 'Note Hub',
            },
        ],
        type: 'website',
    },
  }
}

export default async function NotesPage({params}: Props) {
  const { slug } = await params;
  const tag = slug?.[0] || null;
  const res = await fetchNotes({ page: 1, perPage: 12, ...(tag && tag !== 'All' ? {tag} : {}) });

  return (
    <NotesClient initialNotes={res} initialTag={ tag} />
  );
}
