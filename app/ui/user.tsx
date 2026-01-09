'use client';

import { getCurrentUser } from '@/app/lib/actions';
import { useEffect, useState } from 'react';
import { logout } from '@/app/lib/actions';

export default function User() {
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
      { username !== null && <form action={logout}> <button> logout </button> </form> }
    </>
  );
}
