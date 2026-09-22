import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  Menu,
  X,
  MessageCircle,
  Home,
  Building2,
  Wrench,
  BriefcaseBusiness,
  Ruler,
  Zap,
  Paintbrush,
  Layers3,
  Check,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  Send,
} from 'lucide-react';

import './styles.css';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000';

const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || '5511999999999';

const services = [
  {
    icon: Home,
    title: 'Construção Residencial',
    description:
      'Construção de casas e espaços residenciais, desde pequenas obras até projetos de maior porte.',
  },
  {
    icon: Building2,
    title: 'Obras Comerciais',
    description:
      'Construção e adequação de espaços comerciais, lojas, empresas e estabelecimentos.',
  },
  {
    icon: Wrench,
    title: 'Reformas em Geral',
    description:
      'Reformas completas ou parciais para transformar, modernizar e valorizar diferentes ambientes.',
  },
  {
    icon: Layers3,
    title: 'Pisos e Revestimentos',
    description:
      'Instalação de pisos, azulejos, revestimentos e outros acabamentos para diferentes ambientes.',
  },
  {
    icon: Zap,
    title: 'Instalações Elétricas',
    description:
      'Serviços elétricos para obras, reformas e adequações de ambientes residenciais e comerciais.',
  },
  {
    icon: Paintbrush,
    title: 'Pintura e Acabamento',
    description:
      'Pintura, acabamento e finalização para entregar ambientes bem executados e prontos para uso.',
  },
];

const projects = [
  {
    title: 'Construção Residencial',
    category: 'Residencial',
    location: 'São Paulo, SP',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
  },
  {
    title: 'Reforma Residencial',
    category: 'Reforma',
    location: 'São Paulo, SP',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85',
  },
  {
    title: 'Obra Comercial',
    category: 'Comercial',
    location: 'São Paulo, SP',
    image:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85',
  },
  {
    title: 'Acabamento e Revestimento',
    category: 'Acabamento',
    location: 'São Paulo, SP',
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=85',
  },
  {
    title: 'Construção de Alto Padrão',
    category: 'Residencial',
    location: 'São Paulo, SP',
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85',
  },
  {
    title: 'Reforma Comercial',
    category: 'Comercial',
    location: 'São Paulo, SP',
    image:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85',
  },
];

const testimonials = [
  {
    name: 'Cliente Residencial',
    text: 'A equipe acompanhou o trabalho com muito cuidado e atenção aos detalhes. O resultado ficou exatamente como esperávamos.',
  },
  {
    name: 'Cliente Comercial',
    text: 'O serviço foi realizado com organização, responsabilidade e qualidade. Tivemos todo o suporte durante a obra.',
  },
  {
    name: 'Cliente de Reforma',
    text: 'Desde o início fomos bem atendidos. A equipe entendeu o que precisávamos e entregou um ótimo resultado.',
  },
];

