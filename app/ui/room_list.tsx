import clsx from 'clsx';

export function RoomList({ users } : { users: number[] }) {
  const curr = 1;

  return (
    <div className="flex flex-col w-full border border-sky-200/25 rounded-md p-4 gap-4">
      <div className="flex justify-center">
        <h1 className="text-2xl text-zinc-100 font-bold underline decoration-sky-300"> Party </h1>
      </div>
      <hr/>
      <div className="flex flex-col text-center bg-clip-text bg-gradient-to-r text-transparent from-yellow-200 to-sky-200 font-semibold">
        {users.map((u, idx) => <p key={u} className={clsx("items-center text-lg", (idx === curr) && 'border border-sky-300/25 rounded-md')}> {u} </p>)}
      </div>
    </div>
  );
}

