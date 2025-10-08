"use client"

import React, { useState, useEffect, ReactNode } from "react"
import { useAdmin } from "@/components/admin-context"
import { Pencil, Check, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"
import type { SectionContent, EditableSection, DeepPartial } from "@/types/admin"

type ContentType = "text" | "richtext" | "image" | "list" | "link" | "number" | "object" | "array"

type FieldPath<T> = {
  [K in keyof T]: K extends string
    ? T[K] extends object
      ? K | `${K}.${FieldPath<T[K]>}`
      : K
    : never
}[keyof T]

interface EditableContentProps<T extends EditableSection> {
  section: T
  field: FieldPath<SectionContent[T]>
  type: ContentType
  children: ReactNode
  defaultValue?: any
  className?: string
  placeholder?: string
  multiline?: boolean
  listType?: "ul" | "ol"
  onSave?: (value: any) => void
  validation?: (value: any) => boolean | string
}

export const EditableContent = <T extends EditableSection>({
  section,
  field,
  type,
  children,
  defaultValue,
  className = "",
  placeholder = "Edit content...",
  multiline = false,
  listType = "ul",
  onSave,
  validation,
}: EditableContentProps<T>) => {
  const { isAdmin, isEditMode, editableContent, updateContent } = useAdmin()
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState<any>(defaultValue)
  const [error, setError] = useState<string | null>(null)
  
  // Get nested value using field path
  const getNestedValue = <T extends object>(obj: T, path: string): any => {
    return path.split('.').reduce((acc: any, part) => acc?.[part], obj)
  }

  // Set nested value using field path
  const setNestedValue = <T extends object>(obj: T, path: string, value: any): T => {
    const parts = path.split('.')
    const lastPart = parts.pop()!
    const target = parts.reduce((acc: any, part) => {
      if (!(part in acc)) acc[part] = {}
      return acc[part]
    }, obj as any)
    target[lastPart] = value
    return obj
  }
  
  // Initialize content from context or use children as fallback
  useEffect(() => {
    const content = editableContent[section] as DeepPartial<SectionContent[T]>
    if (content) {
      const value = getNestedValue(content, field)
      if (value !== undefined) {
        setEditValue(value)
      } else if (defaultValue !== undefined) {
        setEditValue(defaultValue)
      }
    }
  }, [section, field, editableContent, defaultValue])
  
  const handleEdit = () => {
    // Double-check admin status before allowing editing
    const user = localStorage.getItem("user")
    if (!user) return
    
    try {
      const userData = JSON.parse(user)
      if (userData.email !== "elishaejimofor@gmail.com" || userData.isAdmin !== true) {
        toast.error("Only administrators can edit content")
        return
      }
    } catch (e) {
      return
    }
    
    if (!isAdmin || !isEditMode) {
      toast.error("You must be in edit mode to modify content")
      return
    }
    setIsEditing(true)
  }
  
  const handleSave = () => {
    // Validate content if validation function is provided
    if (validation) {
      const validationResult = validation(editValue)
      if (typeof validationResult === "string") {
        setError(validationResult)
        return
      } else if (!validationResult) {
        setError("Invalid content")
        return
      }
    }
    
    // Double-check admin status before saving
    const user = localStorage.getItem("user")
    if (!user) return
    
    try {
      const userData = JSON.parse(user)
      if (userData.email !== "elishaejimofor@gmail.com" || userData.isAdmin !== true) {
        toast.error("Only administrators can save content")
        return
      }
    } catch (e) {
      return
    }
    
    if (!isAdmin || !isEditMode) {
      toast.error("You must be in edit mode to save content")
      return
    }

    // Create an object with the nested structure
    const currentContent = editableContent[section] as DeepPartial<SectionContent[T]> || {}
    const updatedContent = setNestedValue(
      { ...currentContent },
      field,
      editValue
    )
    
    // Update the content in context
    updateContent(section, updatedContent)
    
    // Call onSave callback if provided
    if (onSave) {
      onSave(editValue)
    }
    
    setIsEditing(false)
    setError(null)
    toast.success("Content updated successfully")
  }
  
  const handleCancel = () => {
    const content = editableContent[section] as DeepPartial<SectionContent[T]>
    if (content) {
      const value = getNestedValue(content, field)
      setEditValue(value !== undefined ? value : defaultValue)
    }
    setIsEditing(false)
    setError(null)
  }
  
  // If not in edit mode or not admin, just render children or saved content
  if (!isAdmin || !isEditMode) {
    const content = editableContent[section] as DeepPartial<SectionContent[T]>
    const value = content ? getNestedValue(content, field) : null
    
    if (value !== null) {
      switch (type) {
        case "text":
          return <span className={className}>{value}</span>
        case "richtext":
          return <div className={className} dangerouslySetInnerHTML={{ __html: value as string }} />
        case "image":
          return <img src={value as string} alt="Content" className={className} />
        case "list":
          return listType === "ul" ? (
            <ul className={className}>
              {(value as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <ol className={className}>
              {(value as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          )
        case "link":
          const [text, url] = (value as string).split("|")
          return <a href={url} className={className}>{text}</a>
        case "number":
          return <span className={className}>{value}</span>
        case "object":
        case "array":
          return <div className={className}>{JSON.stringify(value, null, 2)}</div>
        default:
          return children
      }
    }
    return <>{children}</>
  }
  
  // In edit mode but not currently editing this element
  if (!isEditing) {
    return (
      <div 
        className={`group relative ${className} ${isEditMode ? "cursor-pointer hover:outline hover:outline-2 hover:outline-primary/50 hover:outline-dashed" : ""}`}
        onClick={handleEdit}
      >
        {/* Render current content */}
        {editableContent[section] && getNestedValue(editableContent[section] as DeepPartial<SectionContent[T]>, field) !== undefined ? (
          <div className="relative">
            {renderContent(getNestedValue(editableContent[section] as DeepPartial<SectionContent[T]>, field), type, listType)}
            {isEditMode && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-primary/10 p-1 rounded">
                <Pencil className="h-4 w-4 text-primary" />
              </div>
            )}
          </div>
        ) : (
          <div className="relative">
            {children}
            {isEditMode && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-primary/10 p-1 rounded">
                <Pencil className="h-4 w-4 text-primary" />
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
  
  // Currently editing this element
  return (
    <Dialog open={isEditing} onOpenChange={setIsEditing}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Content</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {renderEditField(type, editValue, setEditValue, placeholder, multiline, listType)}
          
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Helper function to render content based on type
function renderContent(value: any, type: ContentType, listType: "ul" | "ol") {
  switch (type) {
    case "text":
      return <span>{value}</span>
    case "richtext":
      return <div dangerouslySetInnerHTML={{ __html: value as string }} />
    case "image":
      return <img src={value as string} alt="Content" />
    case "list":
      return listType === "ul" ? (
        <ul>
          {(value as string[]).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      ) : (
        <ol>
          {(value as string[]).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      )
    case "link":
      const [text, url] = (value as string).split("|")
      return <a href={url}>{text}</a>
    case "number":
      return <span>{value}</span>
    case "object":
    case "array":
      return <pre>{JSON.stringify(value, null, 2)}</pre>
    default:
      return value
  }
}

// Helper function to render edit field based on type
function renderEditField(
  type: ContentType,
  value: any,
  setValue: (value: any) => void,
  placeholder: string,
  multiline: boolean,
  listType: "ul" | "ol"
) {
  switch (type) {
    case "text":
      return multiline ? (
        <Textarea
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          rows={5}
          autoFocus
        />
      ) : (
        <Input
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          autoFocus
        />
      )
    
    case "richtext":
      return (
        <Textarea
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          rows={10}
          autoFocus
        />
      )
    
    case "image":
      return (
        <Input
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Image URL"
          autoFocus
        />
      )
    
    case "list":
      return (
        <div className="space-y-2">
          {Array.isArray(value) && value.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={item}
                onChange={(e) => {
                  const newList = [...value]
                  newList[index] = e.target.value
                  setValue(newList)
                }}
                placeholder={`Item ${index + 1}`}
              />
              <Button
                {...{
                  variant: "outline",
                  size: "icon",
                  onClick: () => {
                    const newList = [...value]
                    newList.splice(index, 1)
                  },
                } as any}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            {...{
              variant: "outline",
              onClick: () => setValue([...value, ""]),
            } as any}
          >
            Add Item
          </Button>
        </div>
      )
    
    case "link":
      return (
        <div className="space-y-2">
          <Input
            value={(value as string).split("|")[0] || ""}
            onChange={(e) => {
              const [_, url] = (value as string).split("|")
              setValue(`${e.target.value}|${url || ""}`)
            }}
            placeholder="Link Text"
            autoFocus
          />
          <Input
            value={(value as string).split("|")[1] || ""}
            onChange={(e) => {
              const [text] = (value as string).split("|")
              setValue(`${text || ""}|${e.target.value}`)
            }}
            placeholder="URL"
          />
        </div>
      )
    
    case "number":
      return (
        <Input
          type="number"
          value={value as number}
          onChange={(e) => setValue(Number(e.target.value))}
          placeholder={placeholder}
          autoFocus
        />
      )
    
    case "object":
    case "array":
      return (
        <Textarea
          value={JSON.stringify(value, null, 2)}
          onChange={(e) => {
            try {
              setValue(JSON.parse(e.target.value))
            } catch (error) {
              // Allow invalid JSON while typing
              setValue(e.target.value)
            }
          }}
          placeholder={placeholder}
          rows={10}
          autoFocus
        />
      )
    
    default:
      return null
  }
} 