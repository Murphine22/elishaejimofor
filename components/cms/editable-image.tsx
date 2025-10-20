"use client"

import { useState, useEffect, useRef } from "react"
import { useAdmin } from "@/components/admin-context"
import { Upload, Check, X, Image as ImageIcon, Link as LinkIcon } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

interface EditableImageProps {
  section: string
  field: string
  defaultSrc: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function EditableImage({
  section,
  field,
  defaultSrc,
  alt,
  width = 400,
  height = 300,
  className = "",
  priority = false
}: EditableImageProps) {
  const { isAdmin, isEditMode, editableContent, updateContent } = useAdmin()
  const [isEditing, setIsEditing] = useState(false)
  const [imageSrc, setImageSrc] = useState(defaultSrc)
  const [newImageUrl, setNewImageUrl] = useState("")
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("url")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const savedSrc = editableContent[section]?.[field]
    if (savedSrc) {
      setImageSrc(savedSrc)
    } else {
      setImageSrc(defaultSrc)
    }
  }, [editableContent, section, field, defaultSrc])

  const handleSave = () => {
    if (uploadMethod === "url" && newImageUrl) {
      updateContent(section, { [field]: newImageUrl })
      setImageSrc(newImageUrl)
    }
    setIsEditing(false)
    setNewImageUrl("")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        updateContent(section, { [field]: base64String })
        setImageSrc(base64String)
        setIsEditing(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setNewImageUrl("")
  }

  if (!isAdmin || !isEditMode) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover"
          priority={priority}
        />
      </div>
    )
  }

  return (
    <div className="relative group">
      <div className={`relative ${className}`}>
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover"
          priority={priority}
        />
        {!isEditing && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setIsEditing(true)}
            className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-blue-600 z-10"
            title="Change image"
          >
            <Upload className="w-4 h-4" />
          </motion.button>
        )}
      </div>

      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-0 left-0 right-0 bg-background border-2 border-blue-500 rounded-lg p-4 shadow-xl z-20"
        >
          <h4 className="font-bold mb-3 text-sm">Change Image</h4>
          
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setUploadMethod("url")}
              className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-sm ${
                uploadMethod === "url"
                  ? "bg-blue-500 text-white"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              <LinkIcon className="w-4 h-4" />
              URL
            </button>
            <button
              onClick={() => setUploadMethod("file")}
              className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-sm ${
                uploadMethod === "file"
                  ? "bg-blue-500 text-white"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Upload
            </button>
          </div>

          {uploadMethod === "url" ? (
            <div className="space-y-2">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Enter image URL (https://...)"
                className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background"
                autoFocus
              />
              {newImageUrl && (
                <div className="text-xs text-muted-foreground">
                  Preview: {newImageUrl.substring(0, 50)}...
                </div>
              )}
            </div>
          ) : (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-blue-500 rounded-lg p-4 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors flex flex-col items-center gap-2"
              >
                <Upload className="w-6 h-6 text-blue-500" />
                <span className="text-sm text-muted-foreground">
                  Click to upload image
                </span>
              </button>
            </div>
          )}

          <div className="flex gap-2 mt-3">
            <button
              onClick={handleSave}
              disabled={uploadMethod === "url" && !newImageUrl}
              className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
              <Check className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
