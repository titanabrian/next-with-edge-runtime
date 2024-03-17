import { NextResponse } from "next/server"

export async function requestHanndler(handler: Function) {
  try {
    const result = await handler()
    return NextResponse.json(result)
  } catch (e) {
    return NextResponse.json({
      message: 'Server Error'
    }, {
      status: 500,
    })
  }
}
