"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import type { SectionContent, EditableSection, DeepPartial } from "@/types/admin"

interface AdminContextType {
  isAdmin: boolean;
  isEditMode: boolean;
  toggleEditMode: () => void;
  editableContent: DeepPartial<SectionContent>;
  updateContent: <T extends EditableSection>(
    section: T,
    content: DeepPartial<SectionContent[T]>
  ) => void;
  saveChanges: () => void;
  discardChanges: () => void;
}

const defaultContext: AdminContextType = {
  isAdmin: false,
  isEditMode: false,
  toggleEditMode: () => {},
  editableContent: {},
  updateContent: () => {},
  saveChanges: () => {},
  discardChanges: () => {},
}

const AdminContext = createContext<AdminContextType>(defaultContext)

export const useAdmin = () => useContext(AdminContext)

interface AdminProviderProps {
  children: ReactNode
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editableContent, setEditableContent] = useState<DeepPartial<SectionContent>>({})
  const [originalContent, setOriginalContent] = useState<DeepPartial<SectionContent>>({})

  // Check if user is admin
  useEffect(() => {
    const checkUserStatus = () => {
      const user = localStorage.getItem("user")
      if (user) {
        try {
          const userData = JSON.parse(user)
          const isUserAdmin = userData.email === "elishaejimofor@gmail.com" && userData.isAdmin === true
          setIsAdmin(isUserAdmin)
          
          // If user is not admin but somehow edit mode is on, turn it off
          if (!isUserAdmin && isEditMode) {
            setIsEditMode(false)
          }
        } catch (e) {
          setIsAdmin(false)
          setIsEditMode(false)
        }
      } else {
        setIsAdmin(false)
        setIsEditMode(false)
      }
    }

    checkUserStatus()
    
    // Check admin status whenever localStorage changes
    window.addEventListener("storage", checkUserStatus)
    
    // Also check periodically to prevent tampering
    const intervalCheck = setInterval(checkUserStatus, 30000)
    
    return () => {
      window.removeEventListener("storage", checkUserStatus)
      clearInterval(intervalCheck)
    }
  }, [isEditMode])

  // Load initial content from localStorage if available
  useEffect(() => {
    const savedContent = localStorage.getItem("siteContent")
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent)
        setEditableContent(parsedContent)
        setOriginalContent(parsedContent)
      } catch (e) {
        console.error("Failed to parse saved content", e)
      }
    }
  }, [])

  const toggleEditMode = () => {
    // Double-check admin status before allowing edit mode toggle
    const user = localStorage.getItem("user")
    if (!user) {
      setIsAdmin(false)
      setIsEditMode(false)
      return
    }
    
    try {
      const userData = JSON.parse(user)
      if (userData.email !== "elishaejimofor@gmail.com" || userData.isAdmin !== true) {
        setIsAdmin(false)
        setIsEditMode(false)
        return
      }
    } catch (e) {
      setIsAdmin(false)
      setIsEditMode(false)
      return
    }
    
    // Only proceed if user is confirmed admin
    if (!isAdmin) return
    
    setIsEditMode(!isEditMode)
    
    // If turning off edit mode, discard changes
    if (isEditMode) {
      setEditableContent({...originalContent})
    }
  }

  const updateContent = <T extends EditableSection>(
    section: T,
    content: DeepPartial<SectionContent[T]>
  ) => {
    // Only allow content updates if user is admin and in edit mode
    if (!isAdmin || !isEditMode) return
    
    setEditableContent(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        ...content
      }
    }))
  }

  const saveChanges = () => {
    // Double-check admin status before saving changes
    if (!isAdmin) return
    
    // Save to localStorage
    localStorage.setItem("siteContent", JSON.stringify(editableContent))
    
    // Update original content
    setOriginalContent({...editableContent})
    
    // Exit edit mode
    setIsEditMode(false)
    
    alert("Changes saved successfully!")
  }

  const discardChanges = () => {
    if (!isAdmin) return
    
    // Revert to original content
    setEditableContent({...originalContent})
    
    // Exit edit mode
    setIsEditMode(false)
    
    alert("Changes discarded!")
  }

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        isEditMode,
        toggleEditMode,
        editableContent,
        updateContent,
        saveChanges,
        discardChanges
      }}
    >
      {children}
    </AdminContext.Provider>
  )
} 