# Auth Guard — Integration Instructions

## Files delivered
| File | What it does |
|------|-------------|
| `auth-guard.js` | Bounces unauthenticated users to login, saves intended URL |
| `login.js` | Updated — redirects back to saved URL after login + adds `logout()` helper |

---

## Step 1 — Add `auth-guard.js` to PROTECTED pages only

Paste this as the **very first `<script>` tag** inside `<head>` (before any other JS):

```html
<script src="auth-guard.js"></script>
```

Add it to these pages:
- `preference.html`
- `roadmap.html`
- `codewithus.html`
- `project.html`
- `dashboard.html`

**Do NOT add it to:** `home.html`, `home2.html`, `contact.html`, `login.html`, `signup.html`

---

## Step 2 — Replace your old `login.js`

Swap the old file with the new `login.js` provided.  
No changes needed to the HTML of `login.html`.

---

## Step 3 — Optional: Add a Logout button

On any page (e.g. dashboard/navbar), add:

```html
<button onclick="logout()">Log out</button>
```

`logout()` is defined globally in the new `login.js`.  
Make sure `login.js` (or a copy of just that function) is loaded on pages that show the button.

---

## How the flow works

```
User clicks "Roadmaps" in navbar
        ↓
preference.html loads auth-guard.js
        ↓
Not logged in? → save current URL to sessionStorage → redirect to login.html
        ↓
User fills login form → user saved to localStorage
        ↓
login.js reads sessionStorage → redirects to preference.html  ✅
```

If the user goes directly to `login.html` (no saved URL), they land on `dashboard.html` after login.
