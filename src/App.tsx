import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'

type Page = 'home' | 'about' | 'products' | 'contact'

const pageFromPath = (): Page => {
  if (location.pathname.includes('about-wingviet')) return 'about'
  if (location.pathname.includes('our-products')) return 'products'
  if (location.pathname.includes('contact-us')) return 'contact'
  return 'home'
}

const routes: Record<Page, string> = {
  home: '/',
  about: '/about-wingviet/',
  products: '/our-products/',
  contact: '/contact-us/',
}

const titles: Record<Page, string> = {
  home: 'Home - Wingviet Trading Co., Ltd.',
  about: 'About Wingviet - Wingviet Trading Co., Ltd.',
  products: 'Our Products - Wingviet Trading Co., Ltd.',
  contact: 'Contact Us - Wingviet Trading Co., Ltd.',
}

function App() {
  const [page, setPage] = useState<Page>(pageFromPath)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = (next: Page) => {
    history.pushState({}, '', routes[next])
    setPage(next)
    setMenuOpen(false)
    document.title = titles[next]
    window.scrollTo({ top: 0 })
  }

  useEffect(() => {
    const sync = () => {
      const next = pageFromPath()
      setPage(next)
      setMenuOpen(false)
      document.title = titles[next]
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  return (
    <>
      <header className="site-header">
        <div className="bar">
          <button className="brand" onClick={() => navigate('home')} aria-label="Wingviet home">
            Wingviet Trading Co., Ltd.
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">☰</button>
          <nav className={`main-nav${menuOpen ? ' open' : ''}`} aria-label="Main navigation">
            {(['home', 'about', 'products', 'contact'] as Page[]).map((item) => (
              <button key={item} className={page === item ? 'active' : ''} onClick={() => navigate(item)}>
                {item === 'home' ? 'Home' : item === 'about' ? 'About Wingviet' : item === 'products' ? 'Our Products' : 'Contact Us'}
              </button>
            ))}
          </nav>
          <a className="btn-outline small" href="tel:+84912311707" aria-label="+84 9123 11 707">+84 9123 11 707</a>
        </div>
      </header>
      <main>
        {page === 'home' ? <Home navigate={navigate} />
          : page === 'about' ? <About navigate={navigate} />
          : page === 'products' ? <Products navigate={navigate} />
          : <Contact />}
      </main>
      <Footer navigate={navigate} />
      <ScrollTop />
    </>
  )
}

/* ------------------------------ HOME ------------------------------ */
function Home({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <>
      <section className="hero">
        <div className="inner">
          <div>
            <p className="eyebrow">Wingviet Trading Co., Ltd.</p>
            <h1>Your Gateway to Quality Vietnamese Sourcing.</h1>
          </div>
          <p className="lede">Wingviet Trading is your trusted partner for sourcing high-quality Vietnamese goods. We specialize in finding and exporting a diverse range of products—particularly exquisite handicrafts and premium dried foods—providing international partners with efficient and reliable access to the Vietnamese market.</p>
        </div>
        <div className="hero-bar">
          <div className="row">
            <span className="social"><a href="#" aria-label="Facebook">f</a></span>
            <span className="addr"><span className="dot">📍</span> Ho Chi Minh City, Vietnam&nbsp;&nbsp;|&nbsp;&nbsp;Email: Yen@wingviet.info.vn</span>
          </div>
        </div>
      </section>

      <section className="section tint centered">
        <div className="wrap-narrow">
          <h2>Our Product Categories</h2>
          <p className="intro">From intricate handicrafts to premium dried foods, we source and export the best of Vietnam. Explore our main categories below or contact us for specific sourcing requests.</p>
          <p><a className="btn-outline small" href={routes.products} onClick={(e) => { e.preventDefault(); navigate('products') }}>View All Products ›</a></p>
          <div className="cat-grid">
            <a href={`${routes.products}#handicrafts`} onClick={(e) => { e.preventDefault(); navigate('products') }}><img src="/assets/anh-nay-tao-them-mot-vai-loai-thu-cong-khac-nhu-gao-dua-coc-tre-ong-hut-tre-do-vat-may-tre-dan-.png" alt="Handicrafts" /><h3>Handicrafts</h3></a>
            <a href={`${routes.products}#dried-goods`} onClick={(e) => { e.preventDefault(); navigate('products') }}><img src="/assets/Gemini_Generated_Image_vo332bvo332bvo33.png" alt="Dried Goods" /><h3>Dried Goods</h3></a>
            <a href={`${routes.products}#custom-sourcing`} onClick={(e) => { e.preventDefault(); navigate('products') }}><img src="/assets/Untitled-design.png" alt="Custom Sourcing" /><h3>Custom Sourcing</h3></a>
          </div>
        </div>
      </section>

      <section className="section split">
        <div className="wrap-narrow split-row">
          <div>
            <p className="eyebrow">About Wingviet</p>
            <h2>Your Trusted Partner For Vietnamese Sourcing</h2>
            <p>Wingviet Trading was founded with a clear vision: to be the most reliable and quality-driven connection between international clients and the Vietnamese market. Our core philosophy is built on <strong style={{ color: 'var(--c2)' }}>trust</strong> and a <strong style={{ color: 'var(--c2)' }}>‘customer-first’ principle</strong>. We are meticulously dedicated to ensuring every sourced product meets your exact requirements, guaranteeing quality and transparency from origin to export. Your success is our priority.</p>
            <a className="btn-outline small" href={routes.about} onClick={(e) => { e.preventDefault(); navigate('about') }}>Read More ›</a>
          </div>
          <div className="about-collage">
            <img className="main" src="/assets/Untitled-design-1-1024x576.png" alt="Wingviet sourcing partner" />
          </div>
        </div>
        <div className="wrap-narrow">
          <div className="feat-grid">
            <div className="feat"><span className="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 3h6M10 3v5.2L5.8 15A3 3 0 0 0 8.2 20h7.6a3 3 0 0 0 2.4-5L14 8.2V3M8 14h8"/></svg></span><div><h3>Guaranteed Quality</h3><p>We implement strict quality control to ensure every product meets your exact standards.</p></div></div>
            <div className="feat"><span className="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/><path d="M8.5 11.2l1.8 1.8 3.2-3.8"/></svg></span><div><h3>Reliable Sourcing</h3><p>Leveraging our deep local network to find the best artisans and producers for your needs.</p></div></div>
            <div className="feat"><span className="feature-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 5c-6.8.2-11.7 2.8-13.8 7.4C4.8 15.5 7 19 10.8 19c4.9 0 8.5-4.6 9.2-14ZM4 21c2.5-4 5.4-6.7 9.3-8.8"/></svg></span><div><h3>Customer-First Service</h3><p>Your success is our priority. We provide transparent communication and dedicated support.</p></div></div>
          </div>
        </div>
      </section>

      <section className="section centered" style={{ paddingTop: 20 }}>
        <div className="wrap-narrow">
          <p className="eyebrow">How we work</p>
          <h2>Quality &amp; Reliability In Every Step.</h2>
          <p className="intro">Our process is built on transparency and a “customer-first” approach. We act as your dedicated team in Vietnam, managing the entire sourcing journey from producer verification and negotiation to final quality inspection and logistics. We handle the complexity so you can receive high-quality Vietnamese goods with confidence.</p>
          <div className="process-photo"><img src="/assets/Gemini_Generated_Image_cxgpbqcxgpbqcxgp.png" alt="Wingviet warehouse and quality team" /></div>
          <ul className="check-grid">
            {['Detailed Client Consultation', 'Strategic Producer Sourcing', 'Rigorous Quality Control', 'Production Monitoring', 'Full-Service Logistics', 'Transparent Communication'].map((s) => (
              <li key={s}><span className="tick">✓</span>{s}</li>
            ))}
          </ul>
        </div>
      </section>

      <Cta navigate={navigate} />
    </>
  )
}

/* ------------------------------ ABOUT ----------------------------- */
function About({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <>
      <PageHero cls="about" title="About Wingviet" desc="Learn about our mission, our values, and our commitment to being your most trusted sourcing partner in Vietnam." />
      <section className="section split">
        <div className="wrap-narrow split-row">
          <div>
            <p className="eyebrow">Our core philosophy</p>
            <h2>To Be Your Most Reliable Bridge to Vietnamese Quality.</h2>
            <p>Our ‘customer-first’ principle is our compass. We are built on a foundation of trust, dedicating ourselves to understanding your exact needs and ensuring every detail is met. We are more than just an exporter; we are your on-the-ground partners.</p>
            <p>We leverage our deep local expertise to find the best producers, negotiate on your behalf, and manage all sourcing complexities. Quality is not just a final check; it’s our process. We ensure reliability through rigorous producer verification, on-site monitoring, and strict quality control from start to finish.</p>
          </div>
          <img className="rounded" src="/assets/Gemini_Generated_Image_7cchla7cchla7cch-edited.png" alt="Vietnamese market and products" />
        </div>
      </section>
      <section className="section tint">
        <div className="wrap-narrow">
          <div className="vm-grid">
            <div className="vm-card"><h2>Our Vision</h2><p>Our vision is to be the world’s most trusted and efficient gateway for accessing high-quality Vietnamese products. We aim to build long-term partnerships with our international clients, founded on integrity, quality, and mutual success.</p></div>
            <div className="vm-card"><h2>Our Mission</h2><p>Our mission is to flawlessly connect international buyers with Vietnam’s finest artisans and producers. We are committed to simplifying the sourcing process, guaranteeing product quality, and championing the ‘customer-first’ principle in everything we do.</p></div>
          </div>
        </div>
      </section>
      <section className="section split">
        <div className="wrap-narrow split-row">
          <img className="rounded founder-photo" src="/assets/7ede6fff3802b45ced13_preview_rev_1-1-300x163.png" alt="Le Thi Hai Yen, Founder and CEO" />
          <div>
            <p className="eyebrow">A message from our founder</p>
            <h2>A Message From Our Founder</h2>
            <p>Wingviet was founded on a simple principle: trust. Having seen the complexities international buyers face, we wanted to build a company that serves as a true partner—one that is transparent, dedicated, and always puts the client’s needs first. We are not just an exporter; we are your team in Vietnam.</p>
            <p><strong style={{ color: 'var(--c2)' }}>Le Thi Hai Yen</strong><br />Founder &amp; CEO, Wingviet Trading Co., Ltd.</p>
          </div>
        </div>
      </section>
      <Cta navigate={navigate} />
    </>
  )
}

/* ----------------------------- PRODUCTS ---------------------------- */
function Products({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <>
      <PageHero cls="products" title="Our Products" desc="Discover the quality and craftsmanship of Vietnam. We specialize in sourcing and exporting a curated selection of premium handicrafts and agricultural products for our global partners." />
      <section className="section centered" style={{ paddingBottom: 30 }}>
        <div className="wrap-narrow">
          <p className="eyebrow">Authentic. Quality. Reliable.</p>
          <h2>Made in Vietnam, sourced with care.</h2>
          <p className="intro">Our mission is to be your most trusted partner. We build relationships with Vietnam’s finest artisans and producers, ensuring every product we export is authentic and meets high-quality standards. We offer flexible solutions, from our curated catalogs to bespoke ‘Custom Sourcing’ services. Whatever your requirement, our team is dedicated to finding it for you efficiently and transparently.</p>
        </div>
      </section>
      <section className="product-block tint" id="handicrafts">
        <div className="wrap-narrow split-row">
          <img className="rounded" src="/assets/Gemini_Generated_Image_sgap81sgap81sgap-1-edited-1.png" alt="Vietnamese Handicrafts" />
          <div>
            <p className="eyebrow num">01.</p>
            <h2>Vietnamese Handicrafts</h2>
            <p>We source Vietnam’s most beautiful, handcrafted goods. Our portfolio includes exquisite items perfect for home decor, retail, hospitality, or corporate gifting.</p>
            <ul>{['Lacquerware & Bamboo', 'Ceramics & Pottery', 'Silk & Textiles', 'Rattan & Woven Goods'].map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        </div>
      </section>
      <section className="product-block" id="dried-goods">
        <div className="wrap-narrow split-row">
          <img className="rounded" src="/assets/Gemini_Generated_Image_29y1ve29y1ve29y1-edited.png" alt="Dried Goods and Spices" />
          <div>
            <p className="eyebrow num">02.</p>
            <h2>Dried Goods &amp; Spices</h2>
            <p>Vietnam is a world leader in premium agricultural goods. We source and export high-quality dried foods, nuts, and spices directly from verified producers.</p>
            <ul>{['Cashew Nuts & Peanuts', 'Coffee & Tea', 'Cinnamon & Star Anise', 'Dried Fruits'].map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        </div>
      </section>
      <section className="product-block tint" id="custom-sourcing">
        <div className="wrap-narrow split-row">
          <img className="rounded" src="/assets/Gemini_Generated_Image_6j89ha6j89ha6j89-edited.png" alt="Custom Sourcing" />
          <div>
            <p className="eyebrow num">03.</p>
            <h2>Custom Sourcing</h2>
            <p>Can’t find what you’re looking for? Our core strength is our ‘customer-first’ sourcing service. We are your on-the-ground team to find any Vietnamese product.</p>
            <ul>{['Full Market Research', 'Producer Verification', 'Price Negotiation', 'Private Label Solutions'].map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        </div>
      </section>
      <Cta navigate={navigate} />
    </>
  )
}

/* ----------------------------- CONTACT ----------------------------- */
function Contact() {
  const MAX_MAILTO_CHARS = 1500
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').slice(0, 100)
    const email = String(data.get('email') ?? '').slice(0, 254)
    const subject = String(data.get('subject') ?? '').slice(0, 120)
    const message = String(data.get('message') ?? '').slice(0, MAX_MAILTO_CHARS)
    const href = `mailto:yen@wingviet.info.vn?subject=${encodeURIComponent(`[${subject}] Sourcing enquiry from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`
    if (href.length > 2000) {
      alert('Your message is too long for email. Please shorten it and try again.')
      return
    }
    location.href = href
  }
  return (
    <>
      <PageHero cls="contact" title="Contact Us" desc="We are ready to be your trusted partner in Vietnam. Whether you have a specific sourcing inquiry for handicrafts, need custom-sourced products, or want to discuss logistics, our team is here to help. Please fill out the form below or contact us directly for a free consultation." />
      <section className="section contact-section">
        <div className="wrap-narrow">
          <div className="contact-grid contact-top">
            <div className="contact-intro">
              <p className="eyebrow">Get in touch</p>
              <h2>Ready to Source From Vietnam?</h2>
              <p>Have a question or a specific sourcing request? Fill out the form, and a member of our team will get back to you within one business day. We look forward to partnering with you.</p>
            </div>
            <div className="detail-card">
              <h2>Contact Detail</h2>
              <h3><span className="contact-detail-icon" aria-hidden="true">●</span>Address</h3><p>1 183, Tổ 47, Thới An, Hồ Chí Minh, Vietnam</p>
              <h3><span className="contact-detail-icon" aria-hidden="true">⌕</span>Phone</h3><p><a href="tel:+84912311707">+84 9123 11 707</a></p>
              <h3><span className="contact-detail-icon" aria-hidden="true">✉</span>Email</h3><p><a href="mailto:yen@wingviet.info.vn">yen@wingviet.info.vn</a></p>
            </div>
          </div>
          <div className="contact-grid contact-bottom">
            <div className="contact-form-panel">
              <h2>Send Us A Message</h2>
              <p>Please fill out the form below with your sourcing requirements. We will review your request and a member of our team will contact you shortly.</p>
              <form className="contact-form" onSubmit={submit}>
                <label>Name<input name="name" required maxLength={100} /></label>
                <label>Email<input name="email" type="email" required maxLength={254} /></label>
                <label>Subject<input name="subject" maxLength={120} /></label>
                <label>Comment or Message<textarea name="message" required maxLength={1500} /></label>
                <button className="btn-solid" type="submit">Submit</button>
              </form>
            </div>
            <iframe className="map" title="Wingviet location" src="https://maps.google.com/maps?q=1%20183%2C%20T%E1%BB%95%2047%2C%20Th%E1%BB%9Bi%20An%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh%2C%20Vietnam&t=&z=15&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" />
          </div>
        </div>
      </section>
    </>
  )
}

/* ----------------------------- SHARED ------------------------------ */
function PageHero({ cls, title, desc }: { cls: string, title: string, desc: string }) {
  return <section className={`page-hero ${cls}`}><div className="inner"><h1>{title}</h1><p>{desc}</p></div></section>
}

function Cta({ navigate }: { navigate: (p: Page) => void }) {
  void navigate
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    location.href = `mailto:yen@wingviet.info.vn?subject=${encodeURIComponent('Sourcing enquiry from website')}&body=${encodeURIComponent(`Please contact me at: ${data.get('email')}`)}`
  }
  return (
    <section className="cta-band">
      <div className="inner">
        <h2>Ready To Source From Vietnam?</h2>
        <p>Let us be your trusted team on the ground. Tell us your requirements, and we will handle the entire process—from sourcing and quality control to final export. Contact us today for a free consultation.</p>
        <form className="cta-form" onSubmit={submit}>
          <input name="email" type="email" placeholder="Email address" aria-label="Email address" required />
          <button className="btn-outline small" type="submit">Contact Us Now</button>
        </form>
      </div>
    </section>
  )
}

function Footer({ navigate }: { navigate: (p: Page) => void }) {
  void navigate
  return (
    <footer className="site-footer">
      <div className="foot-base">
        <span>Copyright © {new Date().getFullYear()} wingviet.info.vn</span>
        <span>Powered by wingviet.info.vn</span>
      </div>
    </footer>
  )
}

function ScrollTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!show) return null
  return <button className="to-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>^</button>
}

export default App
