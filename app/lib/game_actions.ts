'use server';

import { cookies } from 'next/headers';

import { sql } from '@/lib/db';

export async function joinRoom(prevState: { error: string }, formData: FormData) {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get('session')?.value;

  if (!sessionId) {
    return { error: "Not logged in." };
  }

  await sql`
    SELECT username
    FROM sessions
    WHERE id = ${sessionId}
  `;

  return {};
}
