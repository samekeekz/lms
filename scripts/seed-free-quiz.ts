const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    console.log("🚀 Seeding free quiz...");

    // Check if a free quiz already exists
    const existingQuiz = await db.freeQuiz.findFirst();
    
    if (existingQuiz) {
      console.log("⚠️  Free quiz already exists. Skipping seed.");
      console.log(`   Quiz: ${existingQuiz.title}`);
      console.log(`   Published: ${existingQuiz.isPublished}`);
      console.log(`   Active: ${existingQuiz.isActive}`);
      return;
    }

    // Create the free quiz
    const quiz = await db.freeQuiz.create({
      data: {
        title: "Пробный тест NUET",
        description: "Проверь свои знания по математике и критическому мышлению в формате NUET",
        passingScore: 70,
        timeLimit: 15,
        isPublished: true,
        isActive: true,
        shuffleQuestions: true,
        showCorrectAnswers: true,
      },
    });

    console.log("✅ Free quiz created!");

    // Create questions
    const questions = [
      {
        question: "Какой результат выражения: 15 × 4 - 20 ÷ 5?",
        type: "MULTIPLE_CHOICE",
        points: 1,
        position: 0,
        explanation: "15 × 4 = 60, затем 20 ÷ 5 = 4, итого 60 - 4 = 56",
        options: [
          { text: "52", isCorrect: false, position: 0 },
          { text: "56", isCorrect: true, position: 1 },
          { text: "60", isCorrect: false, position: 2 },
          { text: "64", isCorrect: false, position: 3 },
        ],
      },
      {
        question: "Если x + 5 = 12, то чему равно 2x?",
        type: "MULTIPLE_CHOICE",
        points: 1,
        position: 1,
        explanation: "x + 5 = 12, значит x = 7, поэтому 2x = 14",
        options: [
          { text: "7", isCorrect: false, position: 0 },
          { text: "12", isCorrect: false, position: 1 },
          { text: "14", isCorrect: true, position: 2 },
          { text: "17", isCorrect: false, position: 3 },
        ],
      },
      {
        question: "Все студенты, которые сдали NUET, поступили в университет. Алия поступила в университет. Можно ли утверждать, что Алия сдала NUET?",
        type: "MULTIPLE_CHOICE",
        points: 1,
        position: 2,
        explanation: "Нет, нельзя. Алия могла поступить другим способом. Это логическая ошибка 'утверждение следствия'.",
        options: [
          { text: "Да, можно утверждать", isCorrect: false, position: 0 },
          { text: "Нет, нельзя утверждать", isCorrect: true, position: 1 },
          { text: "Недостаточно информации", isCorrect: false, position: 2 },
          { text: "Зависит от других факторов", isCorrect: false, position: 3 },
        ],
      },
      {
        question: "Площадь квадрата равна 64 см². Чему равен периметр этого квадрата?",
        type: "MULTIPLE_CHOICE",
        points: 1,
        position: 3,
        explanation: "Сторона квадрата = √64 = 8 см. Периметр = 4 × 8 = 32 см",
        options: [
          { text: "16 см", isCorrect: false, position: 0 },
          { text: "24 см", isCorrect: false, position: 1 },
          { text: "32 см", isCorrect: true, position: 2 },
          { text: "64 см", isCorrect: false, position: 3 },
        ],
      },
      {
        question: "В магазине цена товара снизилась на 20%, а затем повысилась на 20%. Как изменилась цена по сравнению с начальной?",
        type: "MULTIPLE_CHOICE",
        points: 1,
        position: 4,
        explanation: "Пусть цена была 100. После снижения: 80. После повышения на 20%: 80 × 1.2 = 96. Цена уменьшилась на 4%.",
        options: [
          { text: "Не изменилась", isCorrect: false, position: 0 },
          { text: "Уменьшилась на 4%", isCorrect: true, position: 1 },
          { text: "Увеличилась на 4%", isCorrect: false, position: 2 },
          { text: "Уменьшилась на 2%", isCorrect: false, position: 3 },
        ],
      },
      {
        question: "Критическое мышление предполагает принятие информации без проверки.",
        type: "TRUE_FALSE",
        points: 1,
        position: 5,
        explanation: "Неверно. Критическое мышление как раз предполагает проверку и анализ информации.",
        options: [
          { text: "Верно", isCorrect: false, position: 0 },
          { text: "Неверно", isCorrect: true, position: 1 },
        ],
      },
      {
        question: "Какое число следующее в последовательности: 2, 6, 12, 20, 30, ...?",
        type: "MULTIPLE_CHOICE",
        points: 1,
        position: 6,
        explanation: "Разности: 4, 6, 8, 10, 12. Следующее число: 30 + 12 = 42",
        options: [
          { text: "40", isCorrect: false, position: 0 },
          { text: "42", isCorrect: true, position: 1 },
          { text: "44", isCorrect: false, position: 2 },
          { text: "36", isCorrect: false, position: 3 },
        ],
      },
      {
        question: "Выберите все числа, которые делятся на 3:",
        type: "MULTIPLE_SELECT",
        points: 2,
        position: 7,
        explanation: "Число делится на 3, если сумма его цифр делится на 3. 15: 1+5=6✓, 22: 2+2=4✗, 33: 3+3=6✓, 45: 4+5=9✓",
        options: [
          { text: "15", isCorrect: true, position: 0 },
          { text: "22", isCorrect: false, position: 1 },
          { text: "33", isCorrect: true, position: 2 },
          { text: "45", isCorrect: true, position: 3 },
        ],
      },
      {
        question: "Если A > B и B > C, то A > C. Это пример:",
        type: "MULTIPLE_CHOICE",
        points: 1,
        position: 8,
        explanation: "Это транзитивность - свойство, при котором отношение переносится через промежуточный элемент.",
        options: [
          { text: "Дедукции", isCorrect: false, position: 0 },
          { text: "Индукции", isCorrect: false, position: 1 },
          { text: "Транзитивности", isCorrect: true, position: 2 },
          { text: "Аналогии", isCorrect: false, position: 3 },
        ],
      },
      {
        question: "Вероятность выпадения орла при подбрасывании монеты равна 0.5. Какова вероятность выпадения орла два раза подряд?",
        type: "MULTIPLE_CHOICE",
        points: 1,
        position: 9,
        explanation: "P(орел и орел) = 0.5 × 0.5 = 0.25",
        options: [
          { text: "0.5", isCorrect: false, position: 0 },
          { text: "0.25", isCorrect: true, position: 1 },
          { text: "1", isCorrect: false, position: 2 },
          { text: "0.75", isCorrect: false, position: 3 },
        ],
      },
    ];

    // Create all questions with options
    for (const questionData of questions) {
      await db.freeQuizQuestion.create({
        data: {
          quizId: quiz.id,
          question: questionData.question,
          type: questionData.type,
          points: questionData.points,
          position: questionData.position,
          explanation: questionData.explanation,
          options: {
            create: questionData.options,
          },
        },
      });
    }

    console.log("✅ 10 questions created!");
    console.log("\n🎉 Free quiz seeding successful!");
    console.log(`\n📝 Quiz Details:`);
    console.log(`   Title: ${quiz.title}`);
    console.log(`   Questions: 10`);
    console.log(`   Passing Score: ${quiz.passingScore}%`);
    console.log(`   Time Limit: ${quiz.timeLimit} minutes`);
    console.log(`   Published: ${quiz.isPublished}`);
    console.log(`   Active: ${quiz.isActive}\n`);

  } catch (error) {
    console.log("❌ Error seeding free quiz: ", error);
  } finally {
    await db.$disconnect();
  }
}

main();

