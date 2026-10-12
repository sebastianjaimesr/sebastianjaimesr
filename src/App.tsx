import { About } from './components/About'
import { Approach } from './components/Approach'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { useScrollReveal } from './hooks/useScrollReveal'
import { useLanguage } from './i18n/LanguageContext'

export default function App() {
  const { t } = useLanguage()
  useScrollReveal()

  return (
    <>
      <a className="skip-link" href="#main">
        {t.skipLink}
      </a>
      <div className="backdrop" aria-hidden="true">
        <span className="backdrop__blob backdrop__blob--a" />
        <span className="backdrop__blob backdrop__blob--b" />
        <span className="backdrop__grid" />
        <span className="backdrop__noise" />
      </div>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Approach />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
