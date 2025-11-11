import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Modal, TextInput, TouchableOpacity } from "react-native";
import TaskItem from "../components/TaskItem";
import ThemeToggle from "../components/ThemeToggle";
import { Ionicons } from "@expo/vector-icons";
import { useTaskStore } from "../store/tasks";

export default function Index() {
  const { tasks, addTask, toggleTask, deleteTask, editTask, theme, toggleTheme } = useTaskStore();
  const [filter, setFilter] = useState("All");
  const [filtered, setFiltered] = useState(tasks);

  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (filter === "All") setFiltered(tasks);
    else if (filter === "Completed") setFiltered(tasks.filter(t => t.completed));
    else setFiltered(tasks.filter(t => !t.completed));
  }, [filter, tasks]);

  const bg = theme === "dark" ? "#121212" : "#f2f2f7";
  const text = theme === "dark" ? "#fff" : "#1c1c1e";
  const card = theme === "dark" ? "#1e1e1e" : "#fff";

  const handleAddOrEdit = () => {
    if (!newTitle.trim()) return;
    if (editingId) {
      editTask(editingId, newTitle.trim(), newDesc.trim());
      setEditingId(null);
    } else {
      addTask(newTitle.trim(), newDesc.trim());
    }
    setNewTitle("");
    setNewDesc("");
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <View style={styles.topRow}>
        <ThemeToggle colorScheme={theme} toggleColorScheme={toggleTheme} />
        <Text style={[styles.header, { color: text }]}>Todo List</Text>
        <TouchableOpacity onPress={() => {
          setModalVisible(true);
          setEditingId(null);
          setNewTitle("");
          setNewDesc("");
        }}>
          <Ionicons name="add-circle-outline" size={36} color="#0a84ff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1, width: "100%" }} contentContainerStyle={{ paddingBottom: 100 }}>
        {filtered.length === 0 ? (
          <View style={{ marginTop: 50, alignItems: "center" }}>
            <Text style={{ color: text, textAlign: "center", fontSize: 16, marginBottom: 5 }}>
              No tasks found
            </Text>
            <Text style={{ color: text, textAlign: "center", fontSize: 14, opacity: 0.7 }}>
              Tap + to add a task. Swipe right to edit, left to delete, tap task to toggle.
            </Text>
          </View>
        ) : (
          filtered.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onStartEdit={(id) => {
                const t = tasks.find(t => t.id === id);
                if (!t) return;
                setNewTitle(t.title);
                setNewDesc(t.description || "");
                setEditingId(id);
                setModalVisible(true);
              }}
              cardColor={card}
              textColor={text}
            />
          ))
        )}
      </ScrollView>

      {/* Floating bottom filter pills */}
      <View style={styles.filterContainer}>
        {["All", "Completed", "Pending"].map(f => {
          const isSelected = filter === f;
          return (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f)}
              style={[
                styles.filterButton,
                {
                  backgroundColor: isSelected
                    ? "#0a84ff"
                    : theme === "dark"
                      ? "#1e1e1e"
                      : "#fff",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: isSelected ? 0.25 : 0,
                  shadowRadius: 3,
                  elevation: isSelected ? 3 : 0,
                },
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  {
                    color: isSelected
                      ? "#fff"
                      : theme === "dark"
                        ? "#fff"
                        : "#1c1c1e",
                  },
                ]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBg}>
          <View style={[styles.modalContainer, { backgroundColor: card }]}>
            <TextInput
              style={[styles.modalInput, { color: text, borderColor: "#ccc" }]}
              placeholder="Task Title"
              placeholderTextColor="#888"
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <TextInput
              style={[styles.modalInput, { color: text, borderColor: "#ccc", height: 80 }]}
              placeholder="Description (optional)"
              placeholderTextColor="#888"
              value={newDesc}
              onChangeText={setNewDesc}
              multiline
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleAddOrEdit} style={styles.addBtn}>
                <Text style={{ color: "#fff", fontWeight: "600" }}>{editingId ? "Save" : "Add Task"}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelBtn}>
                <Text style={{ color: text, fontWeight: "600" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  header: { fontSize: 28, fontWeight: "700", textAlign: "center" },
  filterContainer: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    alignSelf: "center",
  },
  filterButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 25,
    marginHorizontal: 6,
  },
  filterText: { fontWeight: "600", fontSize: 16 },
  modalBg: { flex: 1, backgroundColor: "#00000066", justifyContent: "center", alignItems: "center" },
  modalContainer: { width: "90%", borderRadius: 16, padding: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
  modalInput: { borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 15, fontSize: 16 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  addBtn: { backgroundColor: "#0a84ff", padding: 12, borderRadius: 12, flex: 1, marginRight: 8, alignItems: "center" },
  cancelBtn: { borderWidth: 1, padding: 12, borderRadius: 12, flex: 1, marginLeft: 8, alignItems: "center" },
});
