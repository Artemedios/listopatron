import React, { useState, useEffect } from 'react';

const products = [
  {
    id: 1,
    name: 'VIVOSUN Pulverizador a Presión (1.35 Galones)',
    price: 1750,
    rating: 4.8,
    reviews: 124,
    description: 'Botella de agua a presión para césped y jardín con correa ajustable para el hombro, ideal para fumigación, limpieza y riego del hogar.',
    image: './assets/product_sprayer.png',
    badge: 'Más vendido'
  },
  {
    id: 2,
    name: 'Casco de Construcción Ajustable (Hard Hat)',
    price: 1450,
    rating: 4.9,
    reviews: 86,
    description: 'Casco de seguridad industrial ventilado con arnés de suspensión ajustable de 6 puntos y correa de barbilla. Certificación de seguridad.',
    image: './assets/product_helmet.png',
    badge: 'Popular'
  },
  {
    id: 3,
    name: 'Chaleco de Seguridad Reflectante Hi-Vis',
    price: 590,
    rating: 4.7,
    reviews: 198,
    description: 'Chaleco reflectante de alta visibilidad clase 2 con múltiples bolsillos y cremallera frontal. Tela transpirable y duradera.',
    image: './assets/product_vest.png',
    badge: 'Esencial'
  }
];

export default function ShopPage({ onNavigate }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  
  // Checkout Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Santo Domingo',
    address: '',
    paymentMethod: 'contraentrega'
  });

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

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setIsCheckoutOpen(false);
    setIsSuccessOpen(true);
  };

  const getWhatsAppLink = () => {
    const orderId = Math.floor(100000 + Math.random() * 900000);
    const cartDetails = cart.map(item => `• ${item.name} (${item.quantity}x)`).join('%0A');
    const text = `¡Hola Listo Patrón! He realizado un pedido en la tienda:%0A%0A*Orden:* %23LP-${orderId}%0A*Nombre:* ${formData.name}%0A*Teléfono:* ${formData.phone}%0A*Dirección:* ${formData.address}, ${formData.city}%0A*Método de Pago:* ${formData.paymentMethod === 'contraentrega' ? 'Contra Entrega' : 'Tarjeta / Transferencia'}%0A%0A*Productos:*%0A${cartDetails}%0A%0A*Total General:* RD$ ${cartTotal.toLocaleString()}`;
    return `https://wa.me/18099090455?text=${text}`;
  };

  // Reset page position on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="shop-page-wrapper">
      
      {/* SHOP NAVIGATION BAR */}
      <nav id="nav" className="shop-nav">
        <div style={{"display": "flex", "alignItems": "center"}}>
          <img className="nav-logo" src="./assets/logo_listo.png" alt="Listo Patrón" style={{"height": "40px", "objectFit": "contain"}} />
          <span className="shop-logo-text">Listo Tienda</span>
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
          <h1>Equípate con lo <br/><span>mejor para el trabajo</span></h1>
          <p>Herramientas y accesorios de seguridad industrial con envíos rápidos a todo el país. Especialmente seleccionados para los profesionales de Listo Patrón.</p>
        </div>
      </header>

      {/* PRODUCT CATALOG CATALOG */}
      <main className="shop-main">
        <div className="shop-container">
          <h2 className="shop-section-title">Productos <span>Disponibles</span></h2>
          <p className="shop-section-sub">Insumos y equipos con los mejores estándares para tus servicios diarios.</p>
          
          <div className="products-grid">
            {products.map((product) => (
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
                  
                  <div className="product-footer">
                    <div className="product-price">
                      <span className="currency">RD$</span>
                      <span className="amount">{product.price.toLocaleString()}</span>
                    </div>
                    <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                      Agregar 🛒
                    </button>
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
              <h3>Datos de Entrega 🚚</h3>
              <button className="close-modal-btn" onClick={() => setIsCheckoutOpen(false)}>✕</button>
            </div>
            
            <form onSubmit={handleCheckoutSubmit} className="checkout-form">
              <div className="form-group">
                <label htmlFor="name">Nombre Completo</label>
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
                <label htmlFor="phone">Teléfono / WhatsApp</label>
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
                <label htmlFor="city">Ciudad</label>
                <select 
                  id="city" 
                  value={formData.city} 
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                >
                  <option value="Santo Domingo">Santo Domingo</option>
                  <option value="Santiago">Santiago</option>
                  <option value="La Romana">La Romana</option>
                  <option value="San Cristóbal">San Cristóbal</option>
                  <option value="Punta Cana">Punta Cana / Bávaro</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="address">Dirección Exacta</label>
                <textarea 
                  id="address" 
                  required 
                  rows="3"
                  value={formData.address} 
                  onChange={(e) => setFormData({...formData, address: e.target.value})} 
                  placeholder="Ej. Calle Duarte #45, Apto 2B, Ensanche Naco"
                />
              </div>

              <div className="form-group">
                <label>Método de Pago</label>
                <div className="radio-options">
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="contraentrega" 
                      checked={formData.paymentMethod === 'contraentrega'}
                      onChange={() => setFormData({...formData, paymentMethod: 'contraentrega'})}
                    />
                    <span>Pago Contra Entrega (Efectivo/Transferencia)</span>
                  </label>
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="online" 
                      checked={formData.paymentMethod === 'online'}
                      onChange={() => setFormData({...formData, paymentMethod: 'online'})}
                    />
                    <span>Tarjeta de Crédito / Depósito Previo</span>
                  </label>
                </div>
              </div>

              <div className="checkout-modal-summary">
                <span>Total a Pagar:</span>
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
