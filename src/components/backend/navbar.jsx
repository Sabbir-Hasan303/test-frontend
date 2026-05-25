import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Menu, User } from 'lucide-react';
import Link from "next/link";

export function Navbar({ onToggleSidebar }) {
  return (
    <div>
      <nav className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="lg:hidden">
          <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="hover:bg-gray-100">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/logout">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  )
}

