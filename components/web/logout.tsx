"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";

export function LogoutDialog() {
  const router = useRouter();

  const handleLogout = () => {

    
   
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-emerald-900 hover:bg-emerald-700" >
             <FaSignOutAlt />
          Logout
        
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to log out? You will need to login again
            to access the dashboard.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout} className="bg-emerald-900 text-white hover:bg-emerald-600">
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
