import Header from '../components/Header';
import Footer from '../components/Footer';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills'
import Hero from '@/components/sections/Hero'
import Contact from '@/components/sections/Contact'
import AdminLogin from '@/components/AdminLogin';

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
       <AdminLogin />
    </main>
  );
}
