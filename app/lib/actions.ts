'use server';

import { neon } from '@neondatabase/serverless';
import { hashStringSHA256 } from '@/app/lib/util';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';

const sql = neon(`${process.env.DATABASE_URL}`);

type User = {
  username: string;
  email: string;
  hashed_password: string;
};

export async function addEmail(formData: FormData) {
  try {
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    if (!password) {
      throw new Error("Password must be non null");
    }

    const hashedPassword = await hashStringSHA256(password.toString());

    await sql`INSERT INTO users (username, email, hashed_password) VALUES (${username}, ${email}, ${hashedPassword})`;

    redirect('/');
  } catch (err) {
    console.error(err);
  }
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
/*
export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await findUser(email);
  if (!user) return { error: "Invalid credentials" };

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return { error: "Invalid password" };

  const sessionId = randomUUID();

  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

  await sql`
    INSERT INTO sessions (id, username, expires_at) VALUES (${sessionId}, S{user.username}, ${expiresAt})
  `;

  cookies().set('session', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  });
}
*/
