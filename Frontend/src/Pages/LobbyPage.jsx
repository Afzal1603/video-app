import { useCallback, useState, useEffect } from "react";
import { useSocket } from "../Context/SocketContext";
import { useNavigate } from "react-router-dom";
const LobbyPage = () => {
  const [email, setEmail] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const socket = useSocket();
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, roomNo });
    },
    [email, roomNo, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, roomNo } = data;
      navigate(`/room/${roomNo}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="text-center">
      <h1>Lobby Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          className="border-2"
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room">Room:</label>
        <input
          className="border-2"
          type="text"
          id="room"
          placeholder="Room No"
          value={roomNo}
          onChange={(e) => setRoomNo(e.target.value)}
        />
        <br />
        <button className="border-2" type="submit">
          Join
        </button>
      </form>
    </div>
  );
};

export default LobbyPage;
