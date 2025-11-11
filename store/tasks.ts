import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Task = {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
};

type TaskStore = {
    tasks: Task[];
    addTask: (title: string, description?: string) => void;
    editTask: (id: string, title: string, description?: string) => void;
    deleteTask: (id: string) => void;
    toggleTask: (id: string) => void;
    theme: "light" | "dark";
    toggleTheme: () => void;
};

export const useTaskStore = create<TaskStore>()(
    persist(
        (set, get) => ({
            tasks: [],
            addTask: (title, description) =>
                set((state) => ({
                    tasks: [
                        ...state.tasks,
                        { id: Date.now().toString(), title, description, completed: false },
                    ],
                })),
            editTask: (id, title, description) =>
                set((state) => ({
                    tasks: state.tasks.map((t) =>
                        t.id === id ? { ...t, title, description } : t
                    ),
                })),
            deleteTask: (id) =>
                set((state) => ({
                    tasks: state.tasks.filter((t) => t.id !== id),
                })),
            toggleTask: (id) =>
                set((state) => ({
                    tasks: state.tasks.map((t) =>
                        t.id === id ? { ...t, completed: !t.completed } : t
                    ),
                })),
            theme: "light",
            toggleTheme: () =>
                set((state) => ({
                    theme: state.theme === "light" ? "dark" : "light",
                })),
        }),
        {
            name: "todo-storage",
            getStorage: () => AsyncStorage,
        }
    )
);
