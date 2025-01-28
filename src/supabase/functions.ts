

// import client from ./client
import { createBrowserClient } from "./client";

const supabase = createBrowserClient();

interface BotResponse {
    session_id: string;
    response: string;
}



export async function sendFirstMessage(message: string): Promise<BotResponse> {
    try {
        const { data } = await supabase.functions.invoke("chat", {
            body: {
                message,
                sender: "user",
            },
        });
        return data;
    } catch (error) {
        throw new Error(String(error));
    }
}

// send message, with sessionId
export async function sendMessage(sessionId: string, message: string): Promise<BotResponse> {
    try {
        const { data } = await supabase.functions.invoke("chat", {
            body: {
                session_id: sessionId,
                message,
                sender: "user",
            },
        });
        return data;
    } catch (error) {
        throw new Error(String(error));
    }
}
