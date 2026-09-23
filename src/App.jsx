import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

const ProductCustomizer = lazy(() => import('./components/ProductCustomizer'));
const CommercialCalculator = lazy(() => import('./components/CommercialCalculator'));
const DigitalServices = lazy(() => import('./components/DigitalServices'));
const CustomWebsiteBuilder = lazy(() => import('./components/CustomWebsiteBuilder'));
const Cart = lazy(() => import('./components/Cart'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { sendOrderNotificationEmail } from './emailService';
import PromoBanner from './components/PromoBanner';
import SmartAssistant from './components/SmartAssistant';

// Helper mappers between App state and Supabase Database columns
const mapOrderToDb = (order) => ({
  id: order.id,
  type: order.type,
  company_name: order.companyName || null,
  contact_phone: order.contactPhone || null,
  machine: order.machine || null,
  width: order.width || null,
  height: order.height || null,
  quantity: order.quantity || null,
  price: order.price,
  notes: order.notes || null,
  product_name: order.productName || null,
  product_price: order.productPrice || null,
  design: order.design || null,
  design_name: order.designName || null,
  custom_details: order.customDetails || null,
  customer_name: order.customerName || null,
  customer_phone: order.customerPhone || null,
  customer_city: order.customerCity || null,
  customer_address: order.customerAddress || null,
  status: order.status,
  date: order.date
});

const mapOrderFromDb = (dbOrder) => ({
  id: dbOrder.id,
  type: dbOrder.type,
  companyName: dbOrder.company_name,
  contactPhone: dbOrder.contact_phone,
  machine: dbOrder.machine,
  width: dbOrder.width,
  height: dbOrder.height,
  quantity: dbOrder.quantity,
  price: Number(dbOrder.price),
  notes: dbOrder.notes,
  productName: dbOrder.product_name,
  productPrice: dbOrder.product_price ? Number(dbOrder.product_price) : null,
  design: dbOrder.design,
  designName: dbOrder.design_name,
  customDetails: dbOrder.custom_details,
  customerName: dbOrder.customer_name,
  customerPhone: dbOrder.customer_phone,
  customerCity: dbOrder.customer_city,
  customerAddress: dbOrder.customer_address,
  status: dbOrder.status,
  date: dbOrder.date
});

const mapInquiryToDb = (inq) => ({
  id: inq.id,
  type: inq.type,
  service_key: inq.serviceKey,
  service_name: inq.serviceName,
  client_name: inq.clientName,
  client_phone: inq.clientPhone,
  project_desc: inq.projectDesc || null,
  budget: inq.budget || null,
  status: inq.status,
  date: inq.date
});

const mapInquiryFromDb = (dbInq) => ({
  id: dbInq.id,
  type: dbInq.type,
  serviceKey: dbInq.service_key,
  serviceName: dbInq.service_name,
  clientName: dbInq.client_name,
  clientPhone: dbInq.client_phone,
  projectDesc: dbInq.project_desc,
  budget: dbInq.budget,
  status: dbInq.status,
  date: dbInq.date
});

// Default mock printing orders updated with DTF 60cm and realistic prices
const defaultMockOrders = [];

// Default mock digital service requests
const defaultMockServiceRequests = [];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Hash-based routing for browser back/forward
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      const validTabs = ['home', 'customizer', 'calculator', 'services', 'custom_web', 'cart', 'admin'];
      if (validTabs.includes(hash)) setActiveTab(hash);
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (tab) => {
    window.location.hash = tab;
  };
  
  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('abc_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch { return []; }
  });
  
  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem('abc_orders_v2');
      return savedOrders ? JSON.parse(savedOrders) : defaultMockOrders;
    } catch { return defaultMockOrders; }
  });

  // Digital services requests database
  const [serviceRequests, setServiceRequests] = useState(() => {
    try {
      const savedServices = localStorage.getItem('abc_services_requests_v2');
      return savedServices ? JSON.parse(savedServices) : defaultMockServiceRequests;
    } catch { return defaultMockServiceRequests; }
  });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('abc_cart', JSON.stringify(cart));
  }, [cart]);

  // Load from Supabase on mount (with localStorage fallback)
  useEffect(() => {
    if (isSupabaseConfigured) {
      // Fetch cloud orders
      supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (error) {
            console.error('Error fetching orders from Supabase:', error);
          } else if (data && data.length > 0) {
            setOrders(data.map(mapOrderFromDb));
          }
        });

      // Fetch cloud inquiries
      supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (error) {
            console.error('Error fetching inquiries from Supabase:', error);
          } else if (data && data.length > 0) {
            setServiceRequests(data.map(mapInquiryFromDb));
          }
        });
    }
  }, []);

  // Sync orders to localStorage (fallback)
  useEffect(() => {
    localStorage.setItem('abc_orders_v2', JSON.stringify(orders));
  }, [orders]);

  // Sync inquiries to localStorage (fallback)
  useEffect(() => {
    localStorage.setItem('abc_services_requests_v2', JSON.stringify(serviceRequests));
  }, [serviceRequests]);

  // Cart operations
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const checkoutCart = async (newOrders) => {
    setOrders((prevOrders) => [...newOrders, ...prevOrders]);
    setCart([]); // Clear the cart

    if (isSupabaseConfigured) {
      const dbOrders = newOrders.map(mapOrderToDb);
      const { error } = await supabase.from('orders').insert(dbOrders);
      if (error) console.error('Error inserting orders to Supabase:', error);
    }

    // Send email notifications
    newOrders.forEach((ord) => {
      sendOrderNotificationEmail({
        ...ord,
        details: `منتج: ${ord.productName} | السعر: $${ord.productPrice}\nالعنوان: ${ord.customerCity} - ${ord.customerAddress}`
      });
    });
  };

  // Commercial Printing operations
  const addCommercialOrder = async (newOrder) => {
    setOrders((prevOrders) => [newOrder, ...prevOrders]);

    if (isSupabaseConfigured) {
      const dbOrder = mapOrderToDb(newOrder);
      const { error } = await supabase.from('orders').insert([dbOrder]);
      if (error) console.error('Error inserting commercial order to Supabase:', error);
    }

    // Send email notification
    sendOrderNotificationEmail({
      ...newOrder,
      details: `ماكينة/خامة: ${newOrder.machine}\nالكمية: ${newOrder.quantity}\nالمقاس: ${newOrder.width}x${newOrder.height} سم\nملاحظات: ${newOrder.notes || 'لا يوجد'}`
    });
  };

  // Digital Services operations
  const addServiceRequest = async (newRequest) => {
    setServiceRequests((prevRequests) => [newRequest, ...prevRequests]);

    if (isSupabaseConfigured) {
      const dbInq = mapInquiryToDb(newRequest);
      const { error } = await supabase.from('inquiries').insert([dbInq]);
      if (error) console.error('Error inserting service request to Supabase:', error);
    }

    // Send email notification
    sendOrderNotificationEmail({
      ...newRequest,
      details: `الخدمة: ${newRequest.serviceName}\nالميزانية: ${newRequest.budget || 'غير محددة'}\nتفاصيل المشروع: ${newRequest.projectDesc || 'لا يوجد'}`
    });
  };

  // Printing Administration
  const updateOrderStatus = async (orderId, newStatus) => {
    setOrders((prevOrders) => 
      prevOrders.map((order) => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);
      if (error) console.error('Error updating order status in Supabase:', error);
    }
  };

  const removeOrder = async (orderId) => {
    if (confirm('هل أنت متأكد من حذف هذا الطلب نهائياً من سجلات الطباعة؟')) {
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));

      if (isSupabaseConfigured) {
        const { error } = await supabase
          .from('orders')
          .delete()
          .eq('id', orderId);
        if (error) console.error('Error deleting order from Supabase:', error);
      }
    }
  };

  // Digital Services Administration
  const updateServiceStatus = async (requestId, newStatus) => {
    setServiceRequests((prevRequests) => 
      prevRequests.map((req) => 
        req.id === requestId ? { ...req, status: newStatus } : req
      )
    );

    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('inquiries')
        .update({ status: newStatus })
        .eq('id', requestId);
      if (error) console.error('Error updating inquiry status in Supabase:', error);
    }
  };

  const removeServiceRequest = async (requestId) => {
    if (confirm('هل أنت متأكد من حذف هذا الطلب نهائياً من سجلات الخدمات الرقمية؟')) {
      setServiceRequests((prevRequests) => prevRequests.filter((req) => req.id !== requestId));

      if (isSupabaseConfigured) {
        const { error } = await supabase
          .from('inquiries')
          .delete()
          .eq('id', requestId);
        if (error) console.error('Error deleting inquiry from Supabase:', error);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <PromoBanner />
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={navigateTo} 
        cartCount={cart.length} 
      />

      <main style={{ flex: 1, paddingTop: '30px' }}>
        <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}><div style={{ width: 40, height: 40, border: '3px solid #e2e8f0', borderTopColor: '#0284c7', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /></div>}>
          {activeTab === 'home' && (
            <Hero setActiveTab={navigateTo} />
          )}
          {activeTab === 'customizer' && (
            <ProductCustomizer addToCart={addToCart} />
          )}
          {activeTab === 'calculator' && (
            <CommercialCalculator addCommercialOrder={addCommercialOrder} />
          )}
          {activeTab === 'services' && (
            <DigitalServices addServiceRequest={addServiceRequest} />
          )}
          {activeTab === 'custom_web' && (
            <CustomWebsiteBuilder addServiceRequest={addServiceRequest} />
          )}
          {activeTab === 'cart' && (
            <Cart 
              cartItems={cart} 
              removeFromCart={removeFromCart} 
              checkoutCart={checkoutCart} 
            />
          )}
          {activeTab === 'admin' && (
            <AdminDashboard 
              orders={orders} 
              serviceRequests={serviceRequests}
              updateOrderStatus={updateOrderStatus} 
              updateServiceStatus={updateServiceStatus}
              removeOrder={removeOrder} 
              removeServiceRequest={removeServiceRequest}
            />
          )}
        </Suspense>
      </main>

      <Footer setActiveTab={navigateTo} />

      <SmartAssistant 
        orders={orders} 
        serviceRequests={serviceRequests}
        setActiveTab={navigateTo} 
        addToCart={addToCart} 
        addServiceRequest={addServiceRequest} 
      />
    </div>
  );
}
