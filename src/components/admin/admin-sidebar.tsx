'use client'

import { Home, Users, FolderOpen, BarChart3, Settings, FileText, Mail } from 'lucide-react'

export function AdminSidebar() {
  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/admin' },
    { icon: FolderOpen, label: 'Projects', href: '/admin/projects' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: FileText, label: 'Content', href: '/admin/content' },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
    { icon: Mail, label: 'Messages', href: '/admin/messages' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-6">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-900">TheQbitlabs Admin</h1>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  )
}