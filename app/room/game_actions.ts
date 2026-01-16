'use server';

import { cookies } from 'next/headers';

import { sql } from '@/app/lib/db';
import { genRoomCode } from '@/lib/utils';
import { RoomData } from './types';

import pusher from '@/app/lib/pusher';

// TODO: Complete & call this at the start of any room interaction
async function cleanupUnusedRooms() {
}

export async function createRoom(): Promise<RoomData> {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get('session')?.value;

  if (!sessionId) {
    return { error: "Not logged in." };
  }

  const result = await sql`
    SELECT username
    FROM sessions
    WHERE id = ${sessionId}
  `;

  if (result.length > 0) {
    const username = result[0].username;

    console.log(username);

    const roomCode = genRoomCode(); // TODO: validate w/ database, disallow duplicate rooms.

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 day

    // Remove the user from any other rooms they've been in.

    await sql`
      DELETE FROM room_users
      WHERE username = ${username}
    `;

    await sql`
      INSERT INTO rooms (room_id, expires_at, users)
      VALUES (${roomCode}, ${expiresAt}, 1)
    `;

    await sql`
      INSERT INTO room_users (room_id, username, idx)
      VALUES (${roomCode}, ${username}, 0)
    `;

    return { username: username, roomCode: roomCode };
  } else {
    return { error: "Session expired! Please log in again." };
  }
}

export async function joinRoom(prevState: RoomData | undefined, formData: FormData): Promise<RoomData> {
  const roomCode = formData.get('room') as string;

  console.log(roomCode);

  if (!roomCode) return {};

  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session')?.value;

  if (!sessionId) {
    return { error: "Not logged in." };
  }

  const usernameResult = await sql`
    SELECT username
    FROM sessions
    WHERE id = ${sessionId}
  `;

  if (usernameResult.length > 0) {
    const username = usernameResult[0].username;

    console.log("user exists: " + username);

    const roomResult = await sql`
      SELECT EXISTS(SELECT 1 FROM room_users WHERE room_id = ${roomCode})
    `;

    const roomExists = roomResult[0].exists;

    if (roomExists) {
      console.log("room exists");

      const userResult = await sql`
        SELECT users FROM rooms WHERE room_id = ${roomCode}
      `;

      const count = userResult[0].users;

      console.log("current count is " + count);

      await sql`
        INSERT INTO room_users (room_id, username, idx)
        VALUES (${roomCode}, ${username}, ${count})
      `;

      console.log("added user to room");

      await sql`
        UPDATE rooms
        SET users = ${count+1}
        WHERE room_id = ${roomCode}
      `;

      console.log("increased user count");

      /*
      await pusher.trigger(`presence-room-${roomCode}`, 'pusher:member_added', {
        user: username
      });
      */

      return { username: username, roomCode: roomCode };
    } else {
      console.log("room doesn't exist");
      return { error: "Room doesn't exist!" };
    }
  } else {
    return { error: "Session expired! Please log in again." };
  }
}
