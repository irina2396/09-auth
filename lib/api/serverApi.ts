import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";

export const fetchNotes = async (
  search: string,
  page: number,
  tag: string | undefined
) => {
  const cookieStore = await cookies();
  const params = {
    ...(search && { search }),
    tag,
    page,
    perPage: 12,
  };
  const headers = {
    Cookie: cookieStore.toString(),
  };
  const res = await nextServer.get("/notes", {
    params,
    headers,
  });
  return res.data;
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
