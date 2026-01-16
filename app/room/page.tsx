'use client';

import { useEffect, useState, useActionState } from 'react';
import { RoomList } from '@/app/ui/room_list';

import { PlusIcon } from '@heroicons/react/16/solid';

import { createRoom, joinRoom } from './game_actions';
import { RoomData } from './types';

import Pusher from 'pusher-js';

const initialRoomState: RoomData = { error: "", username: "", roomCode: "" };

function bindToPusherChannel(roomCode: string, setUsers: React.Dispatch<React.SetStateAction<string[]>>) {
  const pusher = new Pusher(
    process.env.NEXT_PUBLIC_PUSHER_KEY!,
    {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      channelAuthorization: {
        endpoint: "/api/pusher-authorize",
        transport: "ajax",
      }
    }
  );

  const channel = pusher.subscribe(`presence-room-${roomCode}`);

  channel.bind("pusher:member_added", (member) => {
    setUsers(prev => [...prev, member.id]);
    console.log("added " + member);
  });

  channel.bind("pusher:member_removed", (member) => {
    setUsers(prev => prev.filter(m => m !== member.id));
    console.log("added " + member.id);
  });

  channel.bind("pusher:subscription_succeeded", (members) => {
    const result: string[] = [];

    members.each(member => {
      result.push(member.id);
    });

    setUsers(result);
  }

  return () => {
    pusher.unsubscribe(`presence-room-${roomCode}`);
    pusher.disconnect();
  }
}

function CreateRoom({
  setCode,
  setUsers
}: {
  setCode: React.Dispatch<React.SetStateAction<string>>,
  setUsers: React.Dispatch<React.SetStateAction<string[]>>,
}) {
  const [state, formAction, isPending] = useActionState(createRoom, initialRoomState);

  useEffect(() => {
    if (state.roomCode) {
      setCode(state.roomCode);
    }
    if (state.username) {

    }
  }, [state]);

  return (
    <>
      {isPending && <p>Pending...</p>}
      <form action={formAction}>
        <button className="w-full flex justify-center gap-2 outline rounded-md p-2 py-1 items-center outline-sky-500"> <PlusIcon className="h-5 w-5" /> Create Room </button>
        <p> {state.error} </p>
      </form>
    </>
  );
}

function JoinRoom({
  setCode,
  setUsers
}: {
  setCode: React.Dispatch<React.SetStateAction<string>>,
  setUsers: React.Dispatch<React.SetStateAction<string[]>>,
}) {
  const [state, formAction, isPending] = useActionState(joinRoom, initialRoomState);

  useEffect(() => {
    if (state.roomCode) {
      setCode(state.roomCode);
    }
  }, [state]);

  return (
    <div className="items-center outline rounded-md p-2 flex flex-col gap-2">
      <p> Join Room </p>
      <form action={formAction} className="flex gap-3">
        <input name="room" id="room" className="outline rounded-md p-2 py-1.5" placeholder="Room Code" />
        <button className="outline rounded-md gap-3 p-2 py-1.5 flex justify-center items-center outline-sky-500">
          <PlusIcon className="h-5 w-5" />
          Join
        </button>
      </form>
      {isPending && <p>Pending...</p>}
      <p> {state.error} </p>
    </div>
  )
}

export default function Page() {
  const [code, setCode] = useState('');
  const [users, setUsers] = useState<string[]>([]);

  return (
    <div className="flex justify-center">
      <div className="w-[280px] flex flex-col gap-4 min-h-screen items-center justify-center">
        {code === '' && <>
          <JoinRoom setCode={setCode} setUsers={setUsers} />
          <p className="text-2xl underline decoration-sky-500"> Or </p>
          <CreateRoom setCode={setCode} setUsers={setUsers} />
        </>}
        {code !== '' && <>
          <div className="w-full text-2xl border border-sky-200/25 p-3 rounded-lg text-center">
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 to-sky-100" >Room Code</span>: <span className="text-zinc-100 font-extrabold font-mono">{code}</span>
          </div>
          <RoomList users={users} />
        </>
        }
      </div>
    </div>
  );
}
