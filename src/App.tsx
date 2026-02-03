import { useState, useEffect, useRef, type ReactNode, type FC } from 'react'
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
  Shield,
  Brain,
  Wind,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  ChevronUp,
  FileText,
  Scale,
  Building2,
  HandHeart,
  CreditCard,
  CheckCircle2,
  ExternalLink,
  Flower2,
} from 'lucide-react'

// ============================================================================
// Types
// ============================================================================

interface NavItem {
  href: string
  label: string
}

interface Feature {
  icon: FC<{ className?: string }>
  title: string
  description: string
  color: string
}

interface DonationTier {
  amount: string
  label: string
  description: string
  popular?: boolean
}

interface NewsItem {
  date: string
  category: string
  title: string
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
          : 'bg-forest/10 text-forest'
      }`}
    >
      {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
      {badge}
    </motion.div>
    <motion.h2
      variants={fadeInUp}
      className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
        light ? 'text-white' : 'text-slate-900'
      }`}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        variants={fadeInUp}
        className={`max-w-2xl text-lg leading-relaxed ${
          centered ? 'mx-auto' : ''
        } ${light ? 'text-white/80' : 'text-slate-600'}`}
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
    { href: '#benefits', label: '3つの効能' },
    { href: '#global', label: 'グローバル活動' },
    { href: '#support', label: '支援する' },
    { href: '#contact', label: 'お問い合わせ' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              scrolled
                ? 'bg-forest'
                : 'bg-white/20 backdrop-blur-sm group-hover:bg-white/30'
            }`}>
              <Leaf className={`w-5 h-5 ${scrolled ? 'text-white' : 'text-white'}`} />
            </div>
            <div className="hidden sm:block">
              <p className={`font-serif font-semibold transition-colors ${
                scrolled ? 'text-slate-900' : 'text-white'
              }`}>
                日本ホーリーバジル協会
              </p>
              <p className={`text-xs transition-colors ${
                scrolled ? 'text-slate-500' : 'text-white/70'
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
                    ? 'text-slate-600 hover:text-forest hover:bg-forest/5'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#support"
              className={`ml-4 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                scrolled
                  ? 'bg-forest text-white hover:bg-forest-dark'
                  : 'bg-white text-forest hover:bg-white/90'
              }`}
            >
              寄付する
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
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
            className="lg:hidden bg-white border-t border-slate-100"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#support"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 mt-2 rounded-xl bg-forest text-white text-center font-semibold"
              >
                寄付する
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
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-forest via-forest-dark to-slate-900" />

        {/* Decorative Gradient Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-sacred/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-forest-light/20 rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium border border-white/10">
            <Sparkles className="w-4 h-4 text-sacred-light" />
            特定非営利活動法人
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
        >
          古代の叡智が導く
          <br />
          <span className="bg-gradient-to-r from-sacred-light via-white to-sacred-light bg-clip-text text-transparent">
            心身と地球の再生
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 mb-10 leading-relaxed"
        >
          ホーリーバジル（トゥルシー）は、5000年の歴史を持つ
          <span className="text-sacred-light font-medium">アダプトゲン</span>。
          身体・精神・環境を整える万能のハーブを、日本から世界へ。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#about"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-forest font-semibold rounded-full hover:bg-slate-50 transition-all shadow-lg shadow-black/10"
          >
            ホーリーバジルを知る
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#support"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-sacred text-white font-semibold rounded-full hover:bg-sacred-dark transition-all"
          >
            <HandHeart className="w-4 h-4" />
            活動を支援する
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { value: '5000+', label: '年の歴史' },
            { value: '300+', label: '種の有効成分' },
            { value: '∞', label: '可能性' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-white/60 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
            subtitle="インドの伝統医学アーユルヴェーダで「比類なきもの」と称される神聖なハーブ。現代科学がその効能を次々と証明しています。"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Placeholder */}
          <AnimatedSection>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-forest/20 via-sacred/10 to-transparent rounded-3xl blur-2xl" />
              <div className="relative aspect-[4/3] bg-gradient-to-br from-forest/10 to-sacred/10 rounded-2xl overflow-hidden border border-slate-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Flower2 className="w-20 h-20 text-forest/30 mx-auto mb-4" />
                    <p className="text-slate-500">ホーリーバジルのイメージ</p>
                  </div>
                </div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-sacred/10 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-sacred" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">アダプトゲン</p>
                    <p className="text-sm text-slate-500">ストレス適応物質</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <div className="prose prose-lg">
                <p className="text-slate-600 leading-relaxed">
                  <span className="font-serif text-2xl text-forest font-semibold">トゥルシー（Tulsi）</span>
                  —サンスクリット語で「比類なきもの」を意味するホーリーバジルは、
                  インドでは数千年にわたり「生命の霊薬」として崇められてきました。
                </p>
                <p className="text-slate-600 leading-relaxed">
                  現代科学の研究により、300種以上の有効成分が特定され、
                  その抗酸化作用、抗炎症作用、免疫調整作用などが次々と証明されています。
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { icon: FlaskConical, label: '科学的に実証', desc: '300+の有効成分' },
                  { icon: Globe, label: 'WHO認定', desc: '薬用植物として登録' },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-xl">
                    <item.icon className="w-6 h-6 text-forest mb-2" />
                    <p className="font-semibold text-slate-900">{item.label}</p>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>

              <a
                href="#benefits"
                className="inline-flex items-center gap-2 text-forest font-medium hover:gap-3 transition-all"
              >
                3つの効能を詳しく見る
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// Benefits Section
// ============================================================================

const BenefitsSection: FC = () => {
  const features: Feature[] = [
    {
      icon: Heart,
      title: '身体への効能',
      description: '免疫機能の強化、血糖値の調整、抗炎症作用。心臓血管系の健康をサポートし、身体の自然治癒力を高めます。',
      color: 'from-rose-500 to-orange-500'
    },
    {
      icon: Brain,
      title: '精神への効能',
      description: 'ストレスホルモンの調整、不安の軽減、認知機能の向上。心を穏やかに保ち、集中力と記憶力をサポートします。',
      color: 'from-sacred to-indigo-500'
    },
    {
      icon: Wind,
      title: '環境への効能',
      description: '空気中の有害物質を浄化し、電磁波の影響を軽減。栽培することで周囲の環境全体を浄化する力を持ちます。',
      color: 'from-forest to-teal-500'
    }
  ]

  return (
    <section id="benefits" className="py-24 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <SectionHeader
            badge="Three Powers"
            badgeIcon={Sparkles}
            title="3つの効能"
            subtitle="ホーリーバジルは、身体・精神・環境の三位一体で私たちの生活を豊かにします。"
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-2xl p-8 shadow-sm border border-slate-100 h-full hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
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
// Global Vision Section
// ============================================================================

const GlobalSection: FC = () => {
  return (
    <section id="global" className="py-24 md:py-32 bg-gradient-to-br from-forest via-forest-dark to-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <SectionHeader
            badge="Global Vision"
            badgeIcon={Globe}
            title="グローバルな視点"
            subtitle="ホーリーバジルの普及を通じて、国境を越えた持続可能な社会の実現を目指します。"
            light
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sun className="w-6 h-6 text-gold-light" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">ミャンマー復興支援プロジェクト</h3>
                    <p className="text-white/70 leading-relaxed">
                      ホーリーバジルの栽培を通じて、ミャンマーの農村コミュニティの経済的自立を支援。
                      持続可能な農業と公正な取引の仕組みを構築しています。
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sacred/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-sacred-light" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">国際研究ネットワーク</h3>
                    <p className="text-white/70 leading-relaxed">
                      インド、タイ、日本の研究機関と連携し、ホーリーバジルの効能に関する
                      科学的エビデンスの蓄積と新たな活用法の開発を推進しています。
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-forest-light/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sprout className="w-6 h-6 text-green-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">国内栽培普及活動</h3>
                    <p className="text-white/70 leading-relaxed">
                      日本各地での栽培講座の開催、種子の配布、栽培マニュアルの提供を通じて、
                      誰もがホーリーバジルを育てられる環境を整備しています。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="relative">
              <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center">
                <Globe className="w-32 h-32 text-white/20" />
              </div>
              {/* Floating Stats */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
                <p className="text-3xl font-bold text-forest">3</p>
                <p className="text-sm text-slate-600">連携国</p>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl">
                <p className="text-3xl font-bold text-sacred">12</p>
                <p className="text-sm text-slate-600">提携研究機関</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// Support Section (Donation & Membership)
// ============================================================================

const SupportSection: FC = () => {
  const donationTiers: DonationTier[] = [
    { amount: '1,000', label: 'サポーター', description: '活動報告メールの配信' },
    { amount: '3,000', label: 'フレンド', description: '会報誌(年4回)の送付', popular: true },
    { amount: '10,000', label: 'パートナー', description: 'イベント優先参加権' },
    { amount: '30,000', label: 'スポンサー', description: '名前の掲載・特別招待' },
  ]

  return (
    <section id="support" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <SectionHeader
            badge="Support Us"
            badgeIcon={HandHeart}
            title="活動を支援する"
            subtitle="あなたのご支援が、ホーリーバジルの普及と研究を支え、より良い社会の実現につながります。"
          />
        </motion.div>

        {/* Donation Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {donationTiers.map((tier, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className={`relative bg-white rounded-2xl p-6 border-2 transition-all cursor-pointer group ${
                  tier.popular
                    ? 'border-sacred shadow-lg shadow-sacred/10'
                    : 'border-slate-200 hover:border-forest'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sacred text-white text-xs font-semibold px-3 py-1 rounded-full">
                    人気
                  </span>
                )}
                <div className="text-center">
                  <p className="text-sm text-slate-500 mb-1">{tier.label}</p>
                  <p className="text-3xl font-bold text-slate-900 mb-1">
                    ¥{tier.amount}
                    <span className="text-base font-normal text-slate-500">/月</span>
                  </p>
                  <p className="text-sm text-slate-600">{tier.description}</p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* One-time Donation */}
        <AnimatedSection>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-4">
                  一回のご寄付も歓迎します
                </h3>
                <p className="text-slate-600 mb-6">
                  金額を自由にご指定いただける一回限りのご寄付も承っております。
                  すべてのご支援は、研究活動と普及啓発に活用させていただきます。
                </p>
                <div className="flex flex-wrap gap-3">
                  {['3,000', '5,000', '10,000', '任意'].map((amount) => (
                    <button
                      key={amount}
                      className="px-6 py-3 bg-white rounded-xl border border-slate-200 hover:border-forest hover:bg-forest hover:text-white transition-all font-medium"
                    >
                      {amount === '任意' ? amount : `¥${amount}`}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <div className="w-48 h-48 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                  <CreditCard className="w-16 h-16 text-slate-300" />
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Trust Badges */}
        <AnimatedSection className="mt-12">
          <div className="flex flex-wrap justify-center gap-8 items-center text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-forest" />
              <span className="text-sm">税制優遇対象</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-forest" />
              <span className="text-sm">安全な決済</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-forest" />
              <span className="text-sm">領収書発行</span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ============================================================================
// News Section
// ============================================================================

const NewsSection: FC = () => {
  const news: NewsItem[] = [
    { date: '2024.12.15', category: 'イベント', title: '第12回ホーリーバジル栽培講座を開催' },
    { date: '2024.12.01', category: '研究', title: '抗酸化作用に関する共同研究成果を発表' },
    { date: '2024.11.20', category: 'メディア', title: 'NHK「健康ライフ」に代表が出演' },
  ]

  return (
    <section className="py-24 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <SectionHeader
            badge="News"
            badgeIcon={BookOpen}
            title="お知らせ"
            subtitle="協会の最新活動情報をお届けします。"
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.article
                whileHover={{ y: -4 }}
                className="group bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm text-slate-500">{item.date}</span>
                  <span className="text-xs px-2 py-1 bg-forest/10 text-forest rounded-full">
                    {item.category}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900 group-hover:text-forest transition-colors">
                  {item.title}
                </h3>
                <ArrowUpRight className="w-5 h-5 text-slate-400 mt-4 group-hover:text-forest group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </motion.article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// Contact Section
// ============================================================================

const ContactSection: FC = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-white">
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
            subtitle="ご質問、取材依頼、協業のご相談など、お気軽にご連絡ください。"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedSection>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    お名前 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sacred focus:border-transparent transition-all"
                    placeholder="山田 太郎"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    メールアドレス <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sacred focus:border-transparent transition-all"
                    placeholder="example@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  お問い合わせ種別
                </label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sacred focus:border-transparent transition-all">
                  <option>一般的なお問い合わせ</option>
                  <option>入会・寄付について</option>
                  <option>取材・講演依頼</option>
                  <option>協業・パートナーシップ</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  メッセージ <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sacred focus:border-transparent transition-all resize-none"
                  placeholder="お問い合わせ内容をご記入ください"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-forest text-white font-semibold rounded-xl hover:bg-forest-dark transition-colors"
              >
                送信する
              </motion.button>
            </form>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-2xl p-6">
                <h3 className="font-semibold text-slate-900 mb-4">団体情報</h3>
                <dl className="space-y-4">
                  {[
                    { icon: Building2, label: '団体名', value: '特定非営利活動法人 日本ホーリーバジル協会' },
                    { icon: MapPin, label: '所在地', value: '〒100-0001 東京都千代田区千代田1-1-1' },
                    { icon: Mail, label: 'メール', value: 'info@holybasil.or.jp' },
                    { icon: Phone, label: '電話', value: '03-1234-5678（平日 10:00-17:00）' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <item.icon className="w-5 h-5 text-forest mt-0.5" />
                      <div>
                        <dt className="text-sm text-slate-500">{item.label}</dt>
                        <dd className="text-slate-900">{item.value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Quick Links */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: FileText, label: '定款', href: '#' },
                  { icon: Scale, label: '決算公告', href: '#' },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group"
                  >
                    <item.icon className="w-5 h-5 text-slate-400 group-hover:text-forest" />
                    <span className="text-slate-700 group-hover:text-forest">{item.label}</span>
                    <ExternalLink className="w-4 h-4 text-slate-400 ml-auto" />
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
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-forest rounded-xl flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-serif font-semibold">日本ホーリーバジル協会</p>
                <p className="text-sm text-slate-400">Holy Basil Association Japan</p>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md">
              ホーリーバジルの持つ「癒し」「生命力」「神聖さ」を伝え、
              心身と地球の再生に貢献する活動を行っています。
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">サイトマップ</h4>
            <ul className="space-y-2 text-slate-400">
              {['ホーリーバジルとは', '3つの効能', 'グローバル活動', '支援する', 'お問い合わせ'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">法人情報</h4>
            <ul className="space-y-2 text-slate-400">
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
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} 特定非営利活動法人 日本ホーリーバジル協会
          </p>
          <p className="text-slate-600 text-sm">
            Made with <Heart className="w-4 h-4 inline text-rose-500" /> for a better world
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
          className="fixed bottom-8 right-8 w-12 h-12 bg-forest text-white rounded-full shadow-lg flex items-center justify-center hover:bg-forest-dark transition-colors z-50"
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
    <div className="min-h-screen bg-medical">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <BenefitsSection />
        <GlobalSection />
        <SupportSection />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
