import { requestHanndler } from "@/package/core/request_handler";
import { BookRepository } from "@/package/repository/book";
import { BookService } from "@/package/services/book";
import { init } from "@/package/supabase";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge'

const supabase = init()
const bookRepo = new BookRepository(supabase)
const bookService = new BookService(bookRepo)

export async function GET(req: NextRequest) {
  return await requestHanndler(async () => {
    const params = req.nextUrl.searchParams
    const error = params.get('error')
    if (error) {
      throw new Error('Intentional Error')
    }
    const books = await bookService.getBooks()
    return {
        requester: {
          user_id: req.headers.get('User-Id'),
          username: req.headers.get('Username')
        },
        books,
    }
  })
}

export async function POST(req: NextRequest) {
  return new NextResponse(JSON.stringify({
    msg: "Post Book!"
  }))
}
