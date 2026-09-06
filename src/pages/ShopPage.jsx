import React, { useState, useEffect } from 'react';

const products = [
  // Categoría Original: Equipos de Seguridad
  {
    id: 1,
    name: 'VIVOSUN Pulverizador a Presión (1.35 Galones)',
    price: 1750,
    rating: 4.8,
    reviews: 124,
    description: 'Botella de agua a presión para césped y jardín con correa ajustable para el hombro, ideal para fumigación, limpieza y riego del hogar.',
    image: './assets/product_sprayer.png',
    badge: 'Más vendido',
    category: 'seguridad'
  },
  {
    id: 2,
    name: 'Casco de Construcción Ajustable (Hard Hat)',
    price: 1450,
    rating: 4.9,
    reviews: 86,
    description: 'Casco de seguridad industrial ventilado con arnés de suspensión ajustable de 6 puntos y correa de barbilla. Certificación de seguridad.',
    image: './assets/product_helmet.png',
    badge: 'Popular',
    category: 'seguridad'
  },
  {
    id: 3,
    name: 'Chaleco de Seguridad Reflectante Hi-Vis',
    price: 590,
    rating: 4.7,
    reviews: 198,
    description: 'Chaleco reflectante de alta visibilidad clase 2 con múltiples bolsillos y cremallera frontal. Tela transpirable y duradera.',
    image: './assets/product_vest.png',
    badge: 'Esencial',
    category: 'seguridad'
  },
  // Categoría: Pantalones de Trabajo
  {
    id: 4,
    name: 'Pantalones Tácticos Elásticos Cargo (Negro)',
    price: 1780,
    rating: 4.2,
    reviews: 249,
    description: 'Pantalón cargo táctico para hombre, tejido elástico y cómodo. Gran cantidad de bolsillos reforzados para herramientas.',
    image: './assets/prod_pants_1.png',
    badge: 'Más vendido',
    category: 'pantalones'
  },
  {
    id: 5,
    name: 'Pantalones Tácticos de Senderismo (Gris Oscuro)',
    price: 1785,
    rating: 3.8,
    reviews: 72,
    description: 'Pantalones tácticos ligeros de secado rápido, ideales para senderismo y trabajos al aire libre bajo el sol.',
    image: './assets/prod_pants_2.png',
    badge: null,
    category: 'pantalones'
  },
  {
    id: 6,
    name: 'Pantalones Tácticos de Trabajo Resistentes (Gris)',
    price: 1785,
    rating: 4.0,
    reviews: 24,
    description: 'Pantalón de trabajo reforzado con costuras dobles. Gran durabilidad para construcción, carpintería o mecánica.',
    image: './assets/prod_pants_3.png',
    badge: null,
    category: 'pantalones'
  },
  {
    id: 7,
    name: 'Pantalones Tácticos whok (Gris Claro)',
    price: 1600,
    rating: 4.2,
    reviews: 338,
    description: 'Pantalones de trabajo tácticos de carga para hombre, resistentes y funcionales para el uso diario.',
    image: './assets/prod_pants_4.png',
    badge: 'Popular',
    category: 'pantalones'
  },
  {
    id: 8,
    name: 'Pantalones Juicy Trendz de Construcción (Gris/Negro)',
    price: 2500,
    rating: 4.2,
    reviews: 56,
    description: 'Pantalón de trabajo de alta resistencia con bolsillos flotantes porta-herramientas. Refuerzo en rodillas.',
    image: './assets/prod_pants_5.png',
    badge: 'Premium',
    category: 'pantalones'
  },
  {
    id: 9,
    name: 'Vaqueros de Ajuste Clásico Rustler (Azul)',
    price: 1340,
    rating: 4.5,
    reviews: 43900,
    description: 'Jeans de trabajo clásicos y relajados para hombre de alta durabilidad en mezclilla de alta calidad.',
    image: './assets/prod_pants_6.png',
    badge: 'Esencial',
    category: 'pantalones'
  },
  {
    id: 10,
    name: 'Pantalones de Trabajo Impermeables Ligeros (Verde Oliva)',
    price: 1160,
    rating: 5.0,
    reviews: 2,
    description: 'Pantalones ligeros impermeables y resistentes al viento, ideales para trabajos de fontanería y exteriores.',
    image: './assets/prod_pants_7.png',
    badge: 'Recomendado',
    category: 'pantalones'
  },
  {
    id: 11,
    name: 'DEWALT Protradesman Pantalones de Trabajo',
    price: 4900,
    rating: 4.6,
    reviews: 508,
    description: 'Pantalón de trabajo profesional DEWALT de alta gama, fabricado en algodón y poliéster elástico con bolsillos holster.',
    image: './assets/prod_pants_8.png',
    badge: 'Profesional',
    category: 'pantalones'
  },
  {
    id: 12,
    name: 'Generic Pantalones Tácticos Cargo (Marrón)',
    price: 1520,
    rating: 4.1,
    reviews: 658,
    description: 'Pantalones tácticos de carga elásticos con diseño clásico multibolsillos, repelentes al agua y al desgaste.',
    image: './assets/prod_pants_9.png',
    badge: null,
    category: 'pantalones'
  },
  // Categoría: Trajes y Protección
  {
    id: 13,
    name: 'Andes Overol de Protección Química (Blanco)',
    price: 1520,
    rating: 4.3,
    reviews: 158,
    description: 'Overol de protección química para el manejo de materiales peligrosos, pintura industrial o desinfección.',
    image: './assets/prod_safe_10.png',
    badge: 'Certificado',
    category: 'proteccion'
  },
  {
    id: 14,
    name: 'Overol Amarillo Hazmat de Material Peligroso',
    price: 1965,
    rating: 4.4,
    reviews: 32,
    description: 'Traje protector completo amarillo para materiales peligrosos y químicos agresivos. Capucha ajustable.',
    image: './assets/prod_safe_11.png',
    badge: 'Seguridad',
    category: 'proteccion'
  },
  {
    id: 15,
    name: 'Máscara Respiradora Profesional',
    price: 2500,
    rating: 4.4,
    reviews: 709,
    description: 'Máscara respiradora de media cara con filtros intercambiables de alta eficiencia, perfecta para pintura y soldadura.',
    image: './assets/prod_safe_12.png',
    badge: 'Más vendido',
    category: 'proteccion'
  },
  {
    id: 16,
    name: 'Traje de Pintura Reutilizable y Antiestático (Negro/Rojo)',
    price: 4100,
    rating: 4.0,
    reviews: 27,
    description: 'Overol reutilizable protector antiestático premium con ventilación trasera, ideal para cabinas de pintura y talleres.',
    image: './assets/prod_safe_13.png',
    badge: 'Premium',
    category: 'proteccion'
  },
  {
    id: 17,
    name: 'Overol Desechable Transpirable (Azul)',
    price: 1600,
    rating: 3.5,
    reviews: 29,
    description: 'Mono protector desechable transpirable de alta visibilidad para limpieza general y trabajos de mantenimiento.',
    image: './assets/prod_safe_14.png',
    badge: null,
    category: 'proteccion'
  },
  {
    id: 18,
    name: 'CAREGY Overoles Hazmat Desechables (2-Pack, Blanco)',
    price: 890,
    rating: 4.3,
    reviews: 344,
    description: 'Paquete de 2 overoles protectores desechables con capucha y puños elásticos para trabajos de pintura y barrera biológica.',
    image: './assets/prod_safe_15.png',
    badge: 'Oferta',
    category: 'proteccion'
  }
];

