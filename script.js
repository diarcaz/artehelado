import { auth, db } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set, push } from 'firebase/database';

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

async function saveCart(cartItems) {
    try {
        const userId = auth.currentUser.uid;
        const cartRef = push(ref(db, 'carts/' + userId));
        await set(cartRef, {
            items: cartItems,
            createdAt: new Date().toISOString()
        });
        console.log('Carrito guardado con éxito');
    } catch (error) {
        console.error('Error al guardar carrito:', error);
    }
}

document.getElementById('generate-ticket').addEventListener('click', () => {
    const cartItems = getCartItems(); // Implementa esta función para obtener los items del carrito
    saveCart(cartItems);
    alert('Ticket generado');
});
