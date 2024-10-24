import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { addMarketplaceItem } from '../services/marketplaceService';
import { addTool } from '../services/toolService';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  databaseURL: process.env.VITE_FIREBASE_DATABASE_URL
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const marketplaceTemplates = [
  {
    name: "AI-Powered E-commerce Assistant",
    description: "Boost sales with personalized product recommendations and customer support.",
    price: 49.99,
    rating: 4.8,
    downloads: 1200,
    image: "https://source.unsplash.com/random/800x600?ecommerce",
    category: "E-commerce"
  },
  {
    name: "AI Content Creator Suite",
    description: "Generate blog posts, social media content, and marketing copy with ease.",
    price: 79.99,
    rating: 4.6,
    downloads: 950,
    image: "https://source.unsplash.com/random/800x600?writing",
    category: "Content Creation"
  },
  {
    name: "AI-Driven Financial Advisor",
    description: "Provide personalized investment advice and portfolio management.",
    price: 99.99,
    rating: 4.9,
    downloads: 800,
    image: "https://source.unsplash.com/random/800x600?finance",
    category: "Finance"
  },
  {
    name: "AI Health & Fitness Coach",
    description: "Offer customized workout plans and nutrition advice based on user goals.",
    price: 59.99,
    rating: 4.7,
    downloads: 1500,
    image: "https://source.unsplash.com/random/800x600?fitness",
    category: "Health"
  },
  {
    name: "AI Language Learning Platform",
    description: "Create an adaptive language learning experience with AI-powered lessons.",
    price: 69.99,
    rating: 4.5,
    downloads: 1100,
    image: "https://source.unsplash.com/random/800x600?language",
    category: "Education"
  },
  {
    name: "AI Art Gallery & Marketplace",
    description: "Build a platform for AI-generated art creation, curation, and sales.",
    price: 89.99,
    rating: 4.7,
    downloads: 750,
    image: "https://source.unsplash.com/random/800x600?art",
    category: "Art"
  },
  {
    name: "AI-Powered Virtual Event Platform",
    description: "Host engaging virtual events with AI-driven networking and interaction features.",
    price: 129.99,
    rating: 4.8,
    downloads: 600,
    image: "https://source.unsplash.com/random/800x600?event",
    category: "Events"
  },
  {
    name: "AI Customer Service Chatbot",
    description: "Implement an intelligent chatbot to handle customer inquiries and support tickets.",
    price: 69.99,
    rating: 4.6,
    downloads: 1300,
    image: "https://source.unsplash.com/random/800x600?customer-service",
    category: "Customer Support"
  },
  {
    name: "AI-Enhanced Video Editor",
    description: "Edit and enhance videos with AI-powered tools for color correction, audio cleanup, and more.",
    price: 109.99,
    rating: 4.9,
    downloads: 850,
    image: "https://source.unsplash.com/random/800x600?video-editing",
    category: "Video Production"
  },
  {
    name: "AI Real Estate Valuation Tool",
    description: "Accurately estimate property values using AI algorithms and market data analysis.",
    price: 149.99,
    rating: 4.7,
    downloads: 500,
    image: "https://source.unsplash.com/random/800x600?real-estate",
    category: "Real Estate"
  }
];

const aiTools = [
  {
    name: "GPT-3 Text Generator",
    description: "Generate human-like text for various applications using OpenAI's GPT-3 model.",
    icon: "Brain",
    link: "https://openai.com/gpt-3/",
    category: "Natural Language Processing"
  },
  {
    name: "DALL-E 2",
    description: "Create stunning, realistic images and art from textual descriptions.",
    icon: "Image",
    link: "https://openai.com/dall-e-2/",
    category: "Image Generation"
  },
  {
    name: "Midjourney",
    description: "Generate unique, creative images using AI-powered text-to-image technology.",
    icon: "Image",
    link: "https://www.midjourney.com/",
    category: "Image Generation"
  },
  {
    name: "Jasper AI",
    description: "Create high-quality content for blogs, social media, and marketing materials.",
    icon: "PenTool",
    link: "https://www.jasper.ai/",
    category: "Content Creation"
  },
  {
    name: "Runway ML",
    description: "Edit and generate videos using AI-powered tools and models.",
    icon: "Video",
    link: "https://runwayml.com/",
    category: "Video Production"
  },
  {
    name: "Synthesia",
    description: "Create AI-powered video presentations with virtual avatars and voice synthesis.",
    icon: "Video",
    link: "https://www.synthesia.io/",
    category: "Video Production"
  },
  {
    name: "Hugging Face Transformers",
    description: "Access and implement state-of-the-art natural language processing models.",
    icon: "Code",
    link: "https://huggingface.co/transformers/",
    category: "Natural Language Processing"
  },
  {
    name: "TensorFlow",
    description: "Build and deploy machine learning models for various applications.",
    icon: "Code",
    link: "https://www.tensorflow.org/",
    category: "Machine Learning"
  },
  {
    name: "Stable Diffusion",
    description: "Generate high-quality images from text descriptions using open-source AI models.",
    icon: "Image",
    link: "https://stability.ai/",
    category: "Image Generation"
  },
  {
    name: "Replicate",
    description: "Run and deploy machine learning models in the cloud with ease.",
    icon: "Cloud",
    link: "https://replicate.com/",
    category: "Machine Learning Infrastructure"
  }
];

const addExampleData = async () => {
  try {
    for (const template of marketplaceTemplates) {
      await addMarketplaceItem(template);
      console.log(`Added marketplace template: ${template.name}`);
    }

    for (const tool of aiTools) {
      await addTool(tool);
      console.log(`Added AI tool: ${tool.name}`);
    }

    console.log('All example data added successfully!');
  } catch (error) {
    console.error('Error adding example data:', error);
  }
};

addExampleData();