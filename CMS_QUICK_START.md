# ⚡ CMS Quick Start - Get Editing in 5 Minutes

## 🎯 What You Can Do

✅ **Edit any text** - Titles, descriptions, paragraphs
✅ **Change any image** - Upload or use URLs  
✅ **Show/hide sections** - Toggle visibility
✅ **Remove sections** - Delete unwanted content
✅ **Toggle features** - Enable/disable features
✅ **Export/import** - Backup your content

---

## 🚀 Step 1: Add CMS to Your Page (2 minutes)

### Option A: Add to Main Page

Open `app/page.tsx` and add these imports at the top:

```tsx
import { AdminToolbar } from "@/components/cms/admin-toolbar"
import { AdminLogin } from "@/components/cms/admin-login"
import { EditableText } from "@/components/cms/editable-text"
import { EditableImage } from "@/components/cms/editable-image"
import { EditableSection } from "@/components/cms/editable-section"
import { FeatureToggle } from "@/components/cms/feature-toggle"
```

Add these components to your return statement:

```tsx
return (
  <div className="min-h-screen...">
    {/* Add these two lines at the top */}
    <AdminToolbar />
    <AdminLogin />
    
    {/* Your existing content */}
    <ScrollProgress />
    {/* ... rest of your code */}
  </div>
)
```

---

## 🎨 Step 2: Make Content Editable (3 minutes)

### Example 1: Edit Your Hero Title

**Find this in your code:**
```tsx
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold...">
  <TypeAnimation
    sequence={[
      "Hi, I'm Elisha Ejimofor",
      // ...
    ]}
  />
</h1>
```

**Replace with:**
```tsx
<EditableText
  section="home"
  field="heroTitle"
  defaultValue="Hi, I'm Elisha Ejimofor"
  as="h1"
  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
/>
```

### Example 2: Edit Your Vision Section

**Find this:**
```tsx
<h2 className="text-xl md:text-2xl font-bold mt-3 md:mt-4">My Vision</h2>
<p className="text-base md:text-lg">
  To create innovative digital solutions...
</p>
```

**Replace with:**
```tsx
<EditableText
  section="home"
  field="visionTitle"
  defaultValue="My Vision"
  as="h2"
  className="text-xl md:text-2xl font-bold mt-3 md:mt-4"
/>
<EditableText
  section="home"
  field="visionDescription"
  defaultValue="To create innovative digital solutions that inspire, engage, and transform. I strive to blend cutting-edge technology with creative design to deliver exceptional user experiences and drive business growth."
  as="p"
  multiline
  className="text-base md:text-lg"
/>
```

### Example 3: Make Your Logo Editable

**Find this:**
```tsx
<Image
  src="https://i.imgur.com/QwVIarl.jpeg"
  alt="Elisha Ejimofor Logo"
  width={32}
  height={32}
  className="object-cover"
/>
```

**Replace with:**
```tsx
<EditableImage
  section="header"
  field="logo"
  defaultSrc="https://i.imgur.com/QwVIarl.jpeg"
  alt="Elisha Ejimofor Logo"
  width={32}
  height={32}
  className="object-cover"
  priority
/>
```

### Example 4: Make Sections Toggleable

**Wrap your sections:**
```tsx
<EditableSection
  section="advertisements"
  title="Featured Advertisements"
  toggleable
  removable
  className="mt-8 md:mt-16"
>
  <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
    Featured Advertisements
  </h2>
  <AdvertisementSlider />
</EditableSection>

<EditableSection
  section="reviews"
  title="Client Reviews"
  toggleable
  removable
  className="mt-8 md:mt-16"
>
  <ClientReviews />
</EditableSection>
```

### Example 5: Add Feature Toggles

