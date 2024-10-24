import React from 'react';
import { Check } from 'lucide-react';

const PricingPage: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: 0,
      features: [
        'Access to basic AI tools',
        'Limited project creation',
        'Community support',
      ],
      cta: 'Get Started',
    },
    {
      name: 'Pro',
      price: 49,
      features: [
        'Access to all AI tools',
        'Unlimited project creation',
        'Priority support',
        'Advanced analytics',
      ],
      cta: 'Start Pro Plan',
    },
    {
      name: 'Enterprise',
      price: 349,
      features: [
        'Custom AI model development',
        'Dedicated account manager',
        'On-premise deployment options',
        '24/7 premium support',
        'Advanced security features',
      ],
      cta: 'Contact Sales',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800">Pricing Plans</h1>
      <p className="text-xl text-gray-600 mb-12 text-center">Choose the plan that fits your needs</p>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.name} className="bg-white rounded-lg shadow-md p-8 flex flex-col">
            <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
            <p className="text-4xl font-bold mb-6">
              ${plan.price}
              <span className="text-base font-normal text-gray-600">/month</span>
            </p>
            <ul className="mb-8 flex-grow">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center mb-2">
                  <Check className="text-green-500 mr-2" size={20} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full bg-indigo-600 text-white py-2 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors">
              {plan.cta}
            </button>
            {plan.price > 0 && (
              <p className="text-center mt-4 text-sm text-gray-600">
                Save 20% with yearly billing
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-16 bg-indigo-100 p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4 text-indigo-800">Need a custom solution?</h2>
        <p className="text-xl text-gray-700 mb-8">We offer tailored plans for businesses with specific requirements.</p>
        <button className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors">
          Contact Our Sales Team
        </button>
      </div>
    </div>
  );
};

export default PricingPage;