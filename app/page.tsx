import { Emphasis } from "@/app/ui/emphasis";
import { GridBackground } from '@/app/ui/background';
import Image from 'next/image';
import { Navigation } from '@/app/ui/nav';

import User from '@/app/ui/user';

interface CardProps {
  image?: string,
  title: string,
  caption?: string
}

function PageHeading(props: { title: string }) {
  return (
    <div className="flex flex-row gap-2 text-transparent w-65 mt-1 bg-clip-text bg-gradient-to-r from-zinc-50 to-zinc-400 font-semibold leading-10 whitespace-nowrap tracking-tight dark:text-zinc-350 text-3xl">
      <h1> {props.title} </h1>
    </div>
  );
}

function AboutMe() {
  return <div className="text-justify flex flex-col gap-6 shadow-xl text-lg text-zinc-400">
    <PageHeading title="About me" />
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus erat orci, eleifend a fermentum nec, posuere sit amet velit. Aenean a congue leo. Vivamus gravida erat metus, ac lobortis arcu feugiat ac. Cras quam lacus, dignissim vel porttitor ac, tempor eu ipsum. Suspendisse varius elementum enim in tempor. Donec sollicitudin mattis pharetra. Ut lacinia quis libero at tincidunt. Donec eu lorem semper, vehicula sapien vitae, tempor nunc. Donec consequat mi feugiat faucibus ornare. Praesent convallis lorem et tincidunt interdum. Sed iaculis eros vel gravida dapibus. Suspendisse vel felis quis neque bibendum volutpat sit amet eget tellus. Vivamus ut diam non purus pharetra sagittis eu ac lectus. Pellentesque mattis massa a purus porttitor porttitor. Integer eu mi aliquet, varius ex quis, suscipit lectus.
    </p>

    <p>
      Vivamus non porttitor nisl, vel finibus turpis. Sed blandit tortor nisl, maximus ultricies massa ultrices sit amet. Praesent euismod risus lacus. Suspendisse vestibulum volutpat purus, id ultrices dolor elementum quis. Integer lobortis ullamcorper libero, vitae volutpat purus pulvinar ac. Nam mattis, odio ac pulvinar iaculis, odio enim ultrices purus, in auctor neque tellus et elit. Phasellus condimentum in massa id consectetur. Pellentesque ut erat tortor. Nullam pellentesque sem sem, eget suscipit dolor fringilla eget. Nam ac ultrices elit, dictum scelerisque felis. Duis mattis nisi sit amet magna commodo, eget convallis sem sollicitudin. Nunc ut cursus erat. Nam cursus lacus eu mauris ornare porta. Praesent non finibus purus, in feugiat est. Integer a hendrerit odio. Aliquam sodales enim metus, quis elementum neque efficitur eget.
    </p>

    <p>
      Donec egestas pretium ligula bibendum sodales. Curabitur tincidunt imperdiet facilisis. In laoreet risus a nisi auctor semper. Vestibulum laoreet orci aliquet molestie eleifend. Proin a suscipit augue. Ut imperdiet nibh a nulla finibus, quis luctus tortor malesuada. Sed eget euismod massa. Phasellus placerat odio ut lacus fermentum, malesuada pellentesque est consectetur. Pellentesque sollicitudin semper enim, ac pulvinar urna dictum quis. Quisque eros libero, vestibulum vel viverra et, dapibus eu mauris. Sed hendrerit quam nec porttitor porta. Suspendisse nec porttitor tortor.
    </p>
  </div>;
}

function Projects() {
  const projects = [
    { image: '/projects/veil.png', title: 'Veil: Mirages', caption: 'A dreamlike psychological thriller released on Steam, programmed from scratch in C++, modeled in Blender, and composed in FL Studio by me.' },
    { image: '/projects/alaska.png', title: 'Alaska', caption: 'A cozy game about creating sculptures built from scratch in C, composed in FL Studio by me.' },
    { image: '/projects/mavien.png', title: 'Mavien', caption: 'A psychedelic puzzle game about parallel worlds built in GameMaker: Studio, the music composed by me.' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeading title="Projects" />
      <div className="grid grid-cols-2 gap-3">
        {projects.map((p, i) => (
          <ProjectCard key={i} image={p.image} title={p.title} caption={p.caption} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard(props: CardProps) {
  return <div className="flex flex-col border rounded-xl bg-black w-[450px] p-8 gap-3">
    {props.image &&
      <div className="outline border rounded-xl">
        <Image src={props.image} width={400} height={300} alt={props.caption || ''} />
      </div>
    }
    <div>
      <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-300 to-white font-semibold text-xl"> {props.title} </h1>
      {props.caption && <p className="text-zinc-500"> {props.caption} </p>}
    </div>
  </div>;
}

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-[1100px] flex-col justify-between px-13 sm:items-start">
        <GridBackground />

        <div className="flex-col w-full gap-6 p-10">
          <Navigation homeIcon={true} projectIcon={true} blogIcon={true} loginIcon={true} />

          <div className="h-[650px] flex gap-1 flex-col items-center justify-center">

            <User />
            <Image className="z-10 w-50 h-50" src="/icon.png" height="960" width="960" alt="Logo" />
            <div className="flex justify-center text-center w-full">
              <p className="text-4xl font-medium">
                Hi! My name is <span className="font-extrabold underline decoration-sky-500/100"> Ameer Ali. </span>
              </p>
            </div>

            <p className="justify text-lg leading-8 text-zinc-400">
              I'm a <Emphasis>game developer, composer,</Emphasis> and <Emphasis>web developer</Emphasis> from Trinidad and Tobago.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <section id="about-me"> <AboutMe /> </section>
            <section id="projects"> <Projects /> </section>
          </div>
        </div>
      </main>
    </div>
  );
}
