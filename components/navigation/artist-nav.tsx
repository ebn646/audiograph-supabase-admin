'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Artist } from '@/types/artists'

interface ArtistNavProps {
  artist: Artist
}

export default function ArtistNav({ artist }: ArtistNavProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/').slice(0, 3).join('/')
  
  const navItems = [
    { label: 'Overview', href: `${basePath}/overview` },
    { label: 'Metrics', href: `${basePath}/metrics` },
    { label: 'Videos', href: `${basePath}/videos` },
    { label: 'Songs', href: `${basePath}/songs` },
  ]

  // Get first letter of artist name for fallback
  const artistInitial = artist?.name?.charAt(0) || 'A'

  return (
    <div className="sticky top-16 h-18 w-full">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 px-6 py-3">
          <Avatar>
            <AvatarImage src={artist?.image_url || "https://github.com/shadcn.png"} />
            <AvatarFallback>{artistInitial}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{artist?.name || "Artist Name"}</span>
        </div>
        <nav className="flex gap-6 px-6">
          {navItems.map((item) => {
            // Check if this nav item matches the current path
            const isActive = pathname.includes(item.href.split('/').pop() || '')
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium pb-2 ${
                  isActive
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
} 