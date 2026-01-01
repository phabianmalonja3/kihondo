"use client";

import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Customer";
  status: "Active" | "Blocked";
}


export default function UsersPage() {

  const [users, setUsers] = useState<User[]>([]);
  const [active, setActive] = useState<boolean>(true);
  const [role, setRole] = useState<string>("Admin");
    
  
     useEffect(() => {
       const fetchImages = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
          cache: "no-store", // 
        });
    
        const data = await res.json();
       
        setUsers(data.users ?? data)
  
  
      };
    
      fetchImages();
      
     }, []);
  return (
    <div>
     
      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-50 text-sm ">
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
                   Admin
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                      ${active 
                          ? ("bg-green-100 text-green-900")
                          : ("bg-red-100 text-red-700")
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
