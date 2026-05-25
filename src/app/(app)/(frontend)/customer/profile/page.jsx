"use client"

import { useState } from "react"
import { CustomerLayout } from "@/components/frontend/customer/customer-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, Trash2 } from 'lucide-react'

// Mock user data
const initialUserData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  primaryPhone: "+1 (555) 123-4567",
  secondaryPhone: "",
  addresses: [
    {
      id: 1,
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      country: "USA"
    }
  ]
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState(initialUserData)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddressChange = (id, field, value) => {
    setUserData(prev => ({
      ...prev,
      addresses: prev.addresses.map(addr =>
        addr.id === id ? { ...addr, [field]: value } : addr
      )
    }))
  }

  const handleAddAddress = () => {
    setUserData(prev => ({
      ...prev,
      addresses: [...prev.addresses, { id: Date.now(), street: "", city: "", state: "", zipCode: "", country: "" }]
    }))
  }

  const handleRemoveAddress = (id) => {
    setUserData(prev => ({
      ...prev,
      addresses: prev.addresses.filter(addr => addr.id !== id)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the updated data to your backend
    console.log("Updated user data:", userData)
    setIsEditing(false)
  }

  return (
    <CustomerLayout>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-[#253D4E]">My Profile</h1>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2 space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full md:w-1/2 space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="primaryPhone">Primary Phone</Label>
              <Input
                id="primaryPhone"
                name="primaryPhone"
                type="tel"
                value={userData.primaryPhone}
                onChange={handleInputChange}
              />
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="secondaryPhone">Secondary Phone (Optional)</Label>
              <Input
                id="secondaryPhone"
                name="secondaryPhone"
                type="tel"
                value={userData.secondaryPhone}
                onChange={handleInputChange}
              />
            </div> */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Addresses</Label>
                <Button type="button" variant="outline" size="sm" onClick={handleAddAddress}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Address
                </Button>
              </div>
              {userData.addresses.map((address, index) => (
                <div key={address.id} className="space-y-2 p-4 border rounded-md">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Address {index + 1}</h3>
                    {userData.addresses.length > 1 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveAddress(address.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <Input
                    placeholder="Street"
                    value={address.street}
                    onChange={(e) => handleAddressChange(address.id, 'street', e.target.value)}
                  />
                  <div className="flex space-x-2">
                    <Input
                      placeholder="City"
                      value={address.city}
                      onChange={(e) => handleAddressChange(address.id, 'city', e.target.value)}
                    />
                    <Input
                      placeholder="State"
                      value={address.state}
                      onChange={(e) => handleAddressChange(address.id, 'state', e.target.value)}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Zip Code"
                      value={address.zipCode}
                      onChange={(e) => handleAddressChange(address.id, 'zipCode', e.target.value)}
                    />
                    <Input
                      placeholder="Country"
                      value={address.country}
                      onChange={(e) => handleAddressChange(address.id, 'country', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-4">
              <Button type="submit" className="bg-[#3BB77E] hover:bg-[#3BB77E]/90 text-white">
                Save Changes
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">First Name</h3>
                <p>{userData.firstName}</p>
              </div>
              <div>
                <h3 className="font-semibold">Last Name</h3>
                <p>{userData.lastName}</p>
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>{userData.email}</p>
              </div>
              <div>
                <h3 className="font-semibold">Primary Phone</h3>
                <p>{userData.primaryPhone}</p>
              </div>
              {userData.secondaryPhone && (
                <div>
                  <h3 className="font-semibold">Secondary Phone</h3>
                  <p>{userData.secondaryPhone}</p>
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold mb-2">Addresses</h3>
              {userData.addresses.map((address, index) => (
                <div key={address.id} className="mb-4 p-4 border rounded-md">
                  <h4 className="font-medium">Address {index + 1}</h4>
                  <p>{address.street}</p>
                  <p>{`${address.city}, ${address.state} ${address.zipCode}`}</p>
                  <p>{address.country}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </CustomerLayout>
  )
}
