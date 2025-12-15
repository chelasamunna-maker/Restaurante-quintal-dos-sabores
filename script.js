if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return;

            let message = "Olá! Gostaria de fazer o seguinte pedido do Quintal dos Sabores:\n\n";
            let total = 0;

            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                message += `${item.quantity}x ${item.name} - ${itemTotal.toLocaleString('pt-PT')} Kz\n`;
                total += itemTotal;
            });

            message += `\nTotal da Encomenda: ${total.toLocaleString('pt-PT')} Kz`;
            message += "\n\n--- DADOS DA ENCOMENDA ---\n";
            message += "Eu prefiro:\n";
            message += "1. Delivery (Entrega ao domicílio) [Endereço: Insira aqui]\n";
            message += "2. Take Away (Levantamento no local)\n\n";
            message += "Por favor, indique a sua escolha e confirme o valor total.";


            if (navigator.geolocation) {
                message += "\n\n(Localização: Aguarde, estou a tentar enviar a minha localização atual)";
                navigator.geolocation.getCurrentPosition((position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    
                    message = message.replace(
                        "(Localização: Aguarde, estou a tentar enviar a minha localização atual)",
                        `Minha Localização (Aprox.): https://maps.google.com/?q=${lat},${lon}`
                    );
                    
                    const encodedMessage = encodeURIComponent(message);
                    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
                }, () => {
                    // Se falhar
                    message = message.replace("(Localização: Aguarde, estou a tentar enviar a minha localização atual)", "(Localização: Não foi possível obter a localização. Por favor, forneça o endereço.)");
                    const encodedMessage = encodeURIComponent(message);
                    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
                });
            } else {
                // Se o navegador não suportar
                message += "\n\n(Localização: Por favor, forneça o seu endereço.)";
                const encodedMessage = encodeURIComponent(message);
                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
            }
        });
    }