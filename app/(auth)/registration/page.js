"use client";

import { useAppContext } from "@/utils/GlobalContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Auth, db } from "@/utils/firebase_config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const RegistrationForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { signup, user } = useAppContext();
  const [isFreeRegistration, setIsFreeRegistration] = useState(false);
  const [loading] = useAuthState(Auth);
  const [formData, setFormData] = useState({
    sponsor_id: "",
    name: "",
    email: "",
    phone_number: "",
    password: "",
    re_password: "",
    selectedPackage: "starter",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const refCode = searchParams.get("ref");
    if (refCode) {
      fetchReferrer(refCode);
    }
  }, [searchParams]);

  const fetchReferrer = async (refCode) => {
    try {
      const referrerQuery = query(
        collection(db, "users"),
        where("referralLink", "==", refCode)
      );
      const referrerDocs = await getDocs(referrerQuery);

      if (!referrerDocs.empty) {
        const referrerDoc = referrerDocs.docs[0];
        const referrerData = referrerDoc.data();

        // Extract the referrer's name from the referral link
        const referrerName = refCode.split("-")[0];
        // Generate a 10-digit random string
        const randomString = Math.random().toString(36).substr(2, 10);
        // Combine to create the sponsor_id
        const sponsorId = `${referrerName}-${randomString}`;

        setFormData((prevState) => ({
          ...prevState,
          sponsor_id: sponsorId,
          referrerId: referrerDoc.id,
          referrerName: referrerData.name,
          referrerEmail: referrerData.email,
        }));
      }
    } catch (error) {
      console.error("Error fetching referrer:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "sponsor_id" ? prevState.sponsor_id : value,
    }));
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleRePasswordVisibility = () => setShowRePassword(!showRePassword);

  const getPaymentUrl = (selectedPackage, paymentId) => {
    const packageUrls = {
      starter: "https://onetapay.com/pp/MzMy",
      bronze: "https://onetapay.com/pp/MjAx",
      silver: "https://onetapay.com/pp/MjAy",
      gold: "https://onetapay.com/pp/MjAz",
      platinum: "https://onetapay.com/pp/MjA0",
    };
    const baseUrl = packageUrls[selectedPackage] || packageUrls.starter;
    return `${baseUrl}?paymentId=${paymentId}&callbackUrl=${encodeURIComponent(
      "http://localhost:3000/payment-callback"
    )}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.re_password) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      if (isFreeRegistration) {
        const { userId } = await signup({
          sponsor_id: formData.sponsor_id,
          name: formData.name,
          email: formData.email,
          phone_number: formData.phone_number,
          password: formData.password,
          selectedPackage: formData.selectedPackage,
          referrerId: formData.referrerId,
          referrerName: formData.referrerName,
          referrerEmail: formData.referrerEmail,
        });

        toast.success("Free registration successful!");
        router.push("/dashboard");
      } else {
        const tempPaymentId = `TEMP-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        sessionStorage.setItem(
          "registrationData",
          JSON.stringify({ ...formData, tempPaymentId })
        );
        const paymentUrl = getPaymentUrl(
          formData.selectedPackage,
          tempPaymentId
        );
        router.push(paymentUrl);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            width={900}
            height={900}
            alt="Business Affiliate Marketing"
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <a className="block text-blue-600" href="#">
              <span className="sr-only">Home</span>
              <Image
                width={900}
                height={900}
                className="w-24 h-24 object-contain"
                src="/images/logo.jpeg"
                alt="Logo"
              />
            </a>

            <h1 className="mt-6 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
              Welcome to Edulearpoint
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Sign up to start your journey with Edulearpoint. Please fill in
              the form below to create your account.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 grid grid-cols-6 gap-6"
            >
              {/* Form Fields */}
              <div className="col-span-6">
                <label
                  htmlFor="SponsorId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sponsor ID
                </label>
                <input
                  type="text"
                  id="SponsorId"
                  name="sponsor_id"
                  value={formData.sponsor_id}
                  onChange={handleChange}
                  readOnly
                  className="mt-1 w-full rounded-md p-4 border-gray-200 bg-gray-100 text-base text-gray-700 shadow-sm"
                />
              </div>
              {/* Additional Form Fields */}
              {/* Password fields with toggle */}
              <div className="col-span-6">
                <button
                  type="submit"
                  className="mt-4 w-full rounded-md bg-blue-600 p-4 text-sm font-medium text-white shadow-lg hover:bg-blue-700"
                >
                  Sign Up
                </button>
              </div>

              <p className="mt-4 text-sm text-gray-500 col-span-6">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 underline">
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </main>
      </div>
      <ToastContainer />
    </section>
  );
};

// Wrapping the component with Suspense to handle useSearchParams
export default function WrappedRegistrationForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegistrationForm />
    </Suspense>
  );
}
