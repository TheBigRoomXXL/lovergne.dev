---
link: null
title: "VSCode Workspace Shortcuts with .desktop Files on Linux"
added_date: 2025-04-28
tags: ["tool", "blog-post"]
---

One big frustration I have with my workflow currently is that I open all my apps with the app launcher (the menu that appears when you press the command key `⌘`) except one: VSCode[^1]. And that's a big "but" because this is probably the app I use the most after my browser. Instead, I open a terminal and type `code-oss repos/name-of-my-repo`; if I don’t, it just opens VSCode with the last workspace instead of the one I specifically want. But today, no more! Today I fixed my workflow with a simple hack: generating `.desktop` files.


### But what is a `.desktop` file?

A `.desktop` file, or rather a desktop entry file, is a very simple config that applications can use to register themselves with <dfn title="GNOME is a free and open-source desktop environment for Unix-like operating systems. Many major Linux distributions, including Debian, Fedora Linux, Ubuntu, Red Hat Enterprise Linux, and SUSE Linux Enterprise distribute GNOME as their default desktop environment">GNOME</dfn> or <dfn title="KDE is a free and open-source desktop environment for Unix-like operating systems. In its default configuration it resembles Microsoft Windows XP; however, extensive configurability allows radical departures from the default layout.">KDE</dfn>'s application system. For example, the reason you can find VSCode in the app launcher is because when you installed it, it created a file called `code.desktop` in one of the following locations:

- System package: `/usr/share/applications/code-oss.desktop`
- Manual install: `~/.local/share/applications/code-oss.desktop`
- Snap: `/var/lib/snapd/desktop/applications/code-oss_code-oss.desktop`
- Flatpak: `~/.local/share/flatpak/exports/share/applications/com.visualstudio.code_oss.desktop`

The content of `/usr/share/applications/code-oss.desktop` on Alpine Linux is:
```
[Desktop Entry]
Name=Code - OSS
Comment=Code Editing. Redefined.
GenericName=Text Editor
Exec=/usr/bin/code-oss %F
Icon=com.visualstudio.code.oss
Type=Application
StartupNotify=false
StartupWMClass=Code - OSS
Categories=TextEditor;Development;IDE;
MimeType=application/x-code-oss-workspace;
Actions=new-empty-window;
Keywords=vscode;

[Desktop Action new-empty-window]
Name=New Empty Window
Name[de]=Neues leeres Fenster
Name[es]=Nueva ventana vacía
Name[fr]=Nouvelle fenêtre vide
Name[it]=Nuova finestra vuota
Name[ja]=新しい空のウィンドウ
Name[ko]=새 빈 창
Name[ru]=Новое пустое окно
Name[zh_CN]=新建空窗口
Name[zh_TW]=開新空視窗
Exec=/usr/bin/code-oss --new-window %F
Icon=com.visualstudio.code.oss
``` 

