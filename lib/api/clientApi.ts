"use client";
import { NewCreateNote, type Note } from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";

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
  const res = await nextServer.get<RawFetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search !== "" && { search }),
      ...(tag ? { tag } : {}),
    },
  });

  return {
    page,
    perPage,
    notes: res.data.notes,
    totalPages: res.data.totalPages,
  };
};

export const createNote = async (note: NewCreateNote): Promise<Note> => {
  const res = await nextServer.post<Note>("/notes", note);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await nextServer.delete(`/notes/${id}`);
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServer.get(`/notes/${id}`);
  return res.data;
};

export type RegisterRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest): Promise<User> => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

type UpdateUsername = {
  username: string;
};

export const getMeUpdata = async (data: UpdateUsername) => {
  const res = await nextServer.patch<User>("/users/me", data);
  return res.data;
};
