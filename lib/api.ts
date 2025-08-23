import axios from "axios";
import { type Note } from "../types/note";
import { NewCreateNote } from "@/types/note";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const baseURL = "https://notehub-public.goit.study/api";

const headers = {
  Authorization: `Bearer ${token}`,
};

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  page: number;
  notes: Note[];
  totalPages: number;
  perPage: number;
}

interface RawFetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const res = await axios.get<RawFetchNotesResponse>(`${baseURL}/notes`, {
    params: {
      page,
      perPage,
      ...(search !== "" && { search }),
      ...(tag ? { tag } : {}),
    },
    headers,
  });

  return {
    page,
    perPage,
    notes: res.data.notes,
    totalPages: res.data.totalPages,
  };
};

export const createNote = async (note: NewCreateNote): Promise<Note> => {
  const res = await axios.post<Note>(`${baseURL}/notes`, note, { headers });
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await axios.delete(`${baseURL}/notes/${id}`, { headers });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await axios.get(`${baseURL}/notes/${id}`, { headers });
  return res.data;
};
