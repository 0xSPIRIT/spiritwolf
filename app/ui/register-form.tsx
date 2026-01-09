'use client';

import Input from '@/app/ui/input';

import { register } from '@/app/lib/actions';
import { useActionState } from 'react';

const initialState = { error: "" };

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(register, initialState);

  return (
    <form action={formAction} className="z-1 bg-black/50 w-[400px] outline shadow-xl shadow-black rounded-xl p-6">
      <div className="flex flex-col gap-6 w-full">
        <div className="w-full flex justify-center">
          <h1 className="text-3xl font-bold"> Register </h1>
        </div>

        <div className="flex flex-col gap-3 w-full">

          <div className="flex flex-col w-full">
            <div>
              <Input type="email" />
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <Input type="username" />
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
            type="submit">
            Create Account
          </button>
          {state.error && <p className="font-semibold max-w-md"> { state.error } </p> }
        </div>
      </div>
    </form>
  );
}

