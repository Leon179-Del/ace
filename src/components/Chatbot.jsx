import React from 'react';
import ChatBot, { useOnRcbEvent } from 'react-chatbotify';

const AceBot = () => {
  // Expanded product database for electrical gadgets and phones
  const products = [
    // Phones
    { name: "iPhone 15 Pro", price: "Ksh 150,000", features: "A17 Pro chip, Titanium design, 48MP camera." },
    { name: "iPhone 17 Pro Max", price: "Coming Soon", features: "The latest flagship with advanced AI integration." },
    { name: "Samsung S24 Ultra", price: "Ksh 165,000", features: "200MP camera, built-in S Pen, and Galaxy AI." },
    { name: "Google Pixel 8", price: "Ksh 95,000", features: "Best-in-class camera and pure Android experience." },
    
    // Electrical Gadgets & Appliances
    { name: "MacBook Air M3", price: "Ksh 180,000", features: "Liquid Retina display, fanless silent design." },
    { name: "Hisense 55-inch TV", price: "Ksh 55,000", features: "4K UHD Smart TV with pre-installed streaming apps." },
    { name: "Sony WH-1000XM5", price: "Ksh 45,000", features: "Industry-leading noise cancellation headphones." },
    { name: "Dell XPS 13", price: "Ksh 140,000", features: "InfinityEdge display and high-performance Intel processor." }
  ];

  // Event listener to clear chat when the window is closed
  useOnRcbEvent((event) => {
    if (event.name === "RcbToggleChatWindowEvent" && !event.data.isOpen) {
      window.sessionStorage.removeItem("ace_bot_session");
      window.location.reload(); // Restarts the flow and clears memory
    }
  }, ["RcbToggleChatWindowEvent"]);

  const flow = {
    start: {
      message: "Hello! I am Ace Bot, your assistant at Ace Electronics. How can I help you today?",
      path: "process_input"
    },
    process_input: {
      user: true,
      message: (params) => {
        const input = params.userInput.toLowerCase();

        // 1. Search gadgets and phones
        const foundProduct = products.find(p => input.includes(p.name.toLowerCase()));
        if (foundProduct) {
          return `${foundProduct.name} is available for ${foundProduct.price}. ${foundProduct.features} We deliver countrywide and have local electricians for your installation!`;
        }

        // 2. Ace Electronics Information
        if (input.includes("about") || input.includes("ace") || input.includes("who")) {
          return "Ace Electronics is an authentic company selling quality electronics directly from the manufacturer. We offer countrywide delivery and provide jobs to local electricians who register as service providers in their counties.";
        }

        // 3. Jobs & Electrician Info
        if (input.includes("job") || input.includes("electrician") || input.includes("register")) {
          return "Electricians can register as service providers in their home counties to get professional installation jobs for our customers!";
        }

        // 4. Broad categories
        if (input.includes("phone") || input.includes("gadget") || input.includes("appliance")) {
          return "We stock authentic phones and electrical gadgets direct from the manufacturer. Ask about a specific model like 'iPhone 17' or 'Sony Headphones'!";
        }

        return "I'm here to help! Ask about our gadgets, countrywide delivery, or how electricians can join our network.";
      },
      path: "process_input"
    }
  };

  const settings = {
    general: { primaryColor: "#1e293b", secondaryColor: "#38bdf8" },
    header: { title: "Ace Bot", showAvatar: true },
    chatButton: { icon: "⚡" },
    chatHistory: { storageKey: "ace_bot_session", disabled: true },
    session: { remember: false }
  };

  return <ChatBot flow={flow} settings={settings} />;
};

export default AceBot;
