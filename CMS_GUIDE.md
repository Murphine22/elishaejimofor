# 🎨 Frontend CMS Guide - Complete Content Management System

## 🎯 Overview

Your website now has a **complete Content Management System (CMS)** that allows you to edit, remove, or add features, content, and images across all pages directly from the frontend when signed in as administrator.

---

## 🚀 Quick Start

### Step 1: Login as Admin

1. **Look for the purple shield icon** in the bottom-left corner
2. **Click it** to open the login modal
3. **Enter credentials:**
   - Email: `elishaejimofor@gmail.com`
   - Password: `admin123`
4. **Click "Sign In"**

### Step 2: Enable Edit Mode

1. After login, you'll see the **Admin Toolbar** at the top
2. Click **"Enable Edit Mode"** button
3. All editable elements will now show edit controls

### Step 3: Edit Content

- **Hover over text** → Click the blue edit icon
- **Hover over images** → Click the upload icon
- **Hover over sections** → See section controls

### Step 4: Save Changes

1. Click **"Save All"** in the admin toolbar
2. Your changes are saved to localStorage
3. Changes persist across page reloads

---

## 📦 Components Created

### 1. **EditableText** (`components/cms/editable-text.tsx`)

**Purpose:** Edit any text content on your website

**Features:**
- ✅ Single-line or multi-line text
- ✅ Inline editing with save/cancel
- ✅ Supports h1, h2, h3, h4, p, span tags
- ✅ Real-time preview
- ✅ Hover to edit indicator

**Usage:**
```tsx
import { EditableText } from "@/components/cms/editable-text"

<EditableText
  section="home"
  field="title"
  defaultValue="Hi, I'm Elisha Ejimofor"
  as="h1"
  className="text-4xl font-bold"
/>

<EditableText
  section="about"
  field="description"
  defaultValue="I am a web developer..."
  as="p"
  multiline
  className="text-lg"
/>
```

**Props:**
- `section` - Section identifier (e.g., "home", "about")
- `field` - Field name (e.g., "title", "description")
- `defaultValue` - Default text content
- `as` - HTML tag (h1, h2, h3, h4, p, span)
- `className` - CSS classes
- `multiline` - Enable textarea for long text
- `placeholder` - Placeholder text

---

### 2. **EditableImage** (`components/cms/editable-image.tsx`)

**Purpose:** Change images anywhere on your website

**Features:**
- ✅ Upload from computer (converts to base64)
- ✅ Use image URL from internet
- ✅ Hover to edit indicator
- ✅ Preview before saving
- ✅ Supports Next.js Image optimization

**Usage:**
```tsx
import { EditableImage } from "@/components/cms/editable-image"

<EditableImage
  section="home"
  field="heroImage"
  defaultSrc="https://i.imgur.com/QwVIarl.jpeg"
  alt="Elisha Ejimofor"
  width={400}
  height={300}
  className="rounded-lg"
  priority
/>
```

**Props:**
- `section` - Section identifier
- `field` - Field name
- `defaultSrc` - Default image URL
- `alt` - Alt text for accessibility
- `width` - Image width
- `height` - Image height
- `className` - CSS classes
- `priority` - Load image with priority

**Image Upload Methods:**
1. **URL Method:** Paste image URL from internet
2. **File Upload:** Upload from your computer (saved as base64)

---

### 3. **EditableSection** (`components/cms/editable-section.tsx`)

**Purpose:** Control entire sections (show/hide/remove)

**Features:**
- ✅ Toggle visibility (show/hide)
- ✅ Remove section completely
- ✅ Visual indicators in edit mode
- ✅ Drag handle for future reordering
- ✅ Section title display

**Usage:**
```tsx
import { EditableSection } from "@/components/cms/editable-section"

<EditableSection
  section="testimonials"
  title="Client Testimonials"
  toggleable
  removable
  className="mt-8"
>
  <ClientReviews />
</EditableSection>
```

**Props:**
- `section` - Section identifier
- `title` - Display name in admin mode
- `toggleable` - Allow show/hide toggle
- `removable` - Allow section removal
- `className` - CSS classes
- `children` - Section content

---

### 4. **FeatureToggle** (`components/cms/feature-toggle.tsx`)

**Purpose:** Enable/disable features dynamically

**Features:**
- ✅ Toggle features on/off
- ✅ Visual ON/OFF indicator
- ✅ Optional fallback content
- ✅ Persistent state

**Usage:**
```tsx
import { FeatureToggle } from "@/components/cms/feature-toggle"

<FeatureToggle
  featureId="chatbot"
  defaultEnabled={true}
  fallback={<div>Chatbot is currently disabled</div>}
>
  <Chatbot />
</FeatureToggle>

<FeatureToggle
  featureId="newsletter"
  defaultEnabled={false}
>
  <NewsletterSignup />
</FeatureToggle>
```

