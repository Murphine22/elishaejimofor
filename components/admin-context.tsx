"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

// 🧠 Types
interface EditableContentData {
  [section: string]: Record<string, any>;
}

interface AdminContextType {
  isAdmin: boolean;
  isEditMode: boolean;
  editableContent: EditableContentData;
  originalContent: EditableContentData;
  toggleEditMode: () => void;
  updateContent: (section: string, content: Partial<Record<string, any>>) => void;
  saveChanges: () => void;
  resetChanges: () => void;
  loginAsAdmin: (email: string, password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

// ⚙️ Provider
export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableContent, setEditableContent] = useState<EditableContentData>({});
  const [originalContent, setOriginalContent] = useState<EditableContentData>({});

  // Load saved content once
  useEffect(() => {
    const saved = localStorage.getItem("siteContent");
    if (saved) {
      const parsed = JSON.parse(saved);
      setEditableContent(parsed);
      setOriginalContent(parsed);
    }
  }, []);

  // 💡 Update specific section
  const updateContent = (section: string, content: Partial<Record<string, any>>) => {
    if (!isAdmin || !isEditMode) return;
    setEditableContent((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        ...content,
      },
    }));
  };

  // 💾 Save site-wide
  const saveChanges = () => {
    if (!isAdmin) return;
    localStorage.setItem("siteContent", JSON.stringify(editableContent));
    setOriginalContent({ ...editableContent });
    setIsEditMode(false);
    alert("✅ All changes have been saved successfully!");
  };

  // 🔁 Reset changes
  const resetChanges = () => {
    if (!isAdmin) return;
    setEditableContent({ ...originalContent });
    setIsEditMode(false);
    alert("🔄 All unsaved changes have been discarded.");
  };

  // 👑 Admin login
  const loginAsAdmin = (email: string, password: string) => {
    if (email === "elishaejimofor@gmail.com" && password === "admin123") {
      setIsAdmin(true);
      alert("✅ Logged in successfully as Admin");
      return true;
    } else {
      alert("❌ Invalid admin credentials");
      return false;
    }
  };

  const logout = () => {
    setIsAdmin(false);
    setIsEditMode(false);
  };

  const toggleEditMode = () => {
    if (!isAdmin) return;
    setIsEditMode((prev) => !prev);
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        isEditMode,
        editableContent,
        originalContent,
        toggleEditMode,
        updateContent,
        saveChanges,
        resetChanges,
        loginAsAdmin,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

// 🧩 Hook
export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
};
