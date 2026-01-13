'use client';

import { useState, useEffect } from 'react';
import { RoomList } from '@/app/ui/room_list';
import { genRoomCode } from '@/lib/utils';

import { PlusIcon } from '@heroicons/react/16/solid';

function CreateRoom({ action }: { action: () => void | Promise<void> }) {
  return (
    <button onClick={action} className="w-full flex justify-center gap-2 outline rounded-md p-2 py-1 items-center outline-sky-500"> <PlusIcon className="h-5 w-5" /> Create Room </button>
  );
}

function JoinRoom() {
  const action = (formData: FormData) => {
    const value = formData.get("code");
    console.log(value);
  };

  return (
    <div className="items-center outline rounded-md p-2 flex flex-col gap-2">
      <p> Join Room </p>
      <form action={action} className="flex gap-3">
        <input name="code" id="code" className="outline rounded-md p-2 py-1.5" placeholder="Room Code" />
        <button className="outline rounded-md gap-3 p-2 py-1.5 flex justify-center items-center outline-sky-500">
          <PlusIcon className="h-5 w-5" />
          Join
        </button>
      </form>
    </div>
  )
}

export default function Page() {
  const [code, setCode] = useState('');
  const [users, setUsers] = useState([]);

  const makeRoom = () => { setCode(genRoomCode()); };

  useEffect(() => {
    setUsers(['Ameer', 'Chelsea', 'Vala']);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-[280px] flex flex-col gap-4 min-h-screen items-center justify-center">
        {code === '' && <>
          <JoinRoom />
          <p className="text-2xl underline decoration-sky-500"> Or </p>
          <CreateRoom action={makeRoom} />
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
