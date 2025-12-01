import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { CartContext } from '../context/CartContext';
import { Product } from '../types';
import { WandIcon, PlushieIcon } from '../components/icons';

type OrderType = 'plushie' | 'figurine';

const CustomOrderPage: React.FC = () => {
    const [orderType, setOrderType] = useState<OrderType>('plushie');
    const [referenceImage, setReferenceImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [size, setSize] = useState('Medium');
    const [material, setMaterial] = useState('Soft Fleece');
    const [price, setPrice] = useState(0);

    const cartContext = useContext(CartContext);
    const navigate = useNavigate();

    const plushieMaterials = ['Soft Fleece', 'Minky Fabric', 'Faux Fur'];
    const figurineMaterials = ['Matte Finish', 'Glossy Finish', 'Metallic Accents'];
    const sizes = ['Small', 'Medium', 'Large'];

    useEffect(() => {
        let basePrice = orderType === 'plushie' ? 60 : 90;
        let sizePrice = 0;
        if (size === 'Medium') sizePrice = 20;
        if (size === 'Large') sizePrice = 50;

        setPrice(basePrice + sizePrice);

        if (orderType === 'plushie') {
            setMaterial('Soft Fleece');
        } else {
            setMaterial('Matte Finish');
        }
    }, [orderType, size]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setReferenceImage(file);
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleAddToCart = () => {
        if (!cartContext) return;

        if (!referenceImage || !imagePreview || description.trim() === '') {
            alert('Please fill out all fields and upload a reference image before adding to cart.');
            return;
        }

        const customProduct: Product = {
            id: Date.now(),
            name: `Custom ${orderType === 'plushie' ? 'Plushie' : 'Figurine'} (${size})`,
            price: `$${price.toFixed(2)}`,
            imageUrl: imagePreview,
        };

        cartContext.addToCart(customProduct);
        alert('Custom order added to your cart!');
        navigate('/cart');
    };
    
    const TypeSelector: React.FC<{ type: OrderType; label: string; icon: React.ReactNode }> = ({ type, label, icon }) => (
        <button
          onClick={() => setOrderType(type)}
          className={`w-full p-6 rounded-lg border-4 transition-all duration-300 flex flex-col items-center justify-center space-y-3 ${
            orderType === type
              ? 'border-primary bg-pink-100 dark:bg-pink-900/50 shadow-lg'
              : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary-light'
          }`}
        >
          {icon}
          <span className="text-xl font-bold text-slate-800 dark:text-white">{label}</span>
        </button>
      );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
            <Header />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2 text-slate-900 dark:text-white">Create Your Masterpiece</h1>
                    <p className="text-center text-lg text-slate-500 dark:text-slate-400 mb-12">
                        Bring your character to life with a one-of-a-kind creation.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column: Form */}
                        <div className="space-y-6 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl">
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">1. Choose your creation type</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <TypeSelector type="plushie" label="Plushie" icon={<PlushieIcon className="w-16 h-16 text-primary" />} />
                                    <TypeSelector type="figurine" label="Figurine" icon={<WandIcon className="w-16 h-16 text-secondary" />} />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">2. Describe your vision</h3>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe your character's personality, specific colors, accessories, pose, etc."
                                    rows={4}
                                    className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 focus:border-primary dark:focus:border-primary-light rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none transition-colors"
                                ></textarea>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">3. Select size</h3>
                                <div className="flex space-x-2 rounded-lg bg-slate-100 dark:bg-slate-700 p-1">
                                    {sizes.map(s => (
                                        <button key={s} onClick={() => setSize(s)} className={`w-full rounded-md py-2 text-sm font-medium transition-colors ${size === s ? 'bg-primary text-white shadow' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`}>{s}</button>
                                    ))}
                                </div>
                            </div>
                             <div>
                                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">4. Select material / finish</h3>
                                <div className="flex space-x-2 rounded-lg bg-slate-100 dark:bg-slate-700 p-1">
                                    {(orderType === 'plushie' ? plushieMaterials : figurineMaterials).map(m => (
                                        <button key={m} onClick={() => setMaterial(m)} className={`w-full rounded-md py-2 text-sm font-medium transition-colors ${material === m ? 'bg-secondary text-white shadow' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`}>{m}</button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Image & Summary */}
                        <div className="space-y-6">
                           <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl h-full flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">5. Upload reference image</h3>
                                    <label htmlFor="image-upload" className="cursor-pointer">
                                        <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center hover:border-primary dark:hover:border-primary-light transition-colors">
                                            {imagePreview ? (
                                                <img src={imagePreview} alt="Reference Preview" className="mx-auto max-h-48 rounded-md" />
                                            ) : (
                                                <div className="text-slate-500 dark:text-slate-400">
                                                    <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                                    <p className="mt-2">Click to upload or drag & drop</p>
                                                    <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
                                                </div>
                                            )}
                                        </div>
                                    </label>
                                    <input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
                                    <p className="text-slate-500 dark:text-slate-400">Estimated Price</p>
                                    <p className="text-5xl font-bold text-primary dark:text-primary-light tracking-tight">${price.toFixed(2)}</p>
                                    <button
                                        onClick={handleAddToCart}
                                        className="w-full mt-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                           </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CustomOrderPage;