import React from "react";

function ConversationShow(){
    return (
        <div id = "conversation" class = "flex h-full w-full flex-col bg-white px-4 py-6">
        <div class="flex flex-row items-center rounded-2xl py-4 px-6 shadow">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-pink-100">
            T
          </div>
          <div class="ml-3 flex flex-col">
            <div class="text-sm font-semibold">UI Art Design</div>
            <div class="text-xs text-gray-500">Active</div>
          </div>
        </div>
        <div class="h-full overflow-hidden py-4">
          <div class="h-full overflow-y-auto">
            <div class="grid grid-cols-12 gap-y-2">
              <div class="col-start-1 col-end-8 rounded-lg p-3">
                <div class="flex flex-row items-center">
                  <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
                    A
                  </div>
                  <div class="relative ml-3 rounded-xl bg-white py-2 px-4 text-sm shadow">
                    <div>Hey How are you today?</div>
                  </div>
                </div>
              </div>
              <div class="col-start-1 col-end-8 rounded-lg p-3">
                <div class="flex flex-row items-center">
                  <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
                    A
                  </div>
                  <div class="relative ml-3 rounded-xl bg-white py-2 px-4 text-sm shadow">
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipisicing
                      elit. Vel ipsa commodi illum saepe numquam maxime
                      asperiores voluptate sit, minima perspiciatis.
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-start-6 col-end-13 rounded-lg p-3">
                <div class="flex flex-row-reverse items-center justify-start">
                  <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
                    A
                  </div>
                  <div class="relative mr-3 rounded-xl bg-indigo-100 py-2 px-4 text-sm shadow">
                    <div>I'm ok what about you?</div>
                  </div>
                </div>
              </div>
              <div class="col-start-6 col-end-13 rounded-lg p-3">
                <div class="flex flex-row-reverse items-center justify-start">
                  <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
                    A
                  </div>
                  <div class="relative mr-3 rounded-xl bg-indigo-100 py-2 px-4 text-sm shadow">
                    <div>
                      Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-start-1 col-end-8 rounded-lg p-3">
                <div class="flex flex-row items-center">
                  <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
                    A
                  </div>
                  <div class="relative ml-3 rounded-xl bg-white py-2 px-4 text-sm shadow">
                    <div>Lorem ipsum dolor sit amet !</div>
                  </div>
                </div>
              </div>
              <div class="col-start-6 col-end-13 rounded-lg p-3">
                <div class="flex flex-row-reverse items-center justify-start">
                  <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
                    A
                  </div>
                  <div class="relative mr-3 rounded-xl bg-indigo-100 py-2 px-4 text-sm shadow">
                    <div>
                      Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                    </div>
                    <div class="absolute bottom-0 right-0 -mb-5 mr-2 text-xs text-gray-500">
                      Seen
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-start-1 col-end-8 rounded-lg p-3">
                <div class="flex flex-row items-center">
                  <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
                    A
                  </div>
                  <div class="relative ml-3 rounded-xl bg-white py-2 px-4 text-sm shadow">
                    <div>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Perspiciatis, in.
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-start-1 col-end-8 rounded-lg p-3">
                <div class="flex flex-row items-center">
                  <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
                    A
                  </div>
                  <div class="relative ml-3 rounded-xl bg-white py-2 px-4 text-sm shadow">
                    <div class="flex flex-row items-center">
                      <button class="flex h-8 w-10 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-800">
                        <svg
                          class="h-6 w-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          ></path>
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </button>
                      <div class="ml-4 flex flex-row items-center space-x-px">
                        <div class="h-2 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-2 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-4 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-8 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-8 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-10 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-10 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-12 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-10 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-6 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-5 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-4 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-3 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-2 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-2 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-2 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-10 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-2 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-10 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-8 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-8 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-1 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-1 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-2 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-8 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-8 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-2 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-2 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-2 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-2 w-1 rounded-lg bg-gray-500"></div>
                        <div class="h-4 w-1 rounded-lg bg-gray-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-row items-center">
          <div class="flex h-12 w-full flex-row items-center rounded-3xl border px-2">
            <button class="ml-1 flex h-10 w-10 items-center justify-center text-gray-400">
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                ></path>
              </svg>
            </button>
            <div class="w-full">
              <input
                type="text"
                class="flex h-10 w-full items-center border border-transparent text-sm focus:outline-none"
                placeholder="Type your message...."
              />
            </div>
            <div class="flex flex-row">
              <button class="flex h-10 w-8 items-center justify-center text-gray-400">
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
              </button>
              <button class="ml-1 mr-2 flex h-10 w-8 items-center justify-center text-gray-400">
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="ml-6">
            <button class="bg-grey-200 back flex h-10 w-10 items-center justify-center rounded-full border text-indigo-800 hover:bg-gray-300">
              <svg
                class="-mr-px h-5 w-5 rotate-90 transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
}

export default ConversationShow;