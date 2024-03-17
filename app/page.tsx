'use client'

import Auth from '@/components/auth';
import LogEvent from '@/components/log'
import { useState } from 'react';
export default function Home() {
  const [logs, setLogs] = useState<{
    title: string,
    log: any,
    isError: boolean,
  }[]>([])
  const [loading, setLoading] = useState(false)

  const getLoadingOrText = function (text: string): string {
    return loading? 'Loading': text
  }

  const appendLog = function (item: any) {
    setLogs([
      item,
      ...logs
    ])
  }

  const getBooks = async function(){
    setLoading(true)
    const endpoint = '/api/books'
    const result = await fetch(endpoint)
    const isError = !result.ok
    const body = await result.json()
    appendLog({
      title: `${logs.length + 1} GET ${endpoint}`,
      isError,
      log: body
    })
    setLoading(false)
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 space-y-6">
      <Auth onSuccess={function(data: any){
        appendLog({
          title:  `Log#${logs.length + 1} Login`,
          log: {
            message: "Login Success!"
          }
        })
      }}
        onError={function(err: any) {
          appendLog({
            title: `Log#${logs.length + 1} Login`,
            isError: true,
            log: {
              message: "Login Failed!"
            }
          })
        }}

        onSuccessLogout={function(data: any) {
          appendLog({
            title: `Log#${logs.length + 1} Logout`,
            log: {
              message: "Logout Success!"
            }
          })
        }}

        onErrorLogout={function(data: any) {
          appendLog({
            title: `Log#${logs.length + 1} Logout`,
            isError: true,
            log: {
              message: "Logout Error!"
            }
          })
        }}
      />

      <div className='w-full mx-auto max-w-2xl justify-center items-center'>
        <div className=" overflow-hidden rounded-md border bg-white shadow-sm items-center justify-center mx-auto">
          <button
            onClick={getBooks}
            className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
          >
            {getLoadingOrText('Get Books')}
          </button>

          <button
            className="inline-block px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300"
            disabled
          >
            Get People
          </button>

          <button
            disabled
            className="inline-block px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300"
          >
            Get Libraries
          </button>

          
        </div>

      </div>


      <div className="w-full mx-auto max-w-2xl justify-center items-center">
        <button
          onClick={() => {
            setLogs([])
          }}

          className=" w-full mt-4 inline-block rounded-lg bg-yellow-500 px-5 py-3 text-sm font-medium text-white">
          Clear Log
        </button>
      </div>

      <LogEvent logs={logs}/>
    </div>
  );
}
