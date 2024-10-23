import React from 'react';
import { agreementData } from '../data/userLiscenceData';
import Footer from '../_components/Footer';

const UserLicenseAgreement = () => {
  // Filter sections except 'title' as it is already handled separately
  const sections = Object.entries(agreementData).filter(
    ([key]) => key !== 'title'
  );

  return (
    <section className='lg:px-48 lg:py-10 py-5 px-5'>
      <div className='flex flex-col gap-5 lg:gap-10'>
        <h1 className='lg:text-6xl text-4xl font-semibold tracking-wide'>{agreementData.title}</h1>

        {/* Render each section appropriately */}
        {sections.map(([key, content], index) => (
          <div key={index} className='mt-3'>
            {/* Create readable section titles */}
            <h2 className='lg:text-3xl text-2xl font-semibold mb-4'>
              {key
                .split(/(?=[A-Z])/)
                .join(' ')
                .replace(/^\w/, (c) => c.toUpperCase())}
            </h2>

            {/* Conditionally render content based on section type */}
            {typeof content === 'object' ? (
              <>
                {/* For sections that are objects, specifically 'grantOfLicense' */}
                {content.introduction && (
                  <p className='lg:text-[18px] text-[15px] mb-4'>{content.introduction}</p>
                )}
                {content.restrictions && (
                  <>
                    <p className='lg:text-[18px] text-[15px] font-semibold mb-2'>You may not:</p>
                    <ol className='list-decimal pl-6 mb-4'>
                      {content.restrictions.map((restriction, i) => (
                        <li key={i} className='text-[13px] mb-2'>
                          {restriction}
                        </li>
                      ))}
                    </ol>
                  </>
                )}
                {content.violationConsequences && (
                  <p className='lg:text-[18px] text-[15px] mb-4'>
                    {content.violationConsequences}
                  </p>
                )}
                {content.subscriptionFeatures && (
                  <p className='lg:text-[18px] text-[15px] mb-4'>{content.subscriptionFeatures}</p>
                )}
              </>
            ) : (
              <p className='lg:text-[18px] text-[16px] mb-4'>{content}</p>
            )}
          </div>
        ))}
      </div>
      <Footer/>
    </section>
  );
};

export default UserLicenseAgreement;
