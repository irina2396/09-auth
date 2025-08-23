'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import css from './NotesPage.module.css'
import { fetchNotes, FetchNotesResponse } from '@/lib/api'
import { useState } from 'react'
import SearchBox from '@/components/SearchBox/SearchBox'
import NoteList from '@/components/NoteList/NoteList'
import Pagination from '@/components/Pagination/Pagination'
import { useDebounce } from 'use-debounce'
import 'modern-normalize/modern-normalize.css';
import Link from 'next/link'

type Props = {
  initialNotes: FetchNotesResponse;
  initialTag?: string | null;
}

function NotesClient({initialNotes,  initialTag}: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading } = useQuery({
    queryKey: ['notes', page, debouncedSearch, initialTag],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch, ...(initialTag && initialTag !== 'All' ? { tag: initialTag } : {}), }),
    placeholderData: keepPreviousData,
    initialData: page === 1 && debouncedSearch === '' ? initialNotes : undefined, 

  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePage = ( newPage: number ) => {
    setPage(newPage);
  }

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={search} onChange={handleSearch} />
          
            {data && data.totalPages > 1 && (
              <Pagination
                pageCount={data.totalPages}
                onPageChange={handlePage}
                currentPage={page - 1}
              />
            )}
          <Link href='/notes/action/create' className={css.button}>Create note +</Link>
        </header>
        
        {data && data.notes && data.notes.length > 0 ? (
          <>
            <NoteList notes={data.notes} />
          </>
        ) : (
          !isLoading && <div className={css.noNotes}>No notes found</div>  
        )}
        </div>
    </>
  )
}

export default NotesClient;