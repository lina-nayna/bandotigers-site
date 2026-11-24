import LegalPage from '../components/LegalPage'
import { cookies } from '../i18n/legal'

export default function CookiePage() {
  return <LegalPage content={cookies} page="cookies" />
}
