import React from 'react'

const Faq = () => {


  const faqs = [
    {
      "id": 1,
      "question": "How to join edulearpoint?",
      "answer": "You will get all the details on how to join from the person who will send you the referral link or you can talk to the support system."
    },
    {
      "id": 2,
      "question": "What Is the commission structure?",
      "answer": "Edulearpoint provides you the high-end commission, up to 50-70%, depending on your hard work."
    },
    {
      "id": 3,
      "question": "What is the enrollment fee?",
      "answer": "There is no enrollment fee. You only have to pay for the package you buy."
    },
    {
      "id": 4,
      "question": "Is it a one-time fee or a monthly fee?",
      "answer": "It is only a one-time fee you've to pay for every package you buy and you get lifetime access to that package."
    },
    {
      "id": 5,
      "question": "Is edulearpoint provide course in low cost?",
      "answer": "Yes edulearpoint is provided many course is low cost you also can contact to support team for course details. Only question and its answer."
    }
  ]


  return (
    <section className='bg-white z-[100]'>

      <div className="space-y-4 max-w-[80vw] mx-auto w-full mb-10">
        <div className='text-center flex flex-col gap-3 items-center pb-6'>
          <h1 className='md:text-4xl text-2xl uppercase font-bold text-gray-900'>Faqs</h1>
        </div>

        {
          faqs.map((item, index) => (

            <details
              key={item.id}
              className="group border-s-4 border-green-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"

            >
              <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                <h2 className="text-lg font-medium text-gray-900">
                  {item.question}
                </h2>

                <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <p className="mt-4 leading-relaxed text-gray-700">
                {item.answer}
              </p>
            </details>
          ))
        }


      </div>
    </section>
  )
}

export default Faq
