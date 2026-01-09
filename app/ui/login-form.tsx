'use client';

import Link from 'next/link';
import Input from '@/app/ui/input';

import { login } from '@/app/lib/actions';

import { useActionState } from 'react';

const initialLoginState = { error: null };

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialLoginState);

  return (
    <form action={formAction} className="z-1 bg-black/50 outline shadow-xl shadow-black rounded-xl p-6">
      <div className="flex flex-col gap-6">
        <div className="w-full flex justify-center">
          <h1 className="text-3xl font-bold"> Login </h1>
        </div>

        <div className="flex flex-col gap-3">

          <div className="flex flex-col">
            <div>
              <Input type="email" />
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <Input type="password" />
            </div>
          </div>

        </div>

        <div className="flex flex-col">
          <button
            className="flex gap-1 h-10 bg-zinc-300 font-semibold text-black items-center justify-center rounded-xl border transition-colors border-2 border-black/[.5] hover:border-black/[0.8] p-2"
            disabled={isPending}>
            Log in
          </button>

          <Link
            className="flex underline gap-1 h-10 bg-black text-zinc-400 hover:text-zinc-300 rounded-xl transition-colors p-2"
            href="/register">
            I don't have an account
          </Link>

          {state.error && <p>{state.error}</p>}
        </div>
      </div>
    </form>
  );
}
