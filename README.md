# Password Strength Analyzer

## Overview
The **Password Strength Analyzer** is a React component that evaluates password strength, provides real-time feedback, generates strong passwords, and suggests improvements using the `zxcvbn` library.

## Features
- **Password Strength Analysis** using `zxcvbn`
- **Real-time Feedback** on password weaknesses
- **Password Suggestions** for improving security
- **Strong Password Generator**
- **Password Visibility Toggle**
- **Strength Indicator Bar**
- **Copy to Clipboard Feature**
- **Dark/Light Mode Support**

## Technologies Used
- **React** (Client-side application)
- **zxcvbn** (Password strength estimator)
- **Lucide-react** (Icons for UI enhancements)
- **Tailwind CSS** (Styling)
- **Shadcn/UI** (Card and Progress components)
- **Framer Motion** (Animations)

## Installation
### Prerequisites
Ensure you have **Node.js** and **npm** or **yarn** installed on your system.

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/pavan-kumar-25/password-analyzer.git
   cd password-analyzer
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Run the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

## Usage
1. Enter a password in the input field.
2. View the **strength indicator** and feedback messages.
3. Click **Generate Strong Password** to create a secure password.
4. Review **suggestions** and **similar strong passwords**.
5. Click the **Copy** button to copy the password to the clipboard.
6. Toggle between **Dark and Light mode** for better visibility.

## Fix for 'Could not find a declaration file for module "zxcvbn"'
If you encounter the following TypeScript error:
```sh
Could not find a declaration file for module 'zxcvbn'.
```
Run the following command to install type definitions:
```sh
npm install --save-dev @types/zxcvbn
# or
yarn add -D @types/zxcvbn
```

## Folder Structure
```
password-analyzer/
├── components/
│   ├── PasswordAnalyzer.tsx
│   ├── ui/
│   │   ├── card.tsx
│   │   ├── progress.tsx
│   │   ├── copyButton.tsx
│   │   ├── darkModeToggle.tsx
├── pages/
│   ├── index.tsx
├── public/
├── styles/
├── package.json
├── tsconfig.json
├── README.md
```

## License
This project is licensed under the MIT License.

## Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue.

## Author
[Pavan Kumar](https://github.com/pavan-kumar-25)

