
import { fetchNoteById } from '@/lib/api/serverApi';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { Metadata } from 'next';


interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({params}:Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);
  return {
    title: `${note.title}`,
    description: `${note.content.slice(0, 30)}`,
    openGraph: {
      title: `${note.title}`,
      description: `${note.content.slice(0, 30)}`,
      url: `https://09-auth-five-eta.vercel.app/notes/${id}`,
      siteName: 'NoteHub',
      images: [
        {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: note.title,
      },
      ],
      type: 'article',
    }
  }
}

export default async function NoteDetails({ params }: Props) {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  )
}
