import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Leaf,
  Heart,
  Globe,
  BookOpen,
  Users,
  Sprout,
  FlaskConical,
  Sun,
  Droplets,
  Wind,
  Coffee,
  Calendar,
  MapPin,
  ArrowRight,
  Mail,
  Phone,
  Building,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Menu,
  X,
  ChevronUp,
  Sparkles,
  Shield,
  Flower2
} from 'lucide-react'

// Section wrapper with scroll animation
function AnimatedSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay, ease: "easeOut" }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Navigation Component
function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: "#about", label: "ホーリーバジルとは" },
    { href: "#mission", label: "活動目的" },
    { href: "#possibility", label: "可能性" },
    { href: "#news", label: "お知らせ" },
    { href: "#join", label: "参加する" },
    { href: "#contact", label: "お問い合わせ" }
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Leaf className={`w-8 h-8 ${scrolled ? 'text-forest' : 'text-white'} transition-colors`} />
            </motion.div>
            <span className={`font-serif font-semibold text-lg ${scrolled ? 'text-forest' : 'text-white'} transition-colors`}>
              日本ホーリーバジル協会
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-lavender ${
                  scrolled ? 'text-forest-dark' : 'text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 ${scrolled ? 'text-forest' : 'text-white'}`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cream/95 backdrop-blur-md border-t border-forest/10"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-forest-dark hover:text-lavender transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// Hero Section
function HeroSection() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest via-forest-dark to-forest">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-lavender rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-forest-light rounded-full blur-3xl"></div>
        </div>

        {/* Animated floating leaves */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/20"
            initial={{
              x: Math.random() * windowWidth,
              y: -100,
              rotate: 0
            }}
            animate={{
              y: windowHeight + 100,
              rotate: 360,
              x: Math.random() * windowWidth
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear"
            }}
          >
            <Leaf className="w-8 h-8" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm">
            <Sparkles className="w-4 h-4" />
            特定非営利活動法人
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          日本ホーリーバジル協会
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-4 font-light"
        >
          Holy Basil Association Japan
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            万能のハーブが、<br className="md:hidden" />
            <span className="text-lavender-light font-medium">心と体、そして地球を救う。</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#about"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-forest font-semibold rounded-full hover:bg-cream transition-colors group"
          >
            ホーリーバジルを知る
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#join"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lavender text-white font-semibold rounded-full hover:bg-lavender-dark transition-colors"
          >
            会員になる
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center text-white/60"
        >
          <span className="text-xs mb-2">Scroll</span>
          <ChevronUp className="w-5 h-5 rotate-180" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// About Section
function AboutSection() {
  const features = [
    {
      icon: Shield,
      title: "アダプトゲン",
      description: "ストレスに対する体の抵抗力を高め、心身のバランスを整える自然の力を持っています。"
    },
    {
      icon: Flower2,
      title: "聖なるバジル",
      description: "インドでは「トゥルシー」と呼ばれ、5000年以上にわたり神聖な植物として崇められてきました。"
    },
    {
      icon: Heart,
      title: "多様な効能",
      description: "免疫力向上、抗酸化作用、リラックス効果など、現代科学でも注目される効能を持っています。"
    }
  ]

  return (
    <section id="about" className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-lavender font-medium mb-4">
            <Leaf className="w-5 h-5" />
            About Holy Basil
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-forest-dark mb-6">
            ホーリーバジルとは
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
            ホーリーバジル（学名：Ocimum tenuiflorum）は、インド原産のシソ科メボウキ属の植物です。
            アーユルヴェーダにおいて「比類なきもの」を意味する「トゥルシー」と呼ばれ、
            心身の健康を守る万能ハーブとして、古来より大切にされてきました。
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(45, 90, 39, 0.15)" }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-forest/5 h-full"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-forest to-forest-light rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-serif text-xl font-bold text-forest-dark mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Image placeholder with decorative frame */}
        <AnimatedSection>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute -inset-4 bg-gradient-to-r from-forest/20 via-lavender/20 to-forest/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-gradient-to-br from-forest-light/30 to-lavender/20 rounded-2xl aspect-video flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <Leaf className="w-24 h-24 text-forest/40 mx-auto mb-4" />
                <p className="text-forest/60 text-lg">ホーリーバジルのイメージ画像</p>
                <p className="text-forest/40 text-sm mt-2">Holy Basil Image Placeholder</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// Mission Section
function MissionSection() {
  const missions = [
    {
      icon: BookOpen,
      title: "普及啓発活動",
      description: "セミナー、ワークショップ、出版物を通じて、ホーリーバジルの魅力と正しい知識を広めています。",
      color: "from-forest to-forest-light"
    },
    {
      icon: Sprout,
      title: "栽培支援",
      description: "全国の農家や家庭菜園愛好家に向けて、種子の配布や栽培技術の指導を行っています。",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: FlaskConical,
      title: "研究活動",
      description: "大学や研究機関と連携し、ホーリーバジルの成分分析や新しい活用法の研究を推進しています。",
      color: "from-lavender to-lavender-dark"
    },
    {
      icon: Users,
      title: "コミュニティ形成",
      description: "ホーリーバジルを愛する人々が集い、知識と経験を共有できるネットワークを構築しています。",
      color: "from-amber-500 to-orange-500"
    }
  ]

  return (
    <section id="mission" className="py-24 md:py-32 bg-gradient-to-b from-cream to-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-lavender font-medium mb-4">
            <Heart className="w-5 h-5" />
            Our Mission
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-forest-dark mb-6">
            私たちの活動目的
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
            日本ホーリーバジル協会は、この素晴らしいハーブの可能性を日本中に、
            そして世界に広げるため、以下の活動に取り組んでいます。
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          {missions.map((mission, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${mission.color}`}></div>
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${mission.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <mission.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-forest-dark mb-3">{mission.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{mission.description}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// Possibility Section
function PossibilitySection() {
  const possibilities = [
    {
      icon: Coffee,
      title: "ハーブティー",
      description: "リラックス効果のある香り高いお茶として、毎日の健康習慣に。"
    },
    {
      icon: Droplets,
      title: "精油・アロマ",
      description: "ストレス緩和や空間浄化に優れた天然のエッセンシャルオイル。"
    },
    {
      icon: Wind,
      title: "環境浄化",
      description: "空気清浄作用や土壌改善など、環境に優しい自然の力。"
    },
    {
      icon: Sun,
      title: "食文化",
      description: "料理やお菓子の香り付けなど、食卓を彩る新しい可能性。"
    }
  ]

  return (
    <section id="possibility" className="py-24 md:py-32 bg-forest-dark text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-lavender-light font-medium mb-4">
            <Globe className="w-5 h-5" />
            Possibilities
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            ホーリーバジルの可能性
          </h2>
          <p className="max-w-3xl mx-auto text-white/80 text-lg leading-relaxed">
            古来の知恵と現代の技術が融合することで、
            ホーリーバジルは私たちの生活をより豊かにする無限の可能性を秘めています。
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {possibilities.map((item, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -10 }}
                className="group relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10"
              >
                <div className="aspect-square bg-gradient-to-br from-forest-light/50 to-lavender/30 flex items-center justify-center">
                  <item.icon className="w-20 h-20 text-white/60 group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-lavender/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-16 text-center">
          <a
            href="#join"
            className="inline-flex items-center gap-2 px-8 py-4 bg-lavender text-white font-semibold rounded-full hover:bg-lavender-light transition-colors group"
          >
            可能性を一緒に広げましょう
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}

// News Section
function NewsSection() {
  const news = [
    {
      date: "2024.12.15",
      category: "イベント",
      title: "第12回ホーリーバジル栽培講座を開催します",
      description: "初心者から経験者まで、どなたでもご参加いただける実践的な栽培講座です。"
    },
    {
      date: "2024.12.01",
      category: "お知らせ",
      title: "年末年始の事務局休業のお知らせ",
      description: "12月28日から1月5日まで事務局は休業とさせていただきます。"
    },
    {
      date: "2024.11.20",
      category: "研究",
      title: "ホーリーバジルの抗酸化作用に関する研究成果を発表",
      description: "東京大学との共同研究により、新たな効能が明らかになりました。"
    },
    {
      date: "2024.11.10",
      category: "メディア",
      title: "NHK「健康ライフ」に協会代表が出演",
      description: "ホーリーバジルの健康効果について解説しました。"
    }
  ]

  const categoryColors = {
    "イベント": "bg-lavender text-white",
    "お知らせ": "bg-forest text-white",
    "研究": "bg-amber-500 text-white",
    "メディア": "bg-rose-500 text-white"
  }

  return (
    <section id="news" className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-lavender font-medium mb-4">
            <Calendar className="w-5 h-5" />
            News & Events
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-forest-dark mb-6">
            お知らせ・イベント
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
            協会の最新活動情報やイベントのご案内をお届けします。
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {news.map((item, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.article
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(45, 90, 39, 0.1)" }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-forest/5 cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm text-gray-500">{item.date}</span>
                  <span className={`text-xs px-3 py-1 rounded-full ${categoryColors[item.category]}`}>
                    {item.category}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-forest-dark mb-3 group-hover:text-lavender transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                <div className="mt-4 flex items-center text-lavender font-medium text-sm group-hover:translate-x-2 transition-transform">
                  詳しく見る <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </motion.article>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-forest font-medium hover:text-lavender transition-colors"
          >
            すべてのお知らせを見る
            <ArrowRight className="w-5 h-5" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}

// Join Us Section
function JoinUsSection() {
  const membershipTypes = [
    {
      name: "正会員",
      price: "年会費 5,000円",
      benefits: [
        "会報誌の送付",
        "イベント優先参加権",
        "種子の優先配布",
        "会員限定コンテンツ",
        "総会での議決権"
      ],
      recommended: true
    },
    {
      name: "賛助会員",
      price: "年会費 3,000円",
      benefits: [
        "会報誌の送付",
        "イベント参加割引",
        "メールマガジン配信",
        "オンライン勉強会参加"
      ],
      recommended: false
    },
    {
      name: "学生会員",
      price: "年会費 1,000円",
      benefits: [
        "会報誌の送付",
        "イベント参加割引",
        "研究サポート",
        "インターン機会"
      ],
      recommended: false
    }
  ]

  return (
    <section id="join" className="py-24 md:py-32 bg-gradient-to-b from-cream-dark to-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-lavender font-medium mb-4">
            <Users className="w-5 h-5" />
            Join Us
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-forest-dark mb-6">
            会員募集
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
            ホーリーバジルの可能性を一緒に広げていきませんか？<br />
            あなたのご参加を心よりお待ちしております。
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {membershipTypes.map((type, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -10 }}
                className={`relative bg-white rounded-2xl p-8 shadow-lg border-2 h-full flex flex-col ${
                  type.recommended ? 'border-lavender' : 'border-transparent'
                }`}
              >
                {type.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-lavender text-white text-sm font-medium px-4 py-1 rounded-full">
                      おすすめ
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="font-serif text-2xl font-bold text-forest-dark mb-2">{type.name}</h3>
                  <p className="text-lavender font-semibold text-lg">{type.price}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {type.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600">
                      <Leaf className="w-5 h-5 text-forest flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-full font-semibold transition-colors ${
                    type.recommended
                      ? 'bg-lavender text-white hover:bg-lavender-dark'
                      : 'bg-forest text-white hover:bg-forest-dark'
                  }`}
                >
                  入会申し込み
                </motion.button>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Donation Section */}
        <AnimatedSection>
          <div className="bg-gradient-to-r from-forest to-forest-light rounded-2xl p-8 md:p-12 text-white text-center">
            <Heart className="w-12 h-12 mx-auto mb-6 text-lavender-light" />
            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              ご寄付のお願い
            </h3>
            <p className="max-w-2xl mx-auto mb-8 text-white/90 leading-relaxed">
              皆様からのご支援は、ホーリーバジルの研究・普及活動に大切に活用させていただきます。
              一人でも多くの方にこの素晴らしいハーブの恵みをお届けするため、
              温かいご支援をお願い申し上げます。
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-forest font-semibold rounded-full hover:bg-cream transition-colors"
            >
              <Heart className="w-5 h-5" />
              寄付する
            </motion.button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-lavender font-medium mb-4">
            <Mail className="w-5 h-5" />
            Contact
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-forest-dark mb-6">
            お問い合わせ
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
            ご質問やご相談など、お気軽にお問い合わせください。
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedSection>
            <form className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-forest-dark mb-2">
                    お名前 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent outline-none transition-shadow"
                    placeholder="山田 太郎"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest-dark mb-2">
                    メールアドレス <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent outline-none transition-shadow"
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest-dark mb-2">
                    お問い合わせ内容 <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lavender focus:border-transparent outline-none transition-shadow resize-none"
                    placeholder="お問い合わせ内容をご記入ください"
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-forest text-white font-semibold rounded-lg hover:bg-forest-dark transition-colors"
                >
                  送信する
                </motion.button>
              </div>
            </form>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="font-serif text-xl font-bold text-forest-dark mb-6">団体概要</h3>
                <dl className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Building className="w-5 h-5 text-lavender flex-shrink-0 mt-1" />
                    <div>
                      <dt className="text-sm text-gray-500">団体名</dt>
                      <dd className="text-forest-dark font-medium">特定非営利活動法人 日本ホーリーバジル協会</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-lavender flex-shrink-0 mt-1" />
                    <div>
                      <dt className="text-sm text-gray-500">所在地</dt>
                      <dd className="text-forest-dark font-medium">〒100-0001 東京都千代田区千代田1-1-1</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-lavender flex-shrink-0 mt-1" />
                    <div>
                      <dt className="text-sm text-gray-500">メール</dt>
                      <dd className="text-forest-dark font-medium">info@holybasil.or.jp</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-lavender flex-shrink-0 mt-1" />
                    <div>
                      <dt className="text-sm text-gray-500">電話</dt>
                      <dd className="text-forest-dark font-medium">03-1234-5678（平日 10:00-17:00）</dd>
                    </div>
                  </div>
                </dl>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="font-serif text-xl font-bold text-forest-dark mb-6">SNSでつながる</h3>
                <div className="flex gap-4">
                  {[
                    { icon: Facebook, label: "Facebook", color: "hover:bg-blue-600" },
                    { icon: Twitter, label: "Twitter", color: "hover:bg-sky-500" },
                    { icon: Instagram, label: "Instagram", color: "hover:bg-pink-600" },
                    { icon: Youtube, label: "YouTube", color: "hover:bg-red-600" }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{ y: -3 }}
                      className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-colors ${social.color}`}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-forest-dark text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-8 h-8 text-lavender-light" />
              <span className="font-serif text-xl font-semibold">日本ホーリーバジル協会</span>
            </div>
            <p className="text-white/70 leading-relaxed mb-6">
              ホーリーバジルの持つ「癒やし」「生命力」「神聖さ」を伝え、
              その可能性を広げるために活動しています。
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-lavender transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">サイトマップ</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="#about" className="hover:text-lavender-light transition-colors">ホーリーバジルとは</a></li>
              <li><a href="#mission" className="hover:text-lavender-light transition-colors">活動目的</a></li>
              <li><a href="#possibility" className="hover:text-lavender-light transition-colors">可能性</a></li>
              <li><a href="#news" className="hover:text-lavender-light transition-colors">お知らせ</a></li>
              <li><a href="#join" className="hover:text-lavender-light transition-colors">参加する</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">お問い合わせ</h4>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                info@holybasil.or.jp
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                03-1234-5678
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1" />
                <span>〒100-0001<br />東京都千代田区千代田1-1-1</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} 特定非営利活動法人 日本ホーリーバジル協会. All rights reserved.
          </p>
          <div className="flex gap-6 text-white/50 text-sm">
            <a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a>
            <a href="#" className="hover:text-white transition-colors">利用規約</a>
            <a href="#" className="hover:text-white transition-colors">特定商取引法に基づく表記</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Scroll to Top Button
function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-forest text-white rounded-full shadow-lg flex items-center justify-center hover:bg-forest-dark transition-colors z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <MissionSection />
        <PossibilitySection />
        <NewsSection />
        <JoinUsSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