**Wrap optional features:**
```tsx
<FeatureToggle featureId="chatbot" defaultEnabled={true}>
  <Chatbot />
</FeatureToggle>

<FeatureToggle featureId="whatsapp" defaultEnabled={true}>
  <WhatsAppButton phoneNumber="+2348160589186" />
</FeatureToggle>

<FeatureToggle featureId="settings" defaultEnabled={true}>
  <SettingsButton />
</FeatureToggle>
```

---

## 🎮 Step 3: Start Editing!

### 1. Login
- Look for **purple shield icon** (bottom-left)
- Click it
- Enter:
  - Email: `elishaejimofor@gmail.com`
  - Password: `admin123`
- Click "Sign In"

### 2. Enable Edit Mode
- See **admin toolbar** at top (blue/purple)
- Click **"Enable Edit Mode"**
- All editable elements now show controls

### 3. Edit Content
- **Hover over text** → Click edit icon (blue pencil)
- **Hover over images** → Click upload icon
- **Hover over sections** → See show/hide/remove buttons

### 4. Save Changes
- Click **"Save All"** in toolbar
- Changes saved to localStorage
- Persist across page reloads

---

## 📋 Complete Page Example

Here's a complete example with all CMS features:

```tsx
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AdminToolbar } from "@/components/cms/admin-toolbar"
import { AdminLogin } from "@/components/cms/admin-login"
import { EditableText } from "@/components/cms/editable-text"
import { EditableImage } from "@/components/cms/editable-image"
import { EditableSection } from "@/components/cms/editable-section"
import { FeatureToggle } from "@/components/cms/feature-toggle"
import { ThemeToggle } from "@/components/theme-toggle"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { SettingsButton } from "@/components/settings-button"
import { ScrollProgress } from "@/components/scroll-progress"
import { DigitalClock } from "@/components/digital-clock"
import { MobileMenu } from "@/components/mobile-menu"
import { FaArrowRight } from "react-icons/fa"

export default function Home() {
  const [activePage, setActivePage] = useState("home")

  const handleNavigation = (page: string) => {
    setActivePage(page)
    window.history.pushState(null, "", `#${page}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-background/80 relative overflow-hidden">
      {/* CMS Components */}
      <AdminToolbar />
      <AdminLogin />
      
      <ScrollProgress />

      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigation("home")}>
            <div className="relative w-8 h-8 overflow-hidden rounded-full">
              <EditableImage
                section="header"
                field="logo"
                defaultSrc="https://i.imgur.com/QwVIarl.jpeg"
                alt="Elisha Ejimofor Logo"
                width={32}
                height={32}
                className="object-cover"
                priority
              />
            </div>
            <EditableText
              section="header"
              field="siteName"
              defaultValue="Elisha Ejimofor"
              as="span"
              className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
            />
          </div>

          <Navigation activePage={activePage} setActivePage={handleNavigation} />

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:block">
              <DigitalClock />
            </div>
            <ThemeToggle />
            <button
              onClick={() => handleNavigation("contact")}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              <span className="mr-2">Get in Touch</span>
              <FaArrowRight className="h-4 w-4" />
            </button>
            <MobileMenu onNavigate={handleNavigation} />
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 md:px-8 py-4 md:py-8">
        <EditableSection section="hero" title="Hero Section" toggleable>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            <div className="w-full md:w-1/2">
              <EditableText
                section="home"
                field="heroTitle"
                defaultValue="Hi, I'm Elisha Ejimofor"
                as="h1"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
              />
              
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <EditableText
                  section="home"
                  field="visionTitle"
                  defaultValue="My Vision"
                  as="h2"
                  className="text-xl md:text-2xl font-bold mt-3 md:mt-4"
                />
                <EditableText
                  section="home"
                  field="visionDescription"
                  defaultValue="To create innovative digital solutions that inspire, engage, and transform. I strive to blend cutting-edge technology with creative design to deliver exceptional user experiences and drive business growth."
                  as="p"
                  multiline
                  className="text-base md:text-lg"
                />
                
                <EditableText
                  section="home"
                  field="whatIDoTitle"
                  defaultValue="What I Do"
                  as="h2"
                  className="text-xl md:text-2xl font-bold mt-3 md:mt-4"
                />
                <EditableText
                  section="home"
                  field="whatIDoDescription"
                  defaultValue="I specialize in creating responsive, user-friendly websites and applications using modern front-end technologies. My expertise includes React, Next.js, TypeScript, and UI/UX design principles that ensure your digital presence stands out in today's competitive landscape."
                  as="p"
                  multiline
                  className="text-base md:text-lg"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <EditableImage
                section="home"
                field="heroImage"
                defaultSrc="https://i.imgur.com/QwVIarl.jpeg"
                alt="Elisha Ejimofor"
                width={600}
                height={600}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </EditableSection>

        <EditableSection
          section="advertisements"
          title="Featured Advertisements"
          toggleable
          removable
          className="mt-8 md:mt-16"
        >
          <EditableText
            section="advertisements"
            field="title"
            defaultValue="Featured Advertisements"
            as="h2"
            className="text-xl md:text-2xl font-bold mb-4 md:mb-6"
          />
          {/* Your advertisement slider */}
        </EditableSection>

        <EditableSection
          section="reviews"
          title="Client Reviews"
          toggleable
          removable
          className="mt-8 md:mt-16"
        >
          {/* Your client reviews component */}
        </EditableSection>
      </main>

      <Footer setActivePage={handleNavigation} />
      
      {/* Floating Buttons with Feature Toggles */}
      <div className="fixed right-2 sm:right-4 bottom-16 sm:bottom-24 flex flex-col items-center gap-2 sm:gap-4 z-40">
        <FeatureToggle featureId="whatsapp" defaultEnabled={true}>
          <WhatsAppButton phoneNumber="+2348160589186" />
        </FeatureToggle>
        
        <FeatureToggle featureId="chatbot" defaultEnabled={true}>
          <Chatbot />
        </FeatureToggle>
        
        <FeatureToggle featureId="settings" defaultEnabled={true}>
          <SettingsButton />
        </FeatureToggle>
      </div>
    </div>
  )
}
```

---

## 🎯 Quick Reference

### Edit Text
```tsx
<EditableText
  section="page-name"
  field="field-name"
  defaultValue="Your text"
  as="h1" // or h2, h3, p, span
  className="your-classes"
  multiline // for long text
