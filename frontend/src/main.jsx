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

// ==========================================
// CONFIGURAÇÕES
// ==========================================

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000';

const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || '5511999999999';

// ==========================================
// OPÇÕES DO FORMULÁRIO
// ==========================================

const cities = [
  'Cotia',
  'Carapicuíba',
  'Barueri',
  'Itapevi',
  'Jandira',
  'Osasco',
  'Vargem Grande Paulista',
  'Embu das Artes',
  'São Paulo',
  'Outra cidade',
];

const budgetTypes = [
  {
    value: 'Residencial',
    label: 'Residencial',
    description:
      'Casas, apartamentos e espaços residenciais.',
    icon: Home,
  },
  {
    value: 'Comercial',
    label: 'Comercial',
    description:
      'Lojas, empresas e espaços corporativos.',
    icon: Building2,
  },
  {
    value: 'Clínicas e Saúde',
    label: 'Clínicas e Saúde',
    description:
      'Consultórios, clínicas e ambientes de saúde.',
    icon: ShieldCheck,
  },
  {
    value: 'Reformas',
    label: 'Reformas',
    description:
      'Transformação, modernização e renovação de ambientes.',
    icon: Wrench,
  },
  {
    value: 'Gerenciamento de Obras',
    label: 'Gerenciamento de Obras',
    description:
      'Planejamento, controle e acompanhamento da obra.',
    icon: Ruler,
  },
  {
    value: 'Projetos e Consultoria',
    label: 'Projetos e Consultoria',
    description:
      'Soluções e acompanhamento para o seu projeto.',
    icon: Layers3,
  },
];

// ==========================================
// SERVIÇOS
// ==========================================

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

// ==========================================
// PROJETOS
// ==========================================

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

// ==========================================
// DEPOIMENTOS
// ==========================================

const testimonials = [
  {
    name: 'Cliente Residencial',
    text:
      'A equipe acompanhou o trabalho com muito cuidado e atenção aos detalhes. O resultado ficou exatamente como esperávamos.',
  },
  {
    name: 'Cliente Comercial',
    text:
      'O serviço foi realizado com organização, responsabilidade e qualidade. Tivemos todo o suporte durante a obra.',
  },
  {
    name: 'Cliente de Reforma',
    text:
      'Desde o início fomos bem atendidos. A equipe entendeu o que precisávamos e entregou um ótimo resultado.',
  },
];

// ==========================================
// NAVEGAÇÃO
// ==========================================

const navItems = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'A BS', href: '#empresa' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Contato', href: '#contato' },
];

