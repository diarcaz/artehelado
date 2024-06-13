document.addEventListener('DOMContentLoaded', () => {
    const cart = [];

    function renderCart() {
        const cartContainer = document.getElementById('cart');
        cartContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <p>${item.name} - $${item.price}</p>
                <button onclick="removeFromCart(${index})">Eliminar</button>
            `;
            cartContainer.appendChild(itemElement);
        });
    }

    window.addToCart = function(name, price) {
        cart.push({ name, price });
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
            itemElement.innerHTML = `<p>${item.name} - $${item.price}</p>`;
            ticketContainer.appendChild(itemElement);
        });
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        const totalElement = document.createElement('p');
        totalElement.innerHTML = `<strong>Total: $${total}</strong>`;
        ticketContainer.appendChild(totalElement);
    };

    renderCart();
});