As you can see, it contains a lot of metadata to help your desktop environment present and launch the app correctly. Here is a quick presentation of each field:  
- **Name**: the label of the application  
- **Comment**: a short description for tooltips  
- **GenericName**: what category of application it belongs to  
- **Exec**: how the application is launched. Note here that `%F` tells the system that VSCode can open one or multiple files at once. This is why when you select some files, right-click, and then click on "Open With," VSCode appears as an option  
- **Icon**: the icon of the app; can be an absolute path or, as in this case, a URI compatible with the [Icon Themes Specification](https://specifications.freedesktop.org/icon-theme-spec/latest/)  
- **Type**: whether it's an application, a directory, or a link  
- **StartupNotify**: this one is a little bit complicated and is linked to the [startup-notification standard](https://cgit.freedesktop.org/startup-notification/tree/doc/startup-notification.xml). What you need to know is that `false` only means that it is up to the application to manage its own startup notification, not that it won’t notify you on start. I really wish it would just stop startup notifications  
- **StartupWMClass**: an ID used to know which windows belong to the same application  
- **Categories**: like GenericName, it's a categorization, but it follows the [desktop-menu specification](https://specifications.freedesktop.org/menu-spec/latest/) instead of being free text  
- **MimeType**: a list of MIME types that the application can open. In this case, VSCode registers its own custom MIME type for workspaces, because listing everything VSCode can open would be too long—as it can basically open anything  
- **Actions**: a list of custom actions the application can perform. You can see the `new-empty-window` in your app launcher by right-clicking on the VSCode icon  
- **Keywords**: a list of strings that can be used to match the application when searching. In this case, while the app is named "Code," I can still type "VSCode" and find it in the app launcher  
- **[Desktop Action new-empty-window]**: this section describes the custom action with internationalization details  


If you are interested, there are other options for more advanced functionality described in the [desktop-entry specification](https://specifications.freedesktop.org/desktop-entry-spec/latest-single/#recognized-keys). Most of those options won't be very useful to us, but it's always good to know what we are working with.


### How does that help me open a workspace quickly?

We could add a custom action to VSCode to open a specific folder, but the downside of that is that the action is hidden behind a right-click and is not directly searchable.

Instead, whatwe're going to do is create a `.desktop` file for our workspace with a custom `Exec` to open this specific folder. Here is an example:

```txt
# ~/.local/share/applications/code-tinyfeed.desktop
[Desktop Entry]
Name=tinyfeed workspace
Comment=Open the repository directly with code
GenericName=Text Editor
Exec=code-oss "/home/sebastien/repos/tinyfeed"
Icon=com.visualstudio.code.oss
Type=Application
StartupNotify=false
StartupWMClass=Code - OSS
Categories=TextEditor;Development;IDE;
Keywords=vscode;
```

Let's analyze it step by step:  
- The file is located in `~/.local/share/applications/`. Most `.desktop` files are located in `/usr/share/applications/`, but using `~/.local` allows us to scope the application to only the current user, which I think is preferable for workspace shortcuts. Also, it does not require root access.  
- The icon is simply the VSCode icon reused.  
- The label is the name of the workspace, making it easy to distinguish from the actual VSCode app as they have the same icon. "workspace" is at the end because the name is often truncated.  
- An absolute path to our workspace replaces the `%F` argument. It's important that the path is absolute, as `~` would not be expanded.  
- The rest of the metadata is kept from the base file.  

This gives us the following search result in the app launcher when I search for "tinyfeed[^2]":

![workspace-shortcut-1](/workspace-shortcut-1.png)

And when we press `Enter ⏎` it will open the tinyfeed workspace successfully

### Okay but now I need to manually maintain a file for each repos?

Indeed, maintaining that by hand would be annoying but you can trivially write a bash script to automate the generation of `.desktop` files: 

```bash
#!/bin/sh

# Ensure the script exit on error or unbound variables
set -eu

# Configuration
REPOSITORIES_DIRECTORY="$HOME/repos"
APPLICATIONS_DIR="$HOME/.local/share/applications"

# Ensure the applications directory exists
mkdir -p "$APPLICATIONS_DIR"

for repo_path in "$REPOSITORIES_DIRECTORY"/*/; do
    REPOSITORY=$(basename "$repo_path")
    DESKTOP_FILE="$APPLICATIONS_DIR/code-$REPOSITORY.desktop"

    cat > "$DESKTOP_FILE" <<EOF
[Desktop Entry]
Name=$REPOSITORY workspace
Comment=Open the repository directly with code
GenericName=Text Editor
Exec=code-oss "$REPOSITORIES_DIRECTORY/$REPOSITORY"
Icon=com.visualstudio.code.oss
Type=Application
StartupNotify=false
StartupWMClass=Code - OSS
Categories=TextEditor;Development;IDE;
MimeType=application/x-code-oss-workspace;
Keywords=vscode;
EOF

done
```
This script will create a templated `.desktop` file for each folder in the `~/repos` directory. This means you need to have all of your workspaces inside a single directory in a flat manner for it to work, but you can probably adapt it with a more advanced directory listing algorithm if you need.  

Then you only have to call it in your `.bashrc`, and your workspace shortcuts will be updated every time you open a terminal. You could also just do it in a cron job if you prefer.  

This is the final result:

![workspace-shortcut-2](/workspace-shortcut-2.png)

Just for completion: another solution could have been to use a customizable app launcher like [Ulauncher](https://ulauncher.io/) with a [VSCode extension](https://ext.ulauncher.io/-/github-brpaz-ulauncher-vscode-projects), but I like to keep my setup as standard as possible for portability.

[^1]: *VSCode vs Code-OSS vs Codium*: In this article, when I refer to VSCode I actually refer to [code-oss](https://github.com/microsoft/vscode), the open-source version of VSCode—not the proprietary version, and also not [Codium](https://github.com/VSCodium/vscodium), the open-source and slightly modified version of VSCode. It matters because I launch it with the command `code-oss`, not `code`. You might need to adapt my scripts accordingly. Same goes for file paths.

[^2]: Check out [tinyfeed](https://github.com/TheBigRoomXXL/tinyfeed), a minimalist self-hosted RSS reader that generates static HTML pages for your consumption.

