import { Navigation } from '@/app/ui/nav';
import { GridBackground } from '@/app/ui/background';
import RegsiterForm from '@/app/ui/register-form';

export default function Register() {
  return (
    <div className="flex items-center justify-center h-screen font-sans">
      <main className="flex w-full flex-col h-full">
        <GridBackground />

        <div className="p-10">
          <Navigation staticText={true} />
        </div>

        <div className="flex m-40 justify-center">
          <RegsiterForm />
        </div>
      </main>
    </div>
  );
}

