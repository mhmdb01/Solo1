from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.uix.button import Button
from kivy.uix.textinput import TextInput
import json
import os

DATA_FILE = "player_data.json"

def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as f:
            return json.load(f)
    return {"level": 1, "xp": 0, "xp_needed": 100}

def save_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f)

class SoloLevelingApp(App):
    def build(self):
        self.data = load_data()
        self.layout = BoxLayout(orientation="vertical", padding=10, spacing=10)
        self.label = Label(text=f"Level: {self.data['level']}\nXP: {self.data['xp']} / {self.data['xp_needed']}", font_size=20)
        self.layout.add_widget(self.label)
        self.task_input = TextInput(hint_text="اكتب المهمة هنا", multiline=False)
        self.layout.add_widget(self.task_input)
        self.add_xp_btn = Button(text="إنهاء المهمة +20 XP", on_press=self.complete_task)
        self.layout.add_widget(self.add_xp_btn)
        self.reset_btn = Button(text="إعادة ضبط التقدّم", on_press=self.reset_data)
        self.layout.add_widget(self.reset_btn)
        return self.layout

    def complete_task(self, instance):
        self.data["xp"] += 20
        if self.data["xp"] >= self.data["xp_needed"]:
            self.data["xp"] -= self.data["xp_needed"]
            self.data["level"] += 1
            self.data["xp_needed"] += 50
        save_data(self.data)
        self.update_label()

    def reset_data(self, instance):
        self.data = {"level": 1, "xp": 0, "xp_needed": 100}
        save_data(self.data)
        self.update_label()

    def update_label(self):
        self.label.text = f"Level: {self.data['level']}\nXP: {self.data['xp']} / {self.data['xp_needed']}"

if __name__ == "__main__":
    SoloLevelingApp().run()
