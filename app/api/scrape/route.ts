// app/api/scrape/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { getData, extractScriptContent } from '@/lib/data-fetcher'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  
  if (!url) {
    return NextResponse.json(
      { error: 'Missing URL parameter' },
      { status: 400 }
    )
  }

  try {
    const html = await getData({ url })
    const metadata = await extractScriptContent(html)
    return NextResponse.json(metadata ? JSON.parse(metadata) : {})
  } catch {
    return NextResponse.json(
      { error: 'Failed to scrape data' },
      { status: 500 }
    )
  }
}