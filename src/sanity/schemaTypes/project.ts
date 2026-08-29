import { defineArrayMember, defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "order", title: "Display order", type: "number", validation: (rule) => rule.required().integer().min(1) }),
    defineField({ name: "number", title: "Display number", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "category", title: "Category label", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "filterCategory",
      title: "Filter category",
      type: "string",
      options: { list: ["AI", "Web3", "Platform"], layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "year", title: "Year", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "summary", title: "Short summary", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "meta", title: "Metadata label", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "award", title: "Award badge", type: "string" }),
    defineField({ name: "tags", title: "Technology tags", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "githubUrl", title: "Repository URL", type: "url" }),
    defineField({ name: "liveUrl", title: "Live demo URL", type: "url" }),
    defineField({ name: "image", title: "Case study image", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageAlt", title: "Image alternative text", type: "string" }),
    defineField({
      name: "blocks",
      title: "Case study sections",
      type: "array",
      of: [
        defineArrayMember({
          name: "caseStudyBlock",
          title: "Case study section",
          type: "object",
          fields: [
            defineField({ name: "heading", title: "Heading", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "body", title: "Body", type: "text", rows: 6, validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "heading", subtitle: "body" } },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
