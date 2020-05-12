# Melgen

Melgen is a JS book reader.

To simply read a story, you have to put the story file (.mel file) in the Melgen main menu and click on `generate`.

The story will directly begin without having anything else to do.

## What can a Melgen story be ?

A Melgen story is not a simple text you read once. Melgen allows story where the reader can choose what will be the actions made. Such as "You are the hero" books.

To see an example of what a Melgen story can be, pick the exemple story `exemple.mel` and start reading.

Melgen works in text parts. Each text part correspond to something in the story (it can be a event or anything, the writer chose). For exemple, you can have a text part where the reader is fighting a princess and an other where he kisses a dragon.

Of course, the text parts are related to each other. One can make the reader going to an other. You have differents ways of doing that but the most important one is by creating a [ask] wich allow the reader to choose a path between two. It is one of the [Melgen commands](#melgen-commands).

## .mel file

A .mel file is actually just a text file you can open with any text editor (such as Notepad, Atom etc.).

It is in theses file that the story is writen. It means you do not need to touch any other file.

### Write a .mel file

Writing a .mel file is not actually that simple starting from scratch because everything must be exactly how it should be. Otherwise, Melgen won't be able ro read it.

That's why there is a template file `template.mel` from where you should start writing everything.

#### Write a comment

It is really simple. Just put a `#` at the beginning of the line to make it a comment.

Careful ! It's the only way of putting comments ! There's no in-line comments. It must be line by line.

#### Change the Settings

The settings in a .mel file starts with a `-` + the setting name, then ` : ` and then the value of the setting.

**Exemple**

> `- Title : Melgen` is valid

> `- Title :Melgen` or `- Title: Melgen` or `-Title : Melgen` is not valid

The setting is `Title` correspond to the title of the story

##### Colors

The colors must be writen in hex notation (or by their name, in a way it can be used in CSS).

**Do not forget the `#` before the color hex code**

##### Type mode

There's two type mode with Melgen : TypeWriter and Slide.

The reader is able to change the type mode at any moment but you can change the default value

* To pass in mode **TypeWriter**, the correct setting is `type`

* To pass in mode **Slide**, the correct setting is `fast`

The TypeWriter mode allows a better ambiance. It's nice for the reader being IN the story. The character are writen one by one.

Still, if you're writing a tryhard story, the reader should probably choose the Slide mode that allows him to skip the text faster. All the text appear on one block

##### Indicator

The indicator is the character writen at the end of a sentence, when the reader is able to continue to make him know he can click.

By default it's `[]` but you can put anything if you respect the correct writing for the settings.

### Start writing the story

#### Create a text part

If you took the `template.mel` file, there should already be some text parts created, such as the most important one : `start`. It is the first text part, the one your story will starts with.

To create a new one, just put a `!` then the name of the text part. It is greatly recommanded not to put space before the text part name.

**Exemples** : `!start`, `!Go look backward`, `!Swiw against the stream`

The next line must be `>`. At the next line after this, you can start typing the text relative to that part.

The only ways a part can end is by opening a new one or being at the end of the file.

#### Writing text

After opening a text part, you can write you text as you were writing on a .txt file. You can just type your text.

To break a line in game, just ... break a line on your editor.

To end a sentence (so the reader have to click to continue), break a line an put a single `>`, then break the line again.

If you're not sure how it works, just take a look inside the `template.mel` file.

**Tips** : Putting spaces inside a text in TypeWriter mode create a pause when writing.

### Melgen commands

The commands are the MOST important thing with Melgen. It is what allows you to link text parts, make the user win, or lose.

A command is writtin between two `[]` like `[ask]` then you put a space, and then your arguments. Take a look below to see exemples.

**Commands must be writen alone on a single line !! You also have to put a `>` before writing a command (on the line above)**

There is a list of all the commands you can use :

* **`ask`** : Main command. Allows you to ask the player between two path (text parts). By exemple, if you want to ask to reader between "Take three steps forward" and "Go back to the house", you should write

`[ask] Take three steps forward|Go back to the house`

To separate the two choices, you have to put a `|` between them. This will popup the two buttons and wait for the user to click on one of them.

If the user click on "Take three steps forward" then Melgen will load the text part "Take three steps forward" and will then continue the story

* **`win`** : Make the user win the game. Once the user won, he can't do anything else more than watching the end screen. You choose the win message in the command. By exemple :

`[win] You won!`

* **`die`** : Make the user lose the game. A small popup will pop out at the bottom of the screen with the message you choose. By exemple :

`[die] You're such a loser`

* **`goto`** : Teleport the user to a path. Nothing happens on the screen, the text will just continue as if the path never changed. By exemple :

`[goto] Take three steps forward` will load the "Take three steps forward" text part

* **`color`** : Changes the color of the text for the next dialogs. Changing path or anything else won't change to color. This command is the only way the color of the text can change. By exemple :

`[color] #d9d9d9` will make the text white. *Do not forget to write the color in hex*

* **`bgColor`** : Changes the color of the background. Same use as the [color] command.

* **`removeAll`** : Empty the page. Take no arguments. The only way of using it is :

`[removeAll]`

## Problems ?

If the story won't load or if you're having issues with some text part, take a closer look on what you wrote on your .mel file.

You have to respect all the syntax (all the spaces and everything) and correctly write your text parts name (be careful at the spaces at the end of the lines)
