import Link from "next/link";
import { GraduationCap, Target, BookOpen, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ForWhom() {
  const audience = [
    {
      icon: GraduationCap,
      text: "Ты хочешь поступить в Назарбаев Университет на Foundation или бакалавриат.",
      accent: "bg-blue-500/10 border-blue-500/20",
    },
    {
      icon: Target,
      text: "Хочешь подтянуть именно те темы по Математике и Критическому мышлению, которые спрашивают на NUET.",
      accent: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      icon: BookOpen,
      text: "Уже что-то решаешь, но не хватает структуры, пробных тестов и понятного плана до экзамена.",
      accent: "bg-purple-500/10 border-purple-500/20",
    },
    {
      icon: Users2,
      text: "Ты родитель и хочешь, чтобы ребёнок готовился по системе, а не просто смотрел случайные видео с YouTube.",
      accent: "bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-balance">Для кого этот курс</h2>

          <p className="text-lg text-muted-foreground text-center mb-12">Этот курс для тебя, если:</p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {audience.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className={`rounded-xl p-6 border ${item.accent}`}>
                  <Icon className="w-8 h-8 mb-4 text-primary" />
                  <p className="text-base leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <Link href="#program">
              <Button size="lg" variant="outline">
                Посмотреть программу подготовки
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

