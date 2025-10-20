"use client"

import { useEffect, useState } from "react"
import { useAdmin } from "@/components/admin-context"
import { motion } from "framer-motion"
import { ToggleLeft, ToggleRight } from "lucide-react"

interface FeatureToggleProps {
  featureId: string
  children: React.ReactNode
  fallback?: React.ReactNode
  defaultEnabled?: boolean
}

export function FeatureToggle({
  featureId,
  children,
  fallback = null,
  defaultEnabled = true
}: FeatureToggleProps) {
  const { isAdmin, isEditMode, editableContent, updateContent } = useAdmin()
  const [isEnabled, setIsEnabled] = useState(defaultEnabled)

  useEffect(() => {
    const section = "features"
    const savedState = editableContent[section]?.[featureId]
    if (savedState !== undefined) {
      setIsEnabled(savedState)
    } else {
      setIsEnabled(defaultEnabled)
    }
  }, [editableContent, featureId, defaultEnabled])

  const handleToggle = () => {
    const newState = !isEnabled
    setIsEnabled(newState)
    updateContent("features", { [featureId]: newState })
  }

  if (!isAdmin || !isEditMode) {
    return isEnabled ? <>{children}</> : <>{fallback}</>
  }

  return (
    <div className="relative">
      {/* Toggle Control */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute -top-8 left-0 z-10"
      >
        <button
          onClick={handleToggle}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
            isEnabled
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-500 text-white hover:bg-gray-600"
          }`}
        >
          {isEnabled ? (
            <>
              <ToggleRight className="w-4 h-4" />
              <span>Feature ON</span>
            </>
          ) : (
            <>
              <ToggleLeft className="w-4 h-4" />
              <span>Feature OFF</span>
            </>
          )}
        </button>
      </motion.div>

      {/* Feature Content */}
      <div
        className={`border-2 border-dashed rounded-lg p-2 ${
          isEnabled ? "border-green-500" : "border-gray-400 opacity-50"
        }`}
      >
        {isEnabled ? children : fallback || <div className="text-center text-muted-foreground py-4">Feature Disabled</div>}
      </div>
    </div>
  )
}
