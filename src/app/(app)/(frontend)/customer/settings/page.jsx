import { CustomerLayout } from "@/components/frontend/customer/customer-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <CustomerLayout>
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-6 text-[#253D4E]">Settings</h1>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" />
          </div>
          <Button className="bg-[#3BB77E] hover:bg-[#3BB77E]/90 text-white">
            Change Password
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Email Notifications</h3>
              <p className="text-sm text-gray-600">Receive email about your account activity</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <Switch />
          </div>
        </div>
      </div>
    </CustomerLayout>
  )
}
