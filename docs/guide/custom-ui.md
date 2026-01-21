# Creating Custom UIs

This guide covers how to create custom user interfaces for your Hytale plugins using Hytale's native UI system.

## Overview

Hytale provides a powerful UI system that allows plugins to create interactive menus, settings panels, and HUDs. The system consists of two parts:

1. **UI Definition Files (`.ui`)** - Define the visual layout and styling
2. **Java Page Classes** - Handle logic, data binding, and events

## Prerequisites

- JDK 25 or later
- A working plugin project (see [Project Setup](../getting-started/project-setup.md))
- Basic understanding of the Hytale server API

## Project Structure

```
src/main/
├── java/
│   └── com/example/myplugin/
│       └── gui/
│           └── MyCustomPage.java      # Java UI controller
└── resources/
    └── Common/
        └── UI/
            └── Custom/
                ├── Components/        # Reusable UI components
                │   └── MyComponent.ui
                └── Pages/             # Full page layouts
                    └── MyMenu.ui
```

---

## Part 1: UI Definition Files

UI files use a custom DSL (Domain-Specific Language) to define layout, styling, and component structure.

### Basic Structure

```
// my_plugin_menu.ui
// Comments start with //

$C = "../Common.ui";           // Import common components

// Define reusable macros with @
@MyRow = Group {
  Anchor: (Height: 40);
  LayoutMode: Left;
  
  Label #Name {
    Text: "Label";
    Style: (FontSize: 16, TextColor: #ffffff);
  }
};

// Main page structure
$C.@PageOverlay {
  $C.@Container {
    Anchor: (Width: 600, Height: 400);
    
    #Title {
      $C.@Title #MainTitle {
        @Text = "My Plugin Settings";
      }
    }
    
    #Content {
      LayoutMode: Top;
      Padding: (Top: 20, Left: 20, Right: 20, Bottom: 20);
      
      @MyRow #SettingRow1 {
        #Name { Text: "Option 1"; }
      }
    }
  }
}
```

### Core Concepts

#### Element IDs

Use `#` to assign IDs to elements for later reference in Java:

```
Label #PlayerName {
  Text: "Unknown";
}
```

In Java, reference as `"#PlayerName.Text"`.

#### Layout Modes

```
Group {
  LayoutMode: Top;    // Stack children vertically
  // or
  LayoutMode: Left;   // Stack children horizontally
}
```

#### Anchoring & Sizing

```
Group {
  Anchor: (
    Width: 200,
    Height: 50,
    Top: 10,
    Left: 20,
    Right: 20,
    Bottom: 10
  );
}
```

#### Text Styling

```
Label {
  Text: "Hello World";
  Style: (
    FontSize: 18,
    TextColor: #ffffff,
    RenderBold: true,
    RenderUppercase: true,
    HorizontalAlignment: Center,
    VerticalAlignment: Center
  );
}
```

#### Colors

Colors use hex format: `#RRGGBB` or `#RRGGBBAA`

```
Background: #1a2533;
OutlineColor: #93844c;
TextColor: #E0E0E0;
```

### Common Components

#### Checkbox

```
$C = "../Common.ui";

$C.@CheckBox #MyCheckbox {
  Anchor: (Width: 22, Height: 22);
}
```

#### Text Button

```
@MyButtonStyle = TextButtonStyle(
  Default: (Background: #3a5068, LabelStyle: (FontSize: 14, TextColor: #ffffff)),
  Hovered: (Background: #4a6078, LabelStyle: (FontSize: 14, TextColor: #ffffff)),
  Pressed: (Background: #2a4058, LabelStyle: (FontSize: 14, TextColor: #ffffff))
);

TextButton #MyButton {
  Text: "Click Me";
  Anchor: (Width: 100, Height: 30);
  Style: @MyButtonStyle;
}
```

#### Flex Layout

Use `FlexWeight` to distribute space:

```
Group {
  LayoutMode: Left;
  
  Group #Left { FlexWeight: 1; }   // Takes 1/3
  Group #Middle { FlexWeight: 1; } // Takes 1/3
  Group #Right { FlexWeight: 1; }  // Takes 1/3
}
```

---

## Part 2: Java Page Controller

### Creating a Page Class

