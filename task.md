# Cochin Snacks Navbar & Hero Layout Tasks

- [x] Modify `components/Header.tsx` for layout refinement
  - [x] Import `ChevronDown` and `Phone` icons from `lucide-react`
  - [x] Fetch `tagline` for categories inside the dynamic Sanity CMS query
  - [x] Align `ChevronDown` next to the "Products" link, styled as an inline element
  - [x] Style the "Products" link as a beige pill background (`bg-[#F2E6DF]`) with warm brown/rust text (`text-[#A65B32]`) when the dropdown is open
  - [x] Move the category dropdown code inside the Products list item container so it anchors relative to it
  - [x] Add a top pointing triangle centered under the Products link
  - [x] Render categories horizontally in a single flex row inside the dropdown card
  - [x] Remove tagline sub-text from categories dropdown list (showing only titles)
  - [x] Omit images and product counts from the dropdown
  - [x] Style the phone number display on the right of the navbar as a warm brown/rust pill button (`bg-[#A65B32]`) with a phone icon
- [x] Modify `app/HomeClient.tsx` for Hero section refinements
  - [x] Change height from `min-h-screen` to `min-h-[85vh]`
  - [x] Reduce padding-top and padding-bottom of Section 1 container
  - [x] Reduce bottom margins of H1 headline and body paragraph inside Hero content
  - [x] Reduce top margin of Trust Indicators block
  - [x] Reduce image container height from `h-[400px]/[550px]` to `h-[350px]/[480px]`
- [x] Verify layout updates on the local server
