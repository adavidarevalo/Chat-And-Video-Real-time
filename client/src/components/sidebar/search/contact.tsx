import React from 'react'

export default function Contact({ contact }: any) {
  return (
    <li className="w-full list-none h-[72px] hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]">
      <div className="flex-items-center gap-x-3 py-[10px]">
        <div className="flex items-center gap-x-3">
          <div className="relative w-[50px] rounded-full overflow-hidden">
            <img src={contact.picture} alt={contact.name} className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="w-full flex flex-col">
            <h1 className="font-bold flex items-center gap-x-2">{contact.name}</h1>
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_bg_2">
                  <p>{contact.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-16 border-b  dark:border-b-dark_bg_2"></div>
    </li>
  );
}
