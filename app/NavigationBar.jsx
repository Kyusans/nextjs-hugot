"use client"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { CircleUser, Package2, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

function NavigationBar() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  }
  return (
    <>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <ModeToggle />
          <div className="ml-auto flex-1 sm:flex-initial">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  )
}

export default NavigationBar