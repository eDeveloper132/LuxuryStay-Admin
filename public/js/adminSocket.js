// public/ts/adminSocket.ts
import io from 'socket.io-client';
//
// 2) Encapsulate Socket.IO client in a class
//
export class AdminSocket {
    // Use ReturnType<typeof io> so TS infers the socket instance type
    socket;
    constructor(serverUrl = window.location.origin) {
        // Cast to any for unknown opts
        this.socket = io(serverUrl, {
            // @ts-ignore
            withCredentials: true,
            // @ts-ignore
            reconnectionAttempts: 5,
        });
        this.socket.on('connect', () => {
            console.log(`🟢 Connected with socket id: ${this.socket.id}`);
        });
        this.socket.on('connect_error', (err) => {
            console.error('⚠️ Connection error:', err.message);
        });
        this.socket.on('disconnect', (reason) => {
            console.log(`🔴 Disconnected: ${reason}`);
        });
    }
    // Register handlers
    onBookingCreated(handler) {
        this.socket.on('booking:created', handler);
    }
    onInvoiceGenerated(handler) {
        this.socket.on('invoice:generated', handler);
    }
    // Unsubscribe if needed
    offBookingCreated() {
        this.socket.off('booking:created');
    }
    offInvoiceGenerated() {
        this.socket.off('invoice:generated');
    }
    // Disconnect cleanly
    disconnect() {
        this.socket.disconnect();
    }
}
//
// 3) Export a singleton instance
//
const adminSocket = new AdminSocket('http://localhost:3001');
export default adminSocket;
