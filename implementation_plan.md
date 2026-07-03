# Implementation Plan - Navbar Dropdown Refinement

This plan details the updates to the navigation bar layout and dropdown styling to match the user's design reference:
1. Re-add the chevron icon next to the "Products" nav item, inside a beige pill button when open.
2. Render the category dropdown directly relative to the "Products" link.
3. Show categories horizontally without counts, using a clean text layout featuring uppercase category titles and lowercase/uppercase taglines.
4. Omit any category images/icons inside the dropdown, focusing entirely on clean typography.
5. Redesign the phone number display into a styled warm brown pill button on the right.

## Proposed Changes

### Navigation Bar Component

#### [MODIFY] [Header.tsx](file:///d:/CochinSnacks/cochin-snacks/components/Header.tsx)
- Import `ChevronDown` and `Phone` from `lucide-react`.
- Fetch `tagline` in the Sanity categories query inside `useEffect` fetch.
- Update the navigation links loop:
  - For the `isDropdownTrigger` ("Products" link), wrap it in a container that handles mouse interactions.
  - When the dropdown is open, style the link with a beige/light-rust background pill (`bg-[#F2E6DF]`) and warm rust text (`text-[#A65B32]`).
  - Render the `ChevronDown` arrow right next to the "Products" text inside the link tag.
  - Nest the `<AnimatePresence>` dropdown menu directly inside the relative container of the "Products" item so it anchors exactly underneath it.
- Dropdown Menu Style:
  - Add a pointing triangle at the top centered under the Products button.
  - Layout the categories horizontally in a single row (`flex items-center gap-8`).
  - For each category link, display the title (`uppercase text-sm font-black`) and the fetched sub-tagline below it (`text-[9px] uppercase tracking-widest text-dark/40 font-bold`).
- Phone button layout:
  - Replace the text-based phone display on the right with a styled anchor button: warm rust background (`bg-[#A65B32] hover:bg-[#8F4A24]`), white text, and a phone icon.

## Verification Plan

### Manual Verification
- Verify that the "PRODUCTS" item has the arrow chevron icon next to it.
- Hover on "PRODUCTS" and check that:
  - The menu item turns into a beige pill with rust text.
  - The chevron arrow rotates.
  - A clean dropdown card appears below it with a top-centered pointing pointer.
  - The dropdown categories ("Chips", "Murukku", "Mixture", "Pakkavada", "Snacks") are displayed horizontally.
  - Below each category, its tagline (e.g. "CRUNCHY") is shown in a small, muted uppercase format.
  - No count numbers or images are present.
- Verify that the right side of the navbar shows the phone number in a matching warm rust/brown pill button with a phone icon.