/>
```

### Edit Image
```tsx
<EditableImage
  section="page-name"
  field="field-name"
  defaultSrc="https://..."
  alt="Description"
  width={400}
  height={300}
  className="your-classes"
/>
```

### Control Section
```tsx
<EditableSection
  section="section-name"
  title="Display Name"
  toggleable // show/hide
  removable // can delete
>
  {/* content */}
</EditableSection>
```

### Toggle Feature
```tsx
<FeatureToggle
  featureId="feature-name"
  defaultEnabled={true}
>
  {/* feature */}
</FeatureToggle>
```

---

## ✅ Checklist

- [ ] Add AdminToolbar to page
- [ ] Add AdminLogin to page
- [ ] Import CMS components
- [ ] Replace 3-5 text elements with EditableText
- [ ] Replace 2-3 images with EditableImage
- [ ] Wrap 2-3 sections with EditableSection
- [ ] Add FeatureToggle to optional features
- [ ] Test login (email: elishaejimofor@gmail.com, password: admin123)
- [ ] Enable edit mode
- [ ] Edit some content
- [ ] Save changes
- [ ] Refresh page to verify persistence

---

## 🎉 You're Done!

Your website now has a **complete CMS**! You can:
- ✅ Edit any text
- ✅ Change any image
- ✅ Show/hide sections
- ✅ Toggle features
- ✅ Export/import content

**Start editing now!** Look for the purple shield icon in the bottom-left corner.

---

For detailed documentation, see `CMS_GUIDE.md`

*Setup Time: 5 minutes*
*Difficulty: Easy*