export default function ShopPage({ onNavigate }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('listo_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  
  // Checkout Form State
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    phone: '',
    secondaryPhone: '',
    city: 'Santo Domingo',
    sector: '',
    address: '',
    reference: '',
    deliveryNotes: '',
    paymentMethod: 'transferencia',
    receiptFileName: '',
    receiptFileData: null
  });

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('listo_cart', JSON.stringify(cart));
  }, [cart]);

  // Calculate cart metrics
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const itbis = Math.round(cartSubtotal * 0.18);
  const deliveryFee = cartSubtotal > 0 ? 250 : 0;
  const cartTotal = cartSubtotal + itbis + deliveryFee;

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    // Open cart drawer automatically
    setIsCartOpen(true);
  };

  const buyNow = (product) => {
    setCart([{ ...product, quantity: 1 }]);
    setIsCheckoutOpen(true);
  };

  const updateQuantity = (id, amount) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + amount;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const handleReceiptUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          receiptFileName: file.name,
          receiptFileData: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveReceipt = () => {
    setFormData(prev => ({
      ...prev,
      receiptFileName: '',
      receiptFileData: null
    }));
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setIsCheckoutOpen(false);
    setIsSuccessOpen(true);
  };

  const getWhatsAppLink = () => {
    const orderId = Math.floor(100000 + Math.random() * 900000);
    const cartDetails = cart.map(item => `• ${item.name} (${item.quantity}x) - RD$ ${(item.price * item.quantity).toLocaleString()}`).join('%0A');
    
    const nicknameStr = formData.nickname ? ` (Apodo: ${formData.nickname})` : '';
    const phoneAltStr = formData.secondaryPhone ? ` | Tel Alt: ${formData.secondaryPhone}` : '';
    const notesStr = formData.deliveryNotes ? `%0A📝 *Notas de Entrega:* ${formData.deliveryNotes}` : '';
    
    let paymentStr = 'Pago Online / Transferencia Bancaria (Banco Popular / Banreservas)';
    paymentStr += formData.receiptFileName 
      ? `%0A📄 *Comprobante Adjuntado en Web:* Sí (${formData.receiptFileName}) - *Nota:* Se adjunta captura por este chat.`
      : `%0A📄 *Comprobante:* Enviaré la captura/recibo de la transferencia por este chat.`;

    const text = `¡Hola Listo Patrón! He realizado un pedido en la tienda:%0A%0A` +
      `📦 *Orden:* %23LP-${orderId}%0A` +
      `👤 *Cliente:* ${formData.name}${nicknameStr}%0A` +
      `📱 *Teléfono:* ${formData.phone}${phoneAltStr}%0A` +
      `📍 *Ciudad:* ${formData.city}%0A` +
      `🏡 *Sector/Barrio:* ${formData.sector}%0A` +
      `🏠 *Dirección Exacta:* ${formData.address}%0A` +
      `🚩 *Punto de Referencia:* ${formData.reference}${notesStr}%0A%0A` +
      `💳 *Método de Pago:* ${paymentStr}%0A%0A` +
      `🛒 *Productos:*%0A${cartDetails}%0A%0A` +
      `💰 *Subtotal:* RD$ ${cartSubtotal.toLocaleString()}%0A` +
      `🏛️ *ITBIS (18%):* RD$ ${itbis.toLocaleString()}%0A` +
      `🚚 *Envío:* RD$ ${deliveryFee.toLocaleString()}%0A` +
      `⭐ *TOTAL GENERAL:* RD$ ${cartTotal.toLocaleString()}`;

    return `https://wa.me/18099090455?text=${text}`;
  };

  // Reset page position on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="shop-page-wrapper">
      
      {/* SHOP NAVIGATION BAR */}
      <nav id="nav" className="shop-nav">
        <div style={{"display": "flex", "alignItems": "center"}}>
          <img className="nav-logo" src="./assets/logo_listo_patron.png" alt="Listo Patrón" style={{"height": "75px", "objectFit": "contain"}} />
          <span className="shop-logo-text">Tienda</span>
        </div>

        <div className="nav-links">
          <button onClick={() => onNavigate('home')} className="shop-back-btn">← Volver al Inicio</button>
          
          <button className="cart-nav-btn" onClick={() => setIsCartOpen(true)}>
            <span className="cart-icon-wrapper">
              🛒
              {cartItemCount > 0 && <span className="cart-badge-count">{cartItemCount}</span>}
            </span>
            <span className="cart-btn-text">Carrito (RD$ {cartSubtotal.toLocaleString()})</span>
          </button>
        </div>
      </nav>

      {/* SHOP HERO HEADER */}
      <header className="shop-hero">
        <div className="shop-hero-overlay"></div>
        <div className="shop-hero-content">
          <span className="shop-tag">INSUMOS PROFESIONALES</span>
          <h1 style={{ "display": "flex", "flexDirection": "column", "alignItems": "center", "gap": "15px", "fontSize": "clamp(28px, 4vw, 44px)" }}>
            Equípate con
            <img src="./assets/logo_listo_patron.png" alt="Listo Patrón" style={{ "height": "75px", "objectFit": "contain" }} />
          </h1>
          <p>Herramientas y accesorios de seguridad industrial con envíos rápidos a todo el país. Especialmente seleccionados para los profesionales de Listo Patrón.</p>
        </div>
      </header>

      {/* PRODUCT CATALOG CATALOG */}
      <main className="shop-main">
        <div className="shop-container">
          <h2 className="shop-section-title">Productos <span>Disponibles</span></h2>
          <p className="shop-section-sub">Insumos y equipos con los mejores estándares para tus servicios diarios.</p>
          
          {/* CATEGORY FILTERS */}
          <div className="filter-pills" style={{ "marginBottom": "30px", "justifyContent": "center", "display": "flex", "flexWrap": "wrap" }}>
            <button 
              className={`filter-pill ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              Todos
            </button>
            <button 
              className={`filter-pill ${selectedCategory === 'pantalones' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('pantalones')}
            >
              👖 Pantalones de Trabajo
            </button>
            <button 
              className={`filter-pill ${selectedCategory === 'proteccion' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('proteccion')}
            >
              🛡️ Trajes y Protección
            </button>
            <button 
              className={`filter-pill ${selectedCategory === 'seguridad' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('seguridad')}
            >
              🧯 Equipos de Seguridad
            </button>
          </div>

          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                {product.badge && <span className="product-card-badge">{product.badge}</span>}
                <div className="product-img-wrapper">
                  <img src={product.image} alt={product.name} className="product-img" />
                </div>
                <div className="product-content">
                  <div className="product-rating">
                    <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
                    <span className="rating-value">{product.rating}</span>
                    <span className="reviews">({product.reviews} opiniones)</span>
                  </div>
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-desc">{product.description}</p>
                  
                  <div className="product-footer" style={{ "flexDirection": "column", "gap": "10px", "alignItems": "stretch" }}>
                    <div style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "center" }}>
                      <div className="product-price">
                        <span className="currency">RD$</span>
                        <span className="amount">{product.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <div style={{ "display": "flex", "gap": "8px", "marginTop": "5px" }}>
                      <button className="add-to-cart-btn" onClick={() => addToCart(product)} style={{ "flex": "1", "padding": "10px 4px", "fontSize": "12px", "whiteSpace": "nowrap" }}>
                        Agregar 🛒
                      </button>
                      <button className="buy-now-btn" onClick={() => buyNow(product)}>
                        Comprar 🚀
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* SHOPPING CART SIDEBAR (DRAWER) */}
      <div className={`cart-drawer-backdrop ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}>
        <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="cart-drawer-header">
            <h3>Tu Carrito 🛒</h3>
            <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>✕</button>
          </div>

          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <span className="empty-cart-icon">🛍️</span>
              <p>Tu carrito está vacío</p>
              <button className="shop-now-btn" onClick={() => setIsCartOpen(false)}>Empezar a comprar</button>
            </div>
          ) : (
            <div className="cart-drawer-content">
              
              {/* CART ITEMS LIST */}
              <div className="cart-items-list">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-img-wrap">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <div className="cart-item-price">RD$ {item.price.toLocaleString()}</div>
                      <div className="cart-item-qty-actions">
                        <button onClick={() => updateQuantity(item.id, -1)} className="qty-btn">-</button>
                        <span className="qty-value">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="qty-btn">+</button>
                        <button onClick={() => removeFromCart(item.id)} className="delete-item-btn" title="Eliminar">🗑️</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CART SUMMARY */}
              <div className="cart-summary-box">
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>RD$ {cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="summary-line">
                  <span>ITBIS (18%)</span>
                  <span>RD$ {itbis.toLocaleString()}</span>
                </div>
                <div className="summary-line">
                  <span>Envío (Todo RD)</span>
                  <span>RD$ {deliveryFee.toLocaleString()}</span>
                </div>
                <hr className="summary-divider"/>
                <div className="summary-line total">
                  <span>Total General</span>
                  <span>RD$ {cartTotal.toLocaleString()}</span>
                </div>
                
                <button className="checkout-proceed-btn" onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}>
                  Completar Compra 💳
                </button>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="checkout-modal-backdrop" onClick={() => setIsCheckoutOpen(false)}>
          <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="checkout-modal-header">
              <div>
                <h3>Datos de Entrega y Pago 🚚</h3>
                <span className="checkout-subtitle">Completa tus datos para procesar la orden</span>
              </div>
              <button className="close-modal-btn" onClick={() => setIsCheckoutOpen(false)}>✕</button>
            </div>
            
            <form onSubmit={handleCheckoutSubmit} className="checkout-form">
              
              {/* SECCIÓN 1: DATOS PERSONALES */}
              <div className="form-section">
                <h4 className="form-section-title"><span>1</span> Datos Personales</h4>
                
                <div className="form-row-2col">
                  <div className="form-group">
                    <label htmlFor="name">Nombre Completo *</label>
                    <input 
                      type="text" 
                      id="name" 
                      required 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})} 
                      placeholder="Ej. Carlos Pérez" 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="nickname">Apodo / Cómo te dicen</label>
                    <input 
                      type="text" 
                      id="nickname" 
                      value={formData.nickname} 
                      onChange={(e) => setFormData({...formData, nickname: e.target.value})} 
                      placeholder="Ej. Carlitos / El Rubio" 
                    />
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="form-group">
                    <label htmlFor="phone">Teléfono / WhatsApp *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      required 
                      value={formData.phone} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                      placeholder="Ej. 809-909-0455" 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="secondaryPhone">Teléfono Secundario (Opcional)</label>
                    <input 
                      type="tel" 
                      id="secondaryPhone" 
                      value={formData.secondaryPhone} 
                      onChange={(e) => setFormData({...formData, secondaryPhone: e.target.value})} 
                      placeholder="Ej. 829-555-0199" 
                    />
                  </div>
                </div>
              </div>

              {/* SECCIÓN 2: UBICACIÓN DE ENTREGA */}
              <div className="form-section">
                <h4 className="form-section-title"><span>2</span> Dirección de Entrega</h4>

                <div className="form-row-2col">
                  <div className="form-group">
                    <label htmlFor="city">Ciudad / Provincia *</label>
                    <select 
                      id="city" 
                      value={formData.city} 
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                    >
                      <option value="Santo Domingo">Santo Domingo (D.N. / Este / Norte / Oeste)</option>
                      <option value="Santiago">Santiago de los Caballeros</option>
                      <option value="San Cristóbal">San Cristóbal</option>
                      <option value="La Romana">La Romana</option>
                      <option value="Punta Cana / Bávaro">Punta Cana / Bávaro</option>
                      <option value="San Pedro de Macorís">San Pedro de Macorís</option>
                      <option value="Baní">Baní (Peravia)</option>
                      <option value="Puerto Plata">Puerto Plata</option>
                      <option value="Bonao">Bonao</option>
                      <option value="La Vega">La Vega</option>
                      <option value="Moca">Moca</option>
                      <option value="San Francisco de Macorís">San Francisco de Macorís</option>
                      <option value="Barahona">Barahona</option>
                      <option value="Azua">Azua</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="sector">Sector / Barrio *</label>
                    <input 
                      type="text" 
                      id="sector" 
                      required 
                      value={formData.sector} 
                      onChange={(e) => setFormData({...formData, sector: e.target.value})} 
                      placeholder="Ej. Ensanche Naco, Los Mameyes, Piantini" 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Dirección Exacta (Calle y Número) *</label>
                  <textarea 
                    id="address" 
                    required 
                    rows="2"
                    value={formData.address} 
                    onChange={(e) => setFormData({...formData, address: e.target.value})} 
                    placeholder="Ej. Calle Duarte #45, Edificio Don Juan, Apto 2B"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="reference">Punto de Referencia *</label>
                  <input 
                    type="text" 
                    id="reference" 
                    required 
                    value={formData.reference} 
                    onChange={(e) => setFormData({...formData, reference: e.target.value})} 
                    placeholder="Ej. Frente al Colmado Don Pedro, al lado de la banca de lotería" 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="deliveryNotes">Notas de Entrega / Horario Preferido</label>
                  <input 
                    type="text" 
                    id="deliveryNotes" 
                    value={formData.deliveryNotes} 
                    onChange={(e) => setFormData({...formData, deliveryNotes: e.target.value})} 
                    placeholder="Ej. Entregar después de las 2:00 PM / Llamar 10 min antes" 
                  />
                </div>
              </div>

              {/* SECCIÓN 3: MÉTODO DE PAGO ONLINE */}
              <div className="form-section">
                <h4 className="form-section-title"><span>3</span> Método de Pago Online</h4>
                
                <div className="transfer-details-box">
                  <div className="payment-method-header" style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '24px' }}>💳</span>
                    <div>
                      <strong style={{ fontSize: '15px', color: '#111', display: 'block' }}>Pago Online por Transferencia Bancaria</strong>
                      <span style={{ fontSize: '12px', color: '#666' }}>Realiza tu depósito o transferencia y adjunta tu comprobante a continuación.</span>
                    </div>
                  </div>

                  <h5 style={{ fontSize: '13px', fontWeight: '800', color: '#1a1a1a', marginBottom: '10px' }}>Cuentas Bancarias Oficiales de Listo Patrón:</h5>
                  
                  <div className="bank-accounts-grid">
                    <div className="bank-account-card">
                      <span className="bank-badge popular">Banco Popular</span>
                      <div className="account-number">Número de Cuenta: <strong>746424456</strong></div>
                      <div className="account-owner">Titular: <strong>Julio de Jesus Francisco Huseta</strong></div>
                    </div>

                    <div className="bank-account-card">
                      <span className="bank-badge banreservas">Banreservas</span>
                      <div className="account-number">Número de Cuenta: <strong>9607282472</strong></div>
                      <div className="account-owner">Titular: <strong>Julio de Jesus Francisco Huseta</strong></div>
                    </div>
                  </div>

                  <div className="receipt-upload-box">
                    <label className="receipt-upload-label">
                      <span>📎 Adjuntar Comprobante o Captura del Pago:</span>
                      <input 
                        type="file" 
                        accept="image/*,.pdf" 
                        onChange={handleReceiptUpload} 
                        style={{ display: 'none' }}
                        id="receipt-file-input"
                      />
                    </label>

                    {formData.receiptFileName ? (
                      <div className="receipt-preview-card">
                        {formData.receiptFileData && formData.receiptFileData.startsWith('data:image') && (
                          <img src={formData.receiptFileData} alt="Comprobante" className="receipt-thumb" />
                        )}
                        <div className="receipt-info">
                          <span className="receipt-status">✅ Recibo Adjuntado</span>
                          <span className="receipt-name">{formData.receiptFileName}</span>
                        </div>
                        <button type="button" onClick={handleRemoveReceipt} className="remove-receipt-btn">
                          🗑️ Quitar
                        </button>
                      </div>
                    ) : (
                      <label htmlFor="receipt-file-input" className="upload-dropzone">
                        <span className="upload-icon">📤</span>
                        <span className="upload-text">Haz clic aquí para seleccionar tu comprobante</span>
                        <span className="upload-subtext">Acepta imágenes (JPG, PNG) y PDF</span>
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* RESUMEN FINAL */}
              <div className="checkout-modal-summary">
                <div>
                  <span>Total a Pagar (Con Envío e ITBIS):</span>
                  <div className="summary-breakdown-sub">Envío gratis / estándar incluido</div>
                </div>
                <strong>RD$ {cartTotal.toLocaleString()}</strong>
              </div>

              <button type="submit" className="confirm-order-btn">
                Confirmar Compra y Pedir por WhatsApp 🚀
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {isSuccessOpen && (
        <div className="checkout-modal-backdrop">
          <div className="checkout-modal success-modal" style={{"textAlign": "center", "padding": "40px 30px"}}>
            <span className="success-icon">🎉</span>
            <h3 style={{"fontSize": "26px", "color": "#222", "margin": "16px 0 8px"}}>¡Pedido Confirmado!</h3>
            <p style={{"color": "#666", "fontSize": "15px", "lineHeight": "1.6", "marginBottom": "24px"}}>
              Hemos registrado tus datos para el envío. Para agilizar la entrega y coordinar el pago, haz clic en el botón de abajo para enviarnos tu comprobante y detalles directo por WhatsApp.
            </p>
            
            <a 
              href={getWhatsAppLink()} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="whatsapp-confirm-link"
              onClick={() => {
                setIsSuccessOpen(false);
                setCart([]);
                onNavigate('home');
              }}
            >
              Enviar Detalles a WhatsApp 💬
            </a>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="shop-footer">
        <p className="footer-copy">© {new Date().getFullYear()} Listo Patrón. Todos los derechos reservados.</p>
      </footer>

    </div>
  );
}
