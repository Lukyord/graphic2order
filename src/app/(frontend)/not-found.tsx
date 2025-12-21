import { redirect } from 'next/navigation'
import { routing } from '@/i18n/routing'

// This page renders when a route like `/unknown.txt` is requested.
// Redirect to the default locale's not-found page so all not-found cases
// are handled by LocaleNotFound component.
export default function GlobalNotFound() {
  redirect(`/${routing.defaultLocale}/not-found`)
}
