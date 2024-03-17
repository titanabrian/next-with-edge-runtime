'use client'

import { Prism } from 'react-syntax-highlighter'
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism'


interface LogEventProps{
  isError?: boolean
  title: string,
  log: object
}

const LogItem = function ({isError, log, title}:LogEventProps) {
  const border = isError? 'border-red-500': 'border-green-500'
  
  return ( 
      <div className="space-y-4">
        <details
          className={`group border-s-4 ${border} bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden`}
          open
        >
          <summary className="flex cursor-pointer items-center justify-between gap-1.5">
            <h2 className="text-lg font-medium text-gray-900">
              {title}
            </h2>
          </summary>

          <p className="mt-4 leading-relaxed text-gray-700">
            <Prism language="json" style={xonokai}>{JSON.stringify(log,null, 2)}</Prism>
          </p>
        </details>
      </div>
  )
}

export default LogItem
