"use client"

import { useState } from "react"
import { useAdmin } from "@/components/admin-context"
import { Trash2, Plus, Eye, EyeOff, GripVertical } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface EditableSectionProps {
  section: string
  children: React.ReactNode
  title?: string
  removable?: boolean
  toggleable?: boolean
  className?: string
}

export function EditableSection({
  section,
  children,
  title,
  removable = false,
  toggleable = false,
  className = ""
}: EditableSectionProps) {
  const { isAdmin, isEditMode, editableContent, updateContent } = useAdmin()
  const [isVisible, setIsVisible] = useState(
    editableContent[section]?.visible !== false
  )

  const handleToggleVisibility = () => {
    const newVisibility = !isVisible
    setIsVisible(newVisibility)
    updateContent(section, { visible: newVisibility })
  }

  const handleRemove = () => {
    if (confirm(`Are you sure you want to remove the "${title || section}" section?`)) {
      updateContent(section, { removed: true })
    }
  }

  // Don't render if removed
  if (editableContent[section]?.removed) {
    return null
  }

  if (!isAdmin || !isEditMode) {
    return isVisible ? <div className={className}>{children}</div> : null
  }

  return (
    <div className={`relative ${className}`}>
      {/* Admin Controls Overlay */}
      <div className="absolute -top-3 left-0 right-0 flex items-center justify-between z-10 opacity-0 hover:opacity-100 transition-opacity">
        <div className="bg-blue-500 text-white px-3 py-1 rounded-t-lg text-xs font-bold flex items-center gap-2">
          <GripVertical className="w-3 h-3" />
          {title || section}
        </div>
        <div className="flex gap-1">
          {toggleable && (
            <button
              onClick={handleToggleVisibility}
              className={`${
                isVisible ? "bg-green-500" : "bg-gray-500"
              } text-white p-1.5 rounded hover:opacity-80 transition-opacity`}
              title={isVisible ? "Hide section" : "Show section"}
            >
              {isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            </button>
          )}
          {removable && (
            <button
              onClick={handleRemove}
              className="bg-red-500 text-white p-1.5 rounded hover:bg-red-600 transition-colors"
              title="Remove section"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Section Content */}
      <div
        className={`border-2 ${
          isVisible ? "border-blue-500" : "border-gray-400"
        } border-dashed rounded-lg p-4 ${!isVisible ? "opacity-50" : ""}`}
      >
        {children}
      </div>

      {!isVisible && (
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <span className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-bold">
            Hidden (Visible in edit mode only)
          </span>
        </div>
      )}
    </div>
  )
}
