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
    <div className="min-h-screen bg-[#f6f8f7] overflow-x-hidden">
      <nav className="sticky top-0 z-50 bg-[#111714] border-b border-[#29382f] shadow-sm">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 text-[#38e07b]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
              />
            </svg>
            <div className="text-2xl font-black text-white tracking-tight whitespace-nowrap">NUET Prep</div>
            </div>

            <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
              <button
                onClick={() => scrollToSection("about")}
                className="text-white text-xs font-medium hover:text-[#38e07b] transition-colors whitespace-nowrap"
              >
                О NUET
              </button>
              <button
                onClick={() => scrollToSection("audience")}
                className="text-white text-xs font-medium hover:text-[#38e07b] transition-colors whitespace-nowrap"
              >
                Для кого
              </button>
              <button
                onClick={() => scrollToSection("benefits")}
                className="text-white text-xs font-medium hover:text-[#38e07b] transition-colors whitespace-nowrap"
              >
                Преимущества
              </button>
              <button
                onClick={() => scrollToSection("program")}
                className="text-white text-xs font-medium hover:text-[#38e07b] transition-colors whitespace-nowrap"
              >
                Программа
              </button>
              <button
                onClick={() => scrollToSection("teachers")}
                className="text-white text-xs font-medium hover:text-[#38e07b] transition-colors whitespace-nowrap"
              >
                Преподаватели
              </button>
              <button
                onClick={() => scrollToSection("reviews")}
                className="text-white text-xs font-medium hover:text-[#38e07b] transition-colors whitespace-nowrap"
              >
                Отзывы
              </button>
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:text-[#38e07b] hover:bg-transparent font-medium rounded-full text-xs px-3 h-8 whitespace-nowrap"
                onClick={() => router.push("/sign-up")}
              >
                Регистрация
              </Button>
              <Button
                size="sm"
                className="bg-[#38e07b] hover:bg-[#2bc768] text-[#111714] font-bold rounded-full text-xs px-4 h-8 whitespace-nowrap"
                onClick={() => router.push("/sign-in")}
              >
                Войти
              </Button>
            </div>

            <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
                onClick={() => scrollToSection("reviews")}
                className="block w-full text-left py-2 text-white hover:text-[#38e07b]"
              >
                Отзывы
              </button>
              <button
                onClick={() => scrollToSection("trial")}
                className="block w-full text-left py-2 text-white hover:text-[#38e07b]"
              >
                Пробный урок
              </button>
              <Button
                className="w-full bg-white/10 hover:bg-white/20 text-white font-medium rounded-full mt-2 border border-white/20"
                onClick={() => router.push("/sign-up")}
              >
                Регистрация
              </Button>
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

      <section className="py-12 lg:py-20 bg-[#111714]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="flex flex-col gap-8 text-left">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#29382f] bg-[#1c2620] px-3 py-1">
                <span className="flex h-2 w-2 rounded-full bg-[#38e07b] animate-pulse"></span>
                <span className="text-xs font-medium uppercase tracking-wide text-[#38e07b]">Набор открыт</span>
              </div>

              <div className="space-y-4">
                <h1 className="font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-white">
                  Подготовка к NUET до нужного балла и <span className="text-[#38e07b]">гранта</span> в Nazarbayev University
                </h1>
                <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
                  Онлайн-курс по Математике и Критическому мышлению для NUET. Видеоуроки на собственной платформе, домашние задания в формате экзамена и преподаватели с высокими баллами и 3+ годами опыта.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#38e07b]/20 text-[#38e07b]">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span className="text-base text-slate-300">Подготовка к NU Foundation и бакалавриату</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#38e07b]/20 text-[#38e07b]">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <span className="text-base text-slate-300">Математика + Критическое мышление / Решение проблем</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#38e07b]/20 text-[#38e07b]">
                    <Timer className="w-4 h-4" />
                  </div>
                  <span className="text-base text-slate-300">Формат NUET: 60 вопросов / 120 минут</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2 w-full max-w-xl">
                <Button
                  className="flex h-14 w-full items-center justify-center rounded-full bg-[#38e07b] px-8 text-base font-bold text-[#111714] shadow-[0_0_20px_rgba(56,224,123,0.3)] hover:bg-[#2bc768] hover:shadow-[0_0_25px_rgba(56,224,123,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                  onClick={() => scrollToSection("trial")}
                >
                  Получить доступ к пробному курсу
                </Button>
                <div className="flex items-center justify-center gap-2 text-center sm:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-slate-500" />
                  <p className="text-xs text-slate-500 font-medium">
                    Бесплатный доступ к урокам и заданиям в формате NUET на нашей платформе
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 border-t border-[#29382f] pt-6">
                <div className="flex -space-x-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-[#111714] bg-[#1c2620]">
                    <div className="w-full h-full bg-gradient-to-br from-[#38e07b] to-[#2bc768]"></div>
                  </div>
                  <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-[#111714] bg-[#1c2620]">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700"></div>
                  </div>
                  <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-[#111714] bg-[#1c2620]">
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-purple-700"></div>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#111714] bg-[#29382f] text-xs font-bold text-white">
                    +1k
                  </div>
                </div>
                <div className="text-sm text-slate-400">
                  <span className="font-bold text-white">1,000+</span> студентов уже готовятся
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block h-full min-h-[500px] w-full">
              <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full bg-[#38e07b]/20 blur-[120px]"></div>
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[#29382f] bg-[#1c2620] shadow-2xl">
                <div className="absolute top-0 w-full h-12 bg-[#151c18] border-b border-[#29382f] flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="w-full h-full pt-12 bg-[#0a0f0c] flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111714] via-[#111714]/40 to-transparent"></div>
                  <div className="relative z-10 p-8 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-[#38e07b]/10 flex items-center justify-center">
                      <Play className="w-10 h-10 text-[#38e07b]" />
                    </div>
                    <p className="text-white font-bold text-lg mb-2">Интерактивная платформа</p>
                    <p className="text-slate-400 text-sm">Видеоуроки и практика в одном месте</p>
                  </div>
                  <div className="absolute bottom-10 left-8 right-8 p-6 rounded-xl bg-[#1c2620]/90 backdrop-blur border border-[#3d5245]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded bg-[#38e07b]/20 text-[#38e07b]">
                          <Play className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold text-white">Урок 4: Функции</span>
                      </div>
                      <span className="text-xs text-[#38e07b] font-bold">Прогресс 85%</span>
                    </div>
                    <div className="w-full bg-[#111714] rounded-full h-2">
                      <div className="bg-[#38e07b] h-2 rounded-full transition-all" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div className="absolute top-20 right-8 p-3 rounded-lg bg-[#38e07b] text-[#111714] shadow-lg flex items-center gap-2 animate-bounce" style={{ animationDuration: "3s" }}>
                    <CheckCircle2 className="w-5 h-5" />
                    <div>
                      <p className="text-xs font-bold leading-none">Результат</p>
                      <p className="text-sm font-black leading-none">145/150</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-[#111714]">
        <div className="container mx-auto px-4 lg:px-10 max-w-[1280px]">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col items-start gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38e07b]/10 border border-[#38e07b]/20">
                <BookOpen className="w-4 h-4 text-[#38e07b]" />
                <span className="text-[#38e07b] text-xs font-bold uppercase tracking-wide">Об экзамене</span>
              </div>
              <h2 className="text-white text-3xl md:text-5xl font-extrabold leading-tight tracking-tight max-w-[900px]">
                Что такое <span className="text-[#38e07b]">NUET</span> и почему к нему важно готовиться правильно?
              </h2>
              <p className="text-[#9eb7a8] text-lg font-normal leading-relaxed max-w-[720px] mt-2">
                Nazarbayev University Entrance Test (NUET) — это не просто проверка знаний школьной программы. Это тест на способность мыслить аналитически в условиях жесткого ограничения времени.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="group border border-[#29382f] bg-[#1c2620] hover:border-[#38e07b]/50 transition-colors">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#29382f] flex items-center justify-center group-hover:bg-[#38e07b] group-hover:text-[#111714] transition-colors text-white">
                    <Calculator className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold mb-2">Математика & Критическое мышление</h3>
                    <p className="text-[#9eb7a8] text-sm">Экзамен проверяет не память, а ваше умение решать нестандартные задачи и находить логические связи.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="group border border-[#29382f] bg-[#1c2620] hover:border-[#38e07b]/50 transition-colors">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#29382f] flex items-center justify-center group-hover:bg-[#38e07b] group-hover:text-[#111714] transition-colors text-white">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold mb-2">60 Вопросов</h3>
                    <p className="text-[#9eb7a8] text-sm">Интенсивный темп тестирования требует мгновенной концентрации и переключения между темами.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="group border border-[#29382f] bg-[#1c2620] hover:border-[#38e07b]/50 transition-colors">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#29382f] flex items-center justify-center group-hover:bg-[#38e07b] group-hover:text-[#111714] transition-colors text-white">
                    <Timer className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold mb-2">120 Минут</h3>
                    <p className="text-[#9eb7a8] text-sm">В среднем 2 минуты на вопрос. Это жесткий тайминг, где каждая секунда на счету.</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-stretch mb-8">
              <div className="flex-1 bg-[#1c2620] rounded-2xl border border-[#29382f] p-8 flex flex-col justify-center">
                <h3 className="text-white text-2xl font-bold mb-6">Ключевые навыки для успеха</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-3 bg-[#29382f]/50 rounded-full pl-3 pr-5 py-2 border border-transparent hover:border-[#38e07b]/30 transition-colors">
                    <div className="bg-[#38e07b]/20 text-[#38e07b] p-1.5 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-white text-sm font-medium">Быстрый разбор условий</span>
                  </div>
                  <div className="flex items-center gap-3 bg-[#29382f]/50 rounded-full pl-3 pr-5 py-2 border border-transparent hover:border-[#38e07b]/30 transition-colors">
                    <div className="bg-[#38e07b]/20 text-[#38e07b] p-1.5 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <span className="text-white text-sm font-medium">Работа с таблицами и графиками</span>
                  </div>
                  <div className="flex items-center gap-3 bg-[#29382f]/50 rounded-full pl-3 pr-5 py-2 border border-transparent hover:border-[#38e07b]/30 transition-colors">
                    <div className="bg-[#38e07b]/20 text-[#38e07b] p-1.5 rounded-full flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="text-white text-sm font-medium">Анализ сложных текстов</span>
                  </div>
                  <div className="flex items-center gap-3 bg-[#29382f]/50 rounded-full pl-3 pr-5 py-2 border border-transparent hover:border-[#38e07b]/30 transition-colors">
                    <div className="bg-[#38e07b]/20 text-[#38e07b] p-1.5 rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className="text-white text-sm font-medium">Управление временем</span>
                  </div>
                </div>
                <p className="text-[#9eb7a8] text-sm mt-6">
                  Мы научим вас не просто &quot;решать задачи&quot;, а делать это максимально эффективно, чтобы уложиться в лимит времени.
                </p>
              </div>

              <div className="flex-1 min-h-[300px] lg:min-h-0 relative rounded-2xl overflow-hidden group bg-[#1c2620] border border-[#29382f] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-[#111714] via-transparent to-transparent z-10 opacity-60"></div>
                <Brain className="w-32 h-32 text-[#38e07b]/20" />
                <div className="absolute bottom-6 left-6 z-20 max-w-[80%]">
                  <div className="bg-[#38e07b]/90 text-[#111714] text-xs font-extrabold px-3 py-1 rounded-full w-fit mb-2">ВАЖНО ПОМНИТЬ</div>
                  <p className="text-white text-lg font-bold leading-tight drop-shadow-lg">Подготовка — это 80% успеха на экзамене.</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-[#1c2620] border border-[#38e07b]/30 p-1">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#38e07b]/5 rounded-full blur-3xl"></div>
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#38e07b]/5 rounded-full blur-3xl"></div>
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 bg-[#1c2620]/50 backdrop-blur-sm p-6 md:p-8 rounded-xl">
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex items-center gap-3 text-white mb-1">
                    <Target className="w-6 h-6 text-[#38e07b]" />
                    <h4 className="text-xl font-bold">Цена ошибки высока</h4>
                  </div>
                  <p className="text-[#9eb7a8] text-sm md:text-base leading-relaxed">
                    Результаты экзамена будут доступны только через <span className="text-white font-bold">6 недель</span>. Помните: <span className="text-white font-bold">второй попытки сдать экзамен в ближайшее время не будет</span>. У вас есть только один шанс показать свой максимум.
                  </p>
                </div>
                <div className="shrink-0 w-full md:w-auto">
                  <Button
                    className="w-full md:w-auto bg-[#38e07b] hover:bg-[#32c96e] text-[#111714] font-bold rounded-full px-8 py-6 transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(56,224,123,0.3)]"
                    onClick={() => scrollToSection("trial")}
                  >
                    <span>Начать подготовку сейчас</span>
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="audience" className="py-20 bg-[#111714]">
        <div className="container mx-auto px-4 max-w-[960px]">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 px-4">
              <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight tracking-[-0.015em] text-center md:text-left">
                Для кого этот курс
              </h2>
              <p className="text-[#9eb7a8] text-base md:text-lg font-normal leading-normal text-center md:text-left max-w-2xl">
                Мы разработали программу, которая учитывает разные уровни подготовки и цели студентов.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
              <Card className="group border border-[#3d5245] bg-[#1c2620] hover:border-[#38e07b]/50 transition-all hover:shadow-lg hover:shadow-[#38e07b]/5">
                <CardContent className="p-6 flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center size-12 rounded-full bg-[#3d5245] text-[#38e07b] group-hover:bg-[#38e07b] group-hover:text-[#1c2620] transition-colors">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-white text-xl font-bold leading-tight">Абитуриентам</h3>
                    <p className="text-[#9eb7a8] text-base font-normal leading-relaxed">
                      Ты хочешь поступить в Назарбаев Университет на Foundation или бакалавриат и ищешь проверенный путь.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="group border border-[#3d5245] bg-[#1c2620] hover:border-[#38e07b]/50 transition-all hover:shadow-lg hover:shadow-[#38e07b]/5">
                <CardContent className="p-6 flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center size-12 rounded-full bg-[#3d5245] text-[#38e07b] group-hover:bg-[#38e07b] group-hover:text-[#1c2620] transition-colors">
                      <Brain className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-white text-xl font-bold leading-tight">Целеустремленным</h3>
                    <p className="text-[#9eb7a8] text-base font-normal leading-relaxed">
                      Хочешь подтянуть именно те темы по Математике и Критическому мышлению, которые спрашивают на NUET.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="group border border-[#3d5245] bg-[#1c2620] hover:border-[#38e07b]/50 transition-all hover:shadow-lg hover:shadow-[#38e07b]/5">
                <CardContent className="p-6 flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center size-12 rounded-full bg-[#3d5245] text-[#38e07b] group-hover:bg-[#38e07b] group-hover:text-[#1c2620] transition-colors">
                      <BookOpen className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-white text-xl font-bold leading-tight">Самоучкам</h3>
                    <p className="text-[#9eb7a8] text-base font-normal leading-relaxed">
                      Уже что-то решаешь, но не хватает структуры, пробных тестов и понятного плана действий до экзамена.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="group border border-[#3d5245] bg-[#1c2620] hover:border-[#38e07b]/50 transition-all hover:shadow-lg hover:shadow-[#38e07b]/5">
                <CardContent className="p-6 flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center size-12 rounded-full bg-[#3d5245] text-[#38e07b] group-hover:bg-[#38e07b] group-hover:text-[#1c2620] transition-colors">
                      <Users className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-white text-xl font-bold leading-tight">Родителям</h3>
                    <p className="text-[#9eb7a8] text-base font-normal leading-relaxed">
                      Ты родитель и хочешь, чтобы ребёнок готовился по системе, а не просто смотрел случайные видео с YouTube.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex px-4 py-8 justify-center">
              <Button
                className="group relative flex w-full md:w-auto min-w-[200px] h-12 px-8 bg-[#38e07b] hover:bg-[#2bc768] text-[#111714] rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(56,224,123,0.3)] hover:shadow-[0_0_25px_rgba(56,224,123,0.4)]"
                onClick={() => scrollToSection("program")}
              >
                <span>Посмотреть программу подготовки</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="relative py-16 px-4 md:px-10 lg:px-20 bg-[#111714] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#38e07b]/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#38e07b]/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1120px] mx-auto flex flex-col gap-12">
          <div className="flex flex-col items-center text-center gap-4">
            <h2 className="text-white text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Что даёт тебе этот курс
            </h2>
            <div className="h-1 w-20 bg-[#38e07b] rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="group border border-[#3d5245] bg-[#1c2620] hover:border-[#38e07b] transition-all duration-300 hover:-translate-y-1 shadow-sm">
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-[#38e07b]/10 flex items-center justify-center text-[#38e07b] group-hover:bg-[#38e07b] group-hover:text-[#111714] transition-colors duration-300">
                  <BookOpen className="w-7 h-7" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-white text-lg font-bold leading-tight">Полное покрытие</h3>
                  <p className="text-[#9eb7a8] text-sm font-medium leading-relaxed">
                    Полное покрытие тем NUET по Математике и Критическому мышлению.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group border border-[#3d5245] bg-[#1c2620] hover:border-[#38e07b] transition-all duration-300 hover:-translate-y-1 shadow-sm">
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-[#38e07b]/10 flex items-center justify-center text-[#38e07b] group-hover:bg-[#38e07b] group-hover:text-[#111714] transition-colors duration-300">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-white text-lg font-bold leading-tight">Системный план</h3>
                  <p className="text-[#9eb7a8] text-sm font-medium leading-relaxed">
                    Системный план подготовки до даты экзамена: от простого к сложному.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group border border-[#3d5245] bg-[#1c2620] hover:border-[#38e07b] transition-all duration-300 hover:-translate-y-1 shadow-sm">
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-[#38e07b]/10 flex items-center justify-center text-[#38e07b] group-hover:bg-[#38e07b] group-hover:text-[#111714] transition-colors duration-300">
                  <Timer className="w-7 h-7" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-white text-lg font-bold leading-tight">Реальная практика</h3>
                  <p className="text-[#9eb7a8] text-sm font-medium leading-relaxed">
                    Практику в формате NUET: задания и пробные тесты с таймером.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group border border-[#3d5245] bg-[#1c2620] hover:border-[#38e07b] transition-all duration-300 hover:-translate-y-1 shadow-sm">
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-[#38e07b]/10 flex items-center justify-center text-[#38e07b] group-hover:bg-[#38e07b] group-hover:text-[#111714] transition-colors duration-300">
                  <Lightbulb className="w-7 h-7" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-white text-lg font-bold leading-tight">Разбор ошибок</h3>
                  <p className="text-[#9eb7a8] text-sm font-medium leading-relaxed">
                    Разбор ошибок: ты понимаешь не только «какой ответ», но и «почему так».
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group border border-[#3d5245] bg-[#1c2620] hover:border-[#38e07b] transition-all duration-300 hover:-translate-y-1 shadow-sm">
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-[#38e07b]/10 flex items-center justify-center text-[#38e07b] group-hover:bg-[#38e07b] group-hover:text-[#111714] transition-colors duration-300">
                  <HeadphonesIcon className="w-7 h-7" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-white text-lg font-bold leading-tight">Поддержка</h3>
                  <p className="text-[#9eb7a8] text-sm font-medium leading-relaxed">
                    Поддержка преподавателей: можно задать вопрос по непонятной задаче.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group border border-[#3d5245] bg-[#1c2620] hover:border-[#38e07b] transition-all duration-300 hover:-translate-y-1 shadow-sm">
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-[#38e07b]/10 flex items-center justify-center text-[#38e07b] group-hover:bg-[#38e07b] group-hover:text-[#111714] transition-colors duration-300">
                  <BarChart3 className="w-7 h-7" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-white text-lg font-bold leading-tight">Удобная платформа</h3>
                  <p className="text-[#9eb7a8] text-sm font-medium leading-relaxed">
                    Удобную платформу, где видно прогресс, сильные и слабые темы.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center pt-8">
            <Button
              className="flex items-center justify-center gap-3 h-14 px-8 bg-[#38e07b] hover:bg-[#38e07b]/90 text-[#111714] rounded-full transition-transform active:scale-95 shadow-lg shadow-[#38e07b]/25 group"
              onClick={() => scrollToSection("format")}
            >
              <Play className="w-6 h-6" />
              <span className="text-base font-bold tracking-wide">Посмотреть, как это работает на платформе</span>
            </Button>
          </div>
        </div>
      </section>

      <section id="program" className="py-10 sm:py-20 bg-[#111714]">
        <div className="container mx-auto px-4 sm:px-8 max-w-[1200px]">
          <div className="flex flex-col gap-6 text-center mb-16">
            <h1 className="text-white tracking-tight text-4xl sm:text-5xl font-black leading-[1.1]">
              Программа подготовки к <span className="text-[#38e07b]">NUET</span>
            </h1>
            <p className="text-[#9eb7a8] text-lg sm:text-xl font-normal leading-relaxed max-w-[800px] mx-auto">
              Закрываем ключевые темы по Математике и Критическому мышлению, которые проверяет NUET
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
            {/* Mathematics Card */}
            <Card className="border border-[#3d5245] bg-[#1c2620] hover:border-[#38e07b]/50 transition-colors duration-300 shadow-xl shadow-black/20">
              <CardContent className="p-6 sm:p-8 flex flex-col gap-6">
                <div className="flex items-center gap-4 border-b border-[#3d5245] pb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#38e07b]/10 text-[#38e07b]">
                    <Calculator className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-white text-xl font-bold leading-tight">Математика</h2>
                    <span className="text-sm text-[#9eb7a8] mt-1 block">Ключевые разделы</span>
                  </div>
                </div>
                <ul className="flex flex-col gap-4 flex-1">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#38e07b] w-5 h-5 mt-0.5 shrink-0" />
                    <span className="text-[#d0e0d8] text-base leading-snug">Числа и выражения</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#38e07b] w-5 h-5 mt-0.5 shrink-0" />
                    <span className="text-[#d0e0d8] text-base leading-snug">Алгебра</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#38e07b] w-5 h-5 mt-0.5 shrink-0" />
                    <span className="text-[#d0e0d8] text-base leading-snug">Системы уравнений</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#38e07b] w-5 h-5 mt-0.5 shrink-0" />
                    <span className="text-[#d0e0d8] text-base leading-snug">Функции и графики</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#38e07b] w-5 h-5 mt-0.5 shrink-0" />
                    <span className="text-[#d0e0d8] text-base leading-snug">Геометрия</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#38e07b] w-5 h-5 mt-0.5 shrink-0" />
                    <span className="text-[#d0e0d8] text-base leading-snug">Площади и объёмы фигур</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#38e07b] w-5 h-5 mt-0.5 shrink-0" />
                    <span className="text-[#d0e0d8] text-base leading-snug">Элементы тригонометрии</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#38e07b] w-5 h-5 mt-0.5 shrink-0" />
                    <span className="text-[#d0e0d8] text-base leading-snug">Вероятность и элементы статистики</span>
                  </li>
                  <li className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5 mt-2">
                    <Star className="text-[#38e07b] w-5 h-5 mt-0.5 shrink-0" />
                    <span className="text-white font-medium text-base leading-snug">Сложные задачи уровня NUET</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Critical Thinking Card */}
            <Card className="border border-[#3d5245] bg-[#1c2620] hover:border-[#38e07b]/50 transition-colors duration-300 shadow-xl shadow-black/20">
              <CardContent className="p-6 sm:p-8 flex flex-col gap-6">
                <div className="flex items-center gap-4 border-b border-[#3d5245] pb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#38e07b]/10 text-[#38e07b]">
                    <Brain className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-white text-xl font-bold leading-tight">Критическое мышление</h2>
                    <span className="text-sm text-[#9eb7a8] mt-1 block">Решение проблем</span>
                  </div>
                </div>
                <ul className="flex flex-col gap-4 flex-1">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#38e07b] w-5 h-5 mt-0.5 shrink-0" />
                    <span className="text-[#d0e0d8] text-base leading-snug">Анализ текстов и аргументов</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#38e07b] w-5 h-5 mt-0.5 shrink-0" />
                    <span className="text-[#d0e0d8] text-base leading-snug">Логические задачи и последовательности</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#38e07b] w-5 h-5 mt-0.5 shrink-0" />
                    <span className="text-[#d0e0d8] text-base leading-snug">Таблицы, графики, диаграммы</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#38e07b] w-5 h-5 mt-0.5 shrink-0" />
                    <span className="text-[#d0e0d8] text-base leading-snug">Работа с данными</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#38e07b] w-5 h-5 mt-0.5 shrink-0" />
                    <span className="text-[#d0e0d8] text-base leading-snug">Задачи с лишней или скрытой информацией</span>
                  </li>
                  <li className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5 mt-2">
                    <Timer className="text-[#38e07b] w-5 h-5 mt-0.5 shrink-0" />
                    <span className="text-white font-medium text-base leading-snug">Стратегии работы с тестом и тайм-менеджмент</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#3d5245] bg-[#1c2620]/50 px-4 py-2">
              <Lightbulb className="w-5 h-5 text-[#9eb7a8]" />
              <p className="text-[#9eb7a8] text-sm font-normal leading-normal">
                Программа может адаптироваться под уровень группы.
              </p>
            </div>
          </div>

          <div className="flex px-4 py-3 justify-center">
            <Button className="group flex min-w-[240px] h-14 px-8 bg-[#38e07b] hover:bg-[#2bc768] transition-all duration-300 text-[#111714] gap-3 rounded-full font-bold tracking-wide shadow-[0_0_20px_rgba(56,224,123,0.3)] hover:shadow-[0_0_30px_rgba(56,224,123,0.5)]">
              <Download className="text-[#111714] w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Скачать подробную программу (PDF)</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Learning Format Section */}
      <section id="format" className="py-20 bg-[#111714]">
        <div className="container mx-auto px-4 md:px-8 lg:px-20 max-w-[1200px]">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center rounded-full bg-[#38e07b]/10 px-4 py-1.5 mb-4">
              <span className="text-[#38e07b] text-sm font-bold uppercase tracking-wider">How it works</span>
            </div>
            <h2 className="text-white text-3xl md:text-5xl font-black mb-6 leading-tight tracking-[-0.02em]">
              Как проходит обучение
            </h2>
            <p className="text-[#9eb7a8] text-lg font-normal leading-relaxed max-w-[600px] mx-auto">
              Всё обучение проходит онлайн на нашей образовательной платформе
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <Card className="group border border-[#3d5245] bg-[#1a2c23] hover:border-[#38e07b] transition-all duration-300 hover:shadow-lg hover:shadow-[#38e07b]/5 hover:-translate-y-1">
              <CardContent className="p-8 flex flex-col">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#38e07b]/10 text-[#38e07b] mb-6 group-hover:bg-[#38e07b] group-hover:text-[#122017] transition-colors duration-300">
                  <Play className="w-8 h-8" />
                </div>
                <h3 className="text-white text-xl font-bold leading-tight mb-3">Видеоуроки по темам NUET</h3>
                <p className="text-[#9eb7a8] text-sm leading-relaxed">
                  Подробные видео-разборы тем по математике и критическому мышлению, упрощающие сложные концепции.
                </p>
              </CardContent>
            </Card>

            <Card className="group border border-[#3d5245] bg-[#1a2c23] hover:border-[#38e07b] transition-all duration-300 hover:shadow-lg hover:shadow-[#38e07b]/5 hover:-translate-y-1">
              <CardContent className="p-8 flex flex-col">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#38e07b]/10 text-[#38e07b] mb-6 group-hover:bg-[#38e07b] group-hover:text-[#122017] transition-colors duration-300">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-white text-xl font-bold leading-tight mb-3">Домашние задания</h3>
                <p className="text-[#9eb7a8] text-sm leading-relaxed">
                  Практические задачи после каждого модуля для закрепления материала и обеспечения усвоения.
                </p>
              </CardContent>
            </Card>

            <Card className="group border border-[#3d5245] bg-[#1a2c23] hover:border-[#38e07b] transition-all duration-300 hover:shadow-lg hover:shadow-[#38e07b]/5 hover:-translate-y-1">
              <CardContent className="p-8 flex flex-col">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#38e07b]/10 text-[#38e07b] mb-6 group-hover:bg-[#38e07b] group-hover:text-[#122017] transition-colors duration-300">
                  <Timer className="w-8 h-8" />
                </div>
                <h3 className="text-white text-xl font-bold leading-tight mb-3">Пробные NUET-тесты</h3>
                <p className="text-[#9eb7a8] text-sm leading-relaxed">
                  Полноформатные симуляции с реальным таймером для развития выносливости и навыков управления временем.
                </p>
              </CardContent>
            </Card>

            <Card className="group border border-[#3d5245] bg-[#1a2c23] hover:border-[#38e07b] transition-all duration-300 hover:shadow-lg hover:shadow-[#38e07b]/5 hover:-translate-y-1">
              <CardContent className="p-8 flex flex-col">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#38e07b]/10 text-[#38e07b] mb-6 group-hover:bg-[#38e07b] group-hover:text-[#122017] transition-colors duration-300">
                  <HeadphonesIcon className="w-8 h-8" />
                </div>
                <h3 className="text-white text-xl font-bold leading-tight mb-3">Поддержка преподавателей</h3>
                <p className="text-[#9eb7a8] text-sm leading-relaxed">
                  Прямой доступ к экспертам-преподавателям для вопросов и подробных объяснений сложных концепций.
                </p>
              </CardContent>
            </Card>

            <Card className="group border border-[#3d5245] bg-[#1a2c23] hover:border-[#38e07b] transition-all duration-300 hover:shadow-lg hover:shadow-[#38e07b]/5 hover:-translate-y-1">
              <CardContent className="p-8 flex flex-col">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#38e07b]/10 text-[#38e07b] mb-6 group-hover:bg-[#38e07b] group-hover:text-[#122017] transition-colors duration-300">
                  <BarChart3 className="w-8 h-8" />
                </div>
                <h3 className="text-white text-xl font-bold leading-tight mb-3">Личный кабинет с прогрессом</h3>
                <p className="text-[#9eb7a8] text-sm leading-relaxed">
                  Отслеживайте свои баллы, визуализируйте улучшения и автоматически определяйте слабые области.
                </p>
              </CardContent>
            </Card>

            <Card className="group border border-[#3d5245] bg-[#1a2c23] hover:border-[#38e07b] transition-all duration-300 hover:shadow-lg hover:shadow-[#38e07b]/5 hover:-translate-y-1">
              <CardContent className="p-8 flex flex-col">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#38e07b]/10 text-[#38e07b] mb-6 group-hover:bg-[#38e07b] group-hover:text-[#122017] transition-colors duration-300">
                  <Calendar className="w-8 h-8" />
                </div>
                <h3 className="text-white text-xl font-bold leading-tight mb-3">Гибкий график</h3>
                <p className="text-[#9eb7a8] text-sm leading-relaxed">
                  Учитесь в своем темпе, в любое время и в любом месте через наш адаптивный интерфейс.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button className="flex items-center justify-center rounded-full h-14 px-8 bg-[#38e07b] hover:bg-[#32c96e] transition-colors text-[#111714] dark:text-[#122017] text-lg font-bold shadow-[0_0_20px_rgba(56,224,123,0.3)] hover:shadow-[0_0_30px_rgba(56,224,123,0.5)]">
              <span className="mr-2">Посмотреть пример урока</span>
              <ArrowRight className="w-5 h-5 font-bold" />
            </Button>
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section id="teachers" className="py-16 md:py-24 bg-[#111714]">
        <div className="container mx-auto px-4 sm:px-10">
          <div className="max-w-[800px] flex flex-col items-center text-center mb-16 mx-auto">
            <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight mb-6 text-white">
              Наши Преподаватели
            </h1>
            <p className="text-[#9eb7a8] text-lg font-normal leading-relaxed max-w-[640px]">
              Наши преподаватели — это эксперты, которые сами сдали NUET и помогли сотням студентов достичь высоких результатов. Мы отбираем лучших из лучших, чтобы гарантировать качество вашего обучения.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1100px] w-full mx-auto">
            {/* Salim */}
            <Card className="group relative border border-[#29382f] bg-[#1a2c23] hover:border-[#38e07b]/50 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(56,224,123,0.15)]">
              <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start min-w-[140px]">
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-[#23332a] mb-4 bg-gray-200">
                    <img
                      src="/teacher_1.jpg"
                      alt="Портрет преподавателя Салима"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#38e07b]/10 border border-[#38e07b]/20">
                    <Award className="w-4 h-4 text-[#38e07b]" />
                    <span className="text-[#38e07b] text-xs font-bold uppercase tracking-wider">Expert</span>
                  </div>
                </div>

                <div className="flex flex-col flex-1">
                  <div className="text-center md:text-left mb-4">
                    <h3 className="text-2xl font-bold text-white mb-1">Салим</h3>
                    <p className="text-[#38e07b] font-bold text-sm tracking-wide uppercase">
                      Студент Назарбаев Университета
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 min-w-5 size-5 rounded-full bg-[#38e07b]/20 flex items-center justify-center text-[#38e07b]">
                        <GraduationCap className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-gray-300 text-sm">Major: Economics (Undeclared)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 min-w-5 size-5 rounded-full bg-[#38e07b]/20 flex items-center justify-center text-[#38e07b]">
                        <TrendingUp className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-gray-300 text-sm">
                        NUET: 217 (Математика 120, Критическое мышление 97)
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 min-w-5 size-5 rounded-full bg-[#38e07b]/20 flex items-center justify-center text-[#38e07b]">
                        <School className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-gray-300 text-sm">Выпускник РФМШ Алматы</span>
                    </div>
                  </div>

                  <div className="mt-auto relative p-4 rounded-xl bg-[#122017] border border-[#29382f]">
                    <span className="absolute -top-3 left-4 bg-[#122017] px-2 text-[#38e07b]">
                      <Quote className="w-6 h-6" />
                    </span>
                    <p className="text-[#9eb7a8] text-sm italic leading-relaxed pt-2">
                      &quot;NUET — это не только знания, но и правильная стратегия. Я помогу вам разработать индивидуальный подход к каждому разделу экзамена.&quot;
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Arsen */}
            <Card className="group relative border border-[#29382f] bg-[#1a2c23] hover:border-[#38e07b]/50 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(56,224,123,0.15)]">
              <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start min-w-[140px]">
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-[#23332a] mb-4 bg-gray-200">
                    <img
                      src="/teacher_2.JPG"
                      alt="Портрет преподавателя Арсена"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#38e07b]/10 border border-[#38e07b]/20">
                    <Award className="w-4 h-4 text-[#38e07b]" />
                    <span className="text-[#38e07b] text-xs font-bold uppercase tracking-wider">Expert</span>
                  </div>
                </div>

                <div className="flex flex-col flex-1">
                  <div className="text-center md:text-left mb-4">
                    <h3 className="text-2xl font-bold text-white mb-1">Арсен</h3>
                    <p className="text-[#38e07b] font-bold text-sm tracking-wide uppercase">
                      Студент Назарбаев Университета
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 min-w-5 size-5 rounded-full bg-[#38e07b]/20 flex items-center justify-center text-[#38e07b]">
                        <GraduationCap className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-gray-300 text-sm">Major: Computer Science</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 min-w-5 size-5 rounded-full bg-[#38e07b]/20 flex items-center justify-center text-[#38e07b]">
                        <TrendingUp className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-gray-300 text-sm">
                        NUET: 224 (Математика 126, Критическое мышление 98)
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 min-w-5 size-5 rounded-full bg-[#38e07b]/20 flex items-center justify-center text-[#38e07b]">
                        <School className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-gray-300 text-sm">Выпускник НИШ Астана</span>
                    </div>
                  </div>

                  <div className="mt-auto relative p-4 rounded-xl bg-[#122017] border border-[#29382f]">
                    <span className="absolute -top-3 left-4 bg-[#122017] px-2 text-[#38e07b]">
                      <Quote className="w-6 h-6" />
                    </span>
                    <p className="text-[#9eb7a8] text-sm italic leading-relaxed pt-2">
                      &quot;Каждая задача имеет оптимальное решение. Моя цель — научить вас находить его быстро и уверенно на экзамене.&quot;
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <Button
              className="inline-flex items-center gap-2 bg-[#38e07b] hover:bg-[#2bc466] text-[#111714] font-bold py-4 px-8 rounded-full transition-colors duration-200"
              onClick={() => scrollToSection("trial")}
            >
              <span>Записаться на пробный урок</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
            <p className="mt-4 text-xs text-[#9eb7a8] uppercase tracking-widest font-medium">Бесплатная консультация</p>
          </div>
        </div>
      </section>

      {/* Results & Goals Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#122017] overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#38e07b]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto flex flex-col gap-12 relative z-10">
          <div className="flex flex-col gap-4 max-w-3xl">
            <h2 className="text-[#38e07b] text-sm font-bold tracking-widest uppercase mb-2">Цели и Результаты</h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
              К чему мы <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38e07b] to-[#8fffb6]">тебя готовим</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-4">
            <div className="lg:col-span-7 flex flex-col gap-8">
              <Card className="bg-[#1c2620] border border-[#29382f] rounded-lg relative overflow-hidden group hover:border-[#38e07b]/30 transition-colors duration-300">
                <CardContent className="p-8 md:p-10">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <Target className="w-36 h-36 text-[#38e07b]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-6 relative z-10">Наша миссия</h3>
                  <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-medium relative z-10">
                    Наша цель — не просто «пройти программу», а помочь тебе набрать <span className="text-[#38e07b] font-bold">конкурентный балл</span> на NUET и повысить шансы на <span className="text-white underline decoration-[#38e07b]/50 underline-offset-4 decoration-2">грант в Назарбаев Университет</span>.
                  </p>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                <div className="flex items-start gap-5 p-5 rounded-xl bg-[#1c2620]/50 border border-transparent hover:border-[#29382f] transition-all duration-300">
                  <div className="flex-shrink-0 mt-1 w-10 h-10 rounded-full bg-[#38e07b]/10 flex items-center justify-center text-[#38e07b]">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Структура экзамена</h4>
                    <p className="text-[#9eb7a8]">Ты будешь понимать структуру экзамена от и до, без сюрпризов в день теста.</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 p-5 rounded-xl bg-[#1c2620]/50 border border-transparent hover:border-[#29382f] transition-all duration-300">
                  <div className="flex-shrink-0 mt-1 w-10 h-10 rounded-full bg-[#38e07b]/10 flex items-center justify-center text-[#38e07b]">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Стратегия баллов</h4>
                    <p className="text-[#9eb7a8]">Ты будешь знать, какие темы дают больше всего баллов и на чем сфокусироваться.</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 p-5 rounded-xl bg-[#1c2620]/50 border border-transparent hover:border-[#29382f] transition-all duration-300">
                  <div className="flex-shrink-0 mt-1 w-10 h-10 rounded-full bg-[#38e07b]/10 flex items-center justify-center text-[#38e07b]">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Уверенность</h4>
                    <p className="text-[#9eb7a8]">Ты придешь на NUET с ощущением <span className="text-white font-medium">&quot;я готов&quot;</span>, а не &quot;надеюсь, повезёт&quot;.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="h-full flex flex-col rounded-lg bg-[#1c2620] border border-[#29382f] relative overflow-hidden group hover:border-[#38e07b]/30 transition-colors">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <TrendingUp className="w-36 h-36 text-[#38e07b]" />
                </div>
                <div className="flex-1 flex flex-col p-8 gap-8 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#38e07b]/10 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-[#38e07b]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Результаты за 2 года</h3>
                  </div>
                  
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-[#38e07b]">217</span>
                        <span className="text-xl text-white font-bold">человек</span>
                      </div>
                      <p className="text-[#9eb7a8] text-sm leading-relaxed">
                        поступило в Назарбаев Университет за последние 2 года
                      </p>
                    </div>
                    
                    <div className="h-px bg-[#29382f]"></div>
                    
                    <div className="flex flex-col gap-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-white">155</span>
                        <span className="text-xl text-[#9eb7a8] font-medium">баллов</span>
                      </div>
                      <p className="text-[#9eb7a8] text-sm leading-relaxed">
                        средний балл НУЕТА наших студентов
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#38e07b] rounded-lg p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg shadow-[#38e07b]/20">
                <div className="flex flex-col gap-1 text-center sm:text-left">
                  <span className="text-[#111714] font-bold text-lg leading-tight">Готов начать подготовку?</span>
                  <span className="text-[#111714]/80 text-sm font-medium">Присоединяйся к курсу сегодня.</span>
                </div>
                <Button
                  className="bg-[#111714] hover:bg-black text-white font-bold py-3 px-6 rounded-full transition-colors whitespace-nowrap shadow-md"
                  onClick={() => scrollToSection("trial")}
                >
                  Начать сейчас
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-[#111714]">
        <div className="container mx-auto px-4 lg:px-10 max-w-[1280px]">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col items-center gap-4 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38e07b]/10 border border-[#38e07b]/20">
                <Quote className="w-4 h-4 text-[#38e07b]" />
                <span className="text-[#38e07b] text-xs font-bold uppercase tracking-wide">Отзывы студентов</span>
              </div>
              <h2 className="text-white text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
                Что говорят наши <span className="text-[#38e07b]">студенты</span>
              </h2>
              <p className="text-[#9eb7a8] text-lg font-normal leading-relaxed">
                Реальные отзывы от студентов, которые поступили в Назарбаев Университет
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Review 1 */}
              <Card className="group border border-[#29382f] bg-[#1c2620] hover:border-[#38e07b]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#38e07b]/10">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#38e07b] text-[#38e07b]" />
                    ))}
                  </div>
                  <p className="text-[#9eb7a8] text-sm leading-relaxed">
                    &quot;Курс помог мне систематизировать подготовку. Особенно полезными были пробные тесты в формате NUET. 
                    Набрал 162 балла и поступил на грант в Foundation.&quot;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[#29382f]">
                    <div className="size-10 rounded-full bg-gradient-to-br from-[#38e07b] to-[#2bc768] shrink-0"></div>
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-sm">Айдар</span>
                      <span className="text-[#9eb7a8] text-xs">Foundation, 2023</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Review 2 */}
              <Card className="group border border-[#29382f] bg-[#1c2620] hover:border-[#38e07b]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#38e07b]/10">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#38e07b] text-[#38e07b]" />
                    ))}
                  </div>
                  <p className="text-[#9eb7a8] text-sm leading-relaxed">
                    &quot;Преподаватели объясняют очень понятно, разбирают каждую ошибку. Математика стала моей сильной стороной. 
                    Результат: 158 баллов, поступил на бакалавриат.&quot;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[#29382f]">
                    <div className="size-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shrink-0"></div>
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-sm">Данияр</span>
                      <span className="text-[#9eb7a8] text-xs">Бакалавриат, 2023</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Review 3 */}
              <Card className="group border border-[#29382f] bg-[#1c2620] hover:border-[#38e07b]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#38e07b]/10">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#38e07b] text-[#38e07b]" />
                    ))}
                  </div>
                  <p className="text-[#9eb7a8] text-sm leading-relaxed">
                    &quot;Структурированный подход и постоянная практика помогли мне улучшить результат на 30+ баллов. 
                    Критическое мышление было моей слабой стороной, но курс это исправил.&quot;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[#29382f]">
                    <div className="size-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 shrink-0"></div>
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-sm">Амина</span>
                      <span className="text-[#9eb7a8] text-xs">Foundation, 2024</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Review 4 */}
              <Card className="group border border-[#29382f] bg-[#1c2620] hover:border-[#38e07b]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#38e07b]/10">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#38e07b] text-[#38e07b]" />
                    ))}
                  </div>
                  <p className="text-[#9eb7a8] text-sm leading-relaxed">
                    &quot;Платформа очень удобная, все материалы в одном месте. Видеоуроки можно пересматривать, 
                    а домашние задания помогают закрепить материал. Набрал 160 баллов!&quot;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[#29382f]">
                    <div className="size-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shrink-0"></div>
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-sm">Ерлан</span>
                      <span className="text-[#9eb7a8] text-xs">Бакалавриат, 2024</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Review 5 */}
              <Card className="group border border-[#29382f] bg-[#1c2620] hover:border-[#38e07b]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#38e07b]/10">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#38e07b] text-[#38e07b]" />
                    ))}
                  </div>
                  <p className="text-[#9eb7a8] text-sm leading-relaxed">
                    &quot;Готовился самостоятельно, но не хватало системы. Этот курс дал мне четкий план и помог 
                    сфокусироваться на важных темах. Результат превзошел ожидания - 155 баллов!&quot;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[#29382f]">
                    <div className="size-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 shrink-0"></div>
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-sm">Асылбек</span>
                      <span className="text-[#9eb7a8] text-xs">Foundation, 2023</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Review 6 */}
              <Card className="group border border-[#29382f] bg-[#1c2620] hover:border-[#38e07b]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#38e07b]/10">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#38e07b] text-[#38e07b]" />
                    ))}
                  </div>
                  <p className="text-[#9eb7a8] text-sm leading-relaxed">
                    &quot;Поддержка преподавателей - это то, что отличает этот курс. Всегда можно было задать вопрос 
                    и получить развернутый ответ. Поступила на грант с баллом 157.&quot;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[#29382f]">
                    <div className="size-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 shrink-0"></div>
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-sm">Аружан</span>
                      <span className="text-[#9eb7a8] text-xs">Бакалавриат, 2024</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
            <p className="text-sm">© 2025 NUET Prep. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
