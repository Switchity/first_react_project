# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Recommended Folder Setup for Your Project
    As your project grows, a "high-level" structure inside src usually looks like this: 
    Web Dev Simplified Blog
    Web Dev Simplified Blog
     +1
    src/components/: For small, reusable pieces (Buttons, Inputs).
    src/templates/ (or layouts/): For large structural pieces (Navbar, Sidebar, Footer).
    src/pages/: For the actual full screens of your app (Home, Login, Profile).
    src/assets/: For your images, icons, and global CSS files. 

    src/components: As you know, React is all about components. Defining separate folder for each component is efficient because you can place the related styles or assets or test files next to your JavaScript/TypeScript file.
    
    src/constants: I use this folder to define some objects or arrays and import them anywhere I want to use. These constants could be list items or some text or some words. This is a good practice to keep them separate from your components.
    
    src/containers: Each page includes many small components. This folder is similar to src/components, but it contains our large components which is literally our app pages.
    
    src/helpers: You can define helper functions in this folder. There are some functions that you might need across your application which generate some certain data or do something special. It’s better to keep them separate from components in order to make them reusable and make your code cleaner.
    
    src/lang: If your application is internationalized, you can use this folder for its configs. My favorite package is react-intl and it’s really easy to work with.
    
    src/redux: If you are using redux as your state management system, you’ll absolutely need a separate folder for it. All type definitions, actions, reducers and the redux store belong to this folder.
    
    src/routes: Probably your app consists of multiple pages and you’ll need this folder for react-router configs.
    
    src/utils: Sometimes I’d like to keep some of my useful components, e.g. high order components in this folder. In this way I can make a difference between my custom components and the ordinary ones.
    
    Conclusion
    So that’s it! Please keep in mind that your folder structure may vary depending on your project requirements and dependencies. But having a good folder structure will always help you to have a good developer experience as your project starts to grow. Another best practice is to create your files based on the different parts of your app. For example your app has different pages for login, sign up, landing etc. In the main folders create separate files for each module of your application and keep everything separate. If you need more than one file for each module, e.g. you should define redux actions and reducers in separate files, you can create subfolders for each folder.