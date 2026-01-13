import { Header } from "@/app/ui/header";
import Button from "@/app/ui/button";

import { HomeIcon, PaintBrushIcon, BookOpenIcon } from '@heroicons/react/16/solid';

import AccountIcon from '@/app/ui/account-icon';

interface NavigationProps {
  staticText?: boolean,
  homeIcon?: boolean,
  projectIcon?: boolean,
  blogIcon?: boolean,
  loginIcon?: boolean,
}

export function Navigation(props: NavigationProps) {
  return <div className="fixed left-1/2 transform -translate-x-1/2 w-full max-w-[900px] bg-black/75 z-15 backdrop-blur-sm shadow-black/40 shadow-lg rounded-xl flex flex-col">
    <div className="h-16 p-3 border rounded-md flex flex-row items-center justify-between gap-6">
      <div className="flex flex-row gap-2 text-transparent w-65 mt-1 bg-clip-text bg-gradient-to-r from-zinc-50 to-zinc-400 font-semibold leading-10 whitespace-nowrap tracking-tight dark:text-zinc-350">
        <div className="top-0.5">
          <Header title="spirit-wolf.net" staticText={props.staticText || false} />
        </div>
      </div>

      {
        (props.homeIcon || props.projectIcon || props.blogIcon || props.loginIcon) &&
        <div className="flex gap-4">
          {
            props.homeIcon && <Button href="/">
              <HomeIcon className="h-5 w-5" />
              <span> Home </span>
            </Button>
          }
          {props.projectIcon && <Button href="/#projects">
            <PaintBrushIcon className="w-5 h-5" />
            <span>Projects</span>
          </Button>}
          {props.blogIcon && <Button href="/blog">
            <BookOpenIcon className="w-5 h-5" />
            <span> Blog </span>
          </Button>}
          {props.loginIcon && <AccountIcon />}
        </div>
      }
    </div>
  </div>;
}


