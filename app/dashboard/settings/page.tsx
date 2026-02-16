'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import DashboardNav from '@/components/dashboard/nav'
import { User, Lock, Bell, CreditCard, LogOut, Trash2 } from 'lucide-react'

export default function SettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'billing'>('profile')
  const [userProfile, setUserProfile] = useState({
    fullName: 'Rahul Kumar',
    email: 'rahul@example.com',
    phone: '+91 9876543210',
    exam: 'SSC CGL',
    targetDate: '2024-06-15'
  })
  const user = { name: 'Rahul Kumar', email: 'rahul@example.com', exam: 'SSC CGL', joinedDate: 'Jan 15, 2024' }

  const handleLogout = () => {
    // TODO: Implement logout logic
    router.push('/')
  }

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // TODO: Implement account deletion
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav user={user} />

      <main className="p-4 sm:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and settings</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="space-y-2">
                {[
                  { id: 'profile', label: 'Profile', icon: User },
                  { id: 'security', label: 'Security', icon: Lock },
                  { id: 'notifications', label: 'Notifications', icon: Bell },
                  { id: 'billing', label: 'Billing & Subscription', icon: CreditCard }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Full Name</label>
                      <input
                        type="text"
                        value={userProfile.fullName}
                        onChange={(e) => setUserProfile({ ...userProfile, fullName: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Email Address</label>
                      <input
                        type="email"
                        value={userProfile.email}
                        onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={userProfile.phone}
                        onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Target Exam</label>
                      <select
                        value={userProfile.exam}
                        onChange={(e) => setUserProfile({ ...userProfile, exam: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      >
                        <option>SSC CGL</option>
                        <option>UPSC</option>
                        <option>Banking</option>
                        <option>GATE</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Target Exam Date</label>
                      <input
                        type="date"
                        value={userProfile.targetDate}
                        onChange={(e) => setUserProfile({ ...userProfile, targetDate: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      />
                    </div>

                    <Button className="w-full">Save Changes</Button>
                  </div>
                </Card>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Current Password</label>
                          <input
                            type="password"
                            placeholder="Enter your current password"
                            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">New Password</label>
                          <input
                            type="password"
                            placeholder="Enter a new password"
                            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Confirm Password</label>
                          <input
                            type="password"
                            placeholder="Confirm your new password"
                            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                          />
                        </div>
                        <Button>Update Password</Button>
                      </div>
                    </div>

                    <div className="border-t border-border pt-6">
                      <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
                      <p className="text-muted-foreground mb-4">Add an extra layer of security to your account</p>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Notifications Settings */}
              {activeTab === 'notifications' && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    {[
                      { label: 'Email notifications for new tests', desc: 'Get notified when new mock tests are available' },
                      { label: 'Study reminders', desc: 'Daily reminders to stick to your study schedule' },
                      { label: 'Performance updates', desc: 'Weekly summary of your test performance' },
                      { label: 'Coach messages', desc: 'Notifications when coaches respond to your messages' },
                      { label: 'Subscription updates', desc: 'Billing and subscription-related notifications' },
                      { label: 'Marketing emails', desc: 'Updates about new features and promotions' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p className="font-semibold">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded cursor-pointer" />
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Billing Settings */}
              {activeTab === 'billing' && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Billing & Subscription</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                      <h3 className="font-bold text-lg mb-2">Pro Plan</h3>
                      <p className="text-muted-foreground mb-4">Your current subscription</p>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm"><span className="font-semibold">Price:</span> ₹299/month</p>
                        <p className="text-sm"><span className="font-semibold">Renewal Date:</span> March 15, 2024</p>
                        <p className="text-sm"><span className="font-semibold">Status:</span> <span className="text-green-600 font-semibold">Active</span></p>
                      </div>
                      <Button variant="outline">Change Plan</Button>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg mb-4">Payment Method</h3>
                      <div className="border border-border rounded-lg p-4 flex items-center justify-between">
                        <div>
                          <p className="font-semibold">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg mb-4">Billing History</h3>
                      <div className="space-y-2">
                        {[
                          { date: 'Feb 15, 2024', amount: '₹299', status: 'Paid' },
                          { date: 'Jan 15, 2024', amount: '₹299', status: 'Paid' },
                          { date: 'Dec 15, 2023', amount: '₹299', status: 'Paid' }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg">
                            <div>
                              <p className="font-semibold text-sm">{item.date}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <p className="font-semibold">{item.amount}</p>
                              <span className="text-green-600 text-sm font-semibold">{item.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="mt-12 max-w-2xl">
            <Card className="p-8 border-destructive/50 bg-destructive/5">
              <h2 className="text-2xl font-bold mb-6 text-destructive">Danger Zone</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Logout</p>
                    <p className="text-sm text-muted-foreground">End your current session</p>
                  </div>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Delete Account</p>
                      <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
