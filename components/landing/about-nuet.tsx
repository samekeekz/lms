import { AlertCircle, Clock, BookOpen, Target } from "lucide-react";

export function AboutNuet() {
  const features = [
    {
      icon: BookOpen,
      title: "Математика",
      description: "Проверка математических знаний и навыков решения задач",
    },
    {
      icon: Target,
      title: "Критическое мышление",
      description: "Анализ информации, логика и решение проблем",
    },
    {
      icon: Clock,
      title: "60 вопросов / 120 минут",
      description: "Умение быстро разбирать условия и управлять временем",
    },
    {
      icon: AlertCircle,
      title: "Одна попытка",
      description: "Результаты через 6 недель — второй попытки сразу не будет",
    },
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 text-balance">
            Что такое NUET и почему к нему важно готовиться правильно
          </h2>

          <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto text-pretty leading-relaxed">
            NUET (Nazarbayev University Entrance Test) — это стандартизированный вступительный экзамен в Назарбаев
            Университет для абитуриентов бакалавриата и программы Foundation.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex gap-4 items-start p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow"
                >
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 md:p-8">
            <p className="text-base md:text-lg leading-relaxed text-pretty">
              <strong className="text-foreground">Важно помнить:</strong> результаты становятся доступны примерно через
              6 недель после сдачи — второй попытки «через неделю» не будет. Поэтому хаотичная подготовка в последний
              момент — самое рискованное решение.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

