'use server';

import { neon } from '@neondatabase/serverless';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';

const sql = neon(`${process.env.DATABASE_URL}`);

export async function register(prevState, formData: FormData) {
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email) return { error: "Please enter an email!" };
  if (!password) return { error: "Please enter a password!" };

  const hashedPassword = await bcrypt.hash(password.toString(), 10);

  try {
    await sql`INSERT INTO users (username, email, hashed_password) VALUES (${username}, ${email}, ${hashedPassword})`;
  } catch (err) {
    return { error: err.toString() };
  }

  redirect('/login');
}

async function findUser(email: string) {
  try {
    const result = await sql`SELECT * FROM users WHERE email = ${email}`;
    return result[0];
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function login(prevState, formData: FormData) {
  // First we cleanup any expired sessions.

  await sql`
    DELETE FROM sessions
    WHERE expires_at < NOW()
  `;

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email) return { error: "Please enter an email", success: false };
  if (!password) return { error: "Please enter a password", success: false };

  const user = await findUser(email);
  if (!user) return { error: "Invalid credentials", success: false };

  const valid = await bcrypt.compare(password, user.hashed_password);

  if (!valid) return { error: "Invalid password", success: false };

  const sessionId = randomUUID();

  const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 minutes

  await sql`
    INSERT INTO sessions (id, username, expires_at)
    VALUES (${sessionId}, ${user.username}, ${expiresAt})
  `;

  const cookieStore = await cookies();

  cookieStore.set('session', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });

  redirect('/');
}

export async function logout() {
  const cookieStore = await cookies();
  const cookieSessionId = cookieStore.get('session')?.value;

  if (cookieSessionId) {
    const sessionId = cookieSessionId.replace(/^"|"$/g, '');
    await sql`DELETE FROM sessions WHERE id = ${sessionId}`;
  }

  cookieStore.delete('session');

  redirect('/');
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get('session')?.value;

  if (!sessionId) return null;

  // sessionId has extra quotes, so we have to remove that.
  sessionId = sessionId.replace(/^"|"$/g, '');

  const session = await sql`
    SELECT username, expires_at
    FROM sessions
    WHERE id = ${sessionId}
  `;

  if (session.length === 0) {
    console.log(`Error: no session found for id ${sessionId}`);
    return null;
  }

  return session[0]?.username ?? null;
}