**Props:**
- `featureId` - Unique feature identifier
- `defaultEnabled` - Default state (true/false)
- `fallback` - Content to show when disabled
- `children` - Feature content

---

### 5. **AdminToolbar** (`components/cms/admin-toolbar.tsx`)

**Purpose:** Main control panel for admin

**Features:**
- ✅ Enable/disable edit mode
- ✅ Save all changes
- ✅ Reset unsaved changes
- ✅ Export content as JSON backup
- ✅ Import content from backup
- ✅ Logout button
- ✅ Live stats display

**Usage:**
```tsx
import { AdminToolbar } from "@/components/cms/admin-toolbar"

// Add to your layout or main page
<AdminToolbar />
```

**Toolbar Actions:**
- **Enable Edit Mode** - Activate editing for all components
- **Save All** - Persist all changes to localStorage
- **Reset** - Discard unsaved changes
- **Backup** - Export/import content
- **Logout** - Exit admin mode

---

### 6. **AdminLogin** (`components/cms/admin-login.tsx`)

**Purpose:** Secure admin authentication

**Features:**
- ✅ Beautiful login modal
- ✅ Email & password fields
- ✅ Show/hide password toggle
- ✅ Loading state
- ✅ Floating shield button
- ✅ Default credentials display

**Usage:**
```tsx
import { AdminLogin } from "@/components/cms/admin-login"

// Add to your layout or main page
<AdminLogin />
```

**Default Credentials:**
- Email: `elishaejimofor@gmail.com`
- Password: `admin123`

**To Change Credentials:**
Edit `components/admin-context.tsx` line 73:
```tsx
if (email === "your-email@example.com" && password === "your-password") {
```

---

## 🛠️ Implementation Guide

### Step 1: Add to Your Layout

Update `app/page.tsx` or `app/layout.tsx`:

```tsx
import { AdminToolbar } from "@/components/cms/admin-toolbar"
import { AdminLogin } from "@/components/cms/admin-login"

export default function Layout({ children }) {
  return (
    <>
      <AdminToolbar />
      <AdminLogin />
      {children}
    </>
  )
}
```

### Step 2: Make Content Editable

Replace static content with editable components:

**Before:**
```tsx
<h1 className="text-4xl font-bold">
  Hi, I'm Elisha Ejimofor
</h1>
```

**After:**
```tsx
<EditableText
  section="home"
  field="title"
  defaultValue="Hi, I'm Elisha Ejimofor"
  as="h1"
  className="text-4xl font-bold"
/>
```

### Step 3: Make Images Editable

**Before:**
```tsx
<Image
  src="https://i.imgur.com/QwVIarl.jpeg"
  alt="Profile"
  width={400}
  height={300}
/>
```

**After:**
```tsx
<EditableImage
  section="home"
  field="profileImage"
  defaultSrc="https://i.imgur.com/QwVIarl.jpeg"
  alt="Profile"
  width={400}
  height={300}
/>
```

### Step 4: Add Section Controls

**Wrap sections:**
```tsx
<EditableSection
  section="services"
  title="Services Section"
  toggleable
  removable
>
  <Services />
</EditableSection>
```

### Step 5: Add Feature Toggles

**Wrap optional features:**
```tsx
<FeatureToggle featureId="chatbot" defaultEnabled={true}>
  <Chatbot />
</FeatureToggle>
```

---

## 📝 Complete Example

Here's a complete example showing all CMS components in action:

```tsx
"use client"

import { EditableText } from "@/components/cms/editable-text"
import { EditableImage } from "@/components/cms/editable-image"
import { EditableSection } from "@/components/cms/editable-section"
import { FeatureToggle } from "@/components/cms/feature-toggle"
import { AdminToolbar } from "@/components/cms/admin-toolbar"
import { AdminLogin } from "@/components/cms/admin-login"

export default function HomePage() {
  return (
    <>
      <AdminToolbar />
      <AdminLogin />

      <div className="container mx-auto px-4 py-8">
        {/* Editable Hero Section */}
        <EditableSection
          section="hero"
          title="Hero Section"
          toggleable
        >
          <div className="flex items-center gap-8">
            <div className="flex-1">
              <EditableText
                section="hero"
                field="title"
                defaultValue="Hi, I'm Elisha Ejimofor"
                as="h1"
                className="text-5xl font-bold mb-4"
              />
              
              <EditableText
                section="hero"
                field="subtitle"
                defaultValue="Web Developer & Designer"
                as="h2"
                className="text-2xl text-muted-foreground mb-6"
              />
              
              <EditableText
                section="hero"
                field="description"
                defaultValue="I create beautiful, functional websites..."
                as="p"
                multiline
                className="text-lg"
              />
            </div>

            <div className="flex-1">
              <EditableImage
                section="hero"
                field="image"
                defaultSrc="https://i.imgur.com/QwVIarl.jpeg"
                alt="Elisha Ejimofor"
                width={500}
                height={500}
                className="rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </EditableSection>

        {/* Optional Features */}
        <FeatureToggle featureId="testimonials" defaultEnabled={true}>
          <EditableSection
            section="testimonials"
            title="Testimonials"
            toggleable
            removable
            className="mt-16"
          >
            <EditableText
              section="testimonials"
              field="heading"
              defaultValue="What Clients Say"
              as="h2"
              className="text-3xl font-bold mb-8"
            />
            {/* Testimonials content */}
          </EditableSection>
        </FeatureToggle>

        <FeatureToggle featureId="chatbot" defaultEnabled={true}>
          <Chatbot />
        </FeatureToggle>
      </div>
    </>
  )
}
```

