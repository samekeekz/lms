"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import axios from "axios"
import toast from "react-hot-toast"
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
  User,
  Phone,
  MessageSquare,
  Mail,
  Lock,
} from "lucide-react"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    telegramNickname: "",
    email: "",
    grade: "",
  })

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard")
    }
  }, [isLoaded, isSignedIn, router])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await axios.post("/api/leads", {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        telegramNickname: formData.telegramNickname || null,
        email: formData.email || null,
        grade: formData.grade || null,
      })
      toast.success("Спасибо! Мы свяжемся с вами в ближайшее время.")
      setFormData({
        name: "",
        phoneNumber: "",
        telegramNickname: "",
        email: "",
        grade: "",
      })
    } catch (error) {
      toast.error("Что-то пошло не так. Попробуйте еще раз.")
    } finally {
      setIsSubmitting(false)
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
              <a
                href="#about"
                className="text-white text-xs font-medium hover:text-[#38e07b] transition-colors whitespace-nowrap"
              >
                О NUET
              </a>
              <a
                href="#benefits"
                className="text-white text-xs font-medium hover:text-[#38e07b] transition-colors whitespace-nowrap"
              >
                Преимущества
              </a>
              <a
                href="#program"
                className="text-white text-xs font-medium hover:text-[#38e07b] transition-colors whitespace-nowrap"
              >
                Программа
              </a>
              <a
                href="#teachers"
                className="text-white text-xs font-medium hover:text-[#38e07b] transition-colors whitespace-nowrap"
              >
                Преподаватели
              </a>
              <a
                href="#reviews"
                className="text-white text-xs font-medium hover:text-[#38e07b] transition-colors whitespace-nowrap"
              >
                Отзывы
              </a>
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
              <a
                href="#about"
                className="block w-full text-left py-2 text-white hover:text-[#38e07b]"
                onClick={() => setMobileMenuOpen(false)}
              >
                О NUET
              </a>
              <a
                href="#benefits"
                className="block w-full text-left py-2 text-white hover:text-[#38e07b]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Преимущества
              </a>
              <a
                href="#program"
                className="block w-full text-left py-2 text-white hover:text-[#38e07b]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Программа
              </a>
              <a
                href="#format"
                className="block w-full text-left py-2 text-white hover:text-[#38e07b]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Формат
              </a>
              <a
                href="#teachers"
                className="block w-full text-left py-2 text-white hover:text-[#38e07b]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Преподаватели
              </a>
              <a
                href="#reviews"
                className="block w-full text-left py-2 text-white hover:text-[#38e07b]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Отзывы
              </a>
              <a
                href="#trial"
                className="block w-full text-left py-2 text-white hover:text-[#38e07b]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Пробный урок
              </a>
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

      <section id="hero" className="py-12 lg:py-20 bg-[#111714] relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="flex flex-col gap-8 text-left">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#38e07b]/30 bg-[#38e07b]/10 px-3 py-1">
                <span className="flex h-2 w-2 rounded-full bg-[#38e07b] animate-pulse"></span>
                <span className="text-xs font-medium uppercase tracking-wide text-[#38e07b]">Набор открыт</span>
                </div>
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1">
                  <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-xs font-medium uppercase tracking-wide text-red-500">подготовься за 6 недель</span>
                </div>
              </div>

              <div className="space-y-4">
                {/* <h1 className="font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-white">
                  Подготовка к NUET до нужного балла и <span className="text-[#38e07b]">гранта</span> в Nazarbayev University
                </h1> */}
                 <h1 className="font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-white">
                  Онлайн-марафон NUET марафон где мы закрепим <span className="text-[#38e07b]">все важные</span> темы
                </h1>
                <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
                  6-недельный онлайн марафон по подготовке к NUET. Видеоуроки на собственной платформе, домашние задания в формате экзамена и преподаватели с высокими баллами и 3+ годами опыта  </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#38e07b]/20 text-[#38e07b]">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span className="text-base text-slate-300">Повторим все самое важное и закрепим каждую &quot;непонятную&quot; тему</span>
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
                  <span className="text-base text-slate-300">Формат Обучения: видеоуроки + 2 вебинара в неделю, Домашние задания, еженедельные мок тесты</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2 w-full max-w-xl">
                <Button
                  asChild
                  className="flex h-14 w-full items-center justify-center rounded-full bg-[#38e07b] px-8 text-base font-bold text-[#111714] shadow-[0_0_20px_rgba(56,224,123,0.3)] hover:bg-[#2bc768] hover:shadow-[0_0_25px_rgba(56,224,123,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <a href="#lead-form">Получить доступ к пробному курсу</a>
                </Button>
                <div className="flex items-center justify-center gap-2 text-center sm:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-slate-500" />
                  <p className="text-xs text-slate-500 font-medium">
                    Бесплатный доступ к урокам и заданиям в формате NUET на нашей платформе
                  </p>
                </div>
              </div>

            </div>

            <div className="relative hidden lg:block w-full">
              <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full bg-[#38e07b]/20 blur-[120px]"></div>
              <div className="relative w-full overflow-hidden rounded-2xl border border-[#29382f] bg-[#1c2620] shadow-2xl aspect-video">
                <div className="absolute top-0 w-full h-12 bg-[#151c18] border-b border-[#29382f] flex items-center px-4 gap-2 z-10">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="absolute top-12 left-0 right-0 bottom-0 bg-transparent">
                  <Image
                    src="/course_screenshot.png"
                    alt="Интерактивная платформа - Видеоуроки и практика в одном месте"
                    fill
                    className="object-contain"
                    style={{ objectPosition: 'top center' }}
                    priority
                  />
                    </div>
                  </div>
              <div className="mt-6 p-6 rounded-xl bg-[#1c2620]/90 backdrop-blur border border-[#3d5245]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded bg-[#38e07b]/20 text-[#38e07b]">
                          <Play className="w-4 h-4" />
                        </div>
                    <span className="text-sm font-bold text-white">Интерактивная платформа</span>
                      </div>
                    </div>
                <p className="text-xs text-[#9eb7a8]">Видеоуроки и практика в одном месте</p>
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
          </div>
        </div>
      </section>

      <section id="trial" className="py-20 bg-[#38e07b]/5">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-[#111714]">
                Mock NUET из задач 2020-2021
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
                    asChild
                    type="button"
                    className="bg-[#38e07b] hover:bg-[#2bc768] text-[#111714] font-bold px-8 h-12 rounded-full"
                  >
                    <a href="#lead-form">Пройти бесплатный NUET-тест</a>
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


      <section id="benefits" className="relative py-16 px-4 md:px-10 lg:px-20 bg-[#111714] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#38e07b]/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#38e07b]/5 rounded-full blur-[100px]"></div>
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
                <h3 className="text-white text-xl font-bold leading-tight mb-3">Пробные Mock-тесты</h3>
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
                  <Calendar className="w-8 h-8" />
                </div>
                <h3 className="text-white text-xl font-bold leading-tight mb-3">2 онлайн урока в неделю по каждому предмету</h3>
                <p className="text-[#9eb7a8] text-sm leading-relaxed">
                  Регулярные занятия по математике и критическому мышлению для систематической подготовки.
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
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-[#23332a] mb-4 bg-gray-200 relative">
                    <Image
                      src="/teacher_2.JPG"
                      alt="Портрет преподавателя Салима"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#38e07b]/10 border border-[#38e07b]/20">
                    <Award className="w-4 h-4 text-[#38e07b]" />
                    <span className="text-[#38e07b] text-xs font-bold uppercase tracking-wider">Expert</span>
                  </div>
                </div>

                <div className="flex flex-col flex-1">
                  <div className="text-center md:text-left mb-4">
                    <h3 className="text-2xl font-bold text-white mb-1">Salim Mussin</h3>
                    <p className="text-[#38e07b] font-bold text-sm tracking-wide uppercase">
                      Math tutor
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 min-w-5 size-5 rounded-full bg-[#38e07b]/20 flex items-center justify-center text-[#38e07b]">
                        <TrendingUp className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-gray-300 text-sm">
                        NUET MATH: 120/120 (overall: 217)
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 min-w-5 size-5 rounded-full bg-[#38e07b]/20 flex items-center justify-center text-[#38e07b]">
                        <TrendingUp className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-gray-300 text-sm">
                        SAT MATH 800/800
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 min-w-5 size-5 rounded-full bg-[#38e07b]/20 flex items-center justify-center text-[#38e07b]">
                        <GraduationCap className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-gray-300 text-sm">Major: Economics</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 min-w-5 size-5 rounded-full bg-[#38e07b]/20 flex items-center justify-center text-[#38e07b]">
                        <School className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-gray-300 text-sm">2+ years of tutoring</span>
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
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-[#23332a] mb-4 bg-gray-200 relative">
                    <Image
                      src="/teacher_1.jpg"
                      alt="Портрет преподавателя Арсена"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#38e07b]/10 border border-[#38e07b]/20">
                    <Award className="w-4 h-4 text-[#38e07b]" />
                    <span className="text-[#38e07b] text-xs font-bold uppercase tracking-wider">Expert</span>
                  </div>
                </div>

                <div className="flex flex-col flex-1">
                  <div className="text-center md:text-left mb-4">
                    <h3 className="text-2xl font-bold text-white mb-1">Sanzhar Kyrgyzbayev</h3>
                    <p className="text-[#38e07b] font-bold text-sm tracking-wide uppercase">
                      Critical Thinking Tutor
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 min-w-5 size-5 rounded-full bg-[#38e07b]/20 flex items-center justify-center text-[#38e07b]">
                        <GraduationCap className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-gray-300 text-sm">Major: PSIR</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 min-w-5 size-5 rounded-full bg-[#38e07b]/20 flex items-center justify-center text-[#38e07b]">
                        <School className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-gray-300 text-sm">3+ years of tutoring</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 min-w-5 size-5 rounded-full bg-[#38e07b]/20 flex items-center justify-center text-[#38e07b]">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-gray-300 text-sm">helped over 110 students to get into NU</span>
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
              asChild
              className="inline-flex items-center gap-2 bg-[#38e07b] hover:bg-[#2bc466] text-[#111714] font-bold py-4 px-8 rounded-full transition-colors duration-200"
            >
              <a href="#lead-form">
              <span>Записаться на пробный урок</span>
              <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <p className="mt-4 text-xs text-[#9eb7a8] uppercase tracking-widest font-medium">Бесплатная консультация</p>
          </div>
        </div>
      </section>

      {/* Results & Goals Section */}
      <section id="results" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#122017] overflow-hidden">
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
                    <h4 className="text-lg font-bold text-white mb-1">Фундамент</h4>
                    <p className="text-[#9eb7a8]">ты повторишь все важные темы из экзамена и закрепишь их перед самим экзаменом</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 p-5 rounded-xl bg-[#1c2620]/50 border border-transparent hover:border-[#29382f] transition-all duration-300">
                  <div className="flex-shrink-0 mt-1 w-10 h-10 rounded-full bg-[#38e07b]/10 flex items-center justify-center text-[#38e07b]">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Формат</h4>
                    <p className="text-[#9eb7a8]">за 6 недель ты привыкнешь к формату и улучшишь свои навыки решения задач</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 p-5 rounded-xl bg-[#1c2620]/50 border border-transparent hover:border-[#29382f] transition-all duration-300">
                  <div className="flex-shrink-0 mt-1 w-10 h-10 rounded-full bg-[#38e07b]/10 flex items-center justify-center text-[#38e07b]">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Уверенность</h4>
                    <p className="text-[#9eb7a8]">У нас огромная база материалов и мы успели собрать для вас похожие на реальный NUET тесты и хоумворки</p>
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
                        <span className="text-5xl font-black text-[#38e07b]">155</span>
                        <span className="text-xl text-white font-bold">баллов</span>
                </div>
                      <p className="text-[#9eb7a8] text-sm leading-relaxed">
                        средний балл NUET наших учеников
                      </p>
                    </div>
                    
                    <div className="h-px bg-[#29382f]"></div>
                    
                    <div className="flex flex-col gap-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-white">217</span>
                        <span className="text-xl text-[#9eb7a8] font-medium">учеников</span>
                    </div>
                      <p className="text-[#9eb7a8] text-sm leading-relaxed">
                        поступили в НУ за последние 2 года
                      </p>
                  </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#38e07b] rounded-lg p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg shadow-[#38e07b]/20">
                <div className="flex flex-col gap-1 text-center sm:text-left">
                  <span className="text-[#111714] font-bold text-lg leading-tight">Готов начать подготовку?</span>
                  <span className="text-[#111714]/80 text-sm font-medium">Сдай бесплатный mock уже сегодня</span>
                </div>
                <Button
                  asChild
                  className="bg-[#111714] hover:bg-black text-white font-bold py-3 px-6 rounded-full transition-colors whitespace-nowrap shadow-md"
                >
                  <a href="#lead-form">Начать сейчас</a>
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
                    &quot;Курс помог мне систематизировать подготовку. Особенно полезными были пробные Mock тесты в формате NUET. 
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
                    Результат: 158 баллов, поступил на Фаунд.&quot;
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

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-[#111714] relative">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38e07b]/10 border border-[#38e07b]/20 mb-4">
              <span className="text-[#38e07b] text-xs font-bold uppercase tracking-wide">Цены</span>
            </div>
            <h2 className="text-white text-3xl md:text-5xl font-black mb-6 leading-tight">
              Выбери свой план подготовки
            </h2>
            <p className="text-[#9eb7a8] text-lg max-w-[600px] mx-auto mb-4">
              Гибкие варианты обучения с максимальной выгодой
            </p>
            <div className="flex items-center justify-center gap-2 text-[#38e07b]">
              <Clock className="w-5 h-5" />
              <span className="text-base font-semibold">Длительность: 6 недель</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
            {/* 1 Subject Plan */}
            <Card className="border border-[#3d5245] bg-[#1c2620] hover:border-[#38e07b]/50 transition-all duration-300 relative">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">1 предмет</h3>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-[#9eb7a8]" />
                    <span className="text-sm text-[#9eb7a8]">Длительность: 6 недель</span>
                  </div>
                  <div className="flex items-baseline justify-center gap-2 mb-4">
                    <span className="text-4xl font-black text-[#38e07b]">23 000</span>
                    <span className="text-xl text-[#9eb7a8]">₸</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm text-[#9eb7a8] line-through">32 000 ₸</span>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                      -30%
                    </Badge>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#38e07b] w-5 h-5 mt-0.5 shrink-0" />
                    <span className="text-[#d0e0d8] text-sm">Видеоуроки по выбранному предмету</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#38e07b] w-5 h-5 mt-0.5 shrink-0" />
                    <span className="text-[#d0e0d8] text-sm">2 вебинара в неделю</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#38e07b] w-5 h-5 mt-0.5 shrink-0" />
                    <span className="text-[#d0e0d8] text-sm">Домашние задания</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#38e07b] w-5 h-5 mt-0.5 shrink-0" />
                    <span className="text-[#d0e0d8] text-sm">Еженедельные мок тесты</span>
                  </li>
                </ul>
                  <Button
                  asChild
                  className="w-full bg-[#38e07b] hover:bg-[#2bc768] text-[#111714] font-bold h-12 rounded-full"
                  >
                  <a href="#lead-form">Выбрать план</a>
                  </Button>
              </CardContent>
            </Card>

            {/* 2 Subjects Plan */}
            <Card className="border-2 border-[#38e07b] bg-[#1c2620] hover:border-[#38e07b] transition-all duration-300 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-[#38e07b] text-[#111714] font-bold px-4 py-1">
                  Популярный
                </Badge>
              </div>
              <CardContent className="p-8 pt-12">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">2 предмета</h3>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-[#9eb7a8]" />
                    <span className="text-sm text-[#9eb7a8]">Длительность: 6 недель</span>
                  </div>
                  <div className="flex items-baseline justify-center gap-2 mb-4">
                    <span className="text-4xl font-black text-[#38e07b]">35 900</span>
                    <span className="text-xl text-[#9eb7a8]">₸</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm text-[#9eb7a8] line-through">64 000 ₸</span>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                      -44%
                    </Badge>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#38e07b] w-5 h-5 mt-0.5 shrink-0" />
                    <span className="text-[#d0e0d8] text-sm">Видеоуроки по обоим предметам</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#38e07b] w-5 h-5 mt-0.5 shrink-0" />
                    <span className="text-[#d0e0d8] text-sm">2 вебинара в неделю по каждому предмету</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#38e07b] w-5 h-5 mt-0.5 shrink-0" />
                    <span className="text-[#d0e0d8] text-sm">Домашние задания</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#38e07b] w-5 h-5 mt-0.5 shrink-0" />
                    <span className="text-[#d0e0d8] text-sm">Еженедельные мок тесты</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#38e07b] w-5 h-5 mt-0.5 shrink-0" />
                    <span className="text-[#d0e0d8] text-sm font-semibold">Максимальная экономия</span>
                  </li>
                </ul>
                  <Button
                  asChild
                  className="w-full bg-[#38e07b] hover:bg-[#2bc768] text-[#111714] font-bold h-12 rounded-full"
                >
                  <a href="#lead-form">Выбрать план</a>
                  </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="lead-form" className="py-20 bg-[#111714] relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] rounded-full bg-[#38e07b]/5 blur-[100px]"></div>
          <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] rounded-full bg-[#38e07b]/5 blur-[120px]"></div>
        </div>
        <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38e07b]/10 border border-[#38e07b]/20 w-fit">
                  <CheckCircle2 className="w-4 h-4 text-[#38e07b]" />
                  <span className="text-[#38e07b] text-xs font-bold uppercase tracking-wide">Бесплатный доступ</span>
                </div>
                <h2 className="text-white tracking-tight text-4xl sm:text-5xl font-black leading-[1.1]">
                  Сдай Mock тест состоящих из задач прошлых лет NUET и получи пробный доступ к платформе
                </h2>
                <p className="text-gray-300 text-lg font-normal leading-relaxed max-w-[600px]">
                  Получи доступ к пробному мини-курсу на нашей платформе и оцени формат обучения перед покупкой полного курса.
                </p>
              </div>
            </div>

            <div className="relative w-full max-w-[480px] mx-auto lg:ml-auto">
              <div className="relative bg-[#1c2620]/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#3d5245]/50">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Заполни форму</h3>
                  <p className="text-[#9eb7a8] text-sm">Введите свои данные, чтобы начать обучение прямо сейчас.</p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white text-sm font-medium pl-2">Имя</Label>
                    <div className="relative">
                      <Input
                        id="name"
                        type="text"
                        placeholder="Как к вам обращаться?"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full h-12 rounded-full bg-[#111714] border border-[#3d5245] text-white px-5 pl-12 placeholder:text-[#9eb7a8] focus:ring-2 focus:ring-[#38e07b] focus:border-transparent"
                      />
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9eb7a8] w-5 h-5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white text-sm font-medium pl-2">Телефон / WhatsApp</Label>
                    <div className="relative">
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        required
                        className="w-full h-12 rounded-full bg-[#111714] border border-[#3d5245] text-white px-5 pl-12 placeholder:text-[#9eb7a8] focus:ring-2 focus:ring-[#38e07b] focus:border-transparent"
                      />
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9eb7a8] w-5 h-5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Telegram Field */}
                  <div className="space-y-2">
                    <Label htmlFor="telegram" className="text-white text-sm font-medium pl-2">Telegram никнейм</Label>
                    <div className="relative">
                      <Input
                        id="telegram"
                        type="text"
                        placeholder="@username"
                        value={formData.telegramNickname}
                        onChange={(e) => setFormData({ ...formData, telegramNickname: e.target.value })}
                        className="w-full h-12 rounded-full bg-[#111714] border border-[#3d5245] text-white px-5 pl-12 placeholder:text-[#9eb7a8] focus:ring-2 focus:ring-[#38e07b] focus:border-transparent"
                      />
                      <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9eb7a8] w-5 h-5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 w-full h-14 bg-[#38e07b] hover:bg-[#2fc468] text-[#111714] font-bold text-base rounded-full shadow-[0_0_20px_rgba(56,224,123,0.3)] hover:shadow-[0_0_30px_rgba(56,224,123,0.5)] transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span>Получить доступ к пробному курсу</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>

                  {/* Consent Text */}
                  <p className="text-center mt-3 text-xs text-[#9eb7a8] leading-relaxed opacity-75">
                    Нажимая &quot;Отправить&quot;, вы соглашаетесь на обработку персональных данных.
                  </p>

                  {/* Microtext */}
                  <div className="text-center mt-2 px-2">
                    <p className="text-xs text-[#9eb7a8] leading-relaxed flex items-start justify-center gap-1.5 opacity-80">
                      <Lock className="w-[14px] h-[14px] mt-0.5 shrink-0" />
                      <span>Никакого спама. Только материалы по NUET и важные напоминания до экзамена.</span>
                    </p>
                  </div>
                </form>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-[#38e07b]/20 rounded-full z-0 opacity-50"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#38e07b]/10 rounded-full z-0 blur-xl"></div>
            </div>
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
