"use strict";

/**
 * ============================================================================
 * MOTEL LA GAVIOTA - INTEGRACIÓN WHATSAPP MVP
 * Constante comercial oficial (vacía por defecto en prototipo MVP académico)
 * ============================================================================
 */
const WHATSAPP_NUMBER = "";

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------------------------------------
  // 1. ELEMENTOS DEL DOM
  // --------------------------------------------------------------------------
  const roomSelect = document.getElementById("calc-room");
  const hoursSelect = document.getElementById("calc-hours");
  const priceDisplay = document.getElementById("calc-price-amount");
  const btnOpenModal = document.getElementById("btn-open-modal");

  // Elementos del Modal
  const modal = document.getElementById("modal-consulta");
  const btnCloseModal = document.getElementById("btn-close-modal");
  const btnCloseModalX = document.getElementById("btn-close-modal-x");
  const btnModalWhatsapp = document.getElementById("btn-modal-whatsapp");
  const modalRoomName = document.getElementById("modal-room-name");
  const modalDuration = document.getElementById("modal-duration");
  const modalTotalPrice = document.getElementById("modal-total-price");

  // Elementos de vista previa de WhatsApp en Modal
  const modalWhatsappPreview = document.getElementById("modal-whatsapp-preview");
  const previewMessageText = document.getElementById("preview-message-text");

  // Botones de habitaciones para selección rápida desde el catálogo
  const roomCatalogTriggers = document.querySelectorAll("[data-select-room]");

  // --------------------------------------------------------------------------
  // 2. LÓGICA DE CÁLCULO DE PRECIO ESTIMADO
  // --------------------------------------------------------------------------
  /**
   * Calcula el precio según la habitación y horas seleccionadas:
   * - Habitación Completa: 1h=50, 2h=80, 3h=100, 4h=120, 5h=140, 6h=160
   * - Habitación Sencilla: 1h=40, 2h=70, 3h=90, 4h=110, 5h=130, 6h=150
   */
  function calculatePrice(roomType, totalHours) {
    const hours = parseInt(totalHours, 10);
    if (isNaN(hours) || hours <= 0) return 0;

    if (roomType === "completa") {
      if (hours === 1) return 50;
      if (hours === 2) return 80;
      return 80 + (hours - 2) * 20;
    } else if (roomType === "sencilla") {
      if (hours === 1) return 40;
      if (hours === 2) return 70;
      return 70 + (hours - 2) * 20;
    }

    return 0;
  }

  /**
   * Construye el mensaje formal de consulta para WhatsApp
   */
  function buildWhatsAppMessage(roomType, totalHours) {
    const roomName = roomType === "sencilla" ? "Habitación Sencilla" : "Habitación Completa";
    const hours = parseInt(totalHours, 10);
    const hoursText = `${hours} ${hours === 1 ? "hora" : "horas"}`;
    const price = calculatePrice(roomType, hours);

    return `Hola, quisiera consultar disponibilidad para una ${roomName} por ${hoursText}. El precio referencial mostrado es Bs ${price}.`;
  }

  /**
   * Actualiza el valor mostrado en la interfaz inmediatamente con animación pop
   */
  function updateCalculatorDisplay() {
    if (!roomSelect || !hoursSelect || !priceDisplay) return;

    const selectedRoom = roomSelect.value;
    const selectedHours = hoursSelect.value;
    const estimatedPrice = calculatePrice(selectedRoom, selectedHours);

    // Actualizar valor numérico
    priceDisplay.textContent = `${estimatedPrice}`;

    // Microanimación háptica en la cifra
    priceDisplay.classList.remove("price-pop");
    // Forzar reflujo para reiniciar la animación
    void priceDisplay.offsetWidth;
    priceDisplay.classList.add("price-pop");
  }

  // --------------------------------------------------------------------------
  // 3. LISTENERS DE LA CALCULADORA
  // --------------------------------------------------------------------------
  if (roomSelect) {
    roomSelect.addEventListener("change", updateCalculatorDisplay);
  }

  if (hoursSelect) {
    hoursSelect.addEventListener("change", updateCalculatorDisplay);
  }

  // Selección rápida al pulsar "Consultar disponibilidad" en una tarjeta de habitación
  roomCatalogTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const targetRoom = trigger.getAttribute("data-select-room");
      if (targetRoom && roomSelect) {
        roomSelect.value = targetRoom;
        updateCalculatorDisplay();
      }
    });
  });

  // --------------------------------------------------------------------------
  // 4. CONTROL DEL MODAL IN-PAGE & PREPARACIÓN DE CONTACTO
  // --------------------------------------------------------------------------
  function openModal() {
    if (!modal) return;

    const currentRoom = roomSelect ? roomSelect.value : "completa";
    const currentHours = hoursSelect ? hoursSelect.value : "1";
    const currentPrice = calculatePrice(currentRoom, currentHours);

    // Actualizar datos en el resumen del modal
    if (modalRoomName) {
      modalRoomName.textContent = currentRoom === "sencilla" ? "Habitación Sencilla" : "Habitación Completa";
    }

    if (modalDuration) {
      modalDuration.textContent = `${currentHours} ${currentHours === "1" ? "hora" : "horas"}`;
    }

    if (modalTotalPrice) {
      modalTotalPrice.textContent = `Bs ${currentPrice}`;
    }

    // Ocultar la vista previa del mensaje al abrir de nuevo el modal
    if (modalWhatsappPreview) {
      modalWhatsappPreview.style.display = "none";
    }

    // Mostrar modal con accesibilidad
    modal.classList.add("is-active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (modalWhatsappPreview) {
      modalWhatsappPreview.style.display = "none";
    }
  }

  if (btnOpenModal) {
    btnOpenModal.addEventListener("click", openModal);
  }

  if (btnCloseModal) {
    btnCloseModal.addEventListener("click", closeModal);
  }

  if (btnCloseModalX) {
    btnCloseModalX.addEventListener("click", closeModal);
  }

  // Cerrar al hacer clic en el fondo oscuro
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Cerrar con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("is-active")) {
      closeModal();
    }
  });

  // Botón "Continuar por WhatsApp"
  if (btnModalWhatsapp) {
    btnModalWhatsapp.addEventListener("click", () => {
      const currentRoom = roomSelect ? roomSelect.value : "completa";
      const currentHours = hoursSelect ? hoursSelect.value : "1";
      const message = buildWhatsAppMessage(currentRoom, currentHours);

      const trimmedNumber = WHATSAPP_NUMBER.trim();

      if (trimmedNumber === "") {
        // Modo Prototipo MVP: mostrar vista previa del mensaje estructurado dentro del modal
        if (previewMessageText) {
          previewMessageText.textContent = `“${message}”`;
        }
        if (modalWhatsappPreview) {
          modalWhatsappPreview.style.display = "block";
          modalWhatsappPreview.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      } else {
        // Modo Producción / Número configurado: abrir WhatsApp directamente
        const cleanNumber = trimmedNumber.replace(/[^0-9]/g, "");
        const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. MICROANIMACIONES & SCROLL REVEAL SUAVE
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window && revealElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -40px 0px",
      threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Respaldo inmediato si IntersectionObserver no está soportado
    revealElements.forEach((el) => el.classList.add("is-revealed"));
  }

  // --------------------------------------------------------------------------
  // 6. INICIALIZACIÓN
  // --------------------------------------------------------------------------
  updateCalculatorDisplay();
});
