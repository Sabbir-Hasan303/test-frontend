"use client"

import { Facebook, Instagram, Twitter } from 'lucide-react'
import { useState } from "react"
import { ImageUpload } from "@/components/backend/image-upload"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function GeneralSettingsPage() {
  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://facebook.com/yourstorepage",
    instagram: "https://instagram.com/yourstorepage",
    twitter: "https://twitter.com/yourstorepage",
  })
  const [themeMode] = useState("light")
  const [logo, setLogo] = useState(null)
  const [favicon, setFavicon] = useState(null)

  const handleSocialLinkChange = (event) => {
    setSocialLinks({
      ...socialLinks,
      [event.target.name]: event.target.value,
    })
  }

  const handleSave = () => {
    // Here you would typically send the updated settings to your backend
    console.log("Saving settings:", { socialLinks, themeMode, logo, favicon })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">General Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Social Media Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Facebook */}
            <div className="flex items-center gap-2">
              <Facebook className="h-5 w-5" />
              <Input
                type="url"
                name="facebook"
                value={socialLinks.facebook}
                onChange={handleSocialLinkChange}
                placeholder="Enter Facebook link"
                className="w-full"
              />
            </div>
            {/* Instagram */}
            <div className="flex items-center gap-2">
              <Instagram className="h-5 w-5" />
              <Input
                type="url"
                name="instagram"
                value={socialLinks.instagram}
                onChange={handleSocialLinkChange}
                placeholder="Enter Instagram link"
                className="w-full"
              />
            </div>
            {/* Twitter */}
            <div className="flex items-center gap-2">
              <Twitter className="h-5 w-5" />
              <Input
                type="url"
                name="twitter"
                value={socialLinks.twitter}
                onChange={handleSocialLinkChange}
                placeholder="Enter Twitter link"
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Theme & Logo Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="logo">Upload Logo</Label>
              <ImageUpload
                maxImages={1}
                onChange={(files) => setLogo(files[0] ? URL.createObjectURL(files[0]) : null)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="favicon">Upload Fav Icon</Label>
              <ImageUpload
                maxImages={1}
                onChange={(files) => setFavicon(files[0] ? URL.createObjectURL(files[0]) : null)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save</Button>
      </div>
      <p className="text-center text-sm text-muted-foreground">Footer</p>
    </div>
  )
}

