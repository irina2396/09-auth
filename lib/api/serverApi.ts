import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
}

export const fetchNotes = async (
  page: number,
  perPage: 12,
  search: string = "",
  tag?: string
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  const res = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search.trim() ? { search } : {}),
      tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return {
    page,
    perPage,
    notes: res.data.notes,
    totalPages: res.data.totalPages,
  };
};

export const fetchNoteById = async (id: string) => {
  const cookieStore = await cookies();

  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
