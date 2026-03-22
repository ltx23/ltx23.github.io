---
name: ltx-page-generation
description: Generate scalable SEO landing pages for AI model, tool, and capability microsites. Use when Codex needs to add or batch-create new guide, prompt, workflow, use-case, or online/experience pages that should capture search intent, preserve a stable homepage, route users naturally to a primary tool site, and fit an existing static or component-based page system.
---

# Page Generation

## Overview

Generate new subpages for AI-model SEO satellite sites without turning them into thin content farms. Classify keyword intent first, prioritize experience and conversion-adjacent pages, then implement pages that reuse the site's existing structure, internal links, CTA patterns, schema, and navigation model.

## Workflow

1. Inspect the current project structure before proposing or writing anything.
2. Identify reusable layout pieces: navigation, footer, CTA block, FAQ block, schema pattern, card grids, page shell, and any page-template or data-driven page system already present.
3. Classify each requested keyword by intent:
   - Experience / direct try intent
   - Prompt / template / examples intent
   - Workflow / use-case intent
   - Tutorial intent
   - Pure reference intent
   - Low-conversion ecosystem intent such as GitHub, Reddit, Hugging Face, GGUF
4. Prioritize implementation in this order unless the user explicitly overrides it:
   - Experience / direct try pages
   - Prompt, template, and examples pages
   - Workflow and use-case pages
   - General tutorial pages
   - Pure reference pages
   - Low-conversion ecosystem pages
5. Reuse or extract a common page skeleton before creating multiple pages.
6. Add each new page to the site's existing expandable guide grouping. If no grouping exists, create one reusable dropdown or config-based grouping instead of adding more top-level nav links.
7. Keep the homepage body stable. Do not keep adding fixed H2/H3 entry sections for each new batch of pages.
8. Validate title length, page structure, internal links, and navigation impact before finishing.

## Page Selection Rules

Prefer pages that can bridge naturally into a hosted product or tool workflow. Favor keywords that imply the user wants to try, compare, adapt a prompt, reuse a setup, or skip local installation. Avoid leading with terms that attract curiosity but weak downstream conversion unless the user explicitly asks for them.

## Required Page Structure

Every generated page must include:

- SEO title
- Meta description
- Canonical URL when the project uses canonicals
- H1 matching the page intent and slug
- 2 to 4 H2 sections
- Real body copy that answers the query instead of padding around the keyword
- FAQ block
- Internal-link block to relevant sibling pages
- CTA block matched to page intent
- FAQ schema or WebPage schema when appropriate
- Stable visual fit with the existing site

## Title Rules

- Keep every title at 60 characters or fewer.
- Put the core keyword as early as possible.
- Compress aggressively when needed; do not keep extra wording just to sound complete.
- Self-check title length before finishing.
- If multiple metadata fields mirror the title, keep the shortened form consistent in `title`, `og:title`, and `twitter:title`.

## Content Rules

- Write natural English suitable for a real landing page.
- Do not produce generic SEO filler or obvious AI phrasing.
- Answer the actual search intent with concrete framing, examples, comparisons, or workflow advice.
- Keep keyword usage natural. Use exact-match keywords where helpful, but do not force them into every paragraph.
- For prompt or examples pages, include genuinely usable prompts or prompt patterns.
- For workflow or feature pages, explain when the method is useful and how to test it.
- For online or browser pages, emphasize no-install convenience and speed to first result.

## CTA Rules

Match CTA strength to intent:

- Reference or explanatory pages: softer CTAs with a natural handoff
- Prompt/examples/template pages: medium CTAs centered on testing in browser
- Experience or online pages: strongest CTAs, but still phrased as the logical next step

Avoid repeating the same CTA text across every page. Adapt from the page semantics, for example:

- Try This Prompt Online
- Use This Prompt in Browser
- Generate a Similar Video Online
- Test This Workflow Without Local Install
- Start With a Ready-to-Use Template

## Navigation And Homepage Rules

- Do not add each new subpage as a top-level navigation item.
- Keep the main nav short.
- Place new guide, prompt, use-case, template, and workflow pages into one expandable group such as `More Guides`, `Prompt Library`, `Use Cases`, or `More LTX Guides`.
- Prefer one reusable data source or one reusable dropdown block over hardcoding links in many places.
- Do not insert permanent homepage H2/H3 sections for every batch of new pages.
- Keep the homepage body stable across repeated publishing cycles.
- If the project already has a grouping mechanism, extend it instead of inventing another one.

## Implementation Rules

- Reuse existing components, classes, layout shells, and metadata patterns first.
- Extract shared sections when multiple new pages need the same structure.
- Avoid unrelated edits to stable pages.
- When navigation must change, modify the shared source of truth instead of duplicating markup wherever possible.
- Output code that is close to production-ready, not placeholder text.

## Batch Page Checklist

For each requested page:

1. Confirm the slug, title, H1, and canonical all align.
2. Confirm the title is 60 characters or fewer.
3. Confirm there are 2 to 4 H2 sections.
4. Confirm FAQ and schema are present.
5. Confirm internal links point to real, relevant pages.
6. Confirm the CTA feels like the next step for that specific query.
7. Confirm navigation still scales and the homepage body did not bloat.

## Output Expectations

Default to implementation, not just recommendations. If the repository is editable, create or update the page files, shared styles, and shared navigation logic directly. If a full implementation is blocked, return a concrete implementation plan that preserves the same standards.
