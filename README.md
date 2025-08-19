# Mini Sales Console

## Overview
A lightweight sales console built with **React + Vite + Tailwind CSS** to manage leads and convert them into opportunities.  
This project uses a local JSON file (`/public/leads.json`) and simulates latency with `setTimeout`.

## Features (MVP)
1. **Lead List**
   - Load from a local JSON file.
   - Fields: `id`, `name`, `company`, `email`, `source`, `score`, `status`.
   - Features: search (name/company), filter (status), sort (score).

2. **Lead Detail Panel**
   - Click on a row to open a sliding detail panel.
   - Inline edit for status and email (with email format validation).
   - Save/Cancel actions with basic error handling.

3. **Convert to Opportunity**
   - Button: "Convert Lead".
   - Create an opportunity with: `id`, `name`, `stage`, `value` (optional), `accountName`.
   - Display opportunities in a simple table.

4. **UX / States**
   - Loading, empty, and error states.
   - Handles around 100 leads without issues.

## Extra Features
- Persistent filters/sorting in `localStorage`.
- Optimistic updates with rollback on simulated failure.
- Responsive layout (desktop → mobile).

## Tech Stack
- **React (Vite)**
- **Tailwind CSS**

## Project Structure
