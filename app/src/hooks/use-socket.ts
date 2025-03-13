import { io, type Socket } from "socket.io-client";
import { SocketEvents } from "../enums/socket.enum";
import { toast } from "react-toastify";

let isConnected = false;
let config: { userId: string; token: string } = null;
let socket: Socket = null;

export default function useSocket() {
  if (!socket) {
    socket = io(import.meta.env.VITE_API_URL as string, {
      path: "/socket.io",
      transports: ["websocket"],
      autoConnect: false,
      query: { token: null },
    });

    socket.on("connect", () => {
      joinRoom();
    });

    socket.once(SocketEvents.NEW_VIDEO, (data) => {
      if (data.sharedById === config.userId) {
        return;
      }
      toast.success(`New video shared titled: ${data.title}`);
    });
  }

  const joinRoom = (): void => {
    socket.emit(SocketEvents.JOIN_ROOM, {});
  };

  const connect = (socketConfig: { userId: string; token: string }): void => {
    if (socket && !isConnected) {
      isConnected = true;
      config = socketConfig;
      socket.io.opts.query.token = config.token;
      socket.connect();
    }
  };

  const disconnect = (): void => {
    if (socket && isConnected) {
      isConnected = false;
      socket.disconnect();
      socket = null;
    }
  };

  return {
    connect,
    disconnect,
  };
}
