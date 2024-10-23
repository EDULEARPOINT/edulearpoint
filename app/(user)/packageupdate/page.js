"use client"
import React, { useEffect, useState } from 'react'
import { useAppContext } from '@/utils/GlobalContext';
import { useRouter } from 'next/navigation';

const packages = [
    {
        "id": 1,
        "name": "Starter",
        "price": 100,
        "benefits": ["30 days valid only", "personal calling by founder", "telegram community", "whatsapp community", "hall of fame"]
    },
    {
        "id": 2,
        "name": "Bronze",
        "price": 499,
        "benefits": ["facebook community", "telegram community", "whatsapp community", "hall of fame"]
    },
    {
        "id": 3,
        "name": "Silver",
        "price": 999,
        "benefits": ["live webinar", "free training", "hall of fame", "learning from leaders", "whatsapp support", "special training"]
    },
    {
        "id": 4,
        "name": "Gold",
        "price": 1999,
        "benefits": ["live webinar", "free training", "personal mentorship", "hall of fame", "learning from leaders", "whatsapp support", "special training"]
    },
    {
        "id": 5,
        "name": "Platinum",
        "price": 3999,
        "benefits": ["live webinar", "free training", "hall of fame", "personal mentorship", "learning from leaders", "whatsapp support", "special training"]
    }
];

const PackageUpdatePage = () => {
    const router = useRouter();
    const { getUserPackage, updateUserPackage } = useAppContext()
    const [userPackage, setUserPackage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserPackage = async () => {
            const packageDetails = await getUserPackage();
            setUserPackage(packageDetails);
            setLoading(false);
        };

        fetchUserPackage();
    }, [getUserPackage]);

    const getAllBenefits = (packageName) => {
        const packageIndex = packages.findIndex(pkg => pkg.name === packageName);
        return packages.slice(0, packageIndex + 1).flatMap(pkg => pkg.benefits);
    };

    const getUpgradeOptions = (currentPackage) => {
        const currentIndex = packages.findIndex(pkg => pkg.name === currentPackage);
        return packages.slice(currentIndex + 1);
    };

    const getPaymentUrl = (selectedPackage) => {
        const packageUrls = {
          starter: 'https://onetapay.com/pp/MjA0',
          bronze: 'https://onetapay.com/pp/MjAx',
          silver: 'https://onetapay.com/pp/MjAy',
          gold: 'https://onetapay.com/pp/MjAz',
          platinum: 'https://onetapay.com/pp/MjA0'
        };
        const baseUrl = packageUrls[selectedPackage.toLowerCase()] || packageUrls.starter;
        const paymentId = Date.now(); // Generate a unique payment ID (you might want to use a more robust method)
        return `${baseUrl}?paymentId=${paymentId}&callbackUrl=${encodeURIComponent('http://localhost:3000/payment-callback')}`;
    };
    
    const handleUpgrade = async (newPackage) => {
        const paymentUrl = getPaymentUrl(newPackage);
        router.push(paymentUrl);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userPackage) {
        return <div>No package found. Please purchase a package.</div>;
    }

    const userBenefits = getAllBenefits(userPackage);
    const upgradeOptions = getUpgradeOptions(userPackage);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Your Current Package: {userPackage}</h1>
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">Your Benefits</h2>
                <p className="mb-2">You have access to all benefits from {userPackage} and lower packages:</p>
                <ul className="list-disc pl-6">
                    {userBenefits.map((benefit, index) => (
                        <li key={index} className="mb-2">{benefit}</li>
                    ))}
                </ul>
            </div>

            {upgradeOptions.length > 0 ? (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Upgrade Your Package</h2>
                    <p className="mb-4">Unlock even more benefits by upgrading to a higher package:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {upgradeOptions.map((pkg) => (
                            <div key={pkg.id} className="bg-white shadow-md rounded-lg p-6">
                                <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                                <p className="text-2xl font-bold mb-4">Rs {pkg.price}</p>
                                <p className="mb-2">Additional benefits:</p>
                                <ul className="list-disc pl-6 mb-4">
                                    {pkg.benefits.filter(benefit => !userBenefits.includes(benefit)).map((benefit, index) => (
                                        <li key={index} className="mb-1">{benefit}</li>
                                    ))}
                                </ul>
                                <button 
                                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 transition duration-300"
                                    onClick={() => handleUpgrade(pkg.name)}
                                >
                                    Upgrade to {pkg.name}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-xl font-semibold">Congratulations! You have the highest package available.</p>
                </div>
            )}
        </div>
    )
}

export default PackageUpdatePage