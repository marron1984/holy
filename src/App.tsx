import { useState, useEffect, useRef, type ReactNode, type FC } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Leaf,
  Heart,
  Brain,
  Wind,
  Sparkles,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  ChevronUp,
  FileText,
  Scale,
  Building2,
  Users,
  UserCircle,
  Calendar,
  CheckCircle2,
  Quote,
  Flower2,
  Shield,
  Crown,
} from 'lucide-react'

// ============================================================================
// Types
// ============================================================================

interface NavItem {
  href: string
  label: string
}

interface BoardMember {
  role: string
  name: string
  isChair?: boolean
}

interface MembershipPlan {
  name: string
  admission: string
  annual: string
  features: string[]
  recommended?: boolean
}

// ============================================================================
// Animation Variants
// ============================================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

// ============================================================================
// Utility Components
// ============================================================================

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

const AnimatedSection: FC<AnimatedSectionProps> = ({ children, className = '', delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface SectionHeaderProps {
  badge: string
  badgeIcon?: FC<{ className?: string }>
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

const SectionHeader: FC<SectionHeaderProps> = ({
  badge,
  badgeIcon: BadgeIcon,
  title,
  subtitle,
  centered = true,
  light = false
}) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
    <motion.div
      variants={fadeInUp}
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${
        light
          ? 'bg-white/10 text-white/90'
          : 'bg-leaf/10 text-leaf'
      }`}
    >
      {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
      {badge}
    </motion.div>
    <motion.h2
      variants={fadeInUp}
      className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
        light ? 'text-white' : 'text-gray-900'
      }`}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        variants={fadeInUp}
        className={`max-w-2xl text-lg leading-relaxed ${
          centered ? 'mx-auto' : ''
        } ${light ? 'text-white/80' : 'text-gray-600'}`}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
)

// ============================================================================
// Navigation
// ============================================================================

const Navigation: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems: NavItem[] = [
    { href: '#about', label: 'ホーリーバジルとは' },
    { href: '#organization', label: '協会について' },
    { href: '#membership', label: '入会案内' },
    { href: '#contact', label: 'お問い合わせ' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              scrolled
                ? 'bg-leaf'
                : 'bg-white/20 backdrop-blur-sm group-hover:bg-white/30'
            }`}>
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className={`font-serif font-semibold transition-colors ${
                scrolled ? 'text-gray-900' : 'text-white'
              }`}>
                日本ホーリーバジル協会
              </p>
              <p className={`text-xs transition-colors ${
                scrolled ? 'text-gray-500' : 'text-white/70'
              }`}>
                Holy Basil Association Japan
              </p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  scrolled
                    ? 'text-gray-600 hover:text-leaf hover:bg-leaf/5'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#membership"
              className={`ml-4 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                scrolled
                  ? 'bg-leaf text-white hover:bg-leaf-dark'
                  : 'bg-white text-leaf hover:bg-white/90'
              }`}
            >
              入会する
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
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
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#membership"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 mt-2 rounded-xl bg-leaf text-white text-center font-semibold"
              >
                入会する
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

// ============================================================================
// Hero Section
// ============================================================================

const HeroSection: FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background - Image Placeholder */}
      <div className="absolute inset-0">
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-leaf/90 via-leaf-dark/85 to-gray-900/90 z-10" />

        {/* Placeholder for Holy Basil photo */}
        <div className="absolute inset-0 bg-gradient-to-br from-leaf-light/30 to-flower/20">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <Flower2 className="w-96 h-96 text-white" />
          </div>
        </div>

        {/* Decorative Gradient Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-flower/30 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-leaf-light/20 rounded-full blur-3xl z-0" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium border border-white/10">
            <Sparkles className="w-4 h-4 text-flower-light" />
            特定非営利活動法人
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
        >
          万能のハーブが
          <br />
          <span className="bg-gradient-to-r from-flower-light via-white to-flower-light bg-clip-text text-transparent">
            心と体、そして地球を救う
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 mb-10 leading-relaxed"
        >
          ホーリーバジル（トゥルシー）の普及・栽培支援・研究活動を通じて、
          <br className="hidden md:block" />
          人々の健康と地球環境の改善に貢献します。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#about"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-leaf font-semibold rounded-full hover:bg-gray-50 transition-all shadow-lg shadow-black/10"
          >
            ホーリーバジルを知る
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#membership"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-flower text-white font-semibold rounded-full hover:bg-flower-dark transition-all"
          >
            <Users className="w-4 h-4" />
            入会案内を見る
          </a>
        </motion.div>

        {/* Organization info badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 inline-flex items-center gap-4 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10"
        >
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Calendar className="w-4 h-4" />
            <span>設立認証：2025年11月19日</span>
          </div>
          <div className="w-px h-4 bg-white/30" />
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <MapPin className="w-4 h-4" />
            <span>石川県金沢市</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronUp className="w-5 h-5 rotate-180" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ============================================================================
// About Section
// ============================================================================

const AboutSection: FC = () => {
  const benefits = [
    {
      icon: Heart,
      title: '身体への効能',
      description: '免疫力向上、抗酸化作用、血糖値調整など、身体の自然治癒力を高めます。',
      color: 'from-rose-500 to-orange-500'
    },
    {
      icon: Brain,
      title: '精神への効能',
      description: 'ストレス軽減、不安緩和、集中力向上など、心のバランスを整えます。',
      color: 'from-flower to-indigo-500'
    },
    {
      icon: Wind,
      title: '環境への効能',
      description: '空気浄化、土壌改善など、周囲の環境を清浄に保つ力を持ちます。',
      color: 'from-leaf to-teal-500'
    }
  ]

  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <SectionHeader
            badge="About Holy Basil"
            badgeIcon={Leaf}
            title="ホーリーバジルとは"
            subtitle="インドの伝統医学アーユルヴェーダで「比類なきもの」と称される神聖なハーブ。5000年以上の歴史を持つアダプトゲンです。"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image Placeholder */}
          <AnimatedSection>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-leaf/20 via-flower/10 to-transparent rounded-3xl blur-2xl" />
              <div className="relative aspect-[4/3] bg-gradient-to-br from-leaf/10 to-flower/10 rounded-2xl overflow-hidden border border-gray-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Flower2 className="w-24 h-24 text-leaf/30 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">ホーリーバジルの画像</p>
                    <p className="text-gray-400 text-sm mt-1">緑の葉と紫の花</p>
                  </div>
                </div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-flower/10 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-flower" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">アダプトゲン</p>
                    <p className="text-sm text-gray-500">ストレス適応物質</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <div className="prose prose-lg">
                <p className="text-gray-600 leading-relaxed">
                  <span className="font-serif text-2xl text-leaf font-semibold">トゥルシー（Tulsi）</span>
                  —サンスクリット語で「比類なきもの」を意味するホーリーバジルは、
                  インドでは数千年にわたり「生命の霊薬」「ハーブの女王」として崇められてきました。
                </p>
                <p className="text-gray-600 leading-relaxed">
                  現代科学の研究により、300種以上の有効成分が特定され、
                  その抗酸化作用、抗炎症作用、免疫調整作用などが次々と証明されています。
                  私たちは、この素晴らしいハーブの可能性を日本全国に広めてまいります。
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Three Benefits */}
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group relative bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// Organization Section
// ============================================================================

const OrganizationSection: FC = () => {
  const boardMembers: BoardMember[] = [
    { role: '理事長', name: '杉浦 正', isChair: true },
    { role: '理事', name: '大矢 法子' },
    { role: '理事', name: '杉浦 紀美子' },
    { role: '理事', name: '佐野 朝美' },
    { role: '理事', name: '柿沼 伸佳' },
    { role: '監事', name: '前日 翔' },
  ]

  return (
    <section id="organization" className="py-24 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <SectionHeader
            badge="Organization"
            badgeIcon={Building2}
            title="協会について"
            subtitle="ホーリーバジルの普及と研究を通じて、人々の健康と環境の改善に貢献します。"
          />
        </motion.div>

        {/* Director's Message */}
        <AnimatedSection className="mb-20">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="grid lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-1 text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-leaf/20 to-flower/20 rounded-full flex items-center justify-center mb-4">
                  <UserCircle className="w-20 h-20 text-leaf/50" />
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900">杉浦 正</h3>
                <p className="text-leaf font-medium">理事長</p>
              </div>
              <div className="lg:col-span-2">
                <Quote className="w-10 h-10 text-flower/30 mb-4" />
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  ホーリーバジルは、古代インドから伝わる「生命の霊薬」です。
                  私たちは、この素晴らしいハーブの持つ癒しの力を、一人でも多くの方にお届けしたいと考えています。
                  栽培の普及、研究活動、そして国際交流を通じて、
                  人々の心身の健康と地球環境の改善に貢献してまいります。
                </p>
                <p className="text-gray-600 leading-relaxed">
                  皆様のご支援とご参加を心よりお待ちしております。
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Board Members */}
        <AnimatedSection className="mb-20">
          <h3 className="font-serif text-2xl font-bold text-gray-900 text-center mb-10">役員一覧</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {boardMembers.map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className={`bg-white rounded-2xl p-6 border transition-all ${
                  member.isChair
                    ? 'border-leaf shadow-lg'
                    : 'border-gray-100 hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    member.isChair
                      ? 'bg-leaf/10'
                      : member.role === '監事'
                      ? 'bg-gray-100'
                      : 'bg-flower/10'
                  }`}>
                    {member.isChair ? (
                      <Crown className="w-7 h-7 text-leaf" />
                    ) : (
                      <UserCircle className={`w-7 h-7 ${member.role === '監事' ? 'text-gray-400' : 'text-flower'}`} />
                    )}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${
                      member.isChair ? 'text-leaf' : member.role === '監事' ? 'text-gray-500' : 'text-flower'
                    }`}>
                      {member.role}
                    </p>
                    <p className="font-semibold text-gray-900 text-lg">{member.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Organization Details */}
        <AnimatedSection>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
            <h3 className="font-serif text-2xl font-bold text-gray-900 text-center mb-10">団体概要</h3>
            <div className="max-w-3xl mx-auto">
              <dl className="grid sm:grid-cols-2 gap-8">
                {[
                  { label: '団体名', value: '特定非営利活動法人\n日本ホーリーバジル協会' },
                  { label: '所在地', value: '石川県金沢市高畠二丁目6番' },
                  { label: '代表者', value: '理事長 杉浦 正' },
                  { label: '設立認証日', value: '2025年11月19日' },
                ].map((item, i) => (
                  <div key={i} className="border-b border-gray-100 pb-4">
                    <dt className="text-sm text-gray-500 mb-1">{item.label}</dt>
                    <dd className="text-gray-900 font-medium whitespace-pre-line">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ============================================================================
// Membership Section
// ============================================================================

const MembershipSection: FC = () => {
  const plans: MembershipPlan[] = [
    {
      name: '正会員',
      admission: '10,000',
      annual: '120,000',
      features: [
        '総会での議決権',
        '会報誌の送付（年4回）',
        'イベント優先参加権',
        '種子・苗の優先配布',
        '栽培指導サポート',
        '研究成果の共有',
      ],
      recommended: true
    },
    {
      name: '賛助会員',
      admission: '5,000',
      annual: '60,000',
      features: [
        '会報誌の送付（年4回）',
        'イベント参加権',
        'メールマガジン配信',
        'オンライン勉強会参加',
      ],
    }
  ]

  return (
    <section id="membership" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <SectionHeader
            badge="Membership"
            badgeIcon={Users}
            title="入会案内"
            subtitle="ホーリーバジルの普及活動に参加しませんか？会員の皆様と共に、この素晴らしいハーブの可能性を広げてまいります。"
          />
        </motion.div>

        {/* Membership Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className={`relative bg-white rounded-3xl p-8 h-full flex flex-col ${
                  plan.recommended
                    ? 'border-2 border-leaf shadow-xl'
                    : 'border-2 border-gray-200'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-leaf text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                      おすすめ
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-gray-500 text-sm">入会金</span>
                      <span className="text-2xl font-bold text-gray-900">¥{plan.admission}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-gray-500 text-sm">年会費</span>
                      <span className="text-3xl font-bold text-leaf">¥{plan.annual}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.recommended ? 'text-leaf' : 'text-flower'
                      }`} />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-semibold transition-colors ${
                    plan.recommended
                      ? 'bg-leaf text-white hover:bg-leaf-dark'
                      : 'bg-flower text-white hover:bg-flower-dark'
                  }`}
                >
                  入会申し込み
                </motion.button>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Membership Table */}
        <AnimatedSection>
          <div className="bg-gray-50 rounded-3xl p-8 max-w-3xl mx-auto">
            <h3 className="font-serif text-xl font-bold text-gray-900 text-center mb-6">会費一覧表</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-4 px-4 text-left text-gray-500 font-medium">会員種別</th>
                    <th className="py-4 px-4 text-right text-gray-500 font-medium">入会金</th>
                    <th className="py-4 px-4 text-right text-gray-500 font-medium">年会費</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-semibold text-gray-900">正会員</td>
                    <td className="py-4 px-4 text-right text-gray-700">¥10,000</td>
                    <td className="py-4 px-4 text-right text-gray-700 font-semibold">¥120,000</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-gray-900">賛助会員</td>
                    <td className="py-4 px-4 text-right text-gray-700">¥5,000</td>
                    <td className="py-4 px-4 text-right text-gray-700 font-semibold">¥60,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ============================================================================
// Contact Section
// ============================================================================

const ContactSection: FC = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <SectionHeader
            badge="Contact"
            badgeIcon={Mail}
            title="お問い合わせ"
            subtitle="入会のご相談、取材依頼、その他ご質問など、お気軽にお問い合わせください。"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedSection>
            <form className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      お名前 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-flower focus:border-transparent transition-all"
                      placeholder="山田 太郎"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      メールアドレス <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-flower focus:border-transparent transition-all"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    お問い合わせ種別
                  </label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-flower focus:border-transparent transition-all">
                    <option>入会について</option>
                    <option>活動について</option>
                    <option>取材・講演依頼</option>
                    <option>その他</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    メッセージ <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-flower focus:border-transparent transition-all resize-none"
                    placeholder="お問い合わせ内容をご記入ください"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-leaf text-white font-semibold rounded-xl hover:bg-leaf-dark transition-colors"
                >
                  送信する
                </motion.button>
              </div>
            </form>
          </AnimatedSection>

          {/* Contact Info & Map */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              {/* Info Card */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-6">団体情報</h3>
                <dl className="space-y-4">
                  {[
                    { icon: Building2, label: '団体名', value: '特定非営利活動法人 日本ホーリーバジル協会' },
                    { icon: MapPin, label: '所在地', value: '石川県金沢市高畠二丁目6番' },
                    { icon: Mail, label: 'メール', value: 'info@holybasil.or.jp' },
                    { icon: Phone, label: '電話', value: '076-XXX-XXXX（平日 10:00-17:00）' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <item.icon className="w-5 h-5 text-leaf mt-0.5" />
                      <div>
                        <dt className="text-sm text-gray-500">{item.label}</dt>
                        <dd className="text-gray-900">{item.value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-leaf/10 to-flower/10 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-leaf/30 mx-auto mb-2" />
                    <p className="text-gray-500">石川県金沢市高畠二丁目6番</p>
                    <p className="text-gray-400 text-sm">Map Placeholder</p>
                  </div>
                </div>
              </div>

              {/* Legal Links */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: FileText, label: '定款', href: '#' },
                  { icon: Scale, label: '決算公告', href: '#' },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors group"
                  >
                    <item.icon className="w-5 h-5 text-gray-400 group-hover:text-leaf" />
                    <span className="text-gray-700 group-hover:text-leaf font-medium">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// Footer
// ============================================================================

const Footer: FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-leaf rounded-xl flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-serif font-semibold">日本ホーリーバジル協会</p>
                <p className="text-sm text-gray-400">Holy Basil Association Japan</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md">
              ホーリーバジルの持つ「癒し」「生命力」「神聖さ」を伝え、
              人々の健康と地球環境の改善に貢献する活動を行っています。
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">サイトマップ</h4>
            <ul className="space-y-2 text-gray-400">
              {['ホーリーバジルとは', '協会について', '入会案内', 'お問い合わせ'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">法人情報</h4>
            <ul className="space-y-2 text-gray-400">
              {[
                { label: '定款', href: '#' },
                { label: '役員紹介', href: '#' },
                { label: '決算公告', href: '#' },
                { label: 'プライバシーポリシー', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-white transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} 特定非営利活動法人 日本ホーリーバジル協会
          </p>
          <p className="text-gray-600 text-sm">
            石川県金沢市高畠二丁目6番
          </p>
        </div>
      </div>
    </footer>
  )
}

// ============================================================================
// Scroll to Top
// ============================================================================

const ScrollToTop: FC = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-leaf text-white rounded-full shadow-lg flex items-center justify-center hover:bg-leaf-dark transition-colors z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// ============================================================================
// Main App
// ============================================================================

const App: FC = () => {
  return (
    <div className="min-h-screen bg-base">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <OrganizationSection />
        <MembershipSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
