declare module '*.svg' {
    const content: any;
    export default content;
}

interface WebSocketMessage{
    message:string,
    service_name: string,
    type: string
}

type ServiceSpecifiWebSocketMessage = 
    | { type: 'Connect'; payload: { service: string, lines: string, level: string } }
    | { type: 'Disconnect' }
    | { type: 'NewMessage'; payload: { message: string; service: string, level: string } };


type LogEntry = {
    message: string,
    transactionTime?: string,
    transactionLevel: string,
    transactionType?: string
}

type ServiceMessage = {
    message: string,
    time: string,
    level: string

}

// Define types for incoming and outgoing messages
interface IncomingMessage {
    message:string,
    service_name: string,
    type: string
}

interface OutgoingMessage {
  type: string;
  payload: any;
}

/**
 * In react there are local modules and global modules.
 * if you use an import statement react treats no longer treats the
 * module as global
 * 
 */
interface WebSocketContextType {
    sendMessage: import('react-use-websocket/dist/lib/types').SendMessage;
    lastMessage: unknown;
    readyState: import('react-use-websocket').ReadyState;
    sendJsonMessage: import('react-use-websocket/dist/lib/types').SendJsonMessage;
    lastJsonMessage: IncomingMessage
}

interface WebSocketProviderProps {
    children: ReactNode;
}

interface PrivateRouteProps {
    children: import('react').JSX.Element;
}