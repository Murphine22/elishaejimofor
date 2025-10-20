"use client"

import { useState } from "react"
import { useAdmin } from "@/components/admin-context"
import {
  Edit3,
  Save,
  X,
  LogOut,
  Eye,
  Code,
  Image as ImageIcon,
  Layout,
  Settings,
  Download,
  Upload,
  RotateCcw
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function AdminToolbar() {
  const {
    isAdmin,
    isEditMode,
    toggleEditMode,
    saveChanges,
    resetChanges,
    logout,
    editableContent
  } = useAdmin()
  const [showExportImport, setShowExportImport] = useState(false)

  if (!isAdmin) return null

  const handleExport = () => {
    const dataStr = JSON.stringify(editableContent, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `website-content-${new Date().toISOString().split("T")[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string)
          localStorage.setItem("siteContent", JSON.stringify(imported))
          alert("✅ Content imported successfully! Refreshing page...")
          window.location.reload()
        } catch (error) {
          alert("❌ Failed to import content. Invalid JSON file.")
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Left Section */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg">
                <Settings className="w-4 h-4" />
                <span className="font-bold text-sm">Admin Mode</span>
              </div>
              
              <button
                onClick={toggleEditMode}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-medium text-sm transition-all ${
                  isEditMode
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-white/20 hover:bg-white/30"
                }`}
              >
                {isEditMode ? (
                  <>
                    <Eye className="w-4 h-4" />
                    <span>Editing</span>
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4" />
                    <span>Enable Edit Mode</span>
                  </>
                )}
              </button>
            </div>

            {/* Center Section - Stats */}
            {isEditMode && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="hidden md:flex items-center gap-4 text-xs"
              >
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded">
                  <Layout className="w-3 h-3" />
                  <span>{Object.keys(editableContent).length} Sections</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded">
                  <Code className="w-3 h-3" />
                  <span>Live Preview</span>
                </div>
              </motion.div>
            )}

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {isEditMode && (
                <>
                  <button
                    onClick={() => setShowExportImport(!showExportImport)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-sm"
                    title="Export/Import"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Backup</span>
                  </button>

                  <button
                    onClick={resetChanges}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition-colors text-sm"
                    title="Reset all unsaved changes"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span className="hidden sm:inline">Reset</span>
                  </button>

                  <button
                    onClick={saveChanges}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-green-500 hover:bg-green-600 transition-colors font-bold text-sm shadow-lg"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save All</span>
                  </button>
                </>
              )}

              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 transition-colors text-sm"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Export/Import Panel */}
        <AnimatePresence>
          {showExportImport && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-white/20 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Content</span>
                  </button>

                  <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors cursor-pointer text-sm">
                    <Upload className="w-4 h-4" />
                    <span>Import Content</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImport}
                      className="hidden"
                    />
                  </label>

                  <div className="flex-1 text-xs text-white/70">
                    Export your content as JSON backup or import from a previous backup
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Spacer to prevent content from being hidden under toolbar */}
      <div className="h-14" />
    </>
  )
}
