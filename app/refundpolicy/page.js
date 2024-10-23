import React from "react";

const RefundPolicyPage = () => {
  return (
    <>
      <section className="p-4 md:p-8 lg:p-12">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center">
          Refund Policy
        </h1>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold mt-8">
            General Information
          </h2>
          <p className="mt-4 text-justify leading-relaxed">
            Refunds for any eligible transactions may take 7-10 working days to
            reflect in your account. This timeframe is dependent on the
            processing times of our third-party payment gateways. We appreciate
            your patience and understanding as we work diligently to ensure a
            smooth refund process. In certain cases, delays may occur due to
            processing times by banks, and we actively work to resolve them by
            maintaining constant communication with the payment gateways.
          </p>

          <h3 className="text-lg md:text-xl font-semibold mt-6">
            I) Refund Available
          </h3>
          <h4 className="text-lg font-medium mt-4">
            Bizgurukul Bundle Courses
          </h4>
          <p className="mt-2 text-justify">
            Our policy allows customers to request a refund for their purchase
            within 24 hours of the original transaction.
          </p>

          <h3 className="text-lg md:text-xl font-semibold mt-6">Disclaimer</h3>
          <p className="mt-2 text-justify">
            Please note that our company does not entertain refund requests
            after 24 hours of the transaction. A payment gateway fee @ 2% of the
            paid amount and processing fee @ 5% of the paid amount will be
            deducted from the amount to be refunded.
          </p>

          <h3 className="text-lg md:text-xl font-semibold mt-6">
            Process for Refund Request
          </h3>
          <p className="mt-2 text-justify">
            For the refund request, you need to mail at{" "}
            <a
              href="mailto:refunds@edulearpoint.in"
              className="text-blue-500 underline"
            >
              refunds@edulearpoint.in
            </a>
            . In the following format with registered email ID only:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Full Name</li>
            <li>Registered e-mail ID</li>
            <li>Registration date</li>
            <li>Screenshot of Payment Invoice with date and time</li>
            <li>Reason for refund</li>
          </ul>
          <p className="mt-2">
            Note: For the "Refund" you need to mail us only at{" "}
            <a
              href="mailto:refunds@edulearpoint.in"
              className="text-blue-500 underline"
            >
              refunds@edulearpoint.in
            </a>
            .
          </p>

          <h4 className="text-lg font-medium mt-6">Content Creation Mastery</h4>
          <p className="mt-2 text-justify">
            You can get a full refund for our "Content Creation Mastery" course
            within 24 hours of enrolment. To request a refund, contact our
            support team in writing, and they will guide you through the
            process.
          </p>

          <h4 className="text-lg font-medium mt-6">Monetization Series</h4>
          <p className="mt-2 text-justify">
            You can get a refund within 48 hours of purchase on the courses
            involved in this series. No further refund will be provided in any
            circumstances once the 48 hours gets over.
          </p>

          <h3 className="text-lg md:text-xl font-semibold mt-6">Disclaimer</h3>
          <p className="mt-2 text-justify">
            A payment gateway fee @ 2% of the paid amount and processing fee @
            5% of the paid amount will be deducted from the amount to be
            refunded.
          </p>

          <h3 className="text-lg md:text-xl font-semibold mt-6">
            Refund Cancellation Policy
          </h3>
          <p className="mt-2 text-justify">
            Once you cancel your refund request, this claim will not be reversed
            in the future.
          </p>

          <h3 className="text-lg md:text-xl font-semibold mt-6">
            II) No Refund Available
          </h3>
          <p className="mt-2 text-justify">
            No Refund will be given to the customer for the purchase of any
            package made by the customer directly from the edulearpoint website
            "www.edulearpoint.in" or through the affiliate link of the person
            who referred him/her to the edulearpoint website after 24 hours of
            the purchase under any circumstances.
          </p>

          {/* Contact Us Section */}
          <h2 className="text-xl md:text-2xl font-semibold mt-12">
            Contact Us
          </h2>
          <p className="mt-4 text-justify">
            Please send your feedback, complaints, comments, or requests for
            technical support to:{" "}
            <a
              href="mailto:support@edulearpoint.in"
              className="text-blue-500 underline"
            >
              support@edulearpoint.in
            </a>
            .
          </p>
          <p className="mt-4 text-justify">
            For any requirement of information, please email us at:{" "}
            <a
              href="mailto:info@edulearpoint.in"
              className="text-blue-500 underline"
            >
              info@edulearpoint.in
            </a>
            .
          </p>
          <p className="mt-4 text-justify">
            For any refund-related queries, kindly email us at:{" "}
            <a
              href="mailto:refunds@edulearpoint.in"
              className="text-blue-500 underline"
            >
              refunds@edulearpoint.in
            </a>
            .
          </p>
          <p className="mt-4 text-justify">
            For any enrolment queries and money-related concerns, kindly
            WhatsApp us at:{" "}
            <a
              href="https://wa.me/917439526319"
              className="text-blue-500 underline"
            >
              +91 74395 26319
            </a>
            .
          </p>
          <p className="mt-4 text-justify">
            Customer Support Number: <strong>6203249955</strong> <br />
            (Available: Monday - Sunday, 9:30 AM - 6:00 PM)
          </p>
        </div>
      </section>
    </>
  );
};

export default RefundPolicyPage;
