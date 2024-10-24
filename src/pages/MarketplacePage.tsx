import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Download } from 'lucide-react';
import { MarketplaceItem, getMarketplaceItems } from '../services/marketplaceService';
import LoadingSpinner from '../components/LoadingSpinner';

const MarketplacePage: React.FC = () => {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastId, setLastId] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchItems = async (reset: boolean = false) => {
    if (loading || (!hasMore && !reset)) return;
    setLoading(true);
    setError(null);
    try {
      const { items: newItems, lastId: newLastId } = await getMarketplaceItems(10, reset ? null : lastId);
      setItems(prev => reset ? newItems : [...prev, ...newItems]);
      setLastId(newLastId);
      setHasMore(newItems.length === 10);
    } catch (error) {
      console.error('Error fetching marketplace items:', error);
      setError('Failed to load marketplace items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(true);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800">AI Project Templates Marketplace</h1>
      <p className="text-xl text-gray-600 mb-12 text-center">Jumpstart your AI project with our ready-made templates. Plug, play, and customize to your needs.</p>
      
      {loading && items.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-indigo-600">${item.price.toFixed(2)}</span>
                  <span className="flex items-center text-yellow-500">
                    <Star size={16} className="fill-current mr-1" />
                    {item.rating.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm text-gray-500 flex items-center">
                    <Download size={16} className="mr-1" />
                    {item.downloads} downloads
                  </span>
                </div>
                <button className="w-full bg-indigo-600 text-white py-2 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center">
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={() => fetchItems()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <div className="mt-16 bg-indigo-100 p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4 text-indigo-800">Have an AI project template to share?</h2>
        <p className="text-xl text-gray-700 mb-8">Join our marketplace and start selling your AI project templates today!</p>
        <button className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors">
          Become a Seller
        </button>
      </div>
    </div>
  );
};

export default MarketplacePage;