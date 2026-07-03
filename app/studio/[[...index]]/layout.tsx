/**
 * Studio layout — bypasses the root layout so the Studio
 * renders full-screen without the site's header / footer / LazyMotion.
 */
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
