/**
 * app/studio/[[...index]]/page.tsx
 *
 * The embedded Sanity Studio requires React 19 (sanity@5 / @portabletext/editor).
 * This project uses React 18 + Next.js 14, so the studio runs STANDALONE instead:
 *
 *   npx sanity dev          → http://localhost:3333
 *   npx sanity deploy       → https://cochin-snacks.sanity.studio
 *
 * This file is intentionally disabled to prevent the React 19 module error.
 */
export default function StudioPage() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: 'system-ui, sans-serif',
          background: '#0f0f0f',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <div>
          <h1 style={{ color: '#FFD600', fontSize: '2rem', marginBottom: '1rem' }}>
            Sanity Studio
          </h1>
          <p style={{ opacity: 0.7, marginBottom: '1.5rem' }}>
            The embedded studio requires React 19. Run it standalone:
          </p>
          <code
            style={{
              background: '#1E6B2E',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1.1rem',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            npx sanity dev
          </code>
          <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>
            Then open{' '}
            <a href="http://localhost:3333" style={{ color: '#3CC120' }}>
              http://localhost:3333
            </a>
          </p>
          <p style={{ opacity: 0.4, fontSize: '0.85rem', marginTop: '1rem' }}>
            Or use the hosted studio:{' '}
            <a href="https://cochin-snacks.sanity.studio" style={{ color: '#3CC120' }}>
              cochin-snacks.sanity.studio
            </a>
          </p>
        </div>
      </body>
    </html>
  )
}
