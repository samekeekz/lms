import Link from "next/link";
import { Sparkles, TrendingUp, MessageSquare, BarChartBig as ChartBar, Users, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CourseValue() {
  const benefits = [
    {
      icon: Sparkles,
      title: "Полное покрытие тем NUET",
      description: "По Математике и Критическому мышлению",
      gradient: "from-violet-500/10 to-purple-500/10",
    },
    {
      icon: TrendingUp,
      title: "Системный план подготовки",
      description: "До даты экзамена: от простого к сложному",
      gradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      icon: ChartBar,
      title: "Практика в формате NUET",
      description: "Задания и пробные тесты с таймером",
      gradient: "from-emerald-500/10 to-teal-500/10",
    },
    {
      icon: MessageSquare,
      title: "Разбор ошибок",
      description: "Ты понимаешь не только «какой ответ», но и «почему так»",
      gradient: "from-amber-500/10 to-orange-500/10",
    },
    {
      icon: Users,
      title: "Поддержка преподавателей",
      description: "Можно задать вопрос по непонятной задаче",
      gradient: "from-pink-500/10 to-rose-500/10",
    },
    {
      icon: Monitor,
      title: "Удобная платформа",
      description: "Видно прогресс, сильные и слабые темы",
      gradient: "from-indigo-500/10 to-blue-500/10",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-primary/5">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-balance">Что даёт тебе этот курс</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${benefit.gradient} rounded-xl p-6 border hover:shadow-lg transition-all hover:-translate-y-1`}
                >
                  <div className="w-12 h-12 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link href="/sign-up">
              <Button size="lg">Посмотреть, как это работает на платформе</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

