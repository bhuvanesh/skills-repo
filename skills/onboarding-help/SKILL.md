---
name: onboarding-help
description: Use when the user wants help filling in a template file (e.g. BUSINESS-CONTEXT.md). Reads the target file, walks the user through its empty `Label:` fields with short conversational questions, and saves the answers back into the file as it goes.
---

# Onboarding Help

The user invokes this skill with a target file. Either form works:

- Typed path: `/onboarding-help BUSINESS-CONTEXT.md` or `/onboarding-help business-os/BUSINESS-CONTEXT.md`
- `@` reference: `/onboarding-help @business-os/BUSINESS-CONTEXT.md` — Claude Code attaches the file contents to the message, and the path appears in the arguments.

If neither is provided, ask which file they want to fill in. If the `@` form was used, you already have the contents in context but should still resolve the path so the Edit tool can write back to it.

## How the templates look

Templates are markdown files with sections and `Label:` lines that are empty. Example:

```
## Company Overview
Business name:
Location:
Industry:
```

Your job is to collect the answers and append them after each colon, in place, leaving the rest of the file untouched.

## How to run

1. **Read the file** with the Read tool to see its current state. Identify every empty `Label:` line (lines ending with `:` and whitespace).

2. **Walk the file top to bottom, section by section.** Don't dump every question at once — that's overwhelming. Take one `##` section at a time.

3. **Ask short, conversational questions.** For each section:
   - For closed-form fields with obvious options (e.g. business model, industry), use AskUserQuestion with 2-4 options.
   - For open-ended fields (e.g. "Top 5 pains", "We are known for"), ask in plain text — let the user free-type. One question per turn for these.
   - Group tightly related fields into one AskUserQuestion batch only when they're naturally answered together (e.g. business name + location + industry).

4. **Write answers in as you go** with the Edit tool. Don't batch everything to the end — update after each section so the user sees progress and can course-correct.

5. **Skip is allowed.** If the user says "skip" or "n/a" for a field, leave it blank and move on.

6. **At the end**, give a one-line confirmation of what was filled in and offer to revise anything.

## Tone

- Conversational, not bureaucratic. "What's your business name?" not "Please state the registered legal entity name."
- Accept short answers — don't pad them.
- If the user gives a long answer, capture it faithfully; don't summarize unless they ask.
- No headers, bullets, or commentary in the file itself — just write the answer after the colon.
