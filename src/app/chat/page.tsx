

export const dynamic = 'force-dynamic'

import { v4 as uuidv4 } from 'uuid';
import { createBrowserClient } from '@/supabase/client';
import { ChatComponent } from '@/components/chat';

export default async function ChatPage({ searchParams }: { searchParams: { id?: string } }) {
  let sessionId = await searchParams.id || uuidv4();


  const supabase = createBrowserClient();

  // Haal initiële berichten op via server-side rendering (SSR)
  const { data: initialMessages } = await supabase.from('chat_messages')
    .select('*')
    .order('created_at', { ascending: true }).limit(50);

    // log 
    console.log('initialMessages', initialMessages)

  

  return (
  
      <ChatComponent initialMessages={
        initialMessages
      || []
      } sessionId={sessionId} />

  );
}