const navItems = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'A BS', href: '#empresa' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Contato', href: '#contato' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState('Todos');
  const [before, setBefore] = useState(50);

  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    cidade: '',
    descricao: '',
  });

  const [status, setStatus] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const filteredProjects =
    filter === 'Todos'
      ? projects
      : projects.filter((project) => project.category === filter);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();

    setStatus('Enviando...');

    try {
      const response = await fetch(`${API_URL}/api/orcamentos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar formulário');
      }

      setStatus(
        'Mensagem enviada com sucesso! Em breve entraremos em contato.'
      );

      setForm({
        nome: '',
        email: '',
        telefone: '',
        cidade: '',
        descricao: '',
      });
    } catch (error) {
      console.error(error);

      setStatus(
        'Não foi possível enviar agora. Entre em contato pelo WhatsApp.'
      );
    }
  };

  return (
    <div className="site">

      {/* HEADER */}
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="container header-inner">

          <a href="#inicio" className="logo">
            <span className="logo-mark">BS</span>

            <span className="logo-text">
              <strong>BS</strong>
              <small>CONSTRUTORA</small>
            </span>
          </a>

          <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}

            <a
              href="#contato"
              className="nav-button"
              onClick={() => setMenuOpen(false)}
            >
              Solicitar orçamento
              <ArrowUpRight size={17} />
            </a>
          </nav>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
          >
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>

        </div>
      </header>


      <main>

        {/* HERO */}
        <section className="hero" id="inicio">

          <div className="hero-overlay"></div>

          <div className="container hero-content">

            <span className="eyebrow">
              CONSTRUÇÃO CIVIL • REFORMAS • ACABAMENTOS
            </span>

            <h1>
              Construímos espaços
              <br />
              <em>que permanecem.</em>
            </h1>

            <p>
              Da construção de pequenas e grandes obras às reformas e
              acabamentos, a BS cuida de cada etapa com qualidade,
              responsabilidade e compromisso.
            </p>

            <div className="hero-actions">

              <a
                href="#projetos"
                className="button button-primary"
              >
                Conheça nossos projetos
                <ArrowUpRight size={18} />
              </a>

              <a
                href="#contato"
                className="button button-outline"
              >
                Fale com a BS
              </a>

            </div>

          </div>


          <div className="hero-bottom">

            <div className="container hero-bottom-inner">

              <div>
                <strong>+30</strong>
                <span>anos de experiência</span>
              </div>

              <div>
                <strong>+100</strong>
                <span>projetos realizados</span>
              </div>

              <div>
                <strong>+50</strong>
                <span>clientes atendidos</span>
              </div>

              <div>
                <strong>100%</strong>
                <span>comprometimento</span>
              </div>

            </div>

          </div>

        </section>


        {/* SERVIÇOS */}
        <section
          className="section services-section"
          id="servicos"
        >

          <div className="container">

            <div className="section-heading">

              <span className="eyebrow">
                O QUE FAZEMOS
              </span>

              <h2>
                Soluções completas
                <br />
                para sua <em>obra.</em>
              </h2>

              <p>
                Da construção à reforma e do serviço estrutural aos
                acabamentos, a BS oferece soluções para diferentes
                necessidades da construção civil.
              </p>

            </div>


            <div className="services-grid">

              {services.map((service, index) => {

                const Icon = service.icon;

                return (
                  <article
                    className="service-card"
                    key={service.title}
                  >

                    <div className="service-icon">
                      <Icon size={27} />
                    </div>

                    <span className="service-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <h3>
                      {service.title}
                    </h3>

                    <p>
                      {service.description}
                    </p>

                    <a href="#contato">
                      Saiba mais
                      <ArrowUpRight size={16} />
                    </a>

                  </article>
                );

              })}

            </div>

          </div>

        </section>


        {/* SOBRE A BS */}
        <section
          className="section company-section"
          id="empresa"
        >

          <div className="container company-grid">

            <div className="company-image">

              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=85"
                alt="Construção civil"
              />

              <div className="company-badge">
                <span>BS</span>
                <small>CONSTRUTORA</small>
              </div>

            </div>


            <div className="company-content">

              <span className="eyebrow">
                SOBRE A BS
              </span>

              <h2>
                Experiência para
                <br />
                transformar <em>obras.</em>
              </h2>

              <p>
                A BS Construtora atua na construção civil realizando
                pequenas e grandes obras, reformas e serviços de
                acabamento para clientes residenciais e comerciais.
              </p>

              <p>
                Nosso trabalho reúne experiência prática, organização,
                qualidade na execução e atenção aos detalhes em cada
                etapa da obra.
              </p>


              <div className="check-list">

                <div>
                  <Check size={18} />
                  <span>
                    Construção de pequenas e grandes obras
                  </span>
                </div>

                <div>
                  <Check size={18} />
                  <span>
                    Reformas residenciais e comerciais
                  </span>
                </div>

                <div>
                  <Check size={18} />
                  <span>
                    Serviços de acabamento e revestimento
                  </span>
                </div>

                <div>
                  <Check size={18} />
                  <span>
                    Compromisso com qualidade e execução
                  </span>
                </div>

              </div>


              <a
                href="#contato"
                className="text-link"
              >
                Conheça a BS Construtora
                <ArrowUpRight size={18} />
              </a>

            </div>

          </div>

        </section>


        {/* PROJETOS */}
        <section
          className="section projects-section"
          id="projetos"
        >

          <div className="container">

            <div className="projects-top">

              <div className="section-heading">

                <span className="eyebrow">
                  PORTFÓLIO
                </span>

                <h2>
                  Obras que
                  <br />
                  <em>falam por si.</em>
                </h2>

              </div>


              <div className="filters">

                {[
                  'Todos',
                  'Residencial',
                  'Comercial',
                  'Reforma',
                  'Acabamento',
                ].map((item) => (

                  <button
                    key={item}
                    className={
                      filter === item
                        ? 'active'
                        : ''
                    }
                    onClick={() =>
                      setFilter(item)
                    }
                  >
                    {item}
                  </button>

                ))}

              </div>

            </div>


            <div className="projects-grid">

              {filteredProjects.map((project) => (

                <article
                  className="project-card"
                  key={project.title}
                >

                  <img
                    src={project.image}
                    alt={project.title}
                  />

                  <div className="project-overlay">

                    <span>
                      {project.category}
                    </span>

                    <h3>
                      {project.title}
                    </h3>

                    <p>
                      <MapPin size={14} />
                      {project.location}
                    </p>

                    <ArrowUpRight
                      className="project-arrow"
                      size={25}
                    />

                  </div>

                </article>

              ))}

            </div>

          </div>

        </section>


        {/* ANTES E DEPOIS */}
        <section className="section comparison-section">

          <div className="container">

            <div className="comparison-heading">

              <span className="eyebrow">
                TRANSFORMAÇÃO
              </span>

              <h2>
                Antes e depois.
                <br />
                <em>Uma nova perspectiva.</em>
              </h2>

            </div>


            <div className="comparison">

              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
                alt="Ambiente depois da reforma"
              />


              <div
                className="comparison-before"
                style={{
                  width: `${before}%`,
                }}
              >

                <img
                  src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85"
                  alt="Ambiente antes da reforma"
                />

              </div>


              <div className="comparison-label comparison-label-before">
                Antes
              </div>

              <div className="comparison-label comparison-label-after">
                Depois
              </div>


              <div
                className="comparison-handle"
                style={{
                  left: `${before}%`,
                }}
              >
                <span></span>
              </div>


              <input
                type="range"
                min="0"
                max="100"
                value={before}
                onChange={(event) =>
                  setBefore(event.target.value)
                }
                className="comparison-slider"
                aria-label="Comparar antes e depois"
              />

            </div>

          </div>

        </section>


        {/* DIFERENCIAL */}
        <section className="section differential-section">

          <div className="container differential-grid">

            <div className="differential-content">

              <span className="eyebrow">
                NOSSO DIFERENCIAL
              </span>

              <h2>
                Qualidade em
                <br />
                <em>cada etapa.</em>
              </h2>

              <p>
                Uma boa obra depende de planejamento, execução
                cuidadosa e atenção aos detalhes. Na BS, cada etapa
                recebe o cuidado necessário para entregar um resultado
                bem executado e duradouro.
              </p>


              <div className="differential-list">

                <div>

                  <ShieldCheck size={23} />

                  <div>

                    <h3>
                      Qualidade
                    </h3>

                    <p>
                      Atenção aos materiais, processos e detalhes
                      de cada serviço realizado.
                    </p>

                  </div>

                </div>


                <div>

                  <Ruler size={23} />

                  <div>

                    <h3>
                      Organização
                    </h3>

                    <p>
                      Planejamento e acompanhamento das etapas
                      para manter a obra organizada.
                    </p>

                  </div>

                </div>


                <div>

                  <Check size={23} />

                  <div>

                    <h3>
                      Compromisso
                    </h3>

                    <p>
                      Responsabilidade com o cliente, com a execução
                      e com o resultado final.
                    </p>

                  </div>

                </div>

              </div>

            </div>


            <div className="differential-image">

              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=85"
                alt="Equipe trabalhando em uma obra"
              />

              <div className="image-caption">
                <span>CONSTRUÇÃO CIVIL</span>
                <strong>
                  Construindo com propósito.
                </strong>
              </div>

            </div>

          </div>

        </section>


        {/* DEPOIMENTOS */}
        <section className="section testimonials-section">

          <div className="container">

            <div className="section-heading centered">

              <span className="eyebrow">
                DEPOIMENTOS
              </span>

              <h2>
                O que nossos
                <br />
                clientes <em>dizem.</em>
              </h2>

            </div>


            <div className="testimonials-grid">

              {testimonials.map((testimonial) => (

                <article
                  className="testimonial"
                  key={testimonial.name}
                >

                  <div className="testimonial-quote">
                    “
                  </div>

                  <p>
                    {testimonial.text}
                  </p>

                  <div className="testimonial-author">

                    <span></span>

                    <strong>
                      {testimonial.name}
                    </strong>

                  </div>

                </article>

              ))}

            </div>

          </div>

        </section>


        {/* CTA */}
        <section className="cta-section">

          <div className="container cta-content">

            <span className="eyebrow">
              VAMOS CONSTRUIR JUNTOS?
            </span>

            <h2>
              Sua obra começa
              <br />
              <em>aqui.</em>
            </h2>

            <p>
              Conte para a BS o que você precisa. Seja uma construção,
              reforma ou serviço de acabamento, vamos entender sua
              necessidade e encontrar a melhor solução para sua obra.
            </p>

            <a
              href="#contato"
              className="button button-light"
            >
              Solicitar orçamento
              <ArrowUpRight size={18} />
            </a>

          </div>

        </section>


        {/* CONTATO */}
        <section
          className="section contact-section"
          id="contato"
        >

          <div className="container contact-grid">

            <div className="contact-info">

              <span className="eyebrow">
                FALE CONOSCO
              </span>

              <h2>
                Vamos conversar
                <br />
                sobre sua <em>obra?</em>
              </h2>

              <p>
                Preencha o formulário e conte um pouco sobre sua
                obra, reforma ou serviço. Nossa equipe entrará em
                contato para entender melhor o que você precisa.
              </p>


              <div className="contact-details">

                <div>
                  <Phone size={20} />
                  <span>
                    [TELEFONE / WHATSAPP]
                  </span>
                </div>

                <div>
                  <Mail size={20} />
                  <span>
                    [E-MAIL]
                  </span>
                </div>

                <div>
                  <MapPin size={20} />
                  <span>
                    [CIDADE / REGIÃO DE ATENDIMENTO]
                  </span>
                </div>

              </div>

            </div>


            <form
              className="contact-form"
              onSubmit={submit}
            >

              <div className="form-row">

                <label>
                  Nome

                  <input
                    type="text"
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    required
                  />

                </label>


                <label>
                  E-mail

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="voce@email.com"
                    required
                  />

                </label>

              </div>


              <div className="form-row">

                <label>
                  Telefone

                  <input
                    type="tel"
                    name="telefone"
                    value={form.telefone}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999"
                  />

                </label>


                <label>
                  Cidade

                  <input
                    type="text"
                    name="cidade"
                    value={form.cidade}
                    onChange={handleChange}
                    placeholder="Sua cidade"
                  />

                </label>

              </div>


              <label>
                Fale sobre sua obra

                <textarea
                  name="descricao"
                  value={form.descricao}
                  onChange={handleChange}
                  placeholder="Conte um pouco sobre sua obra, reforma ou serviço que você precisa..."
                  rows="6"
                  required
                />

              </label>


              <button
                type="submit"
                className="button button-primary"
              >

                <span>
                  Enviar mensagem
                </span>

                <Send size={17} />

              </button>


              {status && (
                <p className="form-status">
                  {status}
                </p>
              )}

            </form>

          </div>

        </section>

      </main>


      {/* FOOTER */}
      <footer className="footer">

        <div className="container footer-top">

          <a
            href="#inicio"
            className="logo footer-logo"
          >

            <span className="logo-mark">
              BS
            </span>

            <span className="logo-text">

              <strong>
                BS
              </strong>

              <small>
                CONSTRUTORA
              </small>

            </span>

          </a>


          <p>
            Construção civil, reformas
            <br />
            e acabamentos com qualidade.
          </p>


          <div className="footer-links">

            {navItems.map((item) => (

              <a
                key={item.label}
                href={item.href}
              >
                {item.label}
              </a>

            ))}

          </div>

        </div>


        <div className="container footer-bottom">

          <span>
            © {new Date().getFullYear()} BS Construtora.
            Todos os direitos reservados.
          </span>

          <span>
            Construindo espaços. Entregando qualidade.
          </span>

        </div>

      </footer>


      {/* WHATSAPP */}
      <a
        className="whatsapp-button"
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar pelo WhatsApp"
      >
        <MessageCircle size={26} />
      </a>

    </div>
  );
}


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);