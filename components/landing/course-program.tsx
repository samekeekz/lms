import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calculator, Lightbulb, Download } from "lucide-react";

export function CourseProgram() {
  const mathTopics = [
    "Числа и выражения",
    "Алгебра: линейные и квадратные уравнения и неравенства",
    "Системы уравнений",
    "Функции и графики",
    "Геометрия: углы, треугольники, многоугольники",
    "Площади и объёмы фигур",
    "Элементы тригонометрии",
    "Вероятность и элементы статистики",
    "Сложные задачи уровня NUET (комбинированные темы)",
  ];

  const criticalTopics = [
    "Анализ текстов и аргументов",
    "Логические задачи и последовательности",
    "Таблицы, графики, диаграммы",
    "Работа с данными и выбор корректного вывода",
    "Задачи с лишней или скрытой информацией",
    "Стратегии работы с тестом и тайм-менеджмент на NUET",
  ];

  return (
    <section id="program" className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 text-balance">Программа подготовки к NUET</h2>

          <p className="text-lg text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
            Закрываем ключевые темы по Математике и Критическому мышлению, которые проверяет NUET
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card rounded-2xl p-8 border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Математика</h3>
              </div>

              <ul className="space-y-3">
                {mathTopics.map((topic, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-sm font-medium text-primary mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground leading-relaxed">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-8 border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Критическое мышление</h3>
              </div>

              <ul className="space-y-3">
                {criticalTopics.map((topic, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-sm font-medium text-primary mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground leading-relaxed">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
            <p className="text-sm text-center text-muted-foreground">
              Детальная структура модулей может немного меняться в зависимости от формата NUET, чтобы курс всегда
              оставался актуальным.
            </p>
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Скачать подробную программу курса (PDF)
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

