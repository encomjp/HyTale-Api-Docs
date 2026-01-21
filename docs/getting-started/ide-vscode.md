# Setting up Visual Studio Code

Visual Studio Code (VS Code) is a lightweight but powerful editor that works great for Hytale plugin development.

## Prerequisites

1.  **Install Java Development Kit (JDK) 21 or higher**.
    *   We recommend [Eclipse Temurin](https://adoptium.net/).
2.  **Install VS Code**.

## Recommended Extensions

To get the best experience, install the **Extension Pack for Java** by Microsoft. It includes:

*   Language Support for Java(TM) by Red Hat
*   Debugger for Java
*   Maven for Java
*   Test Runner for Java
*   Project Manager for Java

Also install:
*   **Gradle for Java** (by Microsoft) - helps with build scripts.

## Opening Your Project

1.  Open VS Code.
2.  File > **Open Folder...**
3.  Select your plugin folder (the one containing `build.gradle.kts`).
4.  VS Code should detect the Gradle build file and import the project automatically.
    *   Watch the bottom status bar for "Importing Gradle project...".

## Building Your Plugin

You can build using the **Gradle** sidebar or the **Terminal**.

### Using the Terminal

1.  Open the integrated terminal (`Ctrl + ~`).
2.  Run the build command:
    ```bash
    ./gradlew build
    ```
    *(On Windows Command Prompt, use `gradlew build`)*

### Using the Gradle Sidebar

1.  Click the **Elephant icon** in the sidebar.
2.  Expand your project > **Tasks** > **build**.
3.  Click the play button next to **build**.

## Troubleshooting

### "Class not found" errors
If VS Code doesn't recognize Hytale classes:
1.  Open `build.gradle.kts`.
2.  Ensure the path to `HytaleServer.jar` is correct.
3.  Run the command **Java: Clean Java Language Server Workspace** from the Command Palette (`Ctrl+Shift+P`).

---

## Next Steps

Your IDE is ready! Now create your first plugin project:

→ **[Project Setup](/getting-started/project-setup)** - Create a Gradle or Maven project

→ **[Hello World](/getting-started/hello-world)** - Write your first plugin code
