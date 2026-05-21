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

3. **Choose the right question style per Label.** Three modes:

   - **Closed-form (multi-choice)** — fields with a small obvious option set (business model, industry, buying role). Use AskUserQuestion with 2-4 options.
   - **Open-ended with directional starters** — reflection fields where a tired user might freeze at a blank line: "Hidden pains", "Why customers pay", "Things to stop doing", "Common claims competitors make", "Words we should avoid", "Growth opportunities". Before asking, offer 3-5 short directional examples drawn from common patterns in business / marketing / sales / operations, framed clearly as thought starters not recommendations: *"Common angles here are X, Y, Z — which of these resonate, or what's yours?"* The user can pick one, riff off it, or ignore the suggestions entirely. Keep starters short (under ~10 words each) and generic to the domain — never invent claims about this specific business.
   - **Open-ended plain** — fields that need the user's own facts, personal context, or specific lived experience that Claude can't usefully prompt for (business name, location, founder story, real customer quotes, the owner's actual emotional goals). Ask plainly, no scaffolding.

   The scaffolding test: *would a tired thoughtful business owner freeze at this Label?* Scaffold when the field asks for patterns the broader business world has answers to. Don't scaffold when the answer is pure data, deeply personal, or obvious from what the user just answered nearby.

   **Calibrate scaffolding once, then commit.** After the very first time you offer directional starters in a session, check in lightly: *"Were those examples useful, or would you rather I just ask the questions plain?"* If the user says skip / not helpful / wastes time, drop scaffolding entirely for the rest of the session and only ask open-ended questions plainly. If they engaged with the starters or said yes, keep scaffolding throughout. Only ask this calibration question once — don't keep checking in.

   Group related fields into one AskUserQuestion batch only when they're naturally answered together (e.g. business name + location + industry).

4. **Write answers in as you go** with the Edit tool. Don't batch everything to the end — update after each section so the user sees progress and can course-correct.

5. **Skip is allowed.** If the user says "skip" or "n/a" for a field, leave it blank and move on.

6. **At the end**, give a one-line confirmation of what was filled in and offer to revise anything.

## Tone

- Conversational, not bureaucratic. "What's your business name?" not "Please state the registered legal entity name."
- Accept short answers — don't pad them.
- If the user gives a long answer, capture it faithfully; don't summarize unless they ask.
- No headers, bullets, or commentary in the file itself — just write the answer after the colon.
