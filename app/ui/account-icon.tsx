'use client';

import Button from "@/app/ui/button";

import { getCurrentUser } from '@/app/lib/actions';
import { useEffect, useState } from 'react';
import { logout } from '@/app/lib/actions';

import { UserCircleIcon } from '@heroicons/react/16/solid';

export default function AccountIcon() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    getCurrentUser().then(result => {
      setUsername(result);

      if (!result) {
        console.log('not logged in');
      }
    });
  }, []);

  return (
    <>
      {username == null &&
        <Button href="/login">
          <UserCircleIcon className="w-5 h-5" />
          <span> Login </span>
        </Button>
      }
      {username &&
        <form action={logout}>
          <button className="flex gap-1 h-10 bg-black items-center justify-center rounded-md border transition-colors border-2 border-zinc-500/[.5] hover:border-white/[0.8] p-2" >
            <UserCircleIcon className="w-5 h-5" />
            <span> Logout - {username} </span>
          </button>
        </form>
      }
    </>
  );
}
