import { defineArrayMember, defineField, defineType } from "sanity";

const requiredText = (name: string, title: string, rows?: number) =>
  defineField({
    name,
    title,
    type: rows ? "text" : "string",
    ...(rows ? { rows } : {}),
    validation: (rule) => rule.required(),
  });

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "content", title: "Content" },
    { name: "contact", title: "Contact" },
    { name: "seo", title: "SEO" },
    { name: "appearance", title: "Appearance" },
  ],
  fields: [
    defineField({ ...requiredText("name", "Name"), group: "hero" }),
    defineField({ ...requiredText("portfolioLabel", "Portfolio label"), group: "hero" }),
    defineField({ ...requiredText("availability", "Availability label"), group: "hero" }),
    defineField({ ...requiredText("heroLead", "Hero lead"), group: "hero" }),
    defineField({ ...requiredText("heroMuted", "Hero supporting copy", 3), group: "hero" }),
    defineField({
      name: "stats",
      title: "Hero statistics",
      type: "array",
      group: "hero",
      of: [
        defineArrayMember({
          type: "object",
          fields: [requiredText("value", "Value"), requiredText("label", "Label")],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    defineField({
      name: "awards",
      title: "Recognition cards",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            requiredText("rank", "Rank"),
            requiredText("event", "Event"),
            requiredText("note", "Note", 3),
            requiredText("year", "Year"),
            requiredText("project", "Project"),
          ],
          preview: { select: { title: "event", subtitle: "rank" } },
        }),
      ],
    }),
    defineField({
      name: "skills",
      title: "Skill groups",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            requiredText("name", "Name"),
            requiredText("code", "Short code"),
            defineField({ name: "items", title: "Skills", type: "array", of: [defineArrayMember({ type: "string" })] }),
          ],
          preview: { select: { title: "name", subtitle: "code" } },
        }),
      ],
    }),
    defineField({
      name: "timeline",
      title: "Timeline",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            requiredText("year", "Year"),
            requiredText("role", "Role"),
            requiredText("organization", "Organisation"),
            requiredText("note", "Note", 3),
          ],
          preview: { select: { title: "role", subtitle: "year" } },
        }),
      ],
    }),
    defineField({ ...requiredText("timelineNote", "Timeline note", 2), group: "content" }),
    defineField({ ...requiredText("aboutTitle", "About heading"), group: "content" }),
    defineField({ ...requiredText("aboutPrimary", "About primary paragraph", 5), group: "content" }),
    defineField({ ...requiredText("aboutSecondary", "About secondary paragraph", 5), group: "content" }),
    defineField({ name: "portrait", title: "Portrait", type: "image", group: "content", options: { hotspot: true } }),
    defineField({ ...requiredText("portraitAlt", "Portrait alternative text"), group: "content" }),
    defineField({ ...requiredText("contactTitle", "Contact heading"), group: "contact" }),
    defineField({ ...requiredText("contactCopy", "Contact copy", 3), group: "contact" }),
    defineField({ name: "contactEmail", title: "Public contact email", type: "email", group: "contact", validation: (rule) => rule.required() }),
    defineField({
      name: "channels",
      title: "Contact channels",
      type: "array",
      group: "contact",
      of: [
        defineArrayMember({
          type: "object",
          fields: [requiredText("label", "Label"), requiredText("value", "Value"), requiredText("href", "URL")],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),
    defineField({ name: "resume", title: "Résumé PDF", type: "file", group: "contact", options: { accept: ".pdf" } }),
    defineField({ ...requiredText("seoTitle", "SEO title"), group: "seo" }),
    defineField({ ...requiredText("seoDescription", "SEO description", 3), group: "seo" }),
    defineField({ name: "backgroundColor", title: "Background", type: "string", group: "appearance", initialValue: "#212123" }),
    defineField({ name: "inkColor", title: "Text colour", type: "string", group: "appearance", initialValue: "#FFFFFF" }),
    defineField({ name: "accentColor", title: "Accent colour", type: "string", group: "appearance", initialValue: "#A9C4E0" }),
    defineField({ name: "showPlanets", title: "Show planets", type: "boolean", group: "appearance", initialValue: true }),
    defineField({ name: "orbitSpeed", title: "Orbit speed", type: "number", group: "appearance", initialValue: 1, validation: (rule) => rule.min(0.25).max(3) }),
    defineField({ name: "starDensity", title: "Star density", type: "number", group: "appearance", initialValue: 320, validation: (rule) => rule.integer().min(0).max(900) }),
  ],
  preview: {
    prepare: () => ({ title: "Portfolio content and settings" }),
  },
});
