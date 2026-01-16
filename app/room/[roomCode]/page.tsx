export default async function Page({
  params,
}: {
  params: Promise<{ roomCode: string }>
}) {
  const { roomCode } = await params;

  return <div> {roomCode} </div>;
}
