# Server Setup

**Built + Tested with the following hardware & OS:**

- Bosgame cube
    - AMD Ryzen 3
    - 16G RAM
    - 512G SSD
- Linux Mint 22.3 Cinnamon 64-bit

Latest Minecraft game version: **26.3** (Wilderness Bound)

Before starting, ensure the machine is connected to the Internet, and consider running `sudo apt update && sudo apt upgrade` to ensure your system is up-to-date.



## Paper
[Paper documentation](https://docs.papermc.io/paper/getting-started/)

Paper is a 3rd-party Minecraft server program that:

- adds support for server-side plugins
- offers better performance than Mojang's official server

We care mainly about the second point.

Go to [papermc.io/downloads/paper](https://papermc.io/downloads/paper) and click the button that says **26.3**. At the time of writing, Paper's support for Minecraft v26.3 is still in Beta, so click "Toggle experimental builds for 26.3" and hit the big yellow button.



## Java
### Background Info
The *Minecraft Java Edition* ecosystem unsurprisingly needs the Java programming language installed on your system. The benefit of Java is that it's *WORA*: Write once, run anywhere. Java programs can run on basically any computer and operating system equally well (Android apps are actually built in Java).

Some Java-related terms to know:

- **JAR:** Java ARchive. Like a ZIP file or tarball containing Java code and resources needed to run the program. The Paper server you downloaded is a JAR, as are most Minecraft mods and the Minecraft game core itself.
- **JRE:** Java Runtime Environment. A slim piece of software that simply allows you to execute Java programs (JARs).
- **JDK:** Java Development Kit. A bundle of tools used to write and modify Java programs, like the Java compiler. Usually includes the JRE so you can run the things you build.

Adding to the confusion, there are multiple vendors for Java. [OpenJDK](https://openjdk.org/) is a project that builds and distributes "an open-source implementation of the Java Platform."

### Installation
The easiest (if not most up-to-date) way to install Java is through the Ubuntu package repository:
```sh
sudo apt install openjdk-25-jdk
```
> Do not choose the `openjdk-25-jdk-headless` option. That build lacks some components upon which Paper depends.

Run the following to test that it's working:
```sh
java -version
```

> A more cutting-edge build of Java (currently version 27) can downloaded as a tar.gz from [jdk.java.net/27](https://jdk.java.net/27/), but setup is more complicated: see [this StackOverflow answer](https://stackoverflow.com/a/76321378) for a guide.



## Directory Setup
Create a directory to host your server files:
```sh
cd ~
mkdir MCServer
# The specific name of the Paper JAR may vary.
# Note that we're also renaming it to just "paper.jar".
mv Downloads/paper-26.3-143.jar MCServer/paper.jar
cd MCServer
java -jar paper.jar
```

This last command invokes the Paper server. On its first execution, this does three things:

1. Downloads `mojang_26.3.jar`, that actual game server code
2. Sets up a bunch of files and folders in `MCServer/`
3. Deliberately exits because you haven't agreed to the EULA

Run `ls` to see all the new stuff in the server directory.

We need to agree to the EULA. Run
```sh
nano eula.txt
```
and change `eula=false` to `eula=true`. Save and exit.

**Do not start the server again!** We have more setup to do before we're ready to actually run it.



## Data packs
A [Data pack](https://minecraft.wiki/w/Data_pack) is a server-side bundle of code (mainly configuration files) used to customize the logic of a specific Minecraft world. They do not modify the actual Minecraft code like mods do; rather, Minecraft natively references data packs when determining how it should behave.

We will install a few data packs on our server to make a more interesting experience.

### Graves
The "Graves" data pack from Vanilla Tweaks creates a gravestone containing your items when you die, so you can safely retrieve your goods without worrying about them despawning.

Go to [vanillatweaks.net](https://vanillatweaks.net/) and click "Data Packs." Expand "Gameplay Changes" and select "Graves." Hit the orange "Download" button on the right.

Open your Downloads folder, right-click the downloaded ZIP file, and extract it. A file like `graves v4.1.2 (MC 26.3).zip` should appear in Downloads.

Having extracted the Graves zip, you can delete the original bundle file that was downloaded from Vanilla Tweaks.

### Terralith
"Terralith" massively overhauls biomes and world generation, including some new structures. Terralith is available as both a data pack AND a mod. We want the datapack version!

Go to [modrinth.com/datapack/terralith](https://modrinth.com/datapack/terralith). Click the green "Download" button. In the pop-up window, click "Select platform" and choose "Data Pack." Then click "Select game version" and choose "26.3." A green "Download" button will appear next to some text like "2.6.5+26.3"; click it.

No need to extract this downloaded file! Leave it as a ZIP.

#### Applying World-Gen Data Packs on World Creation
The Terralith data pack modifies Minecraft's terrain generation. We have to make sure Minecraft can find the data pack **before** it starts creating the world, or the terrain generation around the world spawn will be buggy as it tries to blend between vanilla terrain and Terralith.

When you start the server, it will create a folder called `world/` inside your server code directory. This "world" folder will contain a `datapacks/` folder. Normally, you copy your data packs into this folder after the world is created, and they will be applied either immediately or upon server restart.

We need to create a skeletal world directory containing just the datapacks so that Minecraft can reference Terralith's terrain generation rules while it fills in the rest of the `world/` folder.

From inside the server code directory, create the needed folders:
```sh
mkdir -p world/datapacks 
```

> If you want to verify that Terralith is being applied during initial world creation, edit `server.properties` and set `level-seed=-2255747740917605238` (there's a dash between the = and the long number). This seed spawns the player inside a Terralith biome, confirming that the very first chunks to be generated are still using your datapacks.

### Add Data Packs to World Folder
Use your file explorer to copy the .zip files you downloaded earlier (Graves and Terralith) from your Downloads folder into `~/MCServer/world/datapacks/`.

Because we've scaffolded in a location for these data packs, the server should discover them and apply their logic before it even begins to generate your world!



## The Server Console
Start the server again. Add the `--nogui` flag this time.
```sh
java -jar paper.jar --nogui
```
A bunch of text will spit out. Wait until you see the following (startup time will obviously vary):

`Done (13.080s)! For help, type "help"`

The server is now running, and you are looking at the management console. You can type the same kind of commands in this terminal that you would run in the in-game chat, but **without the leading slash**. For example, `setblock 0 64 0 bedrock` or `give @a diamond 64`.

Paper also adds [some of its own commands](https://docs.papermc.io/paper/reference/commands/). Most server plugins that you install will also introduce custom commands of their own.

Type `stop` in the console and press Enter to shut down the server.



## Client: Prism Launcher
We will use a 3rd-party launcher called Prism to install and manage a Minecraft client, coincidentally on the same box where we've installed the server.

Go to [prismlauncher.org](https://prismlauncher.org/) and hit the pink "Download" button. Prism is distributed in a few different ways. Flatpak is a containerized format, like Snap or AppImage, and is the format of preference for the developers.

### A Word about Flatpaks

Flathub is the primary repository for Flatpak software. Thankfully, Linux Mint comes with the `flatpak` command pre-installed, and flathub is automatically connected as a known repository.

Like `apt`, each flatpak has a unique "Application ID." But they're a lot longer than apt packages. You could of course Google it, but for the sake of demonstration:
```sh
flatpak search Prism
```
At the time of writing, this returned 2 results:

| Name | Description | Application ID | Version |
| ---- | ----------- | -------------- | ------- |
| Prism Launcher | Custom Minecraft Launcher... | org.prismlauncher.PrismLauncher | 11.1.1 |
| Prism | Trigger and mix live visuals | org.cutwire.Prism | 0.1.2 |

<br>
Clearly, the first one is what we want. The flathub search results tell us its ID is `org.prismlauncher.PrismLauncher`, so that's what we'll refer to when installing.

### Installation
Simply run
```sh
flatpak install org.prismlauncher.PrismLauncher
```
and enter `Y` when prompted. The installation will also ask permission to install Prism's dependencies; accept this also.

Congrats, Prism Launcher is now accessible from your app menu!

### Create a Client Instance

1. Open Prism Launcher.
1. Pick a language (American English).
1. Accept the default appearance settings.
1. Click "Add Microsoft Account," then "Sign in with Microsoft." This opens a login form in a browser. Log in with a Microsoft account that has been used to purchase Minecraft Java Edition.
    - After providing your email, it will show a big blue button offering to "Send code" to your email for login. **INSTEAD,** it's way easier to hit the litte "Other ways to sign in" link and choose "Use your password."
    - Microsoft may think this login is "unusual" or "suspicious." If so, you will have to re-enter your email, hit "Next," and enter the code that's emailed to you.
1. Inside Prism, do what the big splash screen says: hit the "Add Instance" button in the top-left of the window.
1. Leave "Custom" selected in the left-hand panel.
1. Select Version 26.3 if it's not already selected.
1. Scroll down to the "Mod Loader" section and select "Fabric." Accept the default version selection (0.19.5 in testing).
1. Hit "OK." Prism will download the game client code from Mojang, plus the Fabric modloader.
> Note that we haven't installed any mods yet; the "Fabric" thing we installed is a "mod loader." This is a layer that sits between the Minecraft code and the people who write mods, allowing mod authors to interact with Minecraft in a consistent and simplified way. This layer is essential if we want to add client-side mods later!
1. Back on the Prism home page, select the new "26.3" instance and choose the "Launch" button in the upper right, just beneath the grass block icon. This will download a few more assets and then launch the Minecraft client.

You won't be able to join your server yet, though. We have a few more configuration steps we need to take, so close Minecraft once it's successfully opened.



## Whitelisting Players
By default, Minecraft servers use a "whitelist" authentication system: specific players are given explicit permission to join, and only the people on the "whitelist" can access the server.

Use Minecraft's built-in [/whitelist](https://minecraft.wiki/w/Commands/whitelist) command to add your friends to your list of allowed players. Enter `whitelist add <player_name>` into your running server console.

For example, to whitelist a player whose account name is "Steve", go to the server console and enter:
```sh
whitelist add Steve
```

Make sure you whitelist yourself! You can see your account name in the upper-left corner of Prism Launcher, next to your avatar's face.



## Operator Privileges
Players by default have no permission to run commands (cheats) in-game. The ability to execute commands/cheats in-game is referred to "operator status," and is controlled with Minecraft's built-in [/op](https://minecraft.wiki/w/Commands/op) and [/deop](https://minecraft.wiki/w/Commands/deop) commands.

Add yourself as an operator by typing the following in the server console:
```sh
op <your_playername>
```

Now you can run any Minecraft commands you want, and can even manage the server from in-game.

Players who are given operator status in this way are designated as "level 4" operators by default; that's what *you* want, but that should be changed for most friends to whom you give op status. See the later discussion on [Operator Privilege Level](#operator-privilege-levels).



## Server Startup
### Script
Create a BASH script to simplify launching your server process. The script can live anywhere, but I'll put it `~/MCServer`, right with the other server code.
```sh
nano start.sh
```

Add the following text (replace "me" with your user name):
```sh
cd /home/me/MCServer
java -Xms8G -Xmx8G -jar paper.jar --nogui
```

The "8G" values can be changed to specify how much RAM is allocated to the server. On a box with 16G, these flags could probably be set as high as 13G if this box is acting as a dedicated Minecraft server and is not also running a Minecraft client or other applications.

Make the script executable:
```sh
chmod +x start.sh
```

Now you can start the server by simply running `./start.sh` from inside the server directory!

### Automation
If you close the terminal in which you ran the startup script, the server stops. And if the server crashes, you have to manually start it again.

In a perfect world:

- The server runs in a background process, so we don't need any terminal windows open.
- It (re)starts automatically when the machine turns on or the server crashes.
- We can still access it via the terminal for administrative control if we need.

We can achieve these goals using a combination of `systemd` and the `screen` command.

If your server's still running, stop it now.

`screen` doesn't come bundled with Linux Mint, so install it:
```sh
sudo apt update && sudo apt install screen
```

Create a new script that will help daemonize the server process. Fill it with the following text and make it executable:
```sh
nano startd.sh

# Add the following text:
#!/bin/bash
/usr/bin/screen -dmS minecraft-server /bin/bash -c 'exec /home/me/MCServer/start.sh'

chmod +x startd.sh
```

Also create a script to reach into that screen process and gracefully stop the Minecraft server:
```sh
nano stopd.sh

# Add this text:
#!/bin/bash
/usr/bin/screen -S minecraft-server -X stuff "stop$(printf '\r')"

chmod +x stopd.sh
```

> **`screen` commands to know**:
>
- `screen -ls`: List current screens, including name if one was provided (e.g. "minecraft-server")
- `screen -r [session]`: Reattach to a detached (background) screen (e.g. `screen -r minecraft-server` to connect to the server console)
- Press `Ctrl+A D` (Control plus A, then D) while in a screen to disconnect from the screen but leave it running in the background
- If a screen was created as a daemon (i.e. with `-dmS`) and you stop the running process, the screen will close when the process (the Minecraft server, for example) stops

Create a new systemd file for your "minecraft-server" process:
```sh
sudo nano /etc/systemd/system/minecraft-server.service
```
Fill it with the following (and replace the **4** instances of "me" with your user name):
```ini
[Unit]
Description=Minecraft Server
After=network-online.target

[Service]
Type=forking
User=me
Group=me
WorkingDirectory=/home/me/MCServer

ExecStart=/home/me/MCServer/startd.sh
ExecStop=/home/me/MCServer/stopd.sh

Restart=on-failure
RestartSec=10
TimeoutStopSec=60

SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
```

Reload systemd so it's aware of the new unit file, then enable the process and start it.
```sh
sudo systemctl daemon-reload
sudo systemctl enable minecraft-server.service
sudo systemctl start minecraft-server.service
```

Check the results using a couple different commands:
```sh
# Should show "active (running)" in green
sudo systemctl status minecraft-server.service
# Should show
# There is a screen on:
#       xxxxxx.minecraft-server (<date and time>)   (Detached)
screen -ls
# You can also attach to the screen and view the server console.
# Press Ctrl+A, then D to detach the screen again.
screen -r minecraft-server
```

The Minecraft server process now automatically starts when the machine turns on, and recovers automatically if the process crashes.

To gracefully stop the server, use:
```sh
cd ~/MCServer
./stopd.sh
```

**TODO:** Using `systemctl stop minecraft-server.service` does not gracefully shut down the Minecraft server—it kills the screen process. Also, I haven't *tested* if it restarts on server crash because I don't actually know how to crash the server.



## Connect to your Server
Use Prism Launcher to open Minecraft, choose "Multiplayer," and hit "Add Server." Name it something like "My Server," and enter `localhost` in the Server Address box.

If all goes well, you should be able to connect to your server process and play!



## Server Configuration

### Operator Privilege Levels
There are 5 [permission levels](https://minecraft.wiki/w/Permission_level#Java_Edition) for server operators, from 0 to 4:

- **0 (Operator):** A "read-only" operator: can view server performance in the TPS debug chart and can sometimes see command output from command blocks, other ops, and the server console.
- **1 (Moderator):** Can bypass [spawn protection](https://minecraft.wiki/w/Spawn_protection).
- **2 (Gamemaster):** Can run most commands, use command blocks, switch game modes, change the game difficulty, etc.
- **3 (Admin):** Commands related to multiplayer management (like `/whitelist`, `/ban`, `/pardon`, and `/kick`) are available.
- **4 (Owner)** All commands are available, including commands related to server management. **Be VERY careful granting level 4 privilege!!**

After adding a player as an operator using `/op <player_name>`, a new entry will be added to the `ops.json` file. New operators receive level 4 privilege by default (determined by the `op-permission-level` value in `server.properties`). Simply set the value of a player's "level" to a number from 0 to 4 to control how much power they have.

You as the actual owner and admin of the server will want to leave yourself as a level 4 op. If you give your friends op privileges, they should stay at level 2 unless you *really* trust them.

### Re-enabling Exploits
Personally, I enjoy exploiting certain Minecraft bugs like duping TNT and breaking bedrock. Paper fixes these exploits by default. To re-enable these behaviors, change the following values in `config/paper-global.yml`:

```yml
unsupported-settings:
  allow-headless-pistons: true
  allow-permanent-block-break-exploits: true
  allow-piston-duplication: true
```

See the [paper-global.yml documentation](https://docs.papermc.io/paper/reference/global-configuration/#unsupported_settings) for additional options and explanations.