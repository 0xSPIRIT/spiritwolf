'use server';

import { sql } from '../../lib/db';

export async function submitStatements(prevState: { error: string }, formData: FormData) {
  const data = {
    truth1: formData.get('truth1') as string,
    truth2: formData.get('truth2') as string,
    lie: formData.get('lie') as string,
  };

  for (const p of Object.entries(data)) {
    if (!p)
      return { error: "All fields must be filled." };
  }
}
