import React from "react";

const Updates = () => {
  return (
    <div className="min-h-full w-full flex justify-center items-center p-6">
      <div className="w-full max-w-5xl bg-white/25 backdrop-blur-md border border-white/20 rounded-xl shadow-xl p-8 text-white">
        
        <h1 className="text-3xl font-semibold mb-4">
          Chatbot Updates & Pricing 💡
        </h1>

        <p className="text-gray-200 mb-8">
          Explore the latest updates and choose a plan that fits your needs.
        </p>

        {/* PLANS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Free Plan */}
          <div className="bg-black/30 p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold mb-2">Free</h3>
            <p className="text-3xl font-bold mb-4">₹0</p>

            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✔ Basic chat access</li>
              <li>✔ Limited conversations</li>
              <li>✔ Community support</li>
              <li>✖ Chat history export</li>
            </ul>

            <button className="mt-6 w-full py-2 rounded-lg bg-gray-600 cursor-not-allowed">
              Current Plan
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-black/40 p-6 rounded-xl border border-indigo-400">
            <h3 className="text-xl font-semibold mb-2">Pro ⭐</h3>
            <p className="text-3xl font-bold mb-4">₹499 / month</p>

            <ul className="space-y-2 text-gray-200 text-sm">
              <li>✔ Unlimited chats</li>
              <li>✔ Faster responses</li>
              <li>✔ Full chat history</li>
              <li>✔ Priority support</li>
            </ul>

            <button className="mt-6 w-full py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition">
              Upgrade Now
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-black/30 p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
            <p className="text-3xl font-bold mb-4">Custom</p>

            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✔ API access</li>
              <li>✔ Custom integrations</li>
              <li>✔ Team management</li>
              <li>✔ Dedicated support</li>
            </ul>

            <button className="mt-6 w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition text-black">
              Contact Sales
            </button>
          </div>
        </div>

        {/* UPDATE INFO */}
        <div className="mt-10 text-sm text-gray-300 text-center">
          🚀 New features are released regularly. Pricing may change based on usage.
        </div>

      </div>
    </div>
  );
};

export default Updates;
