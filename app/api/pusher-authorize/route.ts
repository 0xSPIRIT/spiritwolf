import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

import { pusher } from '@/app/lib/pusher';

export async function POST(request: NextRequest) {
  const text = await request.text();
  const params = new URLSearchParams(text);

  const cookieStore = await cookies();
  const username = cookieStore.get('username')?.value;

  console.log("got user " + username);

  if (!username) {
    return new Response('Error: user is not logged in.', { status: 400 });
  }

  const presenceData = {
    user_id: username,
    user_info: {
      name: username
    },
  };

  const socketId = params.get('socket_id');
  const channel = params.get('channel_name');

  if (!socketId) return new Response("no socket", { status: 400 });
  if (!channel) return new Response("no channel", { status: 400 });

  const authResponse = pusher.authorizeChannel(socketId, channel, presenceData);

  return Response.json(authResponse);
}
