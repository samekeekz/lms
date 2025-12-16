"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "Подойдёт ли курс, если я сейчас в 10 или 11 классе?",
      answer:
        "Да. Если ты в 10–11 классе, у тебя есть время спокойно пройти все модули и несколько раз отработать формат NUET. Мы поможем составить план под твой класс и дату экзамена.",
    },
    {
      question: "Сколько времени в неделю нужно заниматься?",
      answer:
        "В среднем мы рекомендуем от 4 до 6 часов в неделю: 2–3 часа на видеоуроки и 2–3 часа на решение задач и пробные тесты. Перед экзаменом нагрузку можно немного увеличить.",
    },
    {
      question: "Можно ли совмещать подготовку с лицеем/школой?",
      answer:
        "Да. Формат курса гибкий: ты сам выбираешь время для уроков и практики. Все материалы доступны 24/7 на платформе.",
    },
    {
      question: "Что, если я не успею пройти все уроки до NUET?",
      answer:
        "Мы поможем расставить приоритеты по темам и дадим план, с чего начать, чтобы максимально использовать оставшееся время.",
    },
    {
      question: "Есть ли у вас гарантия результата?",
      answer:
        "Мы не можем обещать конкретный балл — это зависит и от твоей работы. Но мы даём всю необходимую теорию, практику, формат NUET и поддержку преподавателей, чтобы ты был максимально готов к экзамену.",
    },
    {
      question: "Как я получу доступ к платформе?",
      answer:
        "После заявки мы отправим тебе ссылку и инструкцию. Регистрация займет пару минут, и сразу после этого ты сможешь посмотреть пробный курс и начать подготовку.",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-balance">Частые вопросы</h2>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-card border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

