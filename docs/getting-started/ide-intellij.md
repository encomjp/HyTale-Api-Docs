# Setting up IntelliJ IDEA

IntelliJ IDEA is the most popular IDE for Java development and highly recommended for Hytale plugins due to its powerful code analysis.

## Prerequisites

1.  **Install Java Development Kit (JDK) 25 or higher**.
    *   We recommend [Eclipse Temurin](https://adoptium.net/).
2.  **Install IntelliJ IDEA** (Community Edition is free and sufficient).

## Importing Your Project

1.  Open IntelliJ IDEA.
2.  Click **Open**.
3.  Navigate to your plugin folder and select the `build.gradle.kts` file (or the folder itself).
4.  Click **Open**.
5.  Select **Open as Project**.

IntelliJ will automatically download dependencies and index your project. This might take a minute.

## Configuring API Access

If your `build.gradle.kts` points correctly to `HytaleServer.jar`, IntelliJ should automatically pick up the library.

1.  Open `src/main/java/.../YourPlugin.java`.
2.  Try typing `PluginContext`.
3.  If it turns red, click the **Gradle** icon (elephant) in the right sidebar and click the **Reload All Gradle Projects** (refresh) button.

## Building Your Plugin

1.  Open the **Gradle** tool window (right sidebar).
2.  Expand your project name > **Tasks** > **build**.
3.  Double-click **build**.

The compiled jar will appear in `build/libs/`.

## Debugging

To debug logic while the server is running:

1.  Create a **Remote JVM Debug** configuration:
    *   Run > **Edit Configurations...**
    *   Click **+** > **Remote JVM Debug**.
    *   Name it "Hytale Server".
    *   Set Port to `5005` (default debug port for many Java apps, otherwise check server launch args).
2.  Launch the Hytale Server with debug arguments:
    *   `java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 -jar HytaleServer.jar`
3.  In IntelliJ, select your "Hytale Server" config and click the **Debug** (bug) icon.

---

## Next Steps

Your IDE is ready! Now create your first plugin project:

→ **[Project Setup](/getting-started/project-setup)** - Create a Gradle or Maven project

→ **[Hello World](/getting-started/hello-world)** - Write your first plugin code
