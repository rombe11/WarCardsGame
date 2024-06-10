import { io } from "socket.io-client";
import { IP } from '@env'

const socket = io.connect(`http://${IP}:3000`);

export default socket;