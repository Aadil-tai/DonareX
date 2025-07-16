import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table/index";
import axios from "axios";


export default function BasicTableOne() {

  const [message, setMessage] = useState([]);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/contact",
          { withCredentials: true });
        setMessage(res.data);
      } catch (error) {
        console.error("Failed to fetch contact details", error)
      }
    }
    fetchMessage();
  }, [])

  const toggleReadStatus = async (id, currentStatus) => {

    try {
      const res = await axios.put(`http://localhost:5000/api/contact/${id}/read`,
        { isRead: !currentStatus },
        { withCredentials: true },
      );

      setMessage((prev) =>
        prev.map((msg) =>
          msg._id === id ? { ...msg, isRead: !currentStatus } : msg)
      );

    } catch (error) {
      if (error.response?.status === 403) {
        alert("Only admins can perform this action.");
      }
      console.error("Failed to update status:", error);
    }
  }

  const deleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`, {
        withCredentials: true,
      });

      setMessage((prev) => prev.filter((msg) => msg._id !== id));
    } catch (error) {
      if (error.response?.status === 403) {
        alert("Only admins can delete messages.");
      }
      console.error("Failed to delete message:", error);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table >
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                id
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Email
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Message
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Action
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Date
              </TableCell>
            </TableRow>
          </TableHeader>


          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {message.map((msg, index) => (
              <TableRow key={msg._id}>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {index + 1}
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      {/* Optionally show image */}

                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {msg.name}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {msg.email}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {msg.message}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${msg.isRead ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {msg.isRead ? "Read" : "Unread"}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 flex gap-4">
                  <button
                    onClick={() => toggleReadStatus(msg._id, msg.isRead)}
                    disabled={msg.isRead} // disable if already read
                    className={`px-3 py-1 text-xs rounded text-white 
    ${msg.isRead ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
  `}
                  >
                    Mark as {msg.isRead ? "Read" : "Read"}
                  </button>
                  <button
                    onClick={() => deleteMessage(msg._id)}
                    className="px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {new Date(msg.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div >
  );
}
