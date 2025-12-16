import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-20 md:py-32">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">Начни подготовку к NUET уже сейчас</h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty leading-relaxed">
            Каждый день до экзамена можно использовать, чтобы стать сильнее в Математике и Критическом мышлении. Оставь
            заявку, получи доступ к пробному курсу и посмотри, подходит ли тебе наш формат.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="text-base px-8 h-12">
                Получить доступ к пробному курсу
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-base px-8 h-12 bg-transparent">
              <MessageCircle className="w-4 h-4 mr-2" />
              Задать вопрос в WhatsApp
            </Button>
          </div>
        </div>
      </div>

      <footer className="mt-20 pt-12 border-t">
        <div className="container px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 NUET Подготовка. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </section>
  );
}

