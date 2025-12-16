import { GraduationCap, Award, User } from "lucide-react";

export function Teachers() {
  const teachers = [
    {
      name: "Салим",
      role: "Студент Назарбаев Университет",
      major: "Major: Economics (Undeclared)",
      nuetScore: "217",
      nuetBreakdown: "Math 120, Critical thinking 97",
      education: "Выпускник РФМШ Алматы",
      achievements: [
        "Высокий балл NUET: 217 (Math 120, Critical thinking 97)",
        "Студент Назарбаев Университет",
        "Выпускник РФМШ Алматы",
      ],
    },
    {
      name: "Преподаватель 2",
      role: "Информация скоро будет добавлена",
      major: "",
      nuetScore: "",
      nuetBreakdown: "",
      education: "",
      achievements: ["Профессиональный преподаватель", "Опыт подготовки к NUET", "Подробная информация скоро"],
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 text-balance">
            Кто будет тебя готовить к NUET
          </h2>

          <p className="text-lg text-muted-foreground text-center mb-16 max-w-3xl mx-auto text-pretty leading-relaxed">
            Наши преподаватели сами проходили NUET, набрали высокие баллы и учатся в Назарбаев Университет. Они
            понимают, как мыслят составители заданий, и объясняют сложные вещи простым языком.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {teachers.map((teacher, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative h-80 overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <User className="w-24 h-24 text-white/30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-3xl font-bold mb-1 text-white drop-shadow-lg">{teacher.name}</h3>
                    <p className="text-amber-400 font-medium drop-shadow-md">{teacher.role}</p>
                  </div>
                </div>

                <div className="p-8">
                  {teacher.nuetScore && (
                    <div className="bg-primary/10 rounded-xl p-4 mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-5 h-5 text-primary" />
                        <span className="font-bold text-2xl text-primary">NUET: {teacher.nuetScore}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{teacher.nuetBreakdown}</p>
                    </div>
                  )}

                  <ul className="space-y-3">
                    {teacher.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex gap-2 items-start text-sm">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-muted-foreground leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  {teacher.education && (
                    <div className="mt-6 pt-6 border-t flex items-center gap-2 text-sm text-muted-foreground">
                      <GraduationCap className="w-4 h-4" />
                      <span>{teacher.education}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

