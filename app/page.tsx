"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  BookOpen,
  Users,
  GraduationCap,
  Target,
  Clock,
  CheckCircle2,
  Menu,
  X,
  Play,
  FileText,
  Timer,
  HeadphonesIcon,
  BarChart3,
  Calendar,
  TrendingUp,
  Lightbulb,
  School,
  Brain,
  Calculator,
  Download,
  ArrowRight,
  Quote,
  Star,
  Award,
} from "lucide-react"
import Image from "next/image"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard")
    }
  }, [isLoaded, isSignedIn, router])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f8f7]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#38e07b]"></div>
      </div>
    )
  }

  if (isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f8f7]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#38e07b]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f6f8f7]">
      <nav className="sticky top-0 z-50 bg-[#111714] border-b border-[#29382f] shadow-sm">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 flex items-center justify-center text-[#38e07b]">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div className="text-xl font-bold text-white">NUET Prep</div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("about")}
                className="text-white text-sm font-medium hover:text-[#38e07b] transition-colors"
              >
                О NUET
              </button>
              <button
                onClick={() => scrollToSection("audience")}
                className="text-white text-sm font-medium hover:text-[#38e07b] transition-colors"
              >
                Для кого
              </button>
              <button
                onClick={() => scrollToSection("benefits")}
                className="text-white text-sm font-medium hover:text-[#38e07b] transition-colors"
              >
                Преимущества
              </button>
              <button
                onClick={() => scrollToSection("program")}
                className="text-white text-sm font-medium hover:text-[#38e07b] transition-colors"
              >
                Программа
              </button>
              <button
                onClick={() => scrollToSection("format")}
                className="text-white text-sm font-medium hover:text-[#38e07b] transition-colors"
              >
                Формат
              </button>
              <button
                onClick={() => scrollToSection("teachers")}
                className="text-white text-sm font-medium hover:text-[#38e07b] transition-colors"
              >
                Преподаватели
              </button>
              <button
                onClick={() => scrollToSection("trial")}
                className="text-white text-sm font-medium hover:text-[#38e07b] transition-colors"
              >
                Пробный урок
              </button>
              <Button 
                size="sm" 
                className="bg-[#38e07b] hover:bg-[#2bc768] text-[#111714] font-bold rounded-full"
                onClick={() => router.push("/sign-in")}
              >
                Войти
              </Button>
            </div>

            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3">
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left py-2 text-white hover:text-[#38e07b]"
              >
                О NUET
              </button>
              <button
                onClick={() => scrollToSection("audience")}
                className="block w-full text-left py-2 text-white hover:text-[#38e07b]"
              >
                Для кого
              </button>
              <button
                onClick={() => scrollToSection("benefits")}
                className="block w-full text-left py-2 text-white hover:text-[#38e07b]"
              >
                Преимущества
              </button>
              <button
                onClick={() => scrollToSection("program")}
                className="block w-full text-left py-2 text-white hover:text-[#38e07b]"
              >
                Программа
              </button>
              <button
                onClick={() => scrollToSection("format")}
                className="block w-full text-left py-2 text-white hover:text-[#38e07b]"
              >
                Формат
              </button>
              <button
                onClick={() => scrollToSection("teachers")}
                className="block w-full text-left py-2 text-white hover:text-[#38e07b]"
              >
                Преподаватели
              </button>
              <button
                onClick={() => scrollToSection("trial")}
                className="block w-full text-left py-2 text-white hover:text-[#38e07b]"
              >
                Пробный урок
              </button>
              <Button 
                className="w-full bg-[#38e07b] hover:bg-[#2bc768] text-[#111714] font-bold rounded-full mt-2"
                onClick={() => router.push("/sign-in")}
              >
                Войти
              </Button>
            </div>
          )}
        </div>
      </nav>

      <section className="py-20 md:py-32 bg-gradient-to-br from-[#38e07b]/10 to-[#f6f8f7]">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-balance text-[#111714] leading-tight">
              Подготовка к экзамену <span className="text-[#38e07b]">NUET</span> с экспертами
            </h1>
            <p className="text-lg md:text-xl text-[#63756c] mb-8 text-pretty leading-relaxed">
              Комплексная программа подготовки, разработанная для успешной сдачи национального вступительного теста
              Непала
            </p>
            <Button
              size="lg"
              className="bg-[#38e07b] hover:bg-[#2bc768] text-[#111714] font-bold rounded-full text-base px-8 h-14 shadow-lg shadow-[#38e07b]/30 hover:shadow-[#38e07b]/50"
              onClick={() => scrollToSection("trial")}
            >
              Начать бесплатный пробный период
            </Button>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-[#63756c]">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#38e07b]" />
                <span>5000+ студентов</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#38e07b]" />
                <span>Опытные преподаватели</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#38e07b]" />
                <span>95% успеха</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-8 text-center text-[#111714]">Что такое NUET?</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-[#63756c] mb-6 leading-relaxed text-lg text-center max-w-[800px] mx-auto">
                Национальный университетский вступительный тест (NUET) — это стандартизированный экзамен для поступления
                в университеты Непала. Тест оценивает знания и способности студентов по нескольким предметам.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <Card className="border border-[#e6e8e7] hover:border-[#38e07b]/50 transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-[#111714]">
                      <BookOpen className="w-5 h-5 text-[#38e07b]" />
                      Структура экзамена
                    </h3>
                    <p className="text-[#63756c] leading-relaxed">
                      NUET состоит из вопросов с множественным выбором по математике, естественным наукам, английскому
                      языку и критическому мышлению для оценки академической готовности.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border border-[#e6e8e7] hover:border-[#38e07b]/50 transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-[#111714]">
                      <Clock className="w-5 h-5 text-[#38e07b]" />
                      Управление временем
                    </h3>
                    <p className="text-[#63756c] leading-relaxed">
                      Экзамен проводится по времени и требует стратегических навыков управления временем. Наш курс
                      поможет развить необходимую скорость и точность.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="audience" className="py-20 bg-[#f6f8f7]">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <h2 className="text-3xl md:text-5xl font-black mb-12 text-center text-[#111714]">Для кого этот курс?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Выпускники школ",
                description: "Студенты, окончившие +2 и готовящиеся к вступительным экзаменам в университет",
                icon: GraduationCap,
              },
              {
                title: "Студенты на gap year",
                description: "Те, кто взял год перерыва для подготовки к экзаменам и развития навыков",
                icon: Clock,
              },
              {
                title: "Работающие профессионалы",
                description: "Люди, желающие получить высшее образование параллельно с карьерой",
                icon: Users,
              },
              {
                title: "Будущие студенты",
                description: "Все, кто стремится поступить в ведущие университеты Непала",
                icon: Target,
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all border border-[#e6e8e7] hover:border-[#38e07b]/50 bg-white"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-[#38e07b]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-[#38e07b]" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-[#111714]">{item.title}</h3>
                  <p className="text-sm text-[#63756c] leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <h2 className="text-3xl md:text-5xl font-black mb-12 text-center text-[#111714]">
            Почему выбирают наш курс NUET?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Полная программа",
                description: "Полный охват всех предметов NUET с подробными объяснениями и практическими материалами",
              },
              {
                title: "Опытные преподаватели",
                description: "Обучение у опытных учителей, понимающих структуру экзамена и систему оценивания",
              },
              {
                title: "Пробные тесты",
                description: "Регулярные пробные тесты и практические вопросы, имитирующие реальный экзамен",
              },
              {
                title: "Гибкое обучение",
                description: "Учитесь в своем темпе с доступом к материалам и записанным занятиям 24/7",
              },
              {
                title: "Персональная поддержка",
                description: "Получайте индивидуальное внимание и обратную связь для работы над слабыми сторонами",
              },
              {
                title: "Доказанные результаты",
                description: "Присоединяйтесь к тысячам успешных студентов, достигших цели поступления в университет",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all border border-[#e6e8e7] hover:border-[#38e07b]/50"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#38e07b] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-[#111714]">{item.title}</h3>
                      <p className="text-sm text-[#63756c] leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="program" className="py-20 bg-[#111714]">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-white">
              Программа подготовки к <span className="text-[#38e07b]">NUET</span>
            </h2>
            <p className="text-[#9eb7a8] text-lg leading-relaxed max-w-[800px] mx-auto">
              Закрываем ключевые темы по Математике и Критическому мышлению, которые проверяет NUET
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            {/* Mathematics Card */}
            <Card className="bg-[#1a2c23] border border-[#3d5245] hover:border-[#38e07b]/50 transition-all shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 border-b border-[#3d5245] pb-6 mb-6">
                  <div className="w-14 h-14 bg-[#38e07b]/10 rounded-xl flex items-center justify-center text-[#38e07b]">
                    <Calculator className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Математика</h3>
                    <p className="text-[#9eb7a8] text-sm mt-1">Ключевые разделы</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "Числа и выражения",
                    "Алгебра",
                    "Системы уравнений",
                    "Функции и графики",
                    "Геометрия",
                    "Площади и объёмы фигур",
                    "Элементы тригонометрии",
                    "Вероятность и элементы статистики",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#38e07b] flex-shrink-0 mt-0.5" />
                      <span className="text-[#d0e0d8]">{item}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5 mt-4">
                    <Star className="w-5 h-5 text-[#38e07b] flex-shrink-0 mt-0.5" />
                    <span className="text-white font-medium">Сложные задачи уровня NUET</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Critical Thinking Card */}
            <Card className="bg-[#1a2c23] border border-[#3d5245] hover:border-[#38e07b]/50 transition-all shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 border-b border-[#3d5245] pb-6 mb-6">
                  <div className="w-14 h-14 bg-[#38e07b]/10 rounded-xl flex items-center justify-center text-[#38e07b]">
                    <Brain className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Критическое мышление</h3>
                    <p className="text-[#9eb7a8] text-sm mt-1">Решение проблем</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "Анализ текстов и аргументов",
                    "Логические задачи и последовательности",
                    "Таблицы, графики, диаграммы",
                    "Работа с данными",
                    "Задачи с лишней или скрытой информацией",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#38e07b] flex-shrink-0 mt-0.5" />
                      <span className="text-[#d0e0d8]">{item}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5 mt-4">
                    <Timer className="w-5 h-5 text-[#38e07b] flex-shrink-0 mt-0.5" />
                    <span className="text-white font-medium">Стратегии работы с тестом и тайм-менеджмент</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#3d5245] bg-[#1c2620]/50 px-4 py-2">
              <Lightbulb className="w-5 h-5 text-[#9eb7a8]" />
              <p className="text-[#9eb7a8] text-sm">Программа может адаптироваться под уровень группы</p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button className="bg-[#38e07b] hover:bg-[#2bc768] text-[#111714] font-bold rounded-full h-14 px-8 text-base shadow-lg shadow-[#38e07b]/30 hover:shadow-[#38e07b]/50">
              <Download className="w-5 h-5 mr-2" />
              Скачать подробную программу (PDF)
            </Button>
          </div>
        </div>
      </section>

      {/* Learning Format Section */}
      <section id="format" className="py-20 bg-[#f6f8f7]">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center rounded-full bg-[#38e07b]/10 px-4 py-1.5 mb-4">
              <span className="text-[#38e07b] text-sm font-bold uppercase tracking-wider">Как это работает</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-[#111714]">Как проходит обучение</h2>
            <p className="text-[#63756c] text-lg leading-relaxed max-w-[600px] mx-auto">
              Всё обучение проходит онлайн на нашей образовательной платформе
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            {[
              {
                title: "Видеоуроки по темам NUET",
                description:
                  "Подробные видео-разборы тем по математике и критическому мышлению, упрощающие сложные концепции",
                icon: Play,
              },
              {
                title: "Домашние задания",
                description:
                  "Практические задачи после каждого модуля для закрепления материала и обеспечения усвоения",
                icon: FileText,
              },
              {
                title: "Пробные NUET-тесты",
                description:
                  "Полноформатные симуляции с реальным таймером для развития выносливости и навыков управления временем",
                icon: Timer,
              },
              {
                title: "Поддержка преподавателей",
                description:
                  "Прямой доступ к экспертам-преподавателям для вопросов и подробных объяснений сложных концепций",
                icon: HeadphonesIcon,
              },
              {
                title: "Личный кабинет с прогрессом",
                description:
                  "Отслеживайте свои баллы, визуализируйте улучшения и автоматически определяйте слабые области",
                icon: BarChart3,
              },
              {
                title: "Гибкий график",
                description: "Учитесь в своем темпе, в любое время и в любом месте через наш адаптивный интерфейс",
                icon: Calendar,
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all border border-[#e6e8e7] hover:border-[#38e07b]/50 hover:-translate-y-1 bg-white"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-[#38e07b]/10 group-hover:bg-[#38e07b] rounded-full flex items-center justify-center mx-auto mb-6 transition-colors">
                    <item.icon className="w-8 h-8 text-[#38e07b] group-hover:text-[#111714] transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#111714]">{item.title}</h3>
                  <p className="text-sm text-[#63756c] leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Button className="bg-[#38e07b] hover:bg-[#2bc768] text-[#111714] font-bold rounded-full h-14 px-8 text-lg shadow-lg shadow-[#38e07b]/30 hover:shadow-[#38e07b]/50">
              Посмотреть пример урока
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section id="teachers" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="max-w-[800px] mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-[#111714]">Наши Преподаватели</h2>
            <p className="text-[#63756c] text-lg leading-relaxed">
              Наши преподаватели — это эксперты, которые сами сдали NUET и помогли сотням студентов достичь высоких
              результатов. Мы отбираем лучших из лучших, чтобы гарантировать качество вашего обучения.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-[1100px] mx-auto mb-16">
            {/* Salim */}
            <Card className="group border border-[#e6e8e7] hover:border-[#38e07b]/50 transition-all hover:shadow-lg">
              <CardContent className="p-8 flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start min-w-[140px]">
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-[#f6f8f7] mb-4 bg-gray-200">
                    <Image
                      src="/teacher_1.jpg"
                      alt="Портрет преподавателя Салима"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#38e07b]/10 border border-[#38e07b]/20">
                    <Award className="w-4 h-4 text-[#38e07b]" />
                    <span className="text-[#38e07b] text-xs font-bold uppercase tracking-wider">Эксперт</span>
                  </div>
                </div>

                <div className="flex flex-col flex-1">
                  <div className="text-center md:text-left mb-4">
                    <h3 className="text-2xl font-bold text-[#111714] mb-1">Салим</h3>
                    <p className="text-[#38e07b] font-bold text-sm tracking-wide uppercase">
                      Студент Назарбаев Университета
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 min-w-5 h-5 rounded-full bg-[#38e07b]/20 flex items-center justify-center">
                        <GraduationCap className="w-3.5 h-3.5 text-[#38e07b]" />
                      </div>
                      <span className="text-[#63756c] text-sm">Major: Economics (Undeclared)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 min-w-5 h-5 rounded-full bg-[#38e07b]/20 flex items-center justify-center">
                        <TrendingUp className="w-3.5 h-3.5 text-[#38e07b]" />
                      </div>
                      <span className="text-[#63756c] text-sm">
                        NUET: 217 (Математика 120, Критическое мышление 97)
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 min-w-5 h-5 rounded-full bg-[#38e07b]/20 flex items-center justify-center">
                        <School className="w-3.5 h-3.5 text-[#38e07b]" />
                      </div>
                      <span className="text-[#63756c] text-sm">Выпускник РФМШ Алматы</span>
                    </div>
                  </div>

                  <div className="mt-auto relative p-4 rounded-xl bg-[#f6f8f7] border border-[#e6e8e7]">
                    <Quote className="absolute -top-3 left-4 w-6 h-6 text-[#38e07b] bg-white p-1" />
                    <p className="text-[#63756c] text-sm italic leading-relaxed pt-2">
                      &quot;NUET — это не только знания, но и правильная стратегия. Я помогу вам разработать индивидуальный
                      подход к каждому разделу экзамена.&quot;
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Arsen */}
            <Card className="group border border-[#e6e8e7] hover:border-[#38e07b]/50 transition-all hover:shadow-lg">
              <CardContent className="p-8 flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start min-w-[140px]">
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-[#f6f8f7] mb-4 bg-gray-200">
                    <img
                      src="/teacher_2.JPG"
                      alt="Портрет преподавателя Арсена"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#38e07b]/10 border border-[#38e07b]/20">
                    <Award className="w-4 h-4 text-[#38e07b]" />
                    <span className="text-[#38e07b] text-xs font-bold uppercase tracking-wider">Эксперт</span>
                  </div>
                </div>

                <div className="flex flex-col flex-1">
                  <div className="text-center md:text-left mb-4">
                    <h3 className="text-2xl font-bold text-[#111714] mb-1">Арсен</h3>
                    <p className="text-[#38e07b] font-bold text-sm tracking-wide uppercase">
                      Студент Назарбаев Университета
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 min-w-5 h-5 rounded-full bg-[#38e07b]/20 flex items-center justify-center">
                        <GraduationCap className="w-3.5 h-3.5 text-[#38e07b]" />
                      </div>
                      <span className="text-[#63756c] text-sm">Major: Computer Science</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 min-w-5 h-5 rounded-full bg-[#38e07b]/20 flex items-center justify-center">
                        <TrendingUp className="w-3.5 h-3.5 text-[#38e07b]" />
                      </div>
                      <span className="text-[#63756c] text-sm">
                        NUET: 224 (Математика 126, Критическое мышление 98)
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 min-w-5 h-5 rounded-full bg-[#38e07b]/20 flex items-center justify-center">
                        <School className="w-3.5 h-3.5 text-[#38e07b]" />
                      </div>
                      <span className="text-[#63756c] text-sm">Выпускник НИШ Астана</span>
                    </div>
                  </div>

                  <div className="mt-auto relative p-4 rounded-xl bg-[#f6f8f7] border border-[#e6e8e7]">
                    <Quote className="absolute -top-3 left-4 w-6 h-6 text-[#38e07b] bg-white p-1" />
                    <p className="text-[#63756c] text-sm italic leading-relaxed pt-2">
                      &quot;Каждая задача имеет оптимальное решение. Моя цель — научить вас находить его быстро и уверенно на
                      экзамене.&quot;
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button 
              className="bg-[#38e07b] hover:bg-[#2bc768] text-[#111714] font-bold rounded-full h-14 px-8 text-base"
              onClick={() => scrollToSection("trial")}
            >
              Записаться на пробный урок
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="mt-4 text-xs text-[#9eb7a8] uppercase tracking-widest font-medium">Бесплатная консультация</p>
          </div>
        </div>
      </section>

      <section id="trial" className="py-20 bg-[#38e07b]/5">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-[#111714]">
              Попробуйте бесплатный NUET-тест
            </h2>
            <p className="text-[#63756c] mb-8 text-lg">
              Пройди пробный тест в формате NUET и узнай свой текущий уровень перед началом обучения.
            </p>
            <Card className="border border-[#e6e8e7]">
              <CardContent className="p-8 flex flex-col items-center gap-4">
                <p className="text-sm text-[#63756c] max-w-md">
                  Тест бесплатный и доступен сразу после регистрации. Это отличный способ познакомиться с форматом
                  экзамена и нашей платформой.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  <Button
                    type="button"
                    className="bg-[#38e07b] hover:bg-[#2bc768] text-[#111714] font-bold px-8 h-12 rounded-full"
                    onClick={() => router.push("/free-quiz")}
                  >
                    Пройти бесплатный NUET-тест
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-[#111714] text-[#111714] hover:bg-[#111714] hover:text-white px-8 h-12 rounded-full"
                    onClick={() => router.push("/sign-up")}
                  >
                    Зарегистрироваться
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-[#111714] border-t border-[#29382f] text-white">
        <div className="container mx-auto px-4 py-10 max-w-[960px]">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-6">
            <a className="text-[#9eb7a8] hover:text-[#38e07b] transition-colors text-sm" href="#">
              Политика конфиденциальности
            </a>
            <a className="text-[#9eb7a8] hover:text-[#38e07b] transition-colors text-sm" href="#">
              Условия использования
            </a>
            <a className="text-[#9eb7a8] hover:text-[#38e07b] transition-colors text-sm" href="#">
              Связаться с нами
            </a>
          </div>
          <div className="flex items-center justify-center gap-4 text-[#9eb7a8]">
            <GraduationCap className="w-5 h-5" />
            <p className="text-sm">© 2024 NUET Prep. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
