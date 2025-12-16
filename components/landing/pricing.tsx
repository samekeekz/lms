import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function Pricing() {
  const tiers = [
    {
      name: "Базовый",
      features: [
        "Доступ ко всем видеоурокам по Математике и Критическому мышлению",
        "Домашние задания с автопроверкой",
        "Пробные NUET-тесты на платформе",
        "Личный кабинет с прогрессом до даты экзамена",
      ],
    },
    {
      name: "С преподавателем",
      popular: true,
      features: [
        "Всё из тарифа «Базовый»",
        "Проверка сложных заданий и развёрнутая обратная связь",
        "Еженедельные групповые разборы и Q&A-сессии",
        "Рекомендации по индивидуальному плану подготовки",
      ],
    },
    {
      name: "Максимум",
      features: [
        "Всё из тарифа «С преподавателем»",
        "Личные консультации с преподавателем",
        "Приоритетные ответы на вопросы",
        "Персональное сопровождение до экзамена",
      ],
    },
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 text-balance">Форматы участия</h2>

          <p className="text-lg text-muted-foreground text-center mb-16">
            Выбери формат подготовки, который подходит именно тебе
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className={`bg-card rounded-2xl p-8 border ${
                  tier.popular ? "ring-2 ring-primary shadow-lg" : ""
                } relative`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Популярный
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-6">{tier.name}</h3>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/sign-up">
                  <Button className="w-full" size="lg" variant={tier.popular ? "default" : "outline"}>
                    Выбрать тариф
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Подробности по ценам и рассрочке ты можешь уточнить у нашего менеджера после заявки или в мессенджере.
          </p>
        </div>
      </div>
    </section>
  );
}

