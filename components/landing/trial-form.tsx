"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";

export function TrialForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const benefits = [
    "1 пробный урок по Математике NUET с разбором задач",
    "1 урок по Критическому мышлению / Решению проблем",
    "Мини-тест в формате NUET",
    "Обратную связь по результатам: какие темы тебе стоит подтянуть в первую очередь",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to sign-up page where they can register and get free quiz access
    router.push("/sign-up?trial=true");
  };

  return (
    <section className="py-20 md:py-32 bg-primary/5" id="trial">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 text-balance">
            Попробуй подготовку к NUET бесплатно
          </h2>

          <p className="text-lg text-muted-foreground text-center mb-12">
            Получи доступ к пробному мини-курсу на нашей платформе и оцени формат обучения
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <p className="font-semibold text-lg">После регистрации ты получишь:</p>

              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-8 border shadow-sm">
              {!isSubmitted ? (
                <>
                  <p className="font-medium mb-6">Зарегистрируйся и получи доступ к бесплатному пробному тесту</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя</Label>
                      <Input id="name" placeholder="Ваше имя" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон / WhatsApp</Label>
                      <Input id="phone" type="tel" placeholder="+7" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" placeholder="your@email.com" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="grade">Класс / год поступления</Label>
                      <select
                        id="grade"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="">Выберите класс</option>
                        <option value="10">10 класс (2026)</option>
                        <option value="11">11 класс (2025)</option>
                        <option value="graduate">Выпускник</option>
                      </select>
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Получить доступ к пробному курсу
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Никакого спама. Только материалы по NUET и важные напоминания до экзамена.
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Спасибо за заявку!</h3>
                  <p className="text-muted-foreground">Мы отправим тебе доступ к пробному курсу в ближайшее время.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

