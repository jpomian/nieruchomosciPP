import React from 'react'
import Link from 'next/link'

function Navigator() {
  return (
    <div className="flex flex-row items-center justify-center gap-2">
        <Link href={'/panel'}>
            <p className="flex justify-center my-8 text-lg hover:text-gray-600">Wróć do panelu admina.</p>      
        </Link>
        <p className="text-lg font-bold mb-1">||</p>
        <Link href={'/'}>
          <p className="flex justify-center my-8 text-lg hover:text-gray-600">Wróć do strony głównej.</p>      
        </Link>
      </div>  
  )
}

export default Navigator