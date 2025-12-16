import { PrismaClient, QuestionType } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "Math" },
        { name: "Critical Thinking" },
        { name: "English" },
      ],
      skipDuplicates: true,
    });

    console.log("✅ Categories seeded!");

    let course = await db.course.findFirst({
      where: {
        title: {
          contains: "Test",
        },
      },
    });

    if (!course) {
      const category = await db.category.findFirst({
        where: { name: "Critical Thinking" },
      });

      course = await db.course.create({
        data: {
          userId: process.env.NEXT_PUBLIC_TEACHER_ID!,
          title: "Test Course for Quiz",
          description: "A test course to demonstrate the quiz feature",
          imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f",
          price: 0,
          isPublished: true,
          categoryId: category?.id,
        },
      });

      console.log("✅ Test course created!");
    }

    let chapter = await db.chapter.findFirst({
      where: {
        courseId: course.id,
      },
    });

    if (!chapter) {
      chapter = await db.chapter.create({
        data: {
          courseId: course.id,
          title: "Introduction to Critical Thinking",
          description: "Learn the fundamentals of critical thinking and logical reasoning",
          position: 0,
          isPublished: true,
          isFree: true,
        },
      });

      console.log("✅ Test chapter created!");
    }

    const existingQuiz = await db.quiz.findUnique({
      where: {
        chapterId: chapter.id,
      },
    });

    if (existingQuiz) {
      console.log("⚠️  Quiz already exists for this chapter. Skipping quiz seed.");
      return;
    }

    const quiz = await db.quiz.create({
      data: {
        chapterId: chapter.id,
        title: "Critical Thinking Assessment",
        description: "Test your understanding of critical thinking concepts",
        passingScore: 70,
        timeLimit: 15,
        maxAttempts: 3,
        isPublished: true,
        shuffleQuestions: true,
        showCorrectAnswers: true,
      },
    });

    console.log("✅ Quiz created!");

    const questions: Array<{
      question: string;
      type: QuestionType;
      points: number;
      position: number;
      explanation: string;
      options: Array<{ text: string; isCorrect: boolean; position: number }>;
    }> = [
      {
        question: "What is the primary goal of critical thinking?",
        type: QuestionType.MULTIPLE_CHOICE,
        points: 1,
        position: 0,
        explanation: "Critical thinking aims to make reasoned judgments that are logical and well-thought out.",
        options: [
          { text: "To memorize facts quickly", isCorrect: false, position: 0 },
          { text: "To make reasoned judgments", isCorrect: true, position: 1 },
          { text: "To agree with everyone", isCorrect: false, position: 2 },
          { text: "To avoid making decisions", isCorrect: false, position: 3 },
        ],
      },
      {
        question: "Which of the following is an example of a logical fallacy?",
        type: QuestionType.MULTIPLE_CHOICE,
        points: 1,
        position: 1,
        explanation: "Ad hominem is a fallacy where you attack the person instead of addressing their argument.",
        options: [
          { text: "Presenting evidence to support a claim", isCorrect: false, position: 0 },
          { text: "Attacking the person instead of their argument (ad hominem)", isCorrect: true, position: 1 },
          { text: "Using statistics to prove a point", isCorrect: false, position: 2 },
          { text: "Asking clarifying questions", isCorrect: false, position: 3 },
        ],
      },
      {
        question: "Critical thinking requires questioning assumptions and beliefs.",
        type: QuestionType.TRUE_FALSE,
        points: 1,
        position: 2,
        explanation: "True - Questioning assumptions is a fundamental part of critical thinking.",
        options: [
          { text: "True", isCorrect: true, position: 0 },
          { text: "False", isCorrect: false, position: 1 },
        ],
      },
      {
        question: "Which of the following are components of critical thinking? (Select all that apply)",
        type: QuestionType.MULTIPLE_SELECT,
        points: 2,
        position: 3,
        explanation: "All three - analysis, evaluation, and inference - are key components of critical thinking.",
        options: [
          { text: "Analysis", isCorrect: true, position: 0 },
          { text: "Evaluation", isCorrect: true, position: 1 },
          { text: "Blind acceptance", isCorrect: false, position: 2 },
          { text: "Inference", isCorrect: true, position: 3 },
        ],
      },
      {
        question: "What does 'cognitive bias' refer to?",
        type: QuestionType.MULTIPLE_CHOICE,
        points: 1,
        position: 4,
        explanation: "Cognitive biases are systematic patterns of deviation from rational judgment.",
        options: [
          { text: "A preference for certain colors", isCorrect: false, position: 0 },
          { text: "Systematic errors in thinking", isCorrect: true, position: 1 },
          { text: "A type of brain surgery", isCorrect: false, position: 2 },
          { text: "Having strong opinions", isCorrect: false, position: 3 },
        ],
      },
      {
        question: "Emotions should never play a role in critical thinking.",
        type: QuestionType.TRUE_FALSE,
        points: 1,
        position: 5,
        explanation: "False - While we should be aware of emotional influences, emotions can provide valuable insights when properly understood.",
        options: [
          { text: "True", isCorrect: false, position: 0 },
          { text: "False", isCorrect: true, position: 1 },
        ],
      },
      {
        question: "Which question best demonstrates critical thinking?",
        type: QuestionType.MULTIPLE_CHOICE,
        points: 1,
        position: 6,
        explanation: "Critical thinking involves examining evidence and reasoning, not just accepting claims at face value.",
        options: [
          { text: "What time is it?", isCorrect: false, position: 0 },
          { text: "What evidence supports this claim?", isCorrect: true, position: 1 },
          { text: "Who said this?", isCorrect: false, position: 2 },
          { text: "When did this happen?", isCorrect: false, position: 3 },
        ],
      },
      {
        question: "Which skills are essential for critical thinking? (Select all that apply)",
        type: QuestionType.MULTIPLE_SELECT,
        points: 2,
        position: 7,
        explanation: "All of these - interpretation, analysis, and problem-solving - are essential critical thinking skills.",
        options: [
          { text: "Interpretation", isCorrect: true, position: 0 },
          { text: "Analysis", isCorrect: true, position: 1 },
          { text: "Memorization", isCorrect: false, position: 2 },
          { text: "Problem-solving", isCorrect: true, position: 3 },
        ],
      },
      {
        question: "What is 'confirmation bias'?",
        type: QuestionType.MULTIPLE_CHOICE,
        points: 1,
        position: 8,
        explanation: "Confirmation bias is the tendency to search for or interpret information in a way that confirms existing beliefs.",
        options: [
          { text: "Seeking information that confirms existing beliefs", isCorrect: true, position: 0 },
          { text: "Confirming appointments on time", isCorrect: false, position: 1 },
          { text: "Being confident in your abilities", isCorrect: false, position: 2 },
          { text: "Double-checking facts", isCorrect: false, position: 3 },
        ],
      },
      {
        question: "A good critical thinker is always skeptical of new information.",
        type: QuestionType.TRUE_FALSE,
        points: 1,
        position: 9,
        explanation: "False - While healthy skepticism is important, being overly skeptical can prevent learning. Critical thinkers are open-minded but evaluate claims carefully.",
        options: [
          { text: "True", isCorrect: false, position: 0 },
          { text: "False", isCorrect: true, position: 1 },
        ],
      },
    ];

    for (const questionData of questions) {
      await db.question.create({
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
    console.log("\n🎉 Quiz seeding successful!");
    console.log(`\n📝 Quiz Details:`);
    console.log(`   Course: ${course.title}`);
    console.log(`   Chapter: ${chapter.title}`);
    console.log(`   Quiz: ${quiz.title}`);
    console.log(`   Questions: 10`);
    console.log(`   Passing Score: ${quiz.passingScore}%`);
    console.log(`   Time Limit: ${quiz.timeLimit} minutes\n`);

  } catch (error) {
    console.log("❌ Error seeding database: ", error);
  } finally {
    await db.$disconnect();
  }
}

main();