// ==========================================
// APLICAÇÃO
// ==========================================

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
    outraCidade: '',
    tipo: '',
    descricao: '',
  });

  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ==========================================
  // SCROLL
  // ==========================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // ==========================================
  // FILTRO DE PROJETOS
  // ==========================================

  const filteredProjects =
    filter === 'Todos'
      ? projects
      : projects.filter(
          (project) => project.category === filter
        );

  // ==========================================
  // ALTERAÇÃO DO FORMULÁRIO
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (name === 'cidade' && value !== 'Outra cidade') {
      setForm((current) => ({
        ...current,
        cidade: value,
        outraCidade: '',
      }));
    }
  };

  // ==========================================
  // MÁSCARA DE TELEFONE
  // ==========================================

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);

    if (digits.length === 0) {
      return '';
    }

    if (digits.length <= 2) {
      return `(${digits}`;
    }

    if (digits.length <= 6) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    }

    if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }

    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handlePhoneChange = (event) => {
    const formattedPhone = formatPhone(event.target.value);

    setForm((current) => ({
      ...current,
      telefone: formattedPhone,
    }));
  };

  // ==========================================
  // ENVIO DO FORMULÁRIO
  // ==========================================

  const submit = async (event) => {
    event.preventDefault();

    setStatus('');

    const nome = form.nome.trim();
    const email = form.email.trim();
    const telefoneNumeros = form.telefone.replace(/\D/g, '');
    const descricao = form.descricao.trim();

    const cidadeFinal =
      form.cidade === 'Outra cidade'
        ? form.outraCidade.trim()
        : form.cidade;

    // ==========================================
    // VALIDAÇÕES
    // ==========================================

    if (nome.length < 3) {
      setStatus('Digite seu nome completo.');
      return;
    }

    if (
      telefoneNumeros.length !== 10 &&
      telefoneNumeros.length !== 11
    ) {
      setStatus('Digite um telefone ou celular válido.');
      return;
    }

    if (!cidadeFinal) {
      setStatus('Selecione a cidade da obra.');
      return;
    }

    if (!form.tipo) {
      setStatus('Selecione o tipo de projeto.');
      return;
    }

    if (descricao.length < 3) {
      setStatus('Conte um pouco sobre o seu projeto.');
      return;
    }

    // ==========================================
    // DADOS ENVIADOS PARA A API
    // ==========================================

    const payload = {
      nome,
      email,
      telefone: form.telefone,
      cidade: cidadeFinal,
      tipo: form.tipo,
      descricao,
    };

    setIsSubmitting(true);
    setStatus('Enviando solicitação...');

    try {
      const response = await fetch(
        `${API_URL}/api/orcamentos`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        console.error('Erro da API:', data);

        throw new Error(
          data?.detail?.[0]?.msg ||
            'Não foi possível enviar sua solicitação.'
        );
      }

      setStatus(
        'Solicitação recebida com sucesso. Em breve entraremos em contato.'
      );

      setForm({
        nome: '',
        email: '',
        telefone: '',
        cidade: '',
        outraCidade: '',
        tipo: '',
        descricao: '',
      });
    } catch (error) {
      console.error('Erro ao enviar orçamento:', error);

      setStatus(
        'Não foi possível enviar agora. Entre em contato pelo WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="site">
      {/* ==========================================
          HEADER
          ========================================== */}

      <header
        className={`header ${
          scrolled ? 'header-scrolled' : ''
        }`}
      >
        <div className="container header-inner">
          <a href="#inicio" className="logo">
            <span className="logo-mark">BS</span>

            <span className="logo-text">
              <strong>BS</strong>
              <small>CONSTRUTORA</small>
            </span>
          </a>

          <nav
            className={`nav ${
              menuOpen ? 'nav-open' : ''
            }`}
          >
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
            aria-label={
              menuOpen ? 'Fechar menu' : 'Abrir menu'
            }
          >
            {menuOpen ? (
              <X size={25} />
            ) : (
              <Menu size={25} />
            )}
          </button>
        </div>
      </header>

      <main>
        {/* ==========================================
            HERO
            ========================================== */}

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
              Da construção de pequenas e grandes obras às
              reformas e acabamentos, a BS cuida de cada etapa
              com qualidade, responsabilidade e compromisso.
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

        {/* ==========================================
            SERVIÇOS
            ========================================== */}

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
                Da construção à reforma e do serviço estrutural
                aos acabamentos, a BS oferece soluções para
                diferentes necessidades da construção civil.
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

                    <h3>{service.title}</h3>

                    <p>{service.description}</p>

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

        {/* ==========================================
            SOBRE A BS
            ========================================== */}

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
                A BS Construtora atua na construção civil
                realizando pequenas e grandes obras, reformas
                e serviços de acabamento para clientes
                residenciais e comerciais.
              </p>

              <p>
                Nosso trabalho reúne experiência prática,
                organização, qualidade na execução e atenção
                aos detalhes em cada etapa da obra.
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

        {/* ==========================================
            PROJETOS
            ========================================== */}

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
                    onClick={() => setFilter(item)}
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

                    <h3>{project.title}</h3>

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

        {/* ==========================================
            ANTES E DEPOIS
            ========================================== */}

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
                  setBefore(Number(event.target.value))
                }
                className="comparison-slider"
                aria-label="Comparar antes e depois"
              />
            </div>
          </div>
        </section>

        {/* ==========================================
            DIFERENCIAL
            ========================================== */}

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
                cuidadosa e atenção aos detalhes. Na BS, cada
                etapa recebe o cuidado necessário para entregar
                um resultado bem executado e duradouro.
              </p>

              <div className="differential-list">
                <div>
                  <ShieldCheck size={23} />

                  <div>
                    <h3>Qualidade</h3>

                    <p>
                      Atenção aos materiais, processos e detalhes
                      de cada serviço realizado.
                    </p>
                  </div>
                </div>

                <div>
                  <Ruler size={23} />

                  <div>
                    <h3>Organização</h3>

                    <p>
                      Planejamento e acompanhamento das etapas
                      para manter a obra organizada.
                    </p>
                  </div>
                </div>

                <div>
                  <Check size={23} />

                  <div>
                    <h3>Compromisso</h3>

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

        {/* ==========================================
            DEPOIMENTOS
            ========================================== */}

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

        {/* ==========================================
            CTA
            ========================================== */}

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
              Conte para a BS o que você precisa. Seja uma
              construção, reforma ou serviço de acabamento,
              vamos entender sua necessidade e encontrar a
              melhor solução para sua obra.
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

        {/* ==========================================
            CONTATO / ORÇAMENTO
            ========================================== */}

        <section
          className="section contact-section"
          id="contato"
        >
          <div className="container contact-grid">

            {/* ==========================================
                INTRODUÇÃO DO ORÇAMENTO
                ========================================== */}

            <div className="contact-info">
              <span className="eyebrow">
                SOLICITE SEU ORÇAMENTO
              </span>

              <h2>
                Vamos entender
                <br />
                o seu <em>projeto.</em>
              </h2>

              <p>
                Preencha os dados abaixo e conte um pouco sobre
                o que você precisa. Nossa equipe analisará sua
                solicitação e entrará em contato para conversar
                sobre os próximos passos.
              </p>

              <div className="contact-process">
                <div>
                  <span>01</span>

                  <div>
                    <strong>
                      Conte o que você precisa
                    </strong>

                    <p>
                      Informe o tipo de projeto e os principais
                      detalhes da obra.
                    </p>
                  </div>
                </div>

                <div>
                  <span>02</span>

                  <div>
                    <strong>
                      Analisamos sua solicitação
                    </strong>

                    <p>
                      Nossa equipe avalia as informações enviadas.
                    </p>
                  </div>
                </div>

                <div>
                  <span>03</span>

                  <div>
                    <strong>
                      Entramos em contato
                    </strong>

                    <p>
                      Conversamos sobre sua necessidade e os
                      próximos passos.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ==========================================
                FORMULÁRIO DE ORÇAMENTO
                ========================================== */}

            <form
              className="contact-form"
              onSubmit={submit}
            >
              {/* NOME + E-MAIL */}

              <div className="form-row">
                <label>
                  Nome

                  <input
                    type="text"
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    minLength="3"
                    maxLength="150"
                    autoComplete="name"
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
                    autoComplete="email"
                    required
                  />
                </label>
              </div>

              {/* TELEFONE + CIDADE */}

              <div className="form-row">
                <label>
                  Telefone ou celular

                  <input
                    type="tel"
                    name="telefone"
                    value={form.telefone}
                    onChange={handlePhoneChange}
                    placeholder="(11) 99744-7343"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength="15"
                    required
                  />
                </label>

                <label>
                  Cidade da obra

                  <select
                    name="cidade"
                    value={form.cidade}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Selecione a cidade
                    </option>

                    {cities.map((city) => (
                      <option
                        key={city}
                        value={city}
                      >
                        {city}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {/* OUTRA CIDADE */}

              {form.cidade === 'Outra cidade' && (
                <label className="other-city-field">
                  <span className="field-title">
                    Informe a cidade
                  </span>

                  <input
                    type="text"
                    name="outraCidade"
                    value={form.outraCidade}
                    onChange={handleChange}
                    placeholder="Digite o nome da cidade"
                    maxLength="100"
                    autoComplete="address-level2"
                    required
                  />
                </label>
              )}

              {/* TIPO DE PROJETO */}

              <div className="budget-type-field">
                <div className="budget-type-heading">
                  <span>
                    Tipo de projeto
                  </span>

                  <small>
                    Selecione a opção que melhor representa sua obra.
                  </small>
                </div>

                <div className="budget-type-grid">
                  {budgetTypes.map((budget) => {
                    const Icon = budget.icon;
                    const selected =
                      form.tipo === budget.value;

                    return (
                      <button
                        key={budget.value}
                        type="button"
                        className={`budget-option ${
                          selected ? 'selected' : ''
                        }`}
                        onClick={() =>
                          setForm((current) => ({
                            ...current,
                            tipo: budget.value,
                          }))
                        }
                        aria-pressed={selected}
                      >
                        <div className="budget-option-icon">
                          <Icon size={24} />
                        </div>

                        <div className="budget-option-content">
                          <strong>
                            {budget.label}
                          </strong>

                          <span>
                            {budget.description}
                          </span>
                        </div>

                        <span className="budget-option-indicator">
                          {selected && <Check size={16} />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* DETALHES DO PROJETO */}

              <label className="project-details-field">
                <span className="field-title">
                  Detalhes do projeto
                </span>

                <span className="form-helper">
                  Conte brevemente o que você precisa, como o
                  ambiente, serviço, metragem aproximada ou
                  outro detalhe importante.
                </span>

                <textarea
                  name="descricao"
                  value={form.descricao}
                  onChange={handleChange}
                  placeholder="Ex.: Gostaria de reformar minha cozinha e área externa. O imóvel possui aproximadamente 120 m²..."
                  rows="7"
                  minLength="3"
                  maxLength="1000"
                  required
                />

                <span className="form-counter">
                  {form.descricao.length} / 1000
                </span>
              </label>

              {/* BOTÃO */}

              <button
                type="submit"
                className="button button-primary"
                disabled={isSubmitting}
              >
                <span>
                  {isSubmitting
                    ? 'Enviando solicitação...'
                    : 'Solicitar meu orçamento'}
                </span>

                {!isSubmitting && (
                  <Send size={17} />
                )}
              </button>

              {/* STATUS */}

              {status && (
                <p
                  className="form-status"
                  role="status"
                  aria-live="polite"
                >
                  {status}
                </p>
              )}
            </form>

            {/* ==========================================
                CONTATO PARA DÚVIDAS
                ========================================== */}

            <aside className="contact-extra">
              <span className="eyebrow">
                AINDA TEM ALGUMA DÚVIDA?
              </span>

              <h3>
                Estamos à disposição
                <br />
                para <em>conversar.</em>
              </h3>

              <p>
                Antes de solicitar seu orçamento, você pode
                entrar em contato com a BS para tirar dúvidas,
                saber mais sobre nossos serviços ou entender
                como funciona nosso atendimento.
              </p>

              <div className="contact-details">
                <div>
                  <Phone size={19} />

                  <span>
                    [TELEFONE / WHATSAPP]
                  </span>
                </div>

                <div>
                  <Mail size={19} />

                  <span>
                    [E-MAIL]
                  </span>
                </div>

                <div>
                  <MapPin size={19} />

                  <span>
                    [CIDADE / REGIÃO DE ATENDIMENTO]
                  </span>
                </div>
              </div>

              <a
                className="contact-whatsapp"
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={18} />
                Falar com a BS
              </a>
            </aside>

          </div>
        </section>
      </main>

      {/* ==========================================
          FOOTER
          ========================================== */}

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
              <strong>BS</strong>

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

      {/* ==========================================
          WHATSAPP FLUTUANTE
          ========================================== */}

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

// ==========================================
// INICIALIZAÇÃO
// ==========================================

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);