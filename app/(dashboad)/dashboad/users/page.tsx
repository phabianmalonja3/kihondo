"use client";

import React from "react";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Customer";
  status: "Active" | "Blocked";
}

const users: User[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@exploretanzania.tz",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@gmail.com",
    role: "Customer",
    status: "Active",
  },
  {
    id: 3,
    name: "Asha Ali",
    email: "asha@gmail.com",
    role: "Customer",
    status: "Blocked",
  },
];

export default function UsersPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-emerald-900">
          Users
        </h1>

        <button className="flex items-center gap-2 bg-emerald-900 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition">
          <FaUserPlus />
          Add User
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b last:border-none">
                <td className="px-6 py-4 font-medium">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3 text-lg">
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
