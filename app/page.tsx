import Button from "@/app/ui/button";
import { Emphasis } from "@/app/ui/emphasis";
import { Header } from "@/app/ui/header";
import Background from '@/app/ui/background';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-[1100px] flex-col justify-between px-13 sm:items-start">
        <Background/>

        <div className="flex-col w-full gap-6 p-10">
          <div className="flex rounded-xl flex flex-col">
            <div className="h-16 p-3 border rounded-md flex flex-row items-center justify-between gap-6 p-2">
              <h1 className="text-transparent mt-1 bg-clip-text bg-gradient-to-r from-zinc-50 to-zinc-400 font-semibold leading-10 tracking-tight dark:text-zinc-350">
              <Header title="spirit-wolf.net"/>
              </h1>

              <div className="flex gap-4">
                <Button href="/home"> Home </Button>
                <Button href="/projects"> Projects </Button>
                <Button href="/blog"> Blog </Button>
                <Button href="/login"> Login </Button>
              </div>
            </div>
          </div>

          <div className="h-[400px] flex flex-col items-center justify-center">
          
            <div className="flex justify-center text-center w-full">
            <p className="text-4xl font-medium">
            Hi! My name is <span className="font-extrabold underline decoration-sky-500/100"> Ameer Ali. </span>
            </p>
            </div>

            <p className="justify text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            I'm a <Emphasis>game developer, composer,</Emphasis> and <Emphasis>web developer</Emphasis> from Trinidad and Tobago.
            </p>

          </div>
        </div>
      </main>
    </div>
  );
}
