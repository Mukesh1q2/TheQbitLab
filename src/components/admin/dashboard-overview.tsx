'use client'

import { BarChart3, Users, FolderOpen, TrendingUp } from 'lucide-react'

export function DashboardOverview() {
  const stats = [
    { title: 'Total Projects', value: '24', icon: FolderOpen, change: '+12%' },
    { title: 'Active Users', value: '1,234', icon: Users, change: '+5%' },
    { title: 'Monthly Visitors', value: '8,456', icon: TrendingUp, change: '+23%' },
    { title: 'Conversion Rate', value: '3.2%', icon: BarChart3, change: '+1.1%' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-green-600">{stat.change} from last month</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <stat.icon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}