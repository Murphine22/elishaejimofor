"use client"

import { useState, useEffect } from "react"
import { useAdmin } from "@/components/admin-context"
import { Edit2, Check, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface EditableTextProps {
  section: string
  field: string
  defaultValue: string
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
  className?: string
  multiline?: boolean
  placeholder?: string
}

export function EditableText({
  section,
  field,
  defaultValue,
  as: Component = "p",
  className = "",
  multiline = false,
  placeholder = "Enter text..."
}: EditableTextProps) {
  const { isAdmin, isEditMode, editableContent, updateContent } = useAdmin()
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(defaultValue)

  // Get saved content or use default
  useEffect(() => {
    const savedValue = editableContent[section]?.[field]
    if (savedValue !== undefined) {
      setValue(savedValue)
    } else {
      setValue(defaultValue)
    }
  }, [editableContent, section, field, defaultValue])

  const handleSave = () => {
    updateContent(section, { [field]: value })
    setIsEditing(false)
  }

  const handleCancel = () => {
    const savedValue = editableContent[section]?.[field]
    setValue(savedValue !== undefined ? savedValue : defaultValue)
    setIsEditing(false)
  }

  if (!isAdmin || !isEditMode) {
    return <Component className={className}>{value}</Component>
  }

  return (
    <div className="relative group">
      {!isEditing ? (
        <>
          <Component className={className}>{value || placeholder}</Component>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setIsEditing(true)}
            className="absolute -top-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-blue-600 z-10"
            title="Edit text"
          >
            <Edit2 className="w-3 h-3" />
          </motion.button>
        </>
      ) : (
        <div className="relative">
          {multiline ? (
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={`${className} w-full border-2 border-blue-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background`}
              rows={4}
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={`${className} w-full border-2 border-blue-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background`}
              autoFocus
            />
          )}
          <div className="absolute -top-10 right-0 flex gap-2 bg-background border rounded-lg p-1 shadow-lg">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white p-1.5 rounded hover:bg-green-600 transition-colors"
              title="Save"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-500 text-white p-1.5 rounded hover:bg-red-600 transition-colors"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
