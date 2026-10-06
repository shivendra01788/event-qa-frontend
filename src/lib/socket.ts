import { io } from 'socket.io-client';

// Your live Render backend URL
const SERVER_URL = 'https://event-qa-backend-2.onrender.com';

export const socket = io(SERVER_URL);