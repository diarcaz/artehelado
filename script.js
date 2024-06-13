import { auth, db } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set, push } from 'firebase/database';

const products = [
    { name: 'Helado de Vainilla', price: 5.00, image: 'ruta_a_imagen_vainilla' },
    { name: 'Helado de Chocolate', price: 6.00, image: 'ruta_a_imagen_chocolate' },
    { name: 'Helado de Fresa', price: 5.50, image: 'ruta_a_imagen_fresa' },
    { name: 'Helado de Pistacho', price: 6.50, image: 'ruta_a_imagen_pistacho' },
    { name: 'Helado de Menta con Chispas de Chocolate', price: 5.75, image: 'ruta_a_imagen_menta' },
    { name: 'Helado de Cookies and Cream', price: 6.00, image: 'ruta_a_imagen_cookies' },
    { name: 'Helado de Café', price: 5.50, image: 'ruta_a_imagen_cafe' },
    { name: 'Sorbet de Mango', price: 4.50, image: 'ruta_a_imagen_mango' },
    { name: 'Sorbet de Limón', price: 4.00, image: 'ruta_a_imagen_limon' },
    { name: 'Sorbet de Frambuesa', price: 4.75, image: 'ruta_a_imagen_frambuesa' }
];

const cart = [];

function renderProducts() {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';
    products.forEach((product, index) => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${index})">Agregar al Carrito</button>
        `;
        productGrid.appendChild(productItem);
    });
}

function renderCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartContainer.appendChild(itemElement);
    });
}

window.addToCart = function(index) {
    cart.push(products[index]);
    renderCart();
};

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    renderCart();
};

window.generateTicket = function() {
    const ticketContainer = document.getElementById('ticket');
    ticketContainer.innerHTML = '<h2>Ticket</h2>';
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `<p>${item.name} - $${item.price.toFixed(2)}</p>`;
        ticketContainer.appendChild(itemElement);
    });
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const totalElement = document.createElement('p');
    totalElement.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    ticketContainer.appendChild(totalElement);

    // Guardar en la base de datos
    const userId = auth.currentUser ? auth.currentUser.uid : 'anonymous';
    const ticketRef = push(ref(db, 'tickets/' + userId));
    set(ticketRef, {
        items: cart,
        total: total,
        createdAt: new Date().toISOString()
    }).then(() => {
        alert('Ticket generado y guardado en la base de datos');
        cart.length = 0;  // Vaciar el carrito
        renderCart();  // Volver a renderizar el carrito
    }).catch(error => {
        console.error('Error al generar ticket:', error);
    });
};

// Cargar los productos al inicio
document.addEventListener('DOMContentLoaded', renderProducts);

// Funcionalidades de autenticación
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await set(ref(db, 'users/' + user.uid), {
            username: name,
            email: email
        });
        alert('Usuario registrado exitosamente');
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        alert('Error al registrar usuario');
    }
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Inicio de sesión exitoso');
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Error al iniciar sesión');
    }
});
