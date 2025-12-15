'use client'

import { BarChart3, TrendingUp, Users, Eye } from 'lucide-react'

export function AnalyticsDashboard() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Analytics Overview</h3>
        <BarChart3 className="w-6 h-6 text-purple-600" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Page Views</p>
              <p className="text-2xl font-bold text-purple-900">45,231</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-xs text-purple-600 mt-2">+20.1% from last month</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Unique Visitors</p>
              <p className="text-2xl font-bold text-blue-900">12,345</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-xs text-blue-600 mt-2">+15.3% from last month</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-green-900">3.2%</p>
            </div>
            <Eye className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-xs text-green-600 mt-2">+0.8% from last month</p>
        </div>
      </div>
    </div>
  )
}