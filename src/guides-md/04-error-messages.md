---
slug: error-messages
title: "How to Write Error Messages Users Understand | Sebs UX Studio"
meta_description: "Funny error messages fail people at their worst moment. Use one formula: what happened, plus what to do now. Examples you can copy."
h1: "How to write error messages: what happened + what to do now"
primary_keyword: "how to write error messages ux"
hero_image: /images/guides/error-messages.png
hero_alt: "A funny error message next to a clear one that says what happened and offers a next step."
published: 2026-11-17
related: [accountability-check, drop-off-method]
sources:
  - "Google Technical Writing, Error messages: set the right tone: https://developers.google.com/tech-writing/error-messages/set-tone"
  - "Nielsen Norman Group, Error-Message Guidelines: https://www.nngroup.com/articles/error-message-guidelines/"
---

It's 11pm. Someone has spent 20 minutes on a form. They press Save and see:

> "Oops! Our hamsters fell off the wheel."

Is their work gone? They don't know. That's the problem.

## Why jokes fail in errors

When something breaks, people are already annoyed. A joke doesn't help them fix it. Google's technical writing guide advises against humorous error messages, and Nielsen Norman Group notes that jokes go stale fast when people see the same error again and again.

Save the personality for your 404 page or an empty state.

## The formula

Every error message needs two things:

**What happened + what to do now.**

| Instead of | Write |
|---|---|
| Something went wrong. | We couldn't save your changes. Your connection dropped. Your work is still here. Try saving again. |
| Invalid input. | Enter a date in this format: DD/MM/YYYY. |
| Upload failed. | This file is over 10 MB. Upload a smaller file, or a photo instead of a scan. |
| Verification failed. | We couldn't read your ID. Try again in brighter light, with all four corners showing. |

## Four rules

1. **Say what happened in plain words.** No codes on their own, no "invalid".
2. **Give one next step.** A button that does it is better than a sentence that explains it.
3. **Keep what they entered.** Never clear a form because one field was wrong.
4. **Never blame the user.** "We couldn't read your ID", not "You uploaded a bad photo".

## Where errors cost the most

In sign-up and ID checks, an unclear error is often the moment people leave. They try once more, see the same message, and close the tab. You only see it as a drop in your funnel.

If your developers write the error messages, give them the formula. It fits in one line of your design system.

Want me to review the error messages in your sign-up? [Book an audit](/start/).
