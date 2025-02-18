import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()

  // Здесь должна быть логика обработки формы
  // Например, отправка email или сохранение в базу данных
  console.log("Received contact form submission:", body)

  // Имитация задержки обработки
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return NextResponse.json({ message: "Thank you for your message. We will contact you soon." })
}