```java
package com.example.myplugin.gui;

import com.hypixel.hytale.codec.Codec;
import com.hypixel.hytale.codec.KeyedCodec;
import com.hypixel.hytale.codec.builder.BuilderCodec;
import com.hypixel.hytale.component.Ref;
import com.hypixel.hytale.component.Store;
import com.hypixel.hytale.protocol.packets.interface_.CustomPageLifetime;
import com.hypixel.hytale.protocol.packets.interface_.CustomUIEventBindingType;
import com.hypixel.hytale.server.core.entity.entities.Player;
import com.hypixel.hytale.server.core.entity.entities.player.pages.InteractiveCustomUIPage;
import com.hypixel.hytale.server.core.ui.builder.EventData;
import com.hypixel.hytale.server.core.ui.builder.UICommandBuilder;
import com.hypixel.hytale.server.core.ui.builder.UIEventBuilder;
import com.hypixel.hytale.server.core.universe.PlayerRef;
import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;

import javax.annotation.Nonnull;

public class MyCustomPage extends InteractiveCustomUIPage<MyCustomPage.PageData> {

    public MyCustomPage(@Nonnull PlayerRef playerRef, @Nonnull CustomPageLifetime lifetime) {
        super(playerRef, lifetime, PageData.CODEC);
    }

    @Override
    public void build(
            @Nonnull Ref<EntityStore> ref,
            @Nonnull UICommandBuilder uiCommandBuilder,
            @Nonnull UIEventBuilder uiEventBuilder,
            @Nonnull Store<EntityStore> store) {
        
        // 1. Load the UI file
        uiCommandBuilder.append("Pages/my_plugin_menu.ui");
        
        // 2. Get player reference
        var player = store.getComponent(ref, Player.getComponentType());
        if (player == null) return;
        
        // 3. Set dynamic values
        uiCommandBuilder.set("#MainTitle.Text", "Settings for " + player.getName());
        uiCommandBuilder.set("#MyCheckbox.Value", true);
        
        // 4. Register event handlers
        uiEventBuilder.addEventBinding(
            CustomUIEventBindingType.ValueChanged,
            "#MyCheckbox",
            EventData.of("Action", "ToggleSetting"),
            false
        );
        
        uiEventBuilder.addEventBinding(
            CustomUIEventBindingType.Activating,
            "#MyButton",
            EventData.of("Action", "ButtonClick"),
            false
        );
    }

    @Override
    public void handleDataEvent(
            @Nonnull Ref<EntityStore> ref,
            @Nonnull Store<EntityStore> store,
            @Nonnull PageData data) {
        super.handleDataEvent(ref, store, data);
        
        var player = store.getComponent(ref, Player.getComponentType());
        if (player == null || data.action == null) return;
        
        switch (data.action) {
            case "ToggleSetting" -> {
                // Handle checkbox toggle
                player.sendMessage(Message.raw("Setting toggled!"));
            }
            case "ButtonClick" -> {
                // Handle button click
                player.sendMessage(Message.raw("Button clicked!"));
            }
        }
        
        // Refresh UI after changes
        this.sendUpdate();
    }

    // Data class for event handling
    public static class PageData {
        static final String KEY_ACTION = "Action";

        public static final BuilderCodec<PageData> CODEC = BuilderCodec
                .<PageData>builder(PageData.class, PageData::new)
                .addField(
                    new KeyedCodec<>(KEY_ACTION, Codec.STRING),
                    (data, s) -> data.action = s,
                    data -> data.action
                )
                .build();

        private String action;
    }
}
```

### Opening the Page

Create a utility method or use directly in a command:

```java
import com.hypixel.hytale.protocol.packets.interface_.CustomPageLifetime;
import com.hypixel.hytale.server.core.universe.PlayerRef;

public void openSettingsMenu(Player player) {
    var ref = player.getReference();
    if (ref == null || !ref.isValid()) return;
    
    var store = ref.getStore();
    var world = store.getExternalData().getWorld();
    if (world == null) return;
    
    world.execute(() -> {
        var playerRef = store.getComponent(ref, PlayerRef.getComponentType());
        if (playerRef != null) {
            player.getPageManager().openCustomPage(
                ref,
                store,
                new MyCustomPage(playerRef, CustomPageLifetime.CanDismiss)
            );
        }
    });
}
```

### Page Lifetimes

```java
CustomPageLifetime.CanDismiss    // Player can close with ESC
CustomPageLifetime.Persistent     // Stays open until closed programmatically
```

---

## Part 3: Event Binding Types

| Type | Use Case | Example |
|------|----------|---------|
| `ValueChanged` | Checkbox, slider, input changes | Checkbox toggle |
| `Activating` | Button clicks | Submit button |
| `Activated` | After activation completes | Confirmation |

```java
// Checkbox value change
uiEventBuilder.addEventBinding(
    CustomUIEventBindingType.ValueChanged,
    "#MyCheckbox",
    EventData.of("Action", "Toggle"),
    false  // Don't close page on event
);

// Button click
uiEventBuilder.addEventBinding(
    CustomUIEventBindingType.Activating,
    "#SaveButton",
    EventData.of("Action", "Save"),
    false
);
```

