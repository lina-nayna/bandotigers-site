import LegalPage from '../components/LegalPage'
import { terms } from '../i18n/legal'

export default function TermsPage() {
  return <LegalPage content={terms} page="terms" />
}
