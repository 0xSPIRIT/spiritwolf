'use client';

import { submitStatements } from './actions';
import { RoomList } from '@/app/ui/room_list';

function StatementsForm() {
  const num_rows = 3;
  const num_cols = 30;

  return (
    <div className="flex flex-col border border-sky-200/25 items-center rounded-lg">
      <p className="text-2xl p-2 underline decoration-sky-300"> Enter your statements </p>

      <div>
        <form action={submitStatements} className="flex flex-col gap-3 p-5 text-xl">
          <textarea required rows={num_rows} cols={num_cols} className='resize-none border border-sky-300/25 rounded-md p-1 focus:outline-none' name='truth1' id='truth1' placeholder='Truth 1'/>
          <textarea required rows={num_rows} cols={num_cols} className='resize-none border border-sky-300/25 rounded-md p-1 focus:outline-none' name='truth2' id='truth2' placeholder='Truth 2'/>
          <textarea required rows={num_rows} cols={num_cols} className='resize-none border border-sky-300/25 rounded-md p-1 focus:outline-none' name='lie' id='lie' placeholder='Lie'/>
          <button className='border border-sky-300/30 rounded-md hover:border-sky-300 text-zinc-200 font-semibold transition-colors p-1' type='submit'> Submit </button>
        </form>
      </div>
    </div>
  );
}

function Game() {
  return (
    <>
      <div className="flex gap-10 min-h-screen justify-center items-center">
        <StatementsForm />
        <RoomList />
      </div>
    </>
  );
}

export default function Page() {
  return (
    <>
      <p className="text-xl"> Two Truths and a Lie </p>
      <Game />
    </>
  )
}
