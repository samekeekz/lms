import { Video, FileCheck, Timer, MessageCircle, BarChart3, Calendar } from "lucide-react";

export function LearningFormat() {
  const formats = [
    {
      icon: Video,
      title: "Видеоуроки по темам NUET",
      description: "Короткие, понятные уроки по каждой теме. Теория + разбор типовых задач в стиле экзамена.",
    },
    {
      icon: FileCheck,
      title: "Домашние задания после каждого модуля",
      description:
        "Задания в формате NUET. Часть проверяется автоматически, по сложным задачам даём подробные разборы.",
    },
    {
      icon: Timer,
      title: "Пробные NUET-тесты с таймером",
      description:
        "Полноценные симуляции экзамена: 60 вопросов / 120 минут. После теста — отчёт по темам и рекомендации.",
    },
    {
      icon: MessageCircle,
      title: "Поддержка преподавателей",
      description: "Ты не остаёшься один. Можно задать вопрос по задаче и получить обратную связь.",
    },
    {
      icon: BarChart3,
      title: "Личный кабинет с прогрессом",
      description: "В одном месте ты видишь, сколько модулей уже прошёл, какие темы требуют внимания.",
    },
    {
      icon: Calendar,
      title: "Гибкий график",
      description: "Ты занимаешься в удобное время. Все уроки доступны 24/7, нужен только интернет.",
    },
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 text-balance">Как проходит обучение</h2>

          <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            Всё обучение проходит онлайн на нашей образовательной платформе
          </p>

          <div className="space-y-6">
            {formats.map((format, index) => {
              const Icon = format.icon;
              return (
                <div
                  key={index}
                  className="flex gap-6 items-start bg-card rounded-xl p-6 md:p-8 border hover:border-primary/50 transition-colors"
                >
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{format.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{format.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

