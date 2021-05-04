export const connectToWebSocket = (socket) => {
    return {
      type: "WEBSOCKETCONNECTION",
      payload: socket
    };
  };