---

## 💾 Data Persistence

### How It Works

1. **localStorage** - All content saved in browser
2. **JSON Format** - Easy to export/import
3. **Section-based** - Organized by page sections
4. **Automatic** - Loads on page refresh

### Data Structure

```json
{
  "home": {
    "title": "Hi, I'm Elisha Ejimofor",
    "subtitle": "Web Developer",
    "heroImage": "https://..."
  },
  "about": {
    "description": "I am a passionate...",
    "visible": true
  },
  "features": {
    "chatbot": true,
    "newsletter": false
  }
}
```

### Export/Import

**Export:**
1. Enable edit mode
2. Click "Backup" button
3. Click "Export Content"
4. JSON file downloads automatically

**Import:**
1. Enable edit mode
2. Click "Backup" button
3. Click "Import Content"
4. Select your JSON file
5. Page refreshes with imported content

---

## 🎨 Customization

### Change Admin Credentials

Edit `components/admin-context.tsx`:

```tsx
const loginAsAdmin = (email: string, password: string) => {
  if (email === "your-email@example.com" && password === "your-secure-password") {
    setIsAdmin(true)
    return true
  }
  return false
}
```

### Add More Editable Fields

```tsx
<EditableText
  section="contact"
  field="email"
  defaultValue="elisha@example.com"
  as="span"
  className="text-blue-600"
/>
```

### Create Custom Sections

```tsx
<EditableSection
  section="custom-section"
  title="My Custom Section"
  toggleable
  removable
>
  {/* Your custom content */}
</EditableSection>
```

---

## 🔒 Security Notes

### Current Setup
- ✅ Client-side authentication
- ✅ localStorage persistence
- ✅ No server required

### For Production
Consider adding:
- 🔐 Server-side authentication
- 🗄️ Database storage
- 🔑 JWT tokens
- 🛡️ Role-based access control

---

## 🚀 Advanced Features

### Batch Operations

```tsx
// Update multiple fields at once
updateContent("home", {
  title: "New Title",
  subtitle: "New Subtitle",
  description: "New Description"
})
```

### Conditional Rendering

```tsx
{editableContent.features?.newsletter && (
  <NewsletterSection />
)}
```

### Dynamic Sections

```tsx
{editableContent.sections?.map((section) => (
  <EditableSection key={section.id} {...section}>
    {section.content}
  </EditableSection>
))}
```

---

## 📊 Admin Dashboard (Future Enhancement)

You can extend the CMS with:

- 📈 Analytics dashboard
- 📝 Content history/versioning
- 👥 Multi-user support
- 🔍 Search functionality
- 📱 Mobile admin app
- 🎨 Visual page builder
- 🖼️ Media library
- 📅 Scheduled publishing

---

## ✅ Checklist

### Setup
- [ ] Add AdminToolbar to layout
- [ ] Add AdminLogin to layout
- [ ] Test login functionality
- [ ] Enable edit mode

### Content
- [ ] Replace static text with EditableText
- [ ] Replace images with EditableImage
- [ ] Wrap sections with EditableSection
- [ ] Add FeatureToggles for optional features

### Testing
- [ ] Test text editing
- [ ] Test image upload (file)
- [ ] Test image upload (URL)
- [ ] Test section visibility toggle
- [ ] Test section removal
- [ ] Test feature toggles
- [ ] Test save/reset functionality
- [ ] Test export/import

### Production
- [ ] Change default admin credentials
- [ ] Test on all pages
- [ ] Create content backup
- [ ] Document custom sections

---

## 🎉 Summary

You now have a **complete CMS** with:

- ✅ **6 powerful components** for content management
- ✅ **Edit any text** on your website
- ✅ **Change any image** (upload or URL)
- ✅ **Show/hide sections** dynamically
- ✅ **Toggle features** on/off
- ✅ **Admin toolbar** with full controls
- ✅ **Secure login** system
- ✅ **Export/import** functionality
- ✅ **Persistent storage** (localStorage)
- ✅ **Real-time preview** of changes

**Start editing your website content now!** 🚀

---

*Last Updated: October 20, 2025*
*CMS Version: 1.0*
