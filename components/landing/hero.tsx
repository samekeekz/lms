import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Brain } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />

      <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-sm text-white/90 mb-4">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Подготовка к NU Foundation и бакалавриату
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
              Подготовка к NUET до нужного балла и гранта в
            </span>{" "}
            <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Nazarbayev University
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto text-pretty leading-relaxed">
            Онлайн-курс по Математике и Критическому мышлению для NUET. Видеоуроки на собственной платформе, домашние
            задания в формате экзамена и преподаватели с высокими баллами и 3+ годами опыта.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-sm">
              <GraduationCap className="w-5 h-5 text-purple-400" />
              <span className="text-white/90 font-medium">Математика</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Brain className="w-5 h-5 text-purple-400" />
              <span className="text-white/90 font-medium">Критическое мышление</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <span className="text-white/90 font-medium">60 вопросов / 120 минут</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="text-base px-8 h-12 bg-white text-indigo-950 hover:bg-white/90 font-semibold shadow-xl"
              >
                Получить доступ к пробному курсу
              </Button>
            </Link>
            <Link href="#program">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 h-12 bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20"
              >
                Посмотреть программу
              </Button>
            </Link>
          </div>

          <p className="text-sm text-white/70 pt-2">
            Бесплатный доступ к урокам и заданиям в формате NUET на нашей платформе
          </p>
        </div>
      </div>
    </section>
  );
}