---

## Complete Example

Here's a full working example of a settings menu with checkboxes:

### UI File: settings_menu.ui

```
$C = "../Common.ui";

@SettingsRow = Group {
  Anchor: (Height: 40, Bottom: 6);
  Background: #1a2533;
  LayoutMode: Left;

  Label #Name {
    Anchor: (Left: 16);
    Style: (VerticalAlignment: Center, TextColor: #96a9be, FontSize: 16);
  }

  Group { FlexWeight: 1; }

  $C.@CheckBox #CheckBox {
    Anchor: (Width: 22, Height: 22, Right: 14);
  }
};

$C.@PageOverlay {
  $C.@Container {
    Anchor: (Width: 500, Height: 300);

    #Title {
      $C.@Title #MainTitle { @Text = "Plugin Settings"; }
    }

    #Content {
      LayoutMode: Top;
      Padding: (Top: 20, Left: 20, Right: 20);

      @SettingsRow #EnableFeature {
        #Name { Text: "Enable Feature"; }
      }

      @SettingsRow #ShowMessages {
        #Name { Text: "Show Messages"; }
      }

      @SettingsRow #DebugMode {
        #Name { Text: "Debug Mode"; }
      }
    }
  }
}

$C.@BackButton {}
```

### Java: SettingsPage.java

```java
public class SettingsPage extends InteractiveCustomUIPage<SettingsPage.Data> {

    private final MyPluginConfig config;

    public SettingsPage(PlayerRef playerRef, CustomPageLifetime lifetime, MyPluginConfig config) {
        super(playerRef, lifetime, Data.CODEC);
        this.config = config;
    }

    @Override
    public void build(Ref<EntityStore> ref, UICommandBuilder cmd, 
                      UIEventBuilder events, Store<EntityStore> store) {
        cmd.append("Pages/settings_menu.ui");
        
        // Set current values
        cmd.set("#EnableFeature #CheckBox.Value", config.isFeatureEnabled());
        cmd.set("#ShowMessages #CheckBox.Value", config.showMessages());
        cmd.set("#DebugMode #CheckBox.Value", config.isDebugMode());
        
        // Register events
        events.addEventBinding(CustomUIEventBindingType.ValueChanged,
            "#EnableFeature #CheckBox", EventData.of("Setting", "feature"), false);
        events.addEventBinding(CustomUIEventBindingType.ValueChanged,
            "#ShowMessages #CheckBox", EventData.of("Setting", "messages"), false);
        events.addEventBinding(CustomUIEventBindingType.ValueChanged,
            "#DebugMode #CheckBox", EventData.of("Setting", "debug"), false);
    }

    @Override
    public void handleDataEvent(Ref<EntityStore> ref, Store<EntityStore> store, Data data) {
        super.handleDataEvent(ref, store, data);
        
        if (data.setting != null) {
            switch (data.setting) {
                case "feature" -> config.setFeatureEnabled(!config.isFeatureEnabled());
                case "messages" -> config.setShowMessages(!config.showMessages());
                case "debug" -> config.setDebugMode(!config.isDebugMode());
            }
            config.save();
        }
        
        this.sendUpdate();
    }

    public static class Data {
        public static final BuilderCodec<Data> CODEC = BuilderCodec
            .<Data>builder(Data.class, Data::new)
            .addField(new KeyedCodec<>("Setting", Codec.STRING),
                (d, s) -> d.setting = s, d -> d.setting)
            .build();
        
        private String setting;
    }
}
```

---

## Tips & Best Practices

1. **Keep UI files modular** - Create reusable component macros
2. **Use meaningful IDs** - Makes Java code more readable
3. **Handle null checks** - Player or world might be null
4. **Execute on world thread** - UI operations should run on the world thread
5. **Call `sendUpdate()`** - After changing state, refresh the UI
6. **Test with hot reload** - Changes to `.ui` files may require server restart

## Troubleshooting

### UI Not Appearing

- Check the `.ui` file path in `append()` matches the actual file location
- Verify the `.ui` file syntax is correct (check server logs for parse errors)
- Ensure `manifest.json` includes your resources

### Events Not Firing

- Verify element IDs match exactly (case-sensitive)
- Check the `EventData` key matches what you expect in `handleDataEvent`
- Confirm event type is appropriate (ValueChanged vs Activating)

### Styling Issues

- Check for missing semicolons in `.ui` files
- Verify color hex codes are valid
- Look for typos in style property names

## Next Steps

- [Commands](./commands.md) - Add commands to open your UI
- [Events](../reference/events.md) - React to player actions
- [Configuration](./configuration.md) - Store persistent settings
