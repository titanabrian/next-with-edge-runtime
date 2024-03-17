'use client'

import Spinner from "./spinner";
import LogItem from "./log-item";

interface LogEventInterface {
  logs: any
}

const LogEvent = ({logs}: LogEventInterface) => {
  return (
    <div className="mx-auto rounded-lg m-12 max-w-3xl shadow-sm p-5">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl"><span className="mr-5">Response Logging</span><Spinner/></h1>
      {logs.map((item: any, key: any) => (
        <div className="mt-10">
          <LogItem key={key} title={item.title} log={item.log} isError={item.isError}/>
        </div>
      ))}
    </div>
  );
};

export default LogEvent
