# Todo List App

## Overview
This is a simple Todo mobile app built using **Expo Go** and **React Native**. It demonstrates full **CRUD functionality** for tasks with optional descriptions, along with filtering by status. The app also supports **dark/light theme** and **persistent storage** using AsyncStorage.

### Features
- **Add Task**: Add a new task with a title and optional description.  
- **View Tasks**: Scrollable list of all tasks.  
- **Edit Task**: Swipe left on a task to edit it.  
- **Delete Task**: Swipe right on a task to delete it.  
- **Toggle Task Completion**: Tap a task to mark as completed or pending.  
- **Filter Tasks**: Filter tasks by All / Completed / Pending using the bottom floating filter bar.  
- **Theme Toggle**: Switch between light and dark themes.  
- **Persistent Storage**: Tasks and theme are saved using AsyncStorage, surviving app reloads.

### UI Design
- Modern floaty bottom filter bar inspired by Pixel, Samsung OneUI, and iOS style.  
- Smooth swipe gestures with visual cues for editing and deleting tasks.  
- Clean, responsive layout optimized for mobile screens.

## Getting Started

### Prerequisites
- **Node.js** (v18 or later recommended)  
- **Android Studio** Android Studio with the developement tools or commandline tools.
- **Nix** Easier developement and testing with nixOS or nixpkgs due to the nix shell attached in this project.
- **USB debugging** You would need to enable android debugging to install on real android hardware which is how i tested.

### Install Dependencies
Clone the repository and install dependencies:
```bash
git clone https://github.com/s2301294/todo-list-s2301294.git
cd todo-list-s2301294
npm install
```

### Run the App
Start the Expo development server. Open two terminals. 
On the first one:
```bash
npx expo start
```
On the second one:
```bash
npx expo run:android
```

- If you have plugged your phone into your pc with usb debugging enabled on developer options, it should install the app required to run this and open it.
- Scan the QR code with **Expo Go** using the app.  
- The app will open instantly, bundle the app and show you what it does.

### Notes
- Tasks and theme are **persisted automatically** using AsyncStorage.  
- Supports **dark and light themes**.  
- Swiping left on a task opens the edit modal; swiping right deletes the task.
- There is a working apk on [releases](https://github.com/s2301294/todo-list-s2301294/releases) as a last resort if this does not work.

## Folder Structure
```
app/              # Expo Router pages
components/       # Reusable UI components (TaskItem, ThemeToggle)
store/            # Zustand store with persistent tasks and theme
assets/           # Images and icons
```