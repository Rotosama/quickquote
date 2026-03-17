# QuickQuote ⚡

**QuickQuote** es una potente herramienta de facturación pro-forma diseñada para la rapidez y el profesionalismo. Permite generar presupuestos y facturas con un diseño impecable en segundos, sin necesidad de bases de datos complejas.

## ✨ Funcionalidades Avanzadas

-   🎨 **Diseño Premium**: Interfaz moderna con efectos de *glassmorphism* y tipografía optimizada (Inter & Outfit).
-   🌙 **Modo Oscuro Inteligente**: Experiencia de usuario refinada con alto contraste para legibilidad máxima.
-   🏢 **Identidad de Marca**: Formulario completo para datos de emisor (tú) y cliente, incluyendo subida de **Logo personalizado**.
-   🧮 **Motor de Cálculos Pro**: 
    -   IVA seleccionable (21%, 10%, 4%, Exento).
    -   Descuento global aplicado antes de impuestos.
    -   Desglose detallado: Subtotal, Descuento, Base Imponible e IVA.
-   💾 **Persistencia Local**: Tus datos de empresa, logo y preferencias se guardan automáticamente en el navegador (`localStorage`).
-   📅 **Validez y Pagos**: Campos dedicados para instrucciones de pago (IBAN/PayPal) y fecha de validez del presupuesto.
-   📄 **Exportación Inteligente**: Generación de PDF en formato A4 que **siempre se exporta en modo luz** (fondo blanco) para un resultado profesional e imprimible.

## 🛠️ Tecnologías Utilizadas

-   ⚛️ **Next.js 14**: Framework de React para el máximo rendimiento.
-   🎨 **Tailwind CSS**: Estilo responsivo y sistema de diseño basado en variables.
-   🆔 **UUID**: Generación de códigos de autentificación únicos para cada documento.
-   📄 **html2pdf.js**: Motor de exportación de documentos de alta fidelidad.
-   📅 **Date-fns** (nativo): Gestión inteligente de fechas y vencimientos.

## 🚀 Instalación y Uso

1.  Clona el repositorio.
2.  Instala las dependencias: `npm install`.
3.  Inicia el servidor de desarrollo: `npm run dev`.
4.  Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📄 Despliegue

La aplicación está lista para ser desplegada en **Vercel** con un solo clic.

[QuickQuote en Vercel](https://quickquote-ebon.vercel.app/)

## 🤝 Contribuciones

Si deseas mejorar QuickQuote, las contribuciones son bienvenidas mediante Pull Requests. Asegúrate de seguir las convenciones de diseño establecidas.

---
*Desarrollado con ❤️ para facturar más rápido.*
