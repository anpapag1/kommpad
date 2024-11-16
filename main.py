import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import serial
import json
from serial.tools import list_ports
import time


class MacroPadConfigurator:
    def __init__(self, root):
        self.root = root
        self.root.title("Macro Pad Configurator")

        # Serial connection
        self.serial = None

        # Configuration storage
        self.current_layer = 0
        self.config = {
            "layers": [
                {
                    "name": f"Layer {i}",
                    "buttons": [{"type": 0, "modifier": 0, "key": 0, "label": "BTN"} for _ in range(6)],
                    "encoder": [{"type": 0, "modifier": 0, "key": 0, "label": "ENC"} for _ in range(3)]
                } for i in range(3)
            ]
        }

        # Key mappings
        self.key_mappings = {
            # Function keys
            "F1": 0xC2, "F2": 0xC3, "F3": 0xC4, "F4": 0xC5,
            "F5": 0xC6, "F6": 0xC7, "F7": 0xC8, "F8": 0xC9,
            "F9": 0xCA, "F10": 0xCB, "F11": 0xCC, "F12": 0xCD,
            # Modifier keys
            "CTRL": 0x80, "SHIFT": 0x81, "ALT": 0x82, "WIN": 0x83,
            # Media keys
            "PLAY/PAUSE": 0xCD, "NEXT": 0xB5, "PREV": 0xB6,
            "VOL_UP": 0xB0, "VOL_DOWN": 0xB1, "MUTE": 0xB2,
            # Special keys
            "ENTER": 0xB0, "ESC": 0xB1, "BACKSPACE": 0xB2,
            "TAB": 0xB3, "SPACE": 0xB4, "PRINT_SCREEN": 0xCE,
        }

        # Define all methods that will be used in GUI before creating it
        self.define_methods()
        self.create_gui()
        self.load_default_config()

    def define_methods(self):
        def load_config(self):
            filename = filedialog.askopenfilename(
                filetypes=[("JSON files", "*.json"), ("All files", "*.*")]
            )
            if filename:
                try:
                    with open(filename, 'r') as f:
                        self.config = json.load(f)
                    self.load_layer(self.current_layer)
                    messagebox.showinfo("Success", "Configuration loaded!")
                except Exception as e:
                    messagebox.showerror("Error", f"Failed to load configuration: {str(e)}")

        def load_default_config(self):
            self.config = {
                "layers": [
                    {
                        "name": f"Layer {i}",
                        "buttons": [{"type": "Keyboard", "modifier": 0, "key": "F" + str(j + 1),
                                     "label": f"F{j + 1}", "modifiers": {"ctrl": False, "shift": False,
                                                                         "alt": False, "win": False}} for j in
                                    range(6)],
                        "encoder": [{"type": "Volume"} for _ in range(3)]
                    } for i in range(3)
                ]
            }
            self.load_layer(0)

        def upload_config(self):
            if not self.serial or not self.serial.is_open:
                messagebox.showerror("Error", "Please connect to the device first")
                return

            try:
                self.save_current_layer()
                config_data = json.dumps(self.config)

                # Send configuration command
                self.serial.write(b'CONFIG\n')
                time.sleep(0.1)

                # Send configuration data
                self.serial.write(config_data.encode())
                self.serial.write(b'\n')

                # Wait for acknowledgment
                response = self.serial.readline().decode().strip()
                if response == "OK":
                    messagebox.showinfo("Success", "Configuration uploaded successfully!")
                else:
                    messagebox.showerror("Error", "Failed to upload configuration")

            except Exception as e:
                messagebox.showerror("Error", f"Upload failed: {str(e)}")

        # Bind methods to the instance
        self.load_config = load_config.__get__(self)
        self.load_default_config = load_default_config.__get__(self)
        self.upload_config = upload_config.__get__(self)

    # [Rest of the class implementation remains the same...]

    def create_gui(self):
        # Connection frame
        conn_frame = ttk.LabelFrame(self.root, text="Connection")
        conn_frame.pack(padx=5, pady=5, fill="x")

        self.port_var = tk.StringVar()
        port_combo = ttk.Combobox(conn_frame, textvariable=self.port_var)
        port_combo['values'] = [p.device for p in list_ports.comports()]
        port_combo.pack(side="left", padx=5, pady=5)

        ttk.Button(conn_frame, text="Connect", command=self.connect).pack(side="left", padx=5)
        ttk.Button(conn_frame, text="Refresh", command=self.refresh_ports).pack(side="left", padx=5)
        self.status_label = ttk.Label(conn_frame, text="Not Connected")
        self.status_label.pack(side="right", padx=5)

        # Layer selection
        layer_frame = ttk.LabelFrame(self.root, text="Layer")
        layer_frame.pack(padx=5, pady=5, fill="x")

        self.layer_var = tk.IntVar(value=0)
        for i in range(3):
            ttk.Radiobutton(layer_frame, text=f"Layer {i + 1}", variable=self.layer_var,
                            value=i, command=self.change_layer).pack(side="left", padx=5)

        # Layer name
        name_frame = ttk.Frame(layer_frame)
        name_frame.pack(side="left", padx=20)
        ttk.Label(name_frame, text="Layer Name:").pack(side="left")
        self.name_entry = ttk.Entry(name_frame, width=10)
        self.name_entry.pack(side="left", padx=5)

        # Main configuration notebook
        self.notebook = ttk.Notebook(self.root)
        self.notebook.pack(padx=5, pady=5, fill="both", expand=True)

        # Buttons tab
        btn_frame = ttk.Frame(self.notebook)
        self.notebook.add(btn_frame, text="Buttons")

        self.button_frames = []
        for row in range(2):
            for col in range(3):
                frame = self.create_button_config(btn_frame, row * 3 + col)
                frame.grid(row=row, column=col, padx=5, pady=5)
                self.button_frames.append(frame)

        # Encoder tab
        enc_frame = ttk.Frame(self.notebook)
        self.notebook.add(enc_frame, text="Encoder")

        self.encoder_frames = []
        labels = ["Counter-Clockwise", "Clockwise", "Press"]
        for i, label in enumerate(labels):
            frame = self.create_encoder_config(enc_frame, i, label)
            frame.pack(padx=5, pady=5, fill="x")
            self.encoder_frames.append(frame)

        # Bottom buttons
        btn_frame = ttk.Frame(self.root)
        btn_frame.pack(pady=10, fill="x")

        ttk.Button(btn_frame, text="Save Configuration", command=self.save_config).pack(side="left", padx=5)
        ttk.Button(btn_frame, text="Load Configuration", command=self.load_config).pack(side="left", padx=5)
        ttk.Button(btn_frame, text="Upload to Device", command=self.upload_config).pack(side="right", padx=5)
        ttk.Button(btn_frame, text="Reset to Default", command=self.load_default_config).pack(side="right", padx=5)

    def create_button_config(self, parent, index):
        frame = ttk.LabelFrame(parent, text=f"Button {index + 1}")

        # Action type
        row = 0
        ttk.Label(frame, text="Action:").grid(row=row, column=0, padx=2, pady=2, sticky="w")
        type_var = tk.StringVar()
        type_combo = ttk.Combobox(frame, textvariable=type_var, width=15)
        type_combo['values'] = ["Keyboard", "Media", "Mouse", "System"]
        type_combo.grid(row=row, column=1, padx=2, pady=2, sticky="ew")
        type_combo.bind('<<ComboboxSelected>>', lambda e: self.update_key_list(frame))

        # Modifier checkboxes
        row += 1
        mod_frame = ttk.LabelFrame(frame, text="Modifiers")
        mod_frame.grid(row=row, column=0, columnspan=2, padx=2, pady=2, sticky="ew")

        ctrl_var = tk.BooleanVar()
        ttk.Checkbutton(mod_frame, text="Ctrl", variable=ctrl_var).pack(side="left")
        shift_var = tk.BooleanVar()
        ttk.Checkbutton(mod_frame, text="Shift", variable=shift_var).pack(side="left")
        alt_var = tk.BooleanVar()
        ttk.Checkbutton(mod_frame, text="Alt", variable=alt_var).pack(side="left")
        win_var = tk.BooleanVar()
        ttk.Checkbutton(mod_frame, text="Win", variable=win_var).pack(side="left")

        # Key selection
        row += 1
        ttk.Label(frame, text="Key:").grid(row=row, column=0, padx=2, pady=2, sticky="w")
        key_var = tk.StringVar()
        key_combo = ttk.Combobox(frame, textvariable=key_var, width=15)
        key_combo.grid(row=row, column=1, padx=2, pady=2, sticky="ew")

        # Display label
        row += 1
        ttk.Label(frame, text="Label:").grid(row=row, column=0, padx=2, pady=2, sticky="w")
        label_entry = ttk.Entry(frame, width=17)
        label_entry.grid(row=row, column=1, padx=2, pady=2, sticky="ew")

        frame.elements = {
            "type": type_combo,
            "key": key_combo,
            "label": label_entry,
            "modifiers": {
                "ctrl": ctrl_var,
                "shift": shift_var,
                "alt": alt_var,
                "win": win_var
            }
        }

        return frame

    def create_encoder_config(self, parent, index, label):
        frame = ttk.LabelFrame(parent, text=label)

        # Action type
        ttk.Label(frame, text="Action:").pack(side="left", padx=2)
        type_var = tk.StringVar()
        type_combo = ttk.Combobox(frame, textvariable=type_var, width=15)
        type_combo['values'] = ["Volume", "Media Control", "Scroll", "Custom"]
        type_combo.pack(side="left", padx=2)
        type_combo.bind('<<ComboboxSelected>>', lambda e: self.update_encoder_options(frame))

        # Options frame
        options_frame = ttk.Frame(frame)
        options_frame.pack(side="left", padx=20)

        frame.elements = {
            "type": type_combo,
            "options": options_frame
        }

        return frame

    def update_key_list(self, frame):
        action_type = frame.elements["type"].get()
        key_combo = frame.elements["key"]

        if action_type == "Keyboard":
            key_combo['values'] = list(self.key_mappings.keys())
        elif action_type == "Media":
            key_combo['values'] = ["PLAY/PAUSE", "NEXT", "PREV", "VOL_UP", "VOL_DOWN", "MUTE"]
        elif action_type == "Mouse":
            key_combo['values'] = ["LEFT_CLICK", "RIGHT_CLICK", "MIDDLE_CLICK", "SCROLL_UP", "SCROLL_DOWN"]
        else:
            key_combo['values'] = ["SLEEP", "WAKE", "POWER"]

    def update_encoder_options(self, frame):
        action_type = frame.elements["type"].get()
        options_frame = frame.elements["options"]

        # Clear existing options
        for widget in options_frame.winfo_children():
            widget.destroy()

        if action_type == "Volume":
            ttk.Label(options_frame, text="Step Size:").pack(side="left")
            ttk.Entry(options_frame, width=5).pack(side="left", padx=2)
        elif action_type == "Media Control":
            ttk.Radiobutton(options_frame, text="Next/Prev").pack(side="left")
            ttk.Radiobutton(options_frame, text="Forward/Back").pack(side="left")

    def connect(self):
        try:
            port = self.port_var.get()
            if not port:
                messagebox.showerror("Error", "Please select a port")
                return

            if self.serial and self.serial.is_open:
                self.serial.close()

            self.serial = serial.Serial(port, 115200, timeout=1)
            self.status_label.config(text="Connected")
            messagebox.showinfo("Success", "Connected to macro pad!")

        except Exception as e:
            messagebox.showerror("Error", f"Failed to connect: {str(e)}")
            self.status_label.config(text="Connection Failed")

    def refresh_ports(self):
        ports = [p.device for p in list_ports.comports()]
        self.port_var.set("")
        port_combo = self.root.nametowidget(self.port_var.get())
        port_combo['values'] = ports

    def change_layer(self):
        self.save_current_layer()
        self.load_layer(self.layer_var.get())

    def save_current_layer(self):
        layer = self.current_layer
        layer_config = self.config["layers"][layer]

        # Save layer name
        layer_config["name"] = self.name_entry.get()

        # Save button configurations
        for i, frame in enumerate(self.button_frames):
            button_config = {
                "type": frame.elements["type"].get(),
                "key": frame.elements["key"].get(),
                "label": frame.elements["label"].get(),
                "modifiers": {
                    mod: var.get() for mod, var in frame.elements["modifiers"].items()
                }
            }
            layer_config["buttons"][i] = button_config

        # Save encoder configurations
        for i, frame in enumerate(self.encoder_frames):
            encoder_config = {
                "type": frame.elements["type"].get()
            }
            layer_config["encoder"][i] = encoder_config

    def load_layer(self, layer_index):
        self.current_layer = layer_index
        layer_config = self.config["layers"][layer_index]

        # Load layer name
        self.name_entry.delete(0, tk.END)
        self.name_entry.insert(0, layer_config["name"])

        # Load button configurations
        for i, frame in enumerate(self.button_frames):
            button_config = layer_config["buttons"][i]
            frame.elements["type"].set(button_config["type"])
            frame.elements["key"].set(button_config["key"])
            frame.elements["label"].delete(0, tk.END)
            frame.elements["label"].insert(0, button_config["label"])

            for mod, value in button_config["modifiers"].items():
                frame.elements["modifiers"][mod].set(value)

        # Load encoder configurations
        for i, frame in enumerate(self.encoder_frames):
            encoder_config = layer_config["encoder"][i]
            frame.elements["type"].set(encoder_config["type"])

    def save_config(self):
        self.save_current_layer()
        filename = filedialog.asksaveasfilename(
            defaultextension=".json",
            filetypes=[("JSON files", "*.json"), ("All files", "*.*")]
        )
        if filename:
            with open(filename, 'w') as f:
                json.dump(self.config, f, indent=2)
            messagebox.showinfo("Success", "Configuration saved!")

    def load_config(self):
        filename = filedialog.askopenfilename(
            filetypes=[("JSON files", "*.json"), ("All files", "*.*")]
        )
        if filename:
            try:
                with open(filename, 'r') as f:
                    self.config = json.load(f)
                self.load_layer(self.current_layer)
                messagebox.showinfo("Success", "Configuration loaded!")
            except Exception as e:
                messagebox.showerror("Error", f"Failed to load configuration: {str(e)}")

    def load_default_config(self):
        self.config = {
            "layers": [
                {
                    "name": f"Layer {i}",
                    "buttons": [{"type": "Keyboard", "modifier": 0, "key": "F" + str(j + 1),
                                 "label": f"F{j + 1}", "modifiers": {"ctrl": False, "shift": False,
                                                                     "alt": False, "win": False}} for j in
                                range(6)],
                    "encoder": [{"type": "Volume"} for _ in range(3)]
                } for i in range(3)
            ]
        }
        self.load_layer(0)

    def upload_config(self):
        if not self.serial or not self.serial.is_open:
            messagebox.showerror("Error", "Please connect to the device first")
            return

        try:
            self.save_current_layer()
            config_data = json.dumps(self.config)

            # Send configuration command
            self.serial.write(b'CONFIG\n')
            time.sleep(0.1)

            # Send configuration data
            self.serial.write(config_data.encode())
            self.serial.write(b'\n')

            # Wait for acknowledgment
            response = self.serial.readline().decode().strip()
            if response == "OK":
                messagebox.showinfo("Success", "Configuration uploaded successfully!")
            else:
                messagebox.showerror("Error", "Failed to upload configuration")

        except Exception as e:
            messagebox.showerror("Error", f"Upload failed: {str(e)}")

if __name__ == "__main__":
    root = tk.Tk()
    app = MacroPadConfigurator(root)
    root.mainloop()