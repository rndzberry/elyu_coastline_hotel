# React + Vite

## Booking email setup

Booking inquiries are sent directly to `ayrandivonne.24@gmail.com` through
EmailJS. The form will report a configuration error until EmailJS is connected.

1. In EmailJS, connect the Gmail account that should send/receive booking
   inquiries, then create an email template.
2. Set the template's **To Email** field to `{{to_email}}`. Use these template
   variables in the subject/body as needed:
   `{{guest_name}}`, `{{guest_email}}`, `{{guest_phone}}`, `{{room_type}}`,
   `{{check_in}}`, `{{check_out}}`, `{{adults}}`, `{{children}}`, and
   `{{special_requests}}`.
3. Copy `.env.example` to `.env.local` and fill in the EmailJS service ID,
   template ID, and public key from the EmailJS dashboard.
4. Restart the development server. In production, add the same `VITE_` values
   to the hosting provider's environment-variable settings and redeploy.

The EmailJS public key is designed for browser use. Never put a private key or
Gmail password in a `VITE_` variable.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
