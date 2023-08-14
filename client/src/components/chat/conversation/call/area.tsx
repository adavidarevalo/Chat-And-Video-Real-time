import _ from 'lodash';
import React from 'react'

interface CallAreaProps {
    name: string
}

export default function CallArea({ name }: CallAreaProps) {
  return (
    <div className="absolute top-12 z-40 w-full p-1">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-y-1">
          <h1 className="text-white text-lg">
            <b>{name && _.capitalize(name)}</b>
          </h1>
          <span className="text-dark_text_1">Ringing...</span>
        </div>
      </div>
    </div>
  );
}